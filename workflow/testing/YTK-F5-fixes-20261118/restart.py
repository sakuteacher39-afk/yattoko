"""Check receipt loss and same-answer conflicts through the restore UI."""
import json
import os
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from resume import route,read

def launch(pw,profile):
    context=pw.chromium.launch_persistent_context(profile,executable_path=os.environ.get('YTK_CHROMIUM'))
    context.route('**/*',route)
    p=context.pages[0]
    p.goto('http://localhost/index.html')
    p.locator('#restore-file').wait_for()
    return context,p

def verify(p,data):
    p.locator('#restore-file').set_input_files({'name':'sample.json','mimeType':'application/json','buffer':data})
    p.locator('#restore-verify').click()
    expect(p.locator('#restore-status')).to_contain_text('復元前確認')

def restore(p):
    p.locator('#restore-ack').check()
    p.locator('#restore-commit').click()
    expect(p.locator('#reapply-review')).to_be_enabled()

def check(pw,profile,edit):
    c,p=launch(pw,profile)
    try:
        data=p.evaluate("""async()=>{
          const {createBackup}=await import('./src/backup.mjs');
          const {mutate,id}=await import('./src/canonical.mjs');
          const category=(categoryKey,value)=>({type:'category',categoryKey,field:'usageStatus',value});
          const base=mutate(null,category('device','using'),id('gen'));
          const artifact=await createBackup({read:async()=>base},{kind:'emergency',pending:[{base,operation:category('mail','using')}]});
          return new TextDecoder().decode(artifact.bytes);
        }""").encode()
        verify(p,data)
        restore(p)
        before=p.evaluate(read)
        if edit:
            other=c.new_page()
            other.goto('http://localhost/index.html')
            other.evaluate("""async()=>{const {openDatabase,CanonicalStore}=await import('./src/storage.mjs');const s=new CanonicalStore(await openDatabase());try{await s.save(await s.read(),{type:'category',categoryKey:'mail',field:'usageStatus',value:'using'})}finally{s.close()}}""")
            saved=p.evaluate(read)
            assert saved['globalRevision']==before['globalRevision']+1
            p.locator('#reapply-review').click()
            expect(p.locator('#restore-status')).to_contain_text('同じ回答がありますが')
            expect(p.locator('#reapply-commit')).to_be_disabled()
            assert p.evaluate(read)==saved
        else:saved=before
    finally:c.close()
    c,p=launch(pw,profile)
    try:
        verify(p,data)
        text=p.locator('#restore-status').inner_text()
        assert ('同じ回答がありますが' if edit else '適用済みか安全に確認できません') in text
        expect(p.locator('#reapply-commit')).to_be_disabled()
        assert p.evaluate(read)==saved
        return {'matchingAnswer':edit,'preview':text,'globalRevision':saved['globalRevision']}
    finally:c.close()

if __name__=='__main__':
    with sync_playwright() as pw:
        rows=[]
        for edit in (False,True):
            with tempfile.TemporaryDirectory() as profile:rows.append(check(pw,profile,edit))
        print(json.dumps(rows,ensure_ascii=False))
