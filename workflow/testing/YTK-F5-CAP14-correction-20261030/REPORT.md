# F5第5バッチ CAP-14 是正・限定再試験

固定製品 `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。基準成果物 `8cddda3f34bbc856eae0eeaf75dd9b634ebb7d08`。専用ブランチ `codex/f5-cap14-observer-correction`。実行前固定commit `a9c3c0a9147662728ca40eb32131a9c80d46f638`。正式run `F5-CAP14-20261030-002`、attempt 2、CAP-14のみ。

## 第1工程：observer是正と原因切り分け

旧adapterのobjectStore()は取得するたびにput/delete/clearを再wrapしていた。同じcached objectをN回取得すると同じ呼出しが重なり、観測件数はN(N+1)/2となる。新observerはtransactionごとのWeakSetで取得済みobjectを識別し、同じobjectは一度しかwrapしない。引数・戻り値をそのまま渡し、transaction内に非同期待機を追加しない。旧runner/evidenceは変更せず、新試験フォルダのみ変更。

感度試験：修正observerは1/2/3/20/1,000/19,996回の反復アクセスで実呼出し件数と一致。意図的な旧多重wrap陽性controlは2/3/20回で3/6/210件となり、validatorが不一致を検出。防止機構と検出器の両方を確認（health/sensitivity.json）。

旧observer断片を固定製品saveへ適用する診断では `Maximum call stack size exceeded`（RangeError）を採取。stackはold-path/result.jsonへ保存した。計測件数 39,449,500、saveが失敗し、全4ストアは旧状態へabortされた。診断では記録メモリを抑えるためイベント本体を保持せず件数を数えたが、再wrap・呼出しchainは旧断片そのもの。製品ファイルを変更していない。

続いて同件数を根拠にしたイベント列の十分なprefix 7,456,542件を独立にJSON化し、`Invalid string length`（RangeError、JSON.stringify）を再現。V8単一文字列上限536,870,888を超える記録量であり、旧証拠JSON.stringifyの失敗を説明できる。スタック超過時heapUsed=128355440 / RSS=337768448 bytes、JSON例外時heapUsed=223172128 / RSS=398438400 bytes。全段階のmemoryUsage、stack、記録件数をphases.jsonlに保存。3072MB heap制限の独立子processが正常終了し、OOMを握り潰していない。

ただし旧正式試行にはstackが残っていないため、その実行のthrow siteを遡及して確定はできない。旧イベント配列そのものを復元したわけでもない。この限界を保ったまま、observer経由のスタック超過と証拠直列化のInvalid string lengthの二経路を診断で確認した。

新証拠はストア別のbounded JSONとイベント単位JSONLへ分割し、巨大trace全体を一度にJSON.stringifyしない。例外のstack・段階・memory・件数を保存する。健全性比較ではobserverなし／ありそれぞれで同じ3境界の製品結果、全store hash、容量、成功/abortが一致。上限超過coordinatorも両条件でpending2件保持・後続save停止を確認（QUEUE-HEALTH-GATE）。これは第1工程の診断であり正式F5 PASSへ転記しない。

## 第2工程：正式限定再試験

health gate成立後にrunner/observer/fixture/oracle/環境/health証拠/対象hashを新commitへ固定。旧CAP-14のraw fixtureはbyte-identicalで再利用し、pure F2 modelとBuffer UTF8でprospective+7 bytesを独立再計算した。期待datasetは診断の実測から生成していない。Node v24.20.0、Windows 11 Home、fake-indexeddb6.2.4、Node Web Crypto。実ブラウザーの認定ではない。

各境界で直接saveと実SaveCoordinatorを別DBで実行。容量超過時は操作1で停止し、操作2を実行しない。旧4ストア、generation/global/全record revision、pendingの操作値・base・順序、metaへのreceipt等の追加なし、write0、abort完了、未終了readwrite0を独立監査した。

|prospective UTF-8 bytes|期待|正式判定|direct受理|coordinator受理|pending|observation SHA-256|
|---:|---|---|---|---|---:|---|
|9,999,999|受理|PASS|true|true|0|94751f3aa7f59026465c1b27b87ddf828b40a37e9a90aafd91ce0ff571603380|
|10,000,000|受理|PASS|true|true|0|54c4fb2cb9144af0e4872ca0720f0efcc7e8e51cf1489dd97a835c6ecf060844|
|10,000,001|capacity拒否|PASS|false|false|2|5110c4a15073e6db514a49c826f2017c684e9d31743bdf721a3691c975028946|

ケース判定：PASS、3/3 variant。停止理由：null。新正式evidence manifest SHA-256：`32e7b3167c01d2e83917c8fb05739f91b8ee02f18d4310b06614a63a9f56a8ea`。

## 整合性・累積台帳

固定対象3441ファイル、旧対象/証拠89288ファイル、依存1978ファイルの前後bytes/hash一致。旧tracked差分は新フォルダを除き空。旧CAP-14 NOT VERIFIABLEとRangeError、全ledger/fixture/runnerを保持。既存496ケースのレコードを変更せず、新CAP-14 proofを履歴へ追記した。全497件：{"NOT RUN":331,"PASS":166}。外部通信/整理内容ログ試行：0。

## 残る不確実性・残り4件

旧正式RangeErrorの厳密なthrow siteは旧stack欠落により確定不能。新observerで今回の件数まで健全性を確認したが、無制限の入力・将来環境の保証ではない。計測有無で結果は一致したが、実行時間/メモリに影響がないという意味ではない。フェーズごとの実測のみ記録し、実ブラウザー/実quota/物理保存/画面保持/F6のPASSを付けない。

CAP-15・CAP-17・CAP-01・CAP-02はNOT RUN、未着手。是正基盤を利用する実施候補にはできるが、各原文・fixture・oracleの事前照合と別承認が必要で、今回の健全性だけで実施可/合格と認定しない。Gate5件は継続保留。

制作管理室へobserver差分・感度試験・例外経路・新attemptの独立レビューを依頼する。提出後停止。その他F5、F6、本番公開、mainマージ、R005凍結解除は実施しない。F5全体PASSは宣言しない。
