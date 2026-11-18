import csv, gzip, hashlib, json
from collections import Counter
from pathlib import Path
p=Path('.')
def sha(data): return hashlib.sha256(data).hexdigest()
def save(path,obj):
    data=(json.dumps(obj,ensure_ascii=False,separators=(',',':'))+'\n').encode()
    path.write_bytes(data)
    return sha(data)
def load(path):return json.loads(path.read_bytes())
cases=load(p/'categories.json')
prior_raw=gzip.decompress((p/'final.json.gz').read_bytes())
assert sha(prior_raw)==load(p/'audit.json')['results_sha256']
prior={r['caseId']:r for r in json.loads(prior_raw)}
fixture={v['id']:(v['bytes'],v['sha256']) for v in load(p/'FIXTURES.json')['fixtures']}
src='workflow/testing/YTK-F5-acceptance-20261118/'
subject='15a146a9b2c4f80c63798eb31d64b6774a4c2e99'
plan='dd056f159859c7ef74011162448d1f1ced3e3a49'
old=list(csv.DictReader((p/'F5-CUMULATIVE-497-AFTER.csv').open()))
assert len(old)==len({r['caseId'] for r in old})==497
assert Counter(r['status'] for r in old)=={'PASS':190,'NOT RUN':307}
assert {r['subjectCommit'] for r in old}=={subject}
keys='device base mail social cloud subscription finance commerce auth license carrier business'.split()
allowed=['F2:CAT-%02d'%n for n in [*range(1,18),19]]
assert list(cases)==allowed
assert (p/'pre.log').read_bytes()==(p/'post.log').read_bytes()
hashes={}
(p/'proofs').mkdir(exist_ok=True)
for i,id in enumerate(allowed):
    c=cases[id];v=c['variants']
    assert prior[id]['status']=='MATCH'
    assert {x['fixture'] for x in v}=={'DS-BASE','DS-MIX'}
    for x in v:
        d=x['fixtureDigest'];assert (d['bytes'],d['sha256'])==fixture[x['fixture']]
    if i<12:
        key=keys[i];letter=chr(65+i)
        assert prior[id]['expectation']==f'{letter}↔{key}'
        assert len(v)==6 and {(x['fixture'],x['input']['value']) for x in v}=={(f,value) for f in ['DS-BASE','DS-MIX'] for value in ['using','not_using','unknown']}
        assert c['map']==[[key,letter]]*2
        for x in v:
            assert x['stored']==x['exported']==x['restored']==x['expected']
            assert x['stored'][i]==[key,'cat_'+key,x['input']['value']]
            assert x['serviceCount']==(3 if x['fixture']=='DS-MIX' else 0)
    elif i<=14:
        assert len(v)==2 and all(x['expected']==x['actual']==keys for x in v)
    else:
        assert len(v)=={15:10,16:96,17:44}[i]
        assert all(x['before']==x['after'] and x['code'] for x in v)
        if i==16:assert len({(x['fixture'],x['key'],x['mutation'],x['signed']) for x in v})==96
    proof=dict(caseId=id,status='PASS',subjectCommit=subject,harnessCommit=plan,priorEvidenceCommit='f595259d58d56c217f828f54bc8057f92d6a446b',runId='F5-CAT-ACCEPT-20261118',environment='Linux / Node v24.22.3 / fake-indexeddb 6.2.4',expectation=prior[id]['expectation'],observation=c)
    f=p/'proofs'/(id.replace(':','-')+'.json');hashes[id]=(src+str(f),save(f,proof))
new=[]
for r in old:
    if r['caseId'] in hashes:
        assert r['status']=='NOT RUN'
        path,h=hashes[r['caseId']]
        r={**r,'status':'PASS','proofPath':path,'proofSHA256':h}
    new.append(r)
assert sum(a!=b for a,b in zip(old,new))==18
assert Counter(r['status'] for r in new)=={'PASS':208,'NOT RUN':289}
with (p/'F5-CUMULATIVE-497.csv').open('w') as f:
    w=csv.DictWriter(f,fieldnames=old[0],lineterminator='\n');w.writeheader();w.writerows(new)
res=load(p/'REMAINING-AND-NEXT.json')
remaining=[r for r in res['cases'] if r['caseId'] not in hashes]
assert {r['caseId'] for r in remaining}=={r['caseId'] for r in new if r['status']=='NOT RUN'}
save(p/'remaining.json',{'subjectCommit':subject,'counts':dict(Counter(r['group'] for r in remaining)),'cases':remaining})
print(dict(newPass=len(hashes),variants=sum(len(c['variants']) for c in cases.values()),counts=dict(Counter(r['status'] for r in new))))
