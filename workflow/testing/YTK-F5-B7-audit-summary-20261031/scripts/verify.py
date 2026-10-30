"""Independent read-only verifier. Standard Python only; never imports product/test runners."""
import collections, hashlib, json, os, pathlib, subprocess, sys

OUT = pathlib.Path(__file__).resolve().parents[1]
REPO = OUT.parents[2]
SOURCE = 'workflow/testing/YTK-F5-auto-resume-b7-20261030'
COMMIT = 'd18db02241566cb230ac9fe7aa8e798e60bf51d0'
PRODUCT = '15a146a9b2c4f80c63798eb31d64b6774a4c2e99'
RUN = SOURCE + '/runs/F5-AUTO-RESUME-B7-20261030-001'
findings = []

def read(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)

def raw_json(v, sort=False):
    return json.dumps(v, ensure_ascii=False, separators=(',', ':'), sort_keys=sort).encode('utf-8')

def equal(a, b):
    return raw_json(a, True) == raw_json(b, True)

def sha(v):
    return hashlib.sha256(v).hexdigest()

def check(ok, kind, **details):
    if not ok:
        findings.append(dict(kind=kind, **details))
    return bool(ok)

def write(p, value):
    p = OUT / p
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open('x', encoding='utf-8', newline='\n') as f:
        json.dump(value, f, ensure_ascii=False, indent=2)
        f.write('\n')

def digest_file(p):
    size = p.stat().st_size
    h1 = hashlib.sha1(('blob %d\0' % size).encode())
    h2 = hashlib.sha256()
    with p.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h1.update(block)
            h2.update(block)
    return {'bytes': size, 'gitBlobSHA1': h1.hexdigest(), 'sha256': h2.hexdigest()}

def tree(revision, prefix=None):
    args = ['git', '-c', 'core.longpaths=true', 'ls-tree', '-rz', revision]
    if prefix:
        args += ['--', prefix]
    data = subprocess.check_output(args, cwd=REPO)
    result = {}
    for row in data.split(b'\0'):
        if not row:
            continue
        header, filename = row.split(b'\t', 1)
        mode, typ, blob = header.split()
        check(mode == b'100644' and typ == b'blob', 'UNEXPECTED_GIT_ENTRY', path=filename.decode())
        result[filename.decode()] = blob.decode()
    return result

def check_file_semantics(file, packet, observed, case_id, index):
    # Reconstruct the predeclared model independently of the Node extractor/oracle.
    model = packet['oracle']
    d = packet['dataset']
    p = file['pending']
    rebuilt_pending = None
    if packet['kind'] == 'normal' or not packet['pending']:
        check(p is None, 'PENDING_SHOULD_BE_NULL', caseId=case_id, index=index)
    else:
        expected_ops = model['operations']
        ids = {o['ordinal']: o['operationId'] for o in p['operations']}
        check(len(ids) == len(expected_ops), 'OPERATION_CARDINALITY', caseId=case_id, index=index)
        rebuilt = []
        for o in expected_ops:
            rebuilt.append(dict(operationId=ids.get(o['ordinal']), ordinal=o['ordinal'],
                operationType=o['operationType'], targetKind=o['targetKind'],
                categoryKey=o['categoryKey'], recordId=o['recordId'],
                baseGenerationId=d['generationId'], baseGlobalRevision=d['globalRevision'],
                baseRecordRevision=o['baseRecordRevision'],
                dependsOnOperationIds=[ids.get(n) for n in o['dependsOrdinals']],
                captureKind='dependent-pending' if o['dependsOrdinals'] else 'confirmed-pending',
                canonicalValue=o['canonicalValue'], dependencyContext=o['dependencyContext']))
        check(equal(p['operations'], rebuilt), 'PREDECLARED_OPERATION_MODEL_MISMATCH', caseId=case_id, index=index)
        check(equal(p['omittedScopes'], model['omitted']), 'PREDECLARED_OMITTED_SCOPE_MISMATCH', caseId=case_id, index=index)
        exported = len(rebuilt)
        candidates = len(packet['pending'])
        check(p['candidateCount'] == candidates and p['exportedCount'] == exported and
              p['omittedCount'] == candidates-exported, 'PENDING_COUNTS', caseId=case_id, index=index)
        check(p['captureStatus'] == ('full' if exported == candidates else 'partial' if exported else 'none'),
              'CAPTURE_STATUS', caseId=case_id, index=index)
        check(p['baseGenerationId'] == d['generationId'] and p['baseGlobalRevision'] == d['globalRevision'],
              'BASE_METADATA', caseId=case_id, index=index)
        strip = lambda r: {k: v for k, v in r.items() if k not in ('revision', 'schemaVersion')}
        content = dict(overview=strip(d['overview']), categories=[strip(r) for r in d['categories']],
                       services=[strip(r) for r in d['services']])
        check(p['baseSnapshotChecksumSha256'] == sha(raw_json(d)) and
              p['baseContentFingerprintSha256'] == sha(raw_json(content)), 'BASE_HASHES', caseId=case_id, index=index)
        rebuilt_pending = dict(captureStatus='full' if exported == candidates else 'partial' if exported else 'none',
            candidateCount=candidates, exportedCount=exported, omittedCount=candidates-exported,
            omittedScopes=model['omitted'], baseGenerationId=d['generationId'], baseGlobalRevision=d['globalRevision'],
            baseSnapshotChecksumSha256=sha(raw_json(d)), baseContentFingerprintSha256=sha(raw_json(content)), operations=rebuilt)
    check(equal(file['snapshot'], d), 'COMMITTED_SNAPSHOT_MISMATCH', caseId=case_id, index=index)
    check(sha(raw_json(file['snapshot'])) == observed['snapshotSHA256'], 'SNAPSHOT_PROOF_HASH', caseId=case_id, index=index)
    body = dict(fileFormat='yattoko-backup', fileFormatVersion=1, kind=packet['kind'], exportedAt=packet['exportedAt'], snapshot=d, pending=rebuilt_pending)
    return dict(**body, checksum=dict(algorithm='SHA-256', hex=sha(raw_json(body))))

mapping = read(OUT / 'SOURCE-MAPPING.json')
extraction = read(OUT / 'EXTRACTION.json')
check(mapping['sourceCommit'] == COMMIT, 'WRONG_SOURCE_COMMIT')
git_files = tree(COMMIT, SOURCE)
inventory = {}
for page in mapping['inventoryPages']:
    for r in read(OUT / page)['files']:
        if r['path'] in inventory:
            check(False, 'DUPLICATE_INVENTORY_PATH', path=r['path'])
        inventory[r['path']] = r
check(set(inventory) == set(git_files), 'SOURCE_FILE_SET_MISMATCH')
actual_meta = {}
for name, blob in git_files.items():
    p = REPO / name
    if not p.exists():
        check(False, 'SOURCE_FILE_MISSING', path=name)
        continue
    m = digest_file(p)
    actual_meta[name] = m
    r = inventory.get(name, {})
    check(m['gitBlobSHA1'] == blob == r.get('gitBlobSHA1') and m['bytes'] == r.get('bytes') and
          m['sha256'] == r.get('sha256'), 'SOURCE_GIT_BYTES_HASH_MISMATCH', path=name)

audit = read(REPO / SOURCE / 'AUDIT.json')
plan = read(REPO / SOURCE / 'PREEXECUTION.json')
cases = plan['cases']
runtime = plan['runtime']
expected_target = plan['targetFiles']
expected_history = plan['historicalFiles']
del plan
before = read(REPO / RUN / 'integrity-before.json')
after = read(REPO / RUN / 'integrity-after.json')
global_ok = {
    'recordedProductBeforeAfterMetadataEqual': equal(before['target'], after['target']),
    'recordedHistoryBeforeAfterMetadataEqual': equal(before['history'], after['history']),
    'recordedDependenciesBeforeAfterMetadataEqual': equal(before['dependencies'], after['dependencies']),
    'targetMetadataMatchesPlan': equal(before['target'], expected_target),
    'historyMetadataMatchesPlan': equal(before['history'], expected_history),
    'dependencyMetadataMatchesPlan': equal(before['dependencies'], runtime['dependencies']),
}
for key, ok in global_ok.items():
    check(ok and extraction['recordedGlobalIntegrity'].get(key) == ok, 'GLOBAL_METADATA_MISMATCH', field=key)
recorded_target = {r['path']: r for r in before['target']}
del before, after, expected_history
fixed_root = REPO.parent / 'F5-TARGET-15a146a'
fixed_git = tree(PRODUCT)
check(set(fixed_git) == set(recorded_target), 'FIXED_PRODUCT_FILE_SET')
for name, blob in fixed_git.items():
    m = digest_file(fixed_root / name)
    r = recorded_target[name]
    check(m['gitBlobSHA1'] == blob == r['gitBlob'] and m['sha256'] == r['sha256'] and m['bytes'] == r['bytes'],
          'CURRENT_FIXED_PRODUCT_HASH_MISMATCH', path=name)
del expected_target, recorded_target, fixed_git
manifest = read(REPO / RUN / 'EVIDENCE-MANIFEST.json')
manifest_map = {RUN+'/'+r['path']: r for r in manifest['files']}
for name, m in manifest_map.items():
    actual = actual_meta.get(name)
    check(actual is not None and actual['bytes'] == m['bytes'] and actual['sha256'] == m['sha256'],
          'EVIDENCE_MANIFEST_BINDING', path=name)
check(sha((REPO / RUN / 'EVIDENCE-MANIFEST.json').read_bytes()) == audit['evidenceManifestSHA256'], 'AUDIT_MANIFEST_REFERENCE')
ledger = [json.loads(line) for line in (REPO / RUN / 'ledger.jsonl').read_text(encoding='utf-8').splitlines() if line]
variants_ledger = collections.defaultdict(list)
case_ledger = collections.defaultdict(list)
for event in ledger:
    if event['type'] == 'VARIANT':
        variants_ledger[(event['caseId'], event['index'])].append(event)
    if event['type'] == 'CASE':
        case_ledger[event['caseId']].append(event)
original_checks = collections.defaultdict(list)
for i, row in enumerate(audit['checks']):
    original_checks[(row['caseId'], row['index'])].append((i, row))
reconstructed = []
verified_cases = []
packet_cache_path, packet_cache = None, None
for c in cases:
    case_id = c['caseId']
    slug = case_id.replace(':', '-')
    case_mapping = next(x for x in mapping['caseManifest'] if x['caseId'] == case_id)
    extracted_case = read(OUT / case_mapping['summary'])
    start_findings = len(findings)
    original_case_checks = [x for x in audit['checks'] if x['caseId'] == case_id]
    fragment_checks = []
    for f in case_mapping['auditParts']:
        part = read(OUT / f)
        check(equal(part['checks'], audit['checks'][part['sourceStart']:part['sourceEndExclusive']]),
              'AUDIT_FRAGMENT_SOURCE_SLICE_MISMATCH', caseId=case_id, path=f)
        fragment_checks.extend(part['checks'])
    check(equal(fragment_checks, original_case_checks), 'CASE_CHECK_REASSEMBLY_MISMATCH', caseId=case_id)
    reconstructed.extend(fragment_checks)
    cd = RUN+'/'+slug
    result = read(REPO / cd / 'result.json')
    case_event = case_ledger[case_id]
    check(len(case_event) == 1 and case_event[0]['status'] == result['status'] and
          case_event[0]['completedVariants'] == result['completedVariants'], 'CASE_LEDGER', caseId=case_id)
    check(extracted_case['originalFormalStatus'] == result['status'] and extracted_case['noRecertification'],
          'ORIGINAL_STATUS_COPY', caseId=case_id)
    counts = dict(planned=len(c['vectors']), resultCompleted=result['completedVariants'], observationFiles=0,
        sourceAuditChecks=len(original_case_checks), expectedActualMatches=0, recordedOriginalOracleFileProofs=0,
        expectedFailureWithoutFileProof=0, oracleApplicableProofMissing=0, oldFourStorePairsMatch=0,
        ledgerVariantMatches=0, evidenceMissing=0, evidenceHashMismatch=0, expectationMismatch=0,
        sourceRecordedOracleMismatch=0)
    variant_rows = []
    for f in case_mapping['variantParts']:
        variant_rows.extend(read(OUT / f)['variants'])
    check(len(variant_rows) == len(c['vectors']), 'VARIANT_SHARD_CARDINALITY', caseId=case_id)
    for index, v in enumerate(c['vectors'], 1):
        vd = cd+'/'+str(index).zfill(3)
        op = vd+'/observation.json'
        if op not in actual_meta:
            counts['evidenceMissing'] += 1
            check(False, 'OBSERVATION_MISSING', caseId=case_id, index=index)
            continue
        o = read(REPO / op)
        counts['observationFiles'] += 1
        rows_check = original_checks[(case_id, index)]
        check(len(rows_check) == 1, 'AUDIT_INDEX_CARDINALITY', caseId=case_id, index=index)
        ci, source_check = rows_check[0]
        expected_match = all(equal(value, o['actual'].get(k)) for k, value in o['expected'].items())
        if expected_match:
            counts['expectedActualMatches'] += 1
        else:
            counts['expectationMismatch'] += 1
            check(False, 'EXPECTED_ACTUAL_MISMATCH', caseId=case_id, index=index)
        check(equal(o['expected'], v['expect']) and equal(o['oracle'], v['oracle']), 'PLAN_OBSERVATION', caseId=case_id, index=index)
        if o['actual']['accepted']:
            proof = source_check['proof']
            ok = proof is not None and o['actual']['independentOracleMatches'] is True and all(equal(value, o['actual'].get(k)) for k, value in proof.items())
            if ok:
                counts['recordedOriginalOracleFileProofs'] += 1
            else:
                counts['oracleApplicableProofMissing'] += 1
                counts['sourceRecordedOracleMismatch'] += 1
                check(False, 'ORIGINAL_ORACLE_PROOF_MISMATCH', caseId=case_id, index=index)
            file_path = REPO / vd / 'backup.json'
            file_raw = file_path.read_bytes()
            file = json.loads(file_raw)
            payload = {k: value for k, value in file.items() if k != 'checksum'}
            check(file['checksum'] == dict(algorithm='SHA-256', hex=sha(raw_json(payload))), 'FILE_PAYLOAD_CHECKSUM', caseId=case_id, index=index)
            check(file_raw == raw_json(file), 'FILE_CANONICAL_BYTES', caseId=case_id, index=index)
            check(sha(file_raw) == proof['fileSHA256'], 'FILE_PROOF_HASH', caseId=case_id, index=index)
            input_path = REPO / SOURCE / v['input']['path']
            if packet_cache_path != input_path:
                packet_cache_path, packet_cache = input_path, read(input_path)
            rebuilt_file = check_file_semantics(file, packet_cache, o['actual'], case_id, index)
            check(file_raw == raw_json(rebuilt_file), 'INDEPENDENT_CANONICAL_MODEL_BYTES', caseId=case_id, index=index)
        elif v['expect']['accepted'] is False and source_check['proof'] is None:
            counts['expectedFailureWithoutFileProof'] += 1
            check(not (REPO / vd / 'backup.json').exists(), 'UNEXPECTED_FILE_ON_EXPECTED_FAULT', caseId=case_id, index=index)
        else:
            counts['oracleApplicableProofMissing'] += 1
            check(False, 'UNEXPECTED_NULL_ORACLE', caseId=case_id, index=index)
        ev = variants_ledger[(case_id, index)]
        if len(ev) == 1 and ev[0]['status'] == o['status']:
            counts['ledgerVariantMatches'] += 1
        else:
            check(False, 'VARIANT_LEDGER', caseId=case_id, index=index)
        stores_same = all(actual_meta.get(vd+'/before-'+s+'.json', {}).get('sha256') ==
                          actual_meta.get(vd+'/after-'+s+'.json', {}).get('sha256') and
                          vd+'/before-'+s+'.json' in actual_meta for s in ['meta', 'overview', 'categories', 'services'])
        if stores_same and source_check['all4StoresUnchanged'] is True and o['actual']['oldStateUnchanged'] is True:
            counts['oldFourStorePairsMatch'] += 1
        else:
            check(False, 'OLD_DATA_PRESERVATION', caseId=case_id, index=index)
        check(source_check['readwrite'] == 0 == o['actual']['readwriteTransactions'] and
              o['actual']['writeRequests'] == 0, 'UNEXPECTED_DB_WRITE', caseId=case_id, index=index)
        check(o['status'] == 'PASS' and o['error'] is None, 'ORIGINAL_NONPASS', caseId=case_id, index=index)
        check(variant_rows[index-1]['expectedActualMatch'] == expected_match and
              variant_rows[index-1]['sourceCheckIndex'] == ci and not variant_rows[index-1]['issues'],
              'VARIANT_SUMMARY_MISMATCH', caseId=case_id, index=index)
    check(equal(counts, extracted_case['counts']), 'CASE_AGGREGATE_MISMATCH', caseId=case_id,
          independent=counts, extracted=extracted_case['counts'])
    check(not extracted_case['issues'], 'EXTRACTOR_CASE_ISSUES', caseId=case_id)
    record = dict(caseId=case_id, originalFormalStatus=result['status'], noRecertification=True,
                  counts=counts, findings=findings[start_findings:], verification='MATCH' if len(findings) == start_findings else 'DISCREPANCY')
    write('verification/cases/'+slug+'.json', record)
    verified_cases.append(record)
    print(case_id, record['verification'], counts['observationFiles'], flush=True)

check(equal(reconstructed, audit['checks']), 'WHOLE_CHECK_ARRAY_RECONSTRUCTION')
metadata = read(OUT / 'original-audit-metadata.json')['auditWithoutChecks']
metadata['checks'] = reconstructed
check(equal(metadata, audit), 'WHOLE_AUDIT_RECONSTRUCTION')
check(not extraction['issues'], 'EXTRACTION_SOURCE_ISSUES', issues=extraction['issues'])
summary = dict(purpose='SUMMARY_EQUIVALENCE_VERIFICATION_ONLY_NOT_FORMAL_RETEST_OR_RECERTIFICATION',
    sourceCommit=COMMIT, fixedProductCommit=PRODUCT, python=sys.version, sourceFilesVerified=len(actual_meta),
    evidenceManifestFilesVerified=len(manifest_map), fixedProductFilesVerified=len(recorded_target) if 'recorded_target' in globals() else len(tree(PRODUCT)),
    cases=len(verified_cases), variants=sum(r['counts']['observationFiles'] for r in verified_cases),
    wholeAuditReconstructionMatches=equal(metadata, audit),
    expectedActualMatches=sum(r['counts']['expectedActualMatches'] for r in verified_cases),
    originalOracleFileProofs=sum(r['counts']['recordedOriginalOracleFileProofs'] for r in verified_cases),
    expectedFailuresWithoutFile=sum(r['counts']['expectedFailureWithoutFileProof'] for r in verified_cases),
    oracleApplicableProofMissing=sum(r['counts']['oracleApplicableProofMissing'] for r in verified_cases),
    recordedIntegrityMetadata=global_ok, originalCumulativeCounts=audit['counts'],
    findings=findings, outcome='MATCH' if not findings else 'DISCREPANCIES_FOUND',
    formalTestsExecuted=0, originalFilesWritten=0)
write('verification/VERIFICATION.json', summary)
print(json.dumps({k: summary[k] for k in ['outcome', 'cases', 'variants', 'expectedActualMatches', 'originalOracleFileProofs', 'expectedFailuresWithoutFile', 'oracleApplicableProofMissing']}, ensure_ascii=False), flush=True)
if findings:
    sys.exit(2)
