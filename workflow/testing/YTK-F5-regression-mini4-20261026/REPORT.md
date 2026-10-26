# F5回帰試験 第4小バッチ 停止・監査報告

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。最新是正成果物：`545ca3ba876a4bcc8854c426153737b32d9a4eb5`。専用ブランチ：codex/f5-regression-mini-batch4。実行前固定commit：`864a315d8e381e019c6794a3f5d08d9b31d12dae`。run：`F5-REG-M4-20261026-001`。

**F3:R07-06の2番目のvariantで不一致を検出し、直ちに実行停止した。結果は選定20ケース内で8 PASS / 1 FAIL / 11 NOT RUN / 0 NOT VERIFIABLE。製品・runner・fixtureの修正や再試験は行っていない。**

## ケース別正式判定

| ケースID | 判定 | 実施variant / 計画variant |
| --- | --- | ---: |
| F3:R04-01 | PASS | 3 / 3 |
| F3:R04-02 | PASS | 3 / 3 |
| F3:R04-15 | PASS | 16 / 16 |
| F3:R01-02 | PASS | 4 / 4 |
| F2:RST-01 | PASS | 4 / 4 |
| F2:RST-03 | PASS | 4 / 4 |
| F3:R07-03 | PASS | 216 / 216 |
| F3:R07-04 | PASS | 48 / 48 |
| F3:R07-06 | FAIL | 2 / 48 |
| F3:R07-07 | NOT RUN | 0 / 14 |
| F3:R07-08 | NOT RUN | 0 / 6 |
| F3:R07-13 | NOT RUN | 0 / 57 |
| F3:R07-14 | NOT RUN | 0 / 26 |
| F3:R02-08 | NOT RUN | 0 / 32 |
| F3:R02-09 | NOT RUN | 0 / 384 |
| F3:R02-10 | NOT RUN | 0 / 16 |
| F3:R02-13 | NOT RUN | 0 / 54 |
| F3:R02-25 | NOT RUN | 0 / 76 |
| F3:R02-30 | NOT RUN | 0 / 4 |
| F3:R02-39 | NOT RUN | 0 / 2 |

全1,017 variantを実行前に固定し、停止までに300 variant（299 PASS / 1 FAIL）を実施。残り717 variantは未実施（FAILケース内46 + 後続11ケース671）。後続ケースをPASSに推測していない。

## 停止原因と未解決事項

F3:R07-06のnormal-no-unansweredは、parent billing=no・inactive child billingSource=unansweredを含む不正fileの拒否を期待した。しかし固定入力のanswersは実際にはbilling=noのみで、billingSourceが存在しなかった。conditional()がchildを追加した後、envelope()から呼ぶ独立canonicalSnapshot()がinactive fieldを除外してしまっていた。準備のchecksum/raw整合確認だけでは、意図した不正fieldが消えたことを検出できなかった。

製品はこの有効なchild無しfileを受理し、previewまで進んだ。旧4ストアは完全維持され、readwriteは0。期待accepted=falseに対する実測trueでFAILを保持する。fixture生成不備が根拠であり、製品のinactive child拒否不具合を確認したものではない。一方、本ケースの検証要求を満たしたとも認定しない。原入力、期待値、oracle、runner、FAIL、ledgerを凍結したまま残す。

該当証拠：runs/F5-REG-M4-20261026-001/cases/F3-R07-06/0002.observation.json。入力SHA-256：254f3897ae1340fa6b593ffcffdb788a09261cb7495587fbe4eeee09cba67851。詳細・根拠はFAIL-ANALYSIS.json。

次工程の提案は、制作管理室による確認後、別途承認された新attemptでのみ、canonical baseline生成後にinactive childをraw envelopeへ挿入し、再projectionせず署名すること。全48 variantに対して親inactive・child存在・値保持を独立assertして事前固定する。本作業では提案のみで、修正・再実行していない。

## 実施した範囲と独立oracle

過去の20 PASS + 18 PASS + 是正2 PASSをcase IDと結果ファイルhashで照合し、重複なし40件を除外。統合76件から残る36件 = Node候補29件 + ブラウザー/人間必須7件を確認した。安全性順に20件を選定し、由来・未選定16件・既受理40件の結果参照をSCOPE-MATRIX.jsonへ固定した。過去PASSを本runへコピーしていない。

raw15,999,999 / 16,000,000 bytesの4 padded JSONでread/full parse到達とSHA前canonical拒否を確認した。短い正常controlも各1件実施。低位raw gate通過であり、16MBの有効backup完全受理を認定していない。resource errorはread/parse/digest各段階へ5種類ずつ注入し、アプリ10MB超と誤分類しないことと旧保存不変を確認した。これはNode API分類の証拠で、実resource/ブラウザーUI認定ではない。

service作成→usage→answerの3操作を実createBackupでcaptureし、独立に先行依存・ordinal順・context・元pending不変を照合した（captureの入力snapshotは明示したdummy read providerから供給）。不正な前方依存・自己参照・逆順も拒否を確認した。通常/緊急fileのpartial/completed・回答保持、復元後fresh generationとglobalRevision1を、実CanonicalStore/atomic restoreと独立datasetで比較した。

R07は全12カテゴリ×初回回答3値×intention5値の180 saveと、不正なanswered usage + unanswered intention36件を検証。R08は全12カテゴリ×completed usage4値の48件を検証。独立reducerの全canonical結果、revision、元の意向保持と一致した。

元fixture8件はカタログのbytes/hashと一致。全派生raw・期待・独立oracle・source/fixture/fault参照・runner/helper hashは実行前PREEXECUTION.jsonに固定した。製品validatorを期待値生成に使用していない。準備時のsyntax修正とpositive ID controlの配列順不備もPREPARATION-HISTORY.jsonに残した。停止後は製品コードを呼ばず証拠監査だけを実施した。

## 証拠と保全監査

Node v24.20.0 / fake-indexeddb6.2.4。環境・依存全ファイルhashはPREEXECUTION.jsonおよびenvironment.json。各variantの期待・実測・独立oracle・input hash・判定、全ストアbefore/after、transaction trace、SHA入力、restore/save/captureの結果を新run内へ保存した。ledger.jsonlは本run専用の追記記録。EVIDENCE-MANIFEST.jsonの1,921証拠ファイルについてbytes/SHA-256を全件再照合した。

POSTRUN-AUDIT.jsonで300実施variantのinput/hash/oracle/期待・実測を再照合し、8 PASSの全要求を再監査した。不許可操作で旧4ストア完全一致・readwrite無し、R07 saveおよびrestore全内容の独立期待一致も確認した。

固定対象3,441ファイル、過去履歴20,131ファイル、依存ファイルは試験前後のbytes/hash一致。既受理40件の結果参照とhashも再確認した。過去FAIL・是正・fixture不備・ledger・runnerは変更していない。監視対象sinkへの通信/console出力試行0件。製品、schema、registry、承認済み仕様・試験計画、mainは変更していない。変更は新規workflow/testing/YTK-F5-regression-mini4-20261026/だけである。全変更ファイルはCHANGED-FILES.txt、全成果物のbytes/hashはARTIFACT-MANIFEST.json（自己除外）に記録した。

## 残件・制約・提出

開始時36件の現状は8 PASS / 1 FAIL / 27 NOT RUN、未合格・未実証は28件。未実施27件 = 選定済み後続11 + 未選定Node9 + ブラウザー/人間7。CASE-STATUS.jsonは今回runのみの状態で、既受理40件は別の過去履歴として保持する。

未実施ID：F2:RST-15、F3:R03-18、F3:R04-11、F3:R04-12、F3:R04-13、F3:R06-09、F3:R06-10、F3:R07-01、F3:R07-02、F3:R07-05、F3:R07-07、F3:R07-08、F3:R07-09、F3:R07-10、F3:R07-11、F3:R07-12、F3:R07-13、F3:R07-14、F3:R02-08、F3:R02-09、F3:R02-10、F3:R02-13、F3:R02-25、F3:R02-30、F3:R02-31、F3:R02-36、F3:R02-39。

fake-indexeddbの結果は実ブラウザーの安全性、物理保存、実quota、iPhone Safari性能を証明しない。raw16MB・pending1MB・256操作の暫定値は変更していない。開発テストを正式PASSへ転記していない。

制作管理室へ本停止結果・fixture不備・8 PASS・保全監査の独立レビューを依頼する。第4小バッチの実行停止後、監査・commit・pushを提出して停止する。他F5、F6、本番公開、mainマージ、R005凍結解除には進んでいない。F5全体PASSも宣言しない。
