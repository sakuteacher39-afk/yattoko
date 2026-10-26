# F5第3小バッチ FAIL2件 是正再試験結果

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。旧成果物：`6911ae0c7f8890610bc02e9a821ce30cd39b6ba8`。専用ブランチ：codex/f5-mini3-fail2-retest。実行前固定commit：`aae358da173a64957dbb907d9cf33bde07bc82af`。新run：`F5-M3-CORRECTION-20261026-001`、attempt2。

今回の正式判定は **F2:RST-06 PASS / F3:R04-05 PASS（全6 variant PASS）**。FAIL / NOT VERIFIABLE / NOT RUNはいずれも今回の対象2件内では0件。旧run F5-REG-M3-20261026-001の2 FAILと、受理済み18 PASS・全runner/fixture/ledger/証拠はそのまま保持した。18件を再実行・再判定・新runへ移植していない。

| ケース | variant | 新attempt判定 | 実測 |
| --- | --- | --- | --- |
| F2:RST-06 | prospective-9999999 | PASS | 保存後canonical 9999999 bytesで保存完了 |
| F2:RST-06 | prospective-10000000 | PASS | 保存後canonical 10000000 bytesで保存完了 |
| F2:RST-06 | prospective-10000001 | PASS | capacity拒否、旧4ストア維持、receipt0、remaining1、readwrite0 |
| F3:R04-05 | pending-255 | PASS | strict importとpreview受理、旧ストア不変 |
| F3:R04-05 | pending-256 | PASS | strict importとpreview受理、旧ストア不変 |
| F3:R04-05 | pending-257 | PASS | parse0・SHA0で拒否、旧ストア不変 |

## 是正内容と独立oracle

承認済みF2試験計画原文227行のRST-06「pending再適用で10MB超なら保存拒否」と、F3試験計画原文233行のR04-05「pending 255 / 256 / 257 operations」を照合し、原文ファイルhash・行・期待の差分をSOURCE-RECONCILIATION.jsonへ固定した。根拠のないsaveCalls1という期待を除去した。save呼出し回数は診断値として記録し、その回数を合否条件にしていない。

F2は独立に新service recordを構成し、追加後canonical容量9,999,999 / 10,000,000 / 10,000,001 bytesとなるよう、保存前snapshotをそれぞれ9,999,664 / 9,999,665 / 9,999,666 bytesで生成した。すべて保存前10MB以内、raw16MB以内、pending1MB以内。有効ID・名前・回答とcanonical raw/checksumを事前照合した。容量内2件は実際の保存結果を独立将来datasetと同期照合し、容量超過1件はapply前後の全4ストア比較、receipt0、元operation IDのremaining保持、readwrite open0を要求・観測した。旧データの比較基準はsnapshot復元完了後かつpending手動再適用直前の4ストアである。

F3 generatorは各categoryの実際の操作前値と異なる値を選ぶ。generator/reducerと別のcheckerが全768操作を追跡し、ID形式・一意性、連続ordinal、category footprintに基づく全先行依存、snapshot基準のbase revision、現在値に基づくcanonical context、no-op0を確認した。traceはoracles/とPREEXECUTION.jsonに保存した。255/256/257操作fixtureのpendingサイズは233,524 / 234,894 / 236,262 bytesで、いずれも1MB以内。他のraw/snapshot容量条件も満たす。257操作は件数上限だけに抵触するfixtureとして固定した。255/256はverified tokenとpreviewの完全受理、257はfull JSON.parse前・digest前拒否を観測した。

入力fixture raw bytes/hash、全期待・独立oracle・runner/helper hashは実行前commitに固定した。製品validatorを期待値生成に使用していない。製品・承認済み仕様・試験計画は変更していない。

## 環境・証拠・監査

Node v24.20.0、fake-indexeddb 6.2.4。実行環境と依存ファイルhashはPREEXECUTION.jsonおよびrun内environment.json。各variantのinput SHA-256、期待・実測・判定はobservation.jsonに、全ストア・session/receipt・transaction traceは同じcaseフォルダーに記録した。新ledgerは新run専用の追記記録で、旧ledgerを更新していない。

EVIDENCE-MANIFEST.jsonの38証拠ファイルについて全bytes/SHA-256を再照合した。監査では全6variantの入力hash・独立oracle・期待と実測を再照合し、容量超過時のraw4ストア完全一致とreadwrite無しも再確認した。POSTRUN-AUDIT.jsonを参照。監査は追加製品ケースを実行していない。

固定対象全3,441ファイルと旧成果物に含まれる過去履歴20,066ファイルのbytes/hashは試験前後で一致。旧2 FAILと18 PASSも明示的に照合した。依存ファイルの前後一致、raw入力不変、監視対象sinkへの外部通信・console出力試行0件を確認した。変更は新試験フォルダーのみ。全成果物のbytes/hashはARTIFACT-MANIFEST.json（自分自身を除く）。

## 残件・制約・停止

今回対象2件は新attemptでPASS。旧FAILは履歴として維持する。残る回帰36件はNOT RUNのまま、その他F5・F6も未実施。開発テスト結果を正式PASSへ転記していない。

本結果はNode/fake-indexeddbでの検証であり、実ブラウザー、実quota、物理ファイル保存、電源断時の永続性、iPhone Safari性能の証明ではない。暫定raw16MB・pending1MB・256操作の仕様値は変更していない。製品コード・schema・registryは変更していない。

制作管理室へ独立レビューを依頼し、対象2件の是正再試験・監査完了により停止する。新たな製品不具合は本runでは観測していないが、F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は宣言・実施しない。
