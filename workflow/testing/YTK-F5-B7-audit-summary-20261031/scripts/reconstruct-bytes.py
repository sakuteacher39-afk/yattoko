"""Rebuild AUDIT bytes in memory from fragments; write hashes only, never a large duplicate."""
import hashlib, json, pathlib

out = pathlib.Path(__file__).resolve().parents[1]
repo = out.parents[2]
def load(p):
    return json.loads(p.read_text(encoding='utf-8'))
mapping = load(out / 'SOURCE-MAPPING.json')
metadata = load(out / 'original-audit-metadata.json')['auditWithoutChecks']
parts = []
for c in mapping['caseManifest']:
    for name in c['auditParts']:
        parts.append(load(out / name))
parts.sort(key=lambda p: p['sourceStart'])
checks = []
for p in parts:
    assert p['sourceStart'] == len(checks)
    checks.extend(p['checks'])
    assert p['sourceEndExclusive'] == len(checks)
metadata['checks'] = checks
rebuilt = (json.dumps(metadata, ensure_ascii=False, indent=2)+'\n').encode('utf-8')
original = (repo / mapping['sourceFolder'] / 'AUDIT.json').read_bytes()
digest = lambda b: hashlib.sha256(b).hexdigest()
result = dict(sourceCommit=mapping['sourceCommit'], checks=len(checks),
              originalBytes=len(original), reconstructedBytes=len(rebuilt),
              originalSHA256=digest(original), reconstructedSHA256=digest(rebuilt),
              byteExact=original == rebuilt, productOrFormalTestCalls=0,
              largeReconstructedFileWritten=False)
with (out / 'verification/BYTE-RECONSTRUCTION.json').open('x', encoding='utf-8', newline='\n') as f:
    json.dump(result, f, indent=2)
    f.write('\n')
print(json.dumps(result), flush=True)
if not result['byteExact']:
    raise SystemExit(2)
