"""Reconcile measured results with the locked target IDs and inspect category evidence."""
import collections
import csv
import hashlib
import json
from pathlib import Path
root = Path(__file__).resolve().parent
read = lambda name: json.loads((root / name).read_text())
results = read('final.json')
target = read('ids.json')
assert len(set(target)) == len(target) == len(results) == 215
assert [r['caseId'] for r in results] == target
counts = collections.Counter(r['status'] for r in results)
keys = 'device base mail social cloud subscription finance commerce auth license carrier business'.split()
for i, key in enumerate(keys):
    case = results[i]
    assert case['caseId'] == f'F2:CAT-{i + 1:02d}'
    variants = case['observation']['variants']
    assert {(v['layout'], v['input']['value']) for v in variants} == {
        (layout, value) for layout in ('base', 'mixed') for value in ('using', 'not_using', 'unknown')}
    assert len(variants) == 6
    for v in variants:
        assert v['letter'] == chr(65 + i)
        assert v['input']['categoryKey'] == v['category']['categoryKey'] == key
        assert v['category']['recordId'] == 'cat_' + key
        assert v['category']['usageStatus'] == v['input']['value']
        assert v['sourceGeneration'] != v['restoredGeneration']
assert (root/'before.log').read_bytes() == (root/'after.log').read_bytes()
assert len((root/'before.log').read_text().splitlines()) == 36
assert all(line.endswith(': OK') for line in (root/'before.log').read_text().splitlines())
with (root/'cases.csv').open('w') as out:
    writer = csv.writer(out)
    writer.writerow(['case_id','plan_expectation','assertion_result','assertions_recorded','review','details'])
    for i,r in enumerate(results):
        review = 'category evidence independently reconciled' if i < 12 else 'formal coverage to reconcile'
        details = r.get('error') or (r.get('observation') or {}).get('limitation','')
        writer.writerow([r['caseId'],r['expectation'],r['status'],len(r['assertions']),review,details])
print(json.dumps({'unique_cases':len(results),'outcomes':dict(counts),'category_variants_verified':72,'source_files_unchanged':36,'results_sha256':hashlib.sha256((root/'final.json').read_bytes()).hexdigest()},indent=2))
