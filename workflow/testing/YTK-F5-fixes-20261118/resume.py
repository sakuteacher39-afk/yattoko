"""Run from any directory with Python Playwright and an installed Chromium."""
import json
import os
import re
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

product = Path(__file__).resolve().parents[2] / 'prototypes/YTK-F4'
read = """async()=>{const {openDatabase,CanonicalStore}=await import('./src/storage.mjs');
const s=new CanonicalStore(await openDatabase());try{return await s.read()}finally{s.close()}}"""

def route(request):
    url = urlparse(request.request.url)
    path = (product / url.path.lstrip('/')).resolve()
    if url.netloc == 'localhost' and path.is_relative_to(product) and (path == product/'index.html' or path.parent == product/'src' and path.suffix == '.mjs'):
        request.fulfill(body=path.read_bytes(), content_type='text/html' if path.suffix == '.html' else 'text/javascript')
    else:
        request.abort()

def exercise(browser, category, other):
    ctx = browser.new_context(viewport={'width':390,'height':844})
    try:
        ctx.route('**/*', route)
        page = ctx.new_page()
        def button(name): return page.get_by_role('button', name=name, exact=True)
        def click(name): button(name).click()
        def db(): return page.evaluate(read)
        def select():
            click('詳しく整理する')
            click('カテゴリを選ぶ')
            click('このカテゴリを整理')
            if other:
                click('その他')
                page.locator('input[type=text]').fill(' 同名のサービス ')
                click('利用状態へ')
            else:
                page.locator('.r2-service-grid button').first.click()
        def results():
            click('整理をはじめる')
            for label in ('次へ','次へ','次へ','結果を見る'): click(label)
        page.goto('http://localhost/index.html')
        click('整理をはじめる')
        page.locator('.card').nth(category).get_by_text('使っている',exact=True).click()
        page.wait_for_selector('.choice.on')
        for label in ('次へ','次へ','次へ','結果を見る'): click(label)
        select()
        expect(button('必要なことだけ確認')).to_be_disabled()
        original = db()
        assert len(original['services']) == 1
        rid = original['services'][0]['recordId']
        page.reload()
        click('保存した記録を見る')
        row = page.locator('.r2-row')
        expect(row.get_by_text('途中',exact=True)).to_be_visible()
        click('詳細を見る / 修正')
        assert original == db()
        page.reload()
        results()
        select()
        click('この記録を再開')
        assert original == db()
        click('休眠・停止中')
        expect(page.locator('.choice.on')).to_have_text('休眠・停止中')
        changed = db()
        assert len(changed['services']) == 1 and changed['services'][0]['recordId'] == rid
        assert changed['services'][0]['revision'] == original['services'][0]['revision']+1
        click('いったん詳細整理を終わる')
        select()
        click('別の1件として追加')
        expect(button('必要なことだけ確認')).to_be_disabled()
        second = db()
        other_id, = {s['recordId'] for s in second['services']} - {rid}
        assert len(second['services']) == 2
        click('いったん詳細整理を終わる')
        select()
        expect(page.get_by_role('button',name=re.compile('件目を再開（休眠・停止中'))).to_be_visible()
        page.get_by_role('button',name=re.compile('件目を再開（未回答')).click()
        assert db()==second
        click('休眠・停止中')
        expect(page.locator('.choice.on')).to_have_text('休眠・停止中')
        click('必要なことだけ確認')
        if button('次の質問').count(): click('次の質問')
        click('本人の意向へ')
        click('この1件を整理完了')
        click('一覧を見る')
        saved = db()
        assert {s['recordId']:s['recordState'] for s in saved['services']} == {rid:'partial',other_id:'completed'}
        page.reload()
        click('保存した記録を見る')
        expect(page.locator('.r2-row')).to_have_count(2)
        for label in ('途中','完了'):
            expect(page.locator('.r2-row').get_by_text(label,exact=True)).to_have_count(1)
        assert db()==saved
        return {'categoryIndex':category,'other':other,'resumed':rid,'new':other_id,'revision':saved['globalRevision']}
    finally:
        ctx.close()

if __name__ == '__main__':
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=os.environ.get('YTK_CHROMIUM'))
        rows = [exercise(browser,i,other) for i in range(12) for other in (False,True)]
        print(json.dumps({'browser':browser.version,'variants':rows},ensure_ascii=False))
        browser.close()
