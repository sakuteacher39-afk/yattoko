# F5自動試験再開 第5バッチ：制作管理室提出

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。直近成果物：`cc8024643b0dd40bee4ca1b5c6cbccb1ef9d1788`。専用ブランチ：`codex/f5-auto-resume-batch5`。

実行前固定commit：`9583b3af5a4542f2e24b29458f8f3b82bc11d448`。run ID：`F5-AUTO-RESUME-B5-20261028-001`。Node v24.20.0 / Windows 11 Home / x64、fake-indexeddb6.2.4、Node Web Crypto。実ブラウザー、OS保存、native quota、F6は未実施。

## 対象・原文照合・独立oracle

省略候補は前回NEXTの20件（TXT-01〜13・16・17、CAP-14・15・17・01・02）へ照合。全件が現行製品NOT RUN、AUTO分類、Gate対象外。F2承認commit0d5dfa38の原文行・全文SHAをケースごとに固定。CASEBOOK/FIXTURES/VARIANT/FAULT catalog、normative manifest、Node executable、runner/helper・全入力・期待ファイル、製品と依存を実行前commitへ固定。

期待値はF2 §10/§11、明示Unicode入出力表、codepoint/UTF-16単位、Buffer UTF-8 byte数、raw payloadの独立SHA-256、F2 record/revision差分modelで生成。製品validatorで期待値を生成しない。全制御文字77種×前/中央/後×canonical/escaped入力×partial/completed。空白表はECMAScript trim対象を列挙、NFC結合・Hangul、NFKC互換文字、60/61単位、秘密情報に似たダミー語・数字形状と非該当control。秘密の実値は使わない。

F2の順序はNFC→trim→制御文字拒否。先頭/末尾のtab/LF等はtrim後に消えるためsave/draftの正常controlとして区別し、中央controlは拒否。未正規化importは修復しない。C0 JSONエスケープは実値へdecodeして検査し、C1/bidi等のraw/Unicode escapeを分離。無効名はbaseline生成後にraw snapshotへ挿入、当該値を残して署名し、再projectionしない。各入力のcodepoint・raw/canonical UTF16/UTF8・ファイルbytes/hashと期待値をPREEXECUTION/FIXTURE-CALIBRATIONへ記録。

完了した1,466 name variantでsave、raw load、normal backup、import、restore preflight、緊急confirmed pending、緊急draftを観測。失敗時全4ストアと入力不変、pending未収録件数/ordinal範囲、正規化後の収録名を照合。画面保持をNodeだけで認定するケースではなく、このバッチは文字列とデータ境界の要求に限定。CAPは9,999,999/10,000,000/10,000,001 bytes、超過write0、削除後容量減少、top/overview順を計画したが、CAP-14最初のcontrolでRangeError: Invalid string lengthとなりactualを保存できずNOT VERIFIABLE。CAP-14残2variantと後続4ケースは実行せず停止した。これらの容量・順序要件のPASSは付与しない。

## 正式結果

|case ID|判定|実施/計画variant|result SHA-256|
|---|---|---:|---|
|F2:TXT-01|PASS|122/122|5fbcb64edd71d0d812cf158be28d29bfac5c74bc92edbfc4d257e5259026e729|
|F2:TXT-02|PASS|16/16|7c81bcd88bafb6767cbf401fc24765c6975f146849d801f6681c45a8d0eb173b|
|F2:TXT-03|PASS|152/152|1ff3305083e7d6c50d029a06ac6fd6062ce7833c9644140312ccb4420cb73323|
|F2:TXT-04|PASS|56/56|e67de29a2aa968f28e00fe033b31ba609f86f9c81d1207af364184ab1ae3cf0a|
|F2:TXT-05|PASS|386/386|7206ba81d9d6578d0916542ba784e30e036758c8145cf9825020c0d8472ab243|
|F2:TXT-06|PASS|14/14|81c0da62b22e2a48495e08aca016ec302716897c6bda5da8bd86949584758f94|
|F2:TXT-07|PASS|386/386|fea6375331e1d4bb5e58592a89737f4167f6f9a2500140a73320b8caf289b931|
|F2:TXT-08|PASS|14/14|6e6d88c4a532c45eb29d3df2e52d0efd0218d4faa0e6f39eb5576d250ceb316f|
|F2:TXT-09|PASS|26/26|7eb81cafbd93088242e740f49b473529baa035cc56c120b27935c09d40b1d412|
|F2:TXT-10|PASS|62/62|b67f5af332a518b22e884ae391ffa55e7391b479b6b09b77b826615e19c89f62|
|F2:TXT-11|PASS|50/50|6f51aa0c331ddf6c20caba6d2c937ab89828365dff8b2176f6bf307a46565dec|
|F2:TXT-12|PASS|12/12|94bceba684a57d46927ce6524ba0a8fc2eaa1478ecb12c8f23f31fa7e576b5d9|
|F2:TXT-13|PASS|12/12|c42c78a35b0619f548ad164481cf8cd027a971e3f92c60a845407054e1f27db5|
|F2:TXT-16|PASS|128/128|8317c2c88721b4f117e84555d334dbb88c8741150eaf46da20895df001f36e52|
|F2:TXT-17|PASS|30/30|99b88245876cfc6ed24a3e125251da1ef22b4f1bd322ca801e73d69adcf48085|
|F2:CAP-14|NOT VERIFIABLE|1/3|a47c50d390eb97fed423b23cec450fc1e21d9279fd5b7a7bcbb264d849d6aee2|
|F2:CAP-15|NOT RUN|0/3||
|F2:CAP-17|NOT RUN|0/6||
|F2:CAP-01|NOT RUN|0/48||
|F2:CAP-02|NOT RUN|0/48||

今回：{"PASS":15,"NOT VERIFIABLE":1,"NOT RUN":4}、1467/1574 variants。停止理由：{"reason":"EVIDENCE_INCOMPLETE","caseId":"F2:CAP-14","variant":1}。

## 証拠・監査

実行証拠manifest SHA-256：`3435a59b30aafb80349a56568d55d94e310f3334db813f8c5d5d3e0821ce4d54`。各variantのobservation、入力/oracle、境界別store dump、transaction trace、緊急summaryとfile hashを保存。rawファイルの元入力はinputs/*.binのfileBase64から復元可能。STORE-AUDITは観測済み全store/省略範囲/失敗write0を独立再照合し、製品再実行なし。正式run/ledgerは追記、旧PASS/FAIL/NOT VERIFIABLEとfixture不備履歴を変更しない。

全製品3441ファイル、旧対象/証拠84684ファイル、依存1978ファイルの前後bytes/SHA一致。旧tracked差分は新バッチフォルダを除き空。外部通信・整理内容ログへの出力試行：0。新証拠のmanifestに全ファイルbytes/SHAを記録。

497件の累積：{"NOT RUN":331,"PASS":165,"NOT VERIFIABLE":1}。旧150PASSレコードは同一で保持し、今回runへコピーしない。残分類：{"AUTO_EXECUTABLE":239,"SPEC_APPLICABILITY_PENDING":5,"HUMAN_JUDGMENT_REQUIRED":22,"REAL_BROWSER_REQUIRED":65}。

## 未解決事項・次候補

Gate5件は未着手。displayCode適用判断、非ACTIVE registry別承認、native browser/人間確認は継続保留。計測observerが同一objectStoreを再wrapする不備を、固定observer断片とplain dummy transactionで独立再現した（20回putで計測210件）。HARNESS-DIAGNOSTIC.jsonを参照。正式RangeErrorのthrow siteはstack/partial dump不足で確定できず、製品不具合と断定しない。元runner・fixture・NOT VERIFIABLEを保持し、修正/正式再実行は未実施。文字列15件は境界ごとの値・全store不変・期待値を直接照合した結果であり、重複するwrite trace件数を合格根拠にしていない。STORE-AUDITはその1,466件を再照合。大規模write計測の感度校正を実行前に行わなかった点は試験基盤の未解決事項。

Node/fake-IDBの成功は実ブラウザー、永続性、実quota、OS物理保存、iPhone性能の証明ではない。secret-like正規表現は補助防御であり全秘密の検出を保証しない。

優先する次回候補（CAP-14は再試験、他4件は未実施。observer是正の独立レビュー、別指示、新attempt・実行前固定が必要）：F2:CAP-14、F2:CAP-15、F2:CAP-17、F2:CAP-01、F2:CAP-02。

制作管理室へ本成果物の独立レビューを依頼する。CAP-14証拠不足による停止時点で終了。F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は行わない。
