# 実行前固定 — F3:R02-29限定正式再試験

- 人間承認済み新対象15a146a9b2c4f80c63798eb31d64b6774a4c2e99をrevision r3として固定。全Git tree3,441ファイルをexact Git blob bytesでarchive/extractし、blob/bytes/SHA-256をTARGET-LOCK.jsonへ記録した。
- 旧1,377ファイル中1,376は同一。製品動作差分はimport-backup.mjsの配列独立copyだけ。追加製品側ファイルは開発回帰test1件（3test）で、runtime entrypointではない。その他追加ファイルは過去試験等のprovenance。
- 実行用planはPREEXECUTION-R2.json。最初の未実行PREEXECUTION.jsonも保持する。構文checkがrunnerの閉じbrace欠落を検出し、製品実行前に修正してR2を作成した。fixture/期待値は不変。
- 対象caseはF3:R02-29だけ。run F5-R02-29-R3-20261026-001 / attempt2。旧対象での正式NOT VERIFIABLEは保持し、内容条件だけの古いraw runner PASSを転記しない。
- 正常、emergency full/partial/none、pending=nullのemergencyの5controlを用意。既存4fixtureは元FIXTURES bytes/hashを照合、5番目は独立6-field serializerから派生。schema不正、checksum不一致、SHA例外、不正依存配列、pending件数/base hash不整合を加え、全39入力を実行前に固定する。
- parsed graphはidentity-awareな反射情報として記録。値/key/descriptor（writable/configurable/enumerable・accessors含む）/prototype identity/extensibility/sealed/frozenを、parse直後・各SHA直前直後・import returnで一致要求。descriptor-only freezeも除外せず書換え試行0を要求する。
- 透過proxyは書換えを禁止して見えなくするのではなく、操作をReflectへforwardして全件記録する。self-checkで値、同値別objectへの置換、descriptor、prototype、extensibility変更が検出されることを事前確認。
- tokenは全node frozen/non-extensible、parsed graphとの参照共有0、Reflect set/define/delete/prototype変更を拒否。envelope JSONは独立canonical inputと完全一致すること。検証終了後に試験側でnative parsed sourceを一時変更してtoken不変を確認し、sourceを元に戻す（製品検証中の操作とは明確に分離）。
- Node builtinsのみ、browser/IndexedDB/development testsは使用しない。Node実行binary・runner/既存oracle module・全fixture・環境hashを事前固定。独立oracleはNode JSON/UTF8/createHashと既承認manifest/orderを使う旧試験serializer。SUT validatorを期待値生成へ流用しない。旧/new snapshot manifest bytesは同一。
- 書換え・外部通信・console・storageアクセス・対象改変を検出した場合は停止する。ダミーデータのみ。case期待値不一致はFAIL、基盤/観測不足はNOT VERIFIABLEとし、証拠欠落をPASSにしない。
- 開発120件は実行/転記しない。旧38 PASSも新対象へ移植せず、他496件はNOT RUN。残る回帰55件、F6は実行しない。
- runnerとplanをcommitしてから正式実行。入力・観測・各反射snapshot・digest bytes・ledgerを新runへ排他作成し、前後3,441ファイルの対象hash/旧履歴を照合する。旧PASS/FAIL/NV/ledgerは一切書換えない。

限定再試験後は回帰影響一覧を提出し、専用branchへcommit/pushして停止する。
