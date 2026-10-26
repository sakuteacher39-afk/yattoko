# F5第4小バッチ 残件実行・監査報告

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。最新是正成果物：`dc84c49afc4aa4ef4502e4a37586ce5a85bc69e4`。専用ブランチ：codex/f5-mini4-remaining。実行前固定commit：`91a9f720be1a741c68c62e6548be86f3dea6771d`。run：`F5-M4-REMAINING-20261026-001`。

**選定20ケース・全804 variantを実行。正式ケース判定は19 PASS / 0 FAIL / 1 NOT VERIFIABLE / 0 NOT RUN（今回対象内）。variant判定は802 PASS / 2 NOT VERIFIABLE。** 不一致は検出されず、停止条件による中途停止はなかった。R04-13は証拠不足を事前規則どおり保持し、PASSへ昇格していない。

## ケース別結果

| ケースID | 正式判定 | 実施variant数 |
| --- | --- | ---: |
| F3:R07-07 | PASS | 14 |
| F3:R07-08 | PASS | 6 |
| F3:R07-13 | PASS | 57 |
| F3:R07-14 | PASS | 26 |
| F3:R02-08 | PASS | 32 |
| F3:R02-09 | PASS | 384 |
| F3:R02-10 | PASS | 16 |
| F3:R02-13 | PASS | 54 |
| F3:R02-25 | PASS | 76 |
| F3:R02-30 | PASS | 4 |
| F3:R02-39 | PASS | 2 |
| F3:R07-01 | PASS | 13 |
| F3:R07-02 | PASS | 24 |
| F3:R07-10 | PASS | 69 |
| F3:R07-11 | PASS | 6 |
| F3:R07-12 | PASS | 9 |
| F3:R02-31 | PASS | 4 |
| F3:R02-36 | PASS | 2 |
| F3:R04-11 | PASS | 3 |
| F3:R04-13 | NOT VERIFIABLE | 3 |

前回停止後の未実施11ケースを先頭で実行し、全11ケースPASS。残りNode候補9ケースを加えた20件である。受理済み49件（20+18+是正2+第4小バッチ8+R07-06是正1）をcase ID・過去結果ファイルhashで照合し、重複なし49件を統合76件から除外した。未実施27件はNode候補20件＋ブラウザー/人間必須7件と一致した。SCOPE-MATRIX.jsonに由来と照合結果を保持する。過去PASSを今回のrunにコピーしていない。

## fixture・独立oracleの事前確認

全variantを最終raw JSONから独立検証した。invalid ID/version/pair、未知のown field、nested object/array answer、root/category order、escapeの各不正条件が入力に残ることを直接assertした。active conditional unansweredはparent=yes・child own field実在・値unansweredを確認。正規controlは独立canonical raw/checksum一致、canonical拒否vectorはJSON-valid・checksum一致・canonical raw相違を分けて確認した。checksum再生成攻撃でもunknown fieldを除去していない。

source・case別全fixture/期待値/oracle・raw bytes/SHA-256・runner/helper hash・環境を実行前commitへ固定した。生成過程の不正条件消失を防ぐため、製品のvalidatorを期待値生成には使用していない。root key orderとcategory orderを取り違えた準備checkerの不備を実行前に検出・修正し、PREPARATION-HISTORY.jsonと既生成draft入力hashを保持した。正式実行中には製品・fixture・runnerを修正していない。

## 実施内容と制約

canonical JSONのroot順序、SP/tab/LF/CRの構造位置、unicode/slash escape、未知field・nested answer object・checksum一致の不正fileについて、原文固有の拒否条件と独立oracleを照合した。canonical raw拒否についてはfull parse通過とdigest0を記録し、別のgateによる拒否をcanonical検証の成功と混同していない。registry/manifestの12カテゴリ・順序、unknown version/未登録pair、UUID文法、manifestから独立生成した正常fileのpreview受理を検証した。正常/緊急snapshotおよびprospective restoreのcanonical容量は独立serializerと実export/restoreを比較した。

R04-11は実CanonicalStoreの最初の保存へQuotaExceededErrorを注入し、実SaveCoordinatorに257/512/256操作をqueueした。停止・全pending保持・旧4ストア不変を確認後、実createBackupと実backup UIをNode/jsdomで動かした。257/512件はPENDING_COUNT_LIMIT、256件の同一overview footprintは依存ID配列だけで1MBを超えるためPENDING_BYTES_LIMITとなり、全候補none capture・未収録件数N・範囲1〜N・概要scopeが表示された。画面のdummy未保存入力とpendingは保持され、物理保存要求は0件。これは注入したQuota例外とNode DOMの試験であり、実quotaや実ブラウザーの証明ではない。

## NOT VERIFIABLEの根拠

F3:R04-13のraw16MB vector2件では、whole-input parse1回、scalar token parse、heap値、固定scanner source hashを採取した。しかし、これらだけでは一時的な第二の巨大AST allocationを排除できない。独立allocation graphを取得していないため、事前の必須証拠条件が満たせずケースをNOT VERIFIABLEとした。正常control1件のPASSをケース全体のPASSへ拡大していない。実測と期待の不一致ではなく、証拠不足である。

詳細はEVIDENCE-GAPS.jsonとcase内allocation-observations.json。次工程への提案は、別承認の準備でallocation timeline/heap計測と「第二ASTを意図的に作る検知感度control」を独立oracleに結び付け、固定製品を変更せず新attemptを設計すること。本作業では追加計測・再試験・結果の昇格は行わない。

## 証拠監査・保全

Node v24.20.0 / fake-indexeddb6.2.4 / jsdom30.1.2。依存node_modules全1,978ファイルを環境に固定した。run内のobservation.jsonに期待・実測・独立oracle・input hash・判定、全ストアbefore/after・transaction trace・SHA入力・registry/restore/export・長期保存失敗UI表示を保存。ledgerは新run専用の追記記録である。

EVIDENCE-MANIFEST.jsonの4,099証拠ファイルをbytes/SHA-256で全件再照合した。POSTRUN-AUDIT.jsonで全804入力・不正条件保持・oracle・期待/実測を再照合し、19 PASSの全variantと、NOT VERIFIABLEの証拠不足を区別して確認した。長期保存失敗3件のpending hash・旧ストア・未収録範囲/表示も再確認した。監査は追加製品ケースを実行していない。

固定対象3,441ファイル、依存1,978ファイル、過去履歴23,389ファイルの試験前後bytes/hashは一致。過去49 PASSの参照hash、旧FAIL・NOT VERIFIABLE・是正・fixture不備・ledgerも保持している。監視対象sinkへの外部通信/console出力試行0件。変更は新規workflow/testing/YTK-F5-mini4-remaining-20261026/のみで、一覧はCHANGED-FILES.txt、全成果物のbytes/hashはARTIFACT-MANIFEST.json（自己除外）。製品・schema・registry・承認済み仕様・試験計画は変更していない。開発テスト結果を正式PASSへ転記していない。

## 未実施一覧と提出時点の残件

今回開始時の27件は19 PASS / 1 NOT VERIFIABLE / 7 NOT RUN。証拠未充足・未実施は計8件である。今回の19 PASSは制作管理室の独立レビュー待ちであり、既受理49件は別の過去履歴として維持する。

ブラウザー/人間必須で未実施の7ケース：F2:RST-15、F3:R03-18、F3:R04-12、F3:R06-09、F3:R06-10、F3:R07-05、F3:R07-09。UNEXECUTED.csv、CASE-STATUS.jsonにも記録した。Node DOM試験をこれら7件の代替認定に用いていない。

実ブラウザー、物理保存、実quota、iPhone性能、F6は未検証。raw16MB/pending1MB/256操作の暫定値は変更していない。F5全体PASSは宣言しない。

制作管理室へ今回結果・allocation証拠不足・保全監査の独立レビューを依頼し、監査・commit・push完了後に停止する。その他F5/F6、本番公開、mainマージ、R005凍結解除へ進んでいない。
