import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifyTarget,lock,sha} from './verify-target.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url)),json=p=>JSON.parse(readFileSync(path.join(dir,p),'utf8'));
const arg=name=>{const i=process.argv.indexOf(name);if(i<0)throw Error(name+' required');return process.argv[i+1];};
const target=verifyTarget(arg('--target')),fixtures=arg('--fixtures'),archive=readFileSync(arg('--archive'));
assert.equal(archive.length,lock.archive.bytes);assert.equal(sha(archive),lock.archive.sha256);
const book=json('CASEBOOK.json'),result=json('RESULTS-TEMPLATE.json'),catalog=json('FIXTURES.json'),faults=json('FAULT-CATALOG.json'),alignment=json('SOURCE-ALIGNMENT.json'),dev=json('DEVELOPMENT-TEST-INVENTORY.json');
const tracePath='workflow/prototypes/YTK-F4/F5-F6-TRACEABILITY.json',trace=JSON.parse(readFileSync(path.join(target,tracePath),'utf8'));
assert.equal(book.subjectCommit,lock.subjectCommit);assert.equal(book.traceabilitySHA256,sha(readFileSync(path.join(target,tracePath))));
assert.equal(book.cases.length,497);assert.equal(book.supplementalGates.length,10);assert.equal(trace.rows.filter(r=>r.phase==='F6').length,150);
assert.deepEqual(book.cases.map(c=>c.caseId).sort(),trace.rows.filter(r=>r.phase==='F5').map(r=>r.key).sort());
const fixtureIds=new Set(catalog.fixtures.map(f=>f.id)),faultIds=new Set(faults.faults.map(f=>f.id));
for(const c of book.cases){assert.equal(c.formalStatus,'NOT RUN');assert.equal(c.targetCommit,lock.subjectCommit);assert.ok(c.procedure.length>=4&&c.expectedResult&&c.passCriteria.length>=3&&c.evidence.length>=3,c.caseId);assert.ok(c.fixtureIds.every(id=>fixtureIds.has(id)),c.caseId+' fixture');assert.ok(c.faultIds.every(id=>faultIds.has(id)),c.caseId+' fault');const b=readFileSync(path.join(target,c.source.path));assert.equal(c.source.sha256,sha(b),c.caseId+' source');assert.ok(b.toString('utf8').split('\n')[c.source.line-1].includes(c.caseId.split(':')[1]),c.caseId+' source line');}
assert.equal(result.caseResults.length,507);assert.ok(result.caseResults.every(r=>r.status==='NOT RUN'&&r.actualEvidencePaths.length===0&&r.startedAt===null));assert.equal(result.startedAt,null);assert.equal(book.formalExecutionStarted,false);assert.equal(dev.count,111);assert.equal(dev.tests.length,111);assert.equal(dev.executionInPreparation,false);
assert.ok(alignment.approvalComparisons.every(c=>c.equal||c.approvedF3CoreUnchanged));
for(const f of catalog.fixtures){const b=readFileSync(path.join(fixtures,f.filename));assert.equal(b.length,f.bytes,f.id+' bytes');assert.equal(sha(b),f.sha256,f.id+' hash');assert.equal(f.formalStatus,'NOT RUN');if(f.id.startsWith('DS-BYTES-'))assert.equal(b.length,Number(f.id.slice(9)));if(f.id.startsWith('EM-PENDING-BYTES-'))assert.equal(Buffer.byteLength(JSON.stringify(JSON.parse(b).pending)),Number(f.id.slice(17)));if(f.id.startsWith('RAW-BYTES-'))assert.equal(b.length,Number(f.id.slice(10)));}
assert.equal(sha(readFileSync(path.join(fixtures,'DIGEST-01.json'))),'15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d');
console.log('PREPARATION CHECKS ONLY — no product modules imported, no formal test executed.');console.log('Target: '+lock.subjectCommit+' / '+lock.files.length+' exact files / ZIP hash match');console.log('Original F5 cases: 497, F6 excluded: 150, F4 supplemental gates: 10');console.log('All source lines/hashes, fixture/fault references, procedures and NOT RUN records consistent');console.log('Development test titles: 111 (inventory only, not rerun)');console.log('Independent fixtures: '+catalog.fixtures.length+' hashes/byte layers verified; DIGEST-01 known SHA match');console.log('Classification: '+JSON.stringify(book.classificationCounts));console.log('Formal verdict: NOT RUN / NOT STARTED');
