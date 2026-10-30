import fs from 'node:fs';import path from 'node:path';import {base,subject,reference,json,put,sha} from './common.mjs';
const p=json(path.join(base,'PREEXECUTION.json')),a=json(path.join(base,'AUDIT.json')),d=json(path.join(base,'health/old-path/result.json')),h=json(path.join(base,'health/HEALTH-GATE.json')),dir=path.join(base,'runs',p.runId),result=json(path.join(dir,'result.json')),rows=Array.from({length:result.completedVariants},(_,i)=>{const f=path.join(dir,String(i+1).padStart(2,'0'),'observation.json'),r=json(f);return{...r,resultSHA256:sha(fs.readFileSync(f))};});fs.writeFileSync(path.join(base,'CAP14-RESULTS.csv'),['caseId,attempt,boundary,status,acceptedDirect,acceptedQueue,storedBytes,writesDirect,completeDirect,abortDirect,pendingQueue,resultSHA256',...rows.map(r=>[r.caseId,r.attempt,p.vectors[r.index-1].prospective.after,r.status,r.actualDirect?.accepted,r.actualQueue?.accepted,r.actualDirect?.capacityBytes,r.actualDirect?.writeRequests,r.actualDirect?.completeCount,r.actualDirect?.abortCount,r.actualQueue?.pendingCount,r.resultSHA256].join(','))].join('\n')+'\n',{flag:'wx'});
const oldErrorPhase=d.phases.find(x=>x.stage==='SAVE_EXCEPTION'),jsonErrorPhase=d.phases.find(x=>x.stage==='EVIDENCE_EXCEPTION');const text=`# F5第5バッチ CAP-14 是正・限定再試験

固定製品 \`${subject}\`。基準成果物 \`${reference}\`。専用ブランチ \`codex/f5-cap14-observer-correction\`。実行前固定commit \`${result.runnerCommit}\`。正式run \`${p.runId}\`、attempt ${p.attempt}、CAP-14のみ。

## 第1工程：observer是正と原因切り分け

旧adapterのobjectStore()は取得するたびにput/delete/clearを再wrapしていた。同じcached objectをN回取得すると同じ呼出しが重なり、観測件数はN(N+1)/2となる。新observerはtransactionごとのWeakSetで取得済みobjectを識別し、同じobjectは一度しかwrapしない。引数・戻り値をそのまま渡し、transaction内に非同期待機を追加しない。旧runner/evidenceは変更せず、新試験フォルダのみ変更。

感度試験：修正observerは1/2/3/20/1,000/19,996回の反復アクセスで実呼出し件数と一致。意図的な旧多重wrap陽性controlは2/3/20回で3/6/210件となり、validatorが不一致を検出。防止機構と検出器の両方を確認（health/sensitivity.json）。

旧observer断片を固定製品saveへ適用する診断では \`${d.saveError?.message}\`（${d.saveError?.name}）を採取。stackはold-path/result.jsonへ保存した。計測件数 ${d.observerEvents.toLocaleString('en-US')}、saveが失敗し、全4ストアは旧状態へabortされた。診断では記録メモリを抑えるためイベント本体を保持せず件数を数えたが、再wrap・呼出しchainは旧断片そのもの。製品ファイルを変更していない。

続いて同件数を根拠にしたイベント列の十分なprefix ${d.replay.count.toLocaleString('en-US')}件を独立にJSON化し、\`${d.serializationError?.message}\`（${d.serializationError?.name}、JSON.stringify）を再現。V8単一文字列上限${d.replay.maxStringLength.toLocaleString('en-US')}を超える記録量であり、旧証拠JSON.stringifyの失敗を説明できる。スタック超過時heapUsed=${oldErrorPhase?.heapUsed} / RSS=${oldErrorPhase?.rss} bytes、JSON例外時heapUsed=${jsonErrorPhase?.heapUsed} / RSS=${jsonErrorPhase?.rss} bytes。全段階のmemoryUsage、stack、記録件数をphases.jsonlに保存。3072MB heap制限の独立子processが正常終了し、OOMを握り潰していない。

ただし旧正式試行にはstackが残っていないため、その実行のthrow siteを遡及して確定はできない。旧イベント配列そのものを復元したわけでもない。この限界を保ったまま、observer経由のスタック超過と証拠直列化のInvalid string lengthの二経路を診断で確認した。

新証拠はストア別のbounded JSONとイベント単位JSONLへ分割し、巨大trace全体を一度にJSON.stringifyしない。例外のstack・段階・memory・件数を保存する。健全性比較ではobserverなし／ありそれぞれで同じ3境界の製品結果、全store hash、容量、成功/abortが一致。上限超過coordinatorも両条件でpending2件保持・後続save停止を確認（QUEUE-HEALTH-GATE）。これは第1工程の診断であり正式F5 PASSへ転記しない。

## 第2工程：正式限定再試験

health gate成立後にrunner/observer/fixture/oracle/環境/health証拠/対象hashを新commitへ固定。旧CAP-14のraw fixtureはbyte-identicalで再利用し、pure F2 modelとBuffer UTF8でprospective+7 bytesを独立再計算した。期待datasetは診断の実測から生成していない。Node ${p.runtime.nodeVersion}、${p.runtime.OS}、fake-indexeddb6.2.4、Node Web Crypto。実ブラウザーの認定ではない。

各境界で直接saveと実SaveCoordinatorを別DBで実行。容量超過時は操作1で停止し、操作2を実行しない。旧4ストア、generation/global/全record revision、pendingの操作値・base・順序、metaへのreceipt等の追加なし、write0、abort完了、未終了readwrite0を独立監査した。

|prospective UTF-8 bytes|期待|正式判定|direct受理|coordinator受理|pending|observation SHA-256|
|---:|---|---|---|---|---:|---|
${rows.map(r=>`|${p.vectors[r.index-1].prospective.after.toLocaleString('en-US')}|${p.vectors[r.index-1].accepted?'受理':'capacity拒否'}|${r.status}|${r.actualDirect?.accepted}|${r.actualQueue?.accepted}|${r.actualQueue?.pendingCount}|${r.resultSHA256}|`).join('\n')}

ケース判定：${result.status}、${result.completedVariants}/3 variant。停止理由：${JSON.stringify(result.stopped)}。新正式evidence manifest SHA-256：\`${a.evidenceManifestSHA256}\`。

## 整合性・累積台帳

固定対象${a.targetFiles}ファイル、旧対象/証拠${a.oldFiles}ファイル、依存${a.dependencies}ファイルの前後bytes/hash一致。旧tracked差分は新フォルダを除き空。旧CAP-14 NOT VERIFIABLEとRangeError、全ledger/fixture/runnerを保持。既存496ケースのレコードを変更せず、新CAP-14 proofを履歴へ追記した。全497件：${JSON.stringify(a.counts)}。外部通信/整理内容ログ試行：${result.sinkAttempts.length}。

## 残る不確実性・残り4件

旧正式RangeErrorの厳密なthrow siteは旧stack欠落により確定不能。新observerで今回の件数まで健全性を確認したが、無制限の入力・将来環境の保証ではない。計測有無で結果は一致したが、実行時間/メモリに影響がないという意味ではない。フェーズごとの実測のみ記録し、実ブラウザー/実quota/物理保存/画面保持/F6のPASSを付けない。

CAP-15・CAP-17・CAP-01・CAP-02はNOT RUN、未着手。是正基盤を利用する実施候補にはできるが、各原文・fixture・oracleの事前照合と別承認が必要で、今回の健全性だけで実施可/合格と認定しない。Gate5件は継続保留。

制作管理室へobserver差分・感度試験・例外経路・新attemptの独立レビューを依頼する。提出後停止。その他F5、F6、本番公開、mainマージ、R005凍結解除は実施しない。F5全体PASSは宣言しない。
`;fs.writeFileSync(path.join(base,'REPORT.md'),text,{flag:'wx'});const files=[];function walk(d,rel=''){for(const n of fs.readdirSync(d,{withFileTypes:true})){const r=rel?rel+'/'+n.name:n.name;if(n.isDirectory())walk(path.join(d,n.name),r);else if(r!=='ARTIFACT-MANIFEST.json'){const b=fs.readFileSync(path.join(d,n.name));files.push({path:r,bytes:b.length,sha256:sha(b)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{algorithm:'SHA-256',excludesSelf:true,files});process.stdout.write(JSON.stringify({files:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),manifestSHA256:sha(fs.readFileSync(path.join(base,'ARTIFACT-MANIFEST.json')))})+'\n');
