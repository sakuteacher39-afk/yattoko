# F5自動試験再開 第7バッチ

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。基準成果物：`707cf0e2909135b5a68aadc5e9555ab5fd796bd9`。専用ブランチcodex/f5-auto-resume-batch7。実行前commit：`1afcf834a69c21435849e72de9745232612edaf1`。run：`F5-AUTO-RESUME-B7-20261030-001`。

321 NOT RUNをcase IDで照合しAUTO229/browser65/human22/仕様Gate5を保持。全variant準備済み14ケースのみ選定。通常backupのpending混入防止、緊急依存componentの除外/独立部分保持、離散ordinal、deleteAll/restore pending禁止と容量区分を優先。原子的復元・base競合・1MB/16MB入力境界の専用ケースは未準備で今回は未実行。分類と理由はCLASSIFICATION-321.json。

承認F2/F3原文Git blob・行・hash、全fixture/oracle、環境/runner/製品hashを実行前固定。F2は全12categoryとpartial/completed混在2record、全R001 unansweredを含む正本。normalにempty/single/chain/partial/unsupported pendingとdraftを渡してもsnapshotだけを出力することを検証。emergencyはsingle/identity+3操作chain/各invalid位置/missing/独立partial/none/離散ordinal/unsupportedを原文に応じ展開。F2のREAD/SHA faultを別variantとし、fileなし・旧4storeと入力/queue不変を照合。画面表示やOS保存は認定しない。

BKP08は9,999,999 UTF8 bytes・19,996サービス正本とpending0/1/255/256/257操作を使用。正本10MBとwrapper/pendingを含む10MB超fileを区別。255/256は12categoryへ分散したno-opなし変更、257は全候補未収録。file16MB以下・pending1MB以下も実測するが、専用1MB/16MB境界試験のPASSへ転記せず、暫定値を変更しない。

独立oracleはmanifest、明示operation/context/base revision/依存ordinal/omitted範囲、Node SHA256とBuffer UTF8。製品validatorや実測から期待を生成しない。ランダムIDは形式・一意性を検査し、参照先を独立ordinalモデルで照合。全canonical raw/checksum/snapshot/content fingerprint/件数/未知fieldを再構成して比較。補助的に生成fileが固定importerでも受理され、独立に再署名した不許可pending fileが拒否されることも確認。importerはoracleにしない。DB readwrite0を要求。

observerはCAP14是正版とbyte-identical、1/20/19996反復で実呼出し数と記録数を事前校正。store別JSON、raw file、イベントJSONL、phase stack/memoryを保存。baseを257回JSON複製せず、明示shared snapshot recipeをメモリ展開し、operationと共有baseのhashを前後照合。大きなGit台帳にはprocess限定longpathsと256MB出力bufferを用意。Node v24.20.0 / Windows 11 Home / fake-indexeddb6.2.4 / Node Crypto。

|case|正式判定|実施/計画variant|result SHA256|
|---|---|---:|---|
|F2:BKP-01|PASS|432/432|865f2553443525f155762d5b9455f8a7e4b0b623fd545580548cb85f1d1243f4|
|F2:BKP-02|PASS|432/432|b64f94a768d74dcb0a9bb4f426c7e5c8f6e175152aeddcfe92b41530e5c9cd1e|
|F2:BKP-03|PASS|432/432|c66b958d1fabe99cba62bd62565d45ff22e26a4d4167d44d6da7d6fbf7366c35|
|F2:BKP-04|PASS|432/432|17c3451089ca0eb06ae4fb781c01ee56543529fb38a4ca704026c1aed5d3aa14|
|F2:BKP-05|PASS|936/936|9ac5ce71395b2a5f8478b9ed2d711d67fb7e768e2ca05885cc35fcb6d405a4bc|
|F2:BKP-06|PASS|936/936|2190ef9dfe8377f4e64737465009f135cd8ee5ff11b5636efa0566bab3d93b1d|
|F2:BKP-08|PASS|15/15|18ff53b279cdf76fcc59d8e74039f6c2ef67b38cf404609d7386d6d4e9b49ff7|
|F2:BKP-10|PASS|936/936|08d9c10114605492ad8e825e2e1c79734d0ebab6d6adf2cd7f43b5bcc47c25fb|
|F3:R01-01|PASS|24/24|99c6de99b4839fd206a6140639fd6e4e920f127f2cb1013dc7ebfe87eaa833dd|
|F3:R01-05|PASS|72/72|02167842199ee0d2021bd5af8238a89faffbe4935e28c5005be8a03e3abe4ad6|
|F3:R01-08|PASS|96/96|fb9397200d9baf37872ebaa902c3d976050e9d325afe20fe14a32c03c416d172|
|F3:R01-09|PASS|96/96|720c9e4886a0b07d57e87811a4a08f5b141a7638f958efd18cb306001981d9d6|
|F3:R01-10|PASS|96/96|0fb38a84901ec5d243c6bf57bc2cd36edbd39b7ac21d0a032db56f8645b96175|
|F3:R01-11|PASS|144/144|97644c5178d6c2248173c6c4769feb6afedb763d554555c4b94aa05fdd12d7e8|

合計5079/5079。停止：null。実行証拠manifest SHA256：`ce3d7ce5c9be9631c4737e55135fa616f1347f43beab4ab0196ef0b1bfa2ed2e`。5079variantを記録から独立再照合。期待したfault例外と想定外のphase/stackを区別して保存。

累積497件：{"NOT RUN":307,"PASS":190}。未選定483レコード不変、旧PASS/FAIL/NOT VERIFIABLE/ledger/fixture不備を保持。CAP14旧NOT VERIFIABLEも履歴に残る。製品3441・旧証拠126690・依存1978ファイルの前後bytes/hash一致、新folder外tracked差分なし。外部送信/log試行0。製品/schema/registry/承認仕様の変更なし。

実ブラウザー・実quota・物理保存・画面・F6は未検証。memoryはphase sampleで連続peakではない。原子的復元は今回未選定。次候補はREMAINING-AND-NEXT.jsonに記載し別指示/準備が必要。Gate5と他F5へ進まず、制作管理室の独立レビューを待ってcommit/push後停止。F5全体PASS、本番公開、mainマージ、R005凍結解除は宣言しない。
