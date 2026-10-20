# F5回帰 第1小バッチ — 正式提出報告

**正式判定: 38 PASS / 0 FAIL / 0 NOT RUN / 1 NOT VERIFIABLE（R02-29）**。
対象はF3:R02-01..40のうちR02-09を除く39ケース。残る回帰55件・他F5・F6を実施していない。F5全体の合格判定ではない。

## 固定対象・実行前固定

- 製品commit: `168274010a1aa45794de98dc71ac5735cb9d0ae1`
- 参照成果物: `cc08a1fda4cf6256bdb3edcce0bc1a4625e3b70c`
- 専用branch: `codex/f5-regression-r02-mini-batch1`
- 初回runner/実行前計画commit: `563a777126bd7fa80e416dc603f57d0f2283478d`
- R02-05限定retry runner/実行前計画commit: `b15c54d9e19efdbad859d7fe2accc4205e3a9d2a`
- 環境: Windows_NT 10.0.26300 / x64 / Node v24.20.0。Node executable SHA-256: `5c976096e04e5c2c1f091938926234cc9fbebfe9787ddd149351b3b0ecc707b5`。
- 通常はNode builtinsのみ。R02-31 readonly previewだけfake-indexeddb6.2.4。外部依存全ファイルのbytes/hashをPREEXECUTION-R2.jsonに固定し、前後一致確認。実ブラウザーやmock製品コードは使用していない。
- REGRESSION-IMPACT94件を照合し、当該39件と残る55件を機械的に分離。全39件740入力を実行前に固定し、原文の行・期待値・独立oracle・全variant・fault・入力bytes/SHA-256・runner/environment hashをcommitした。旧PREEXECUTION.jsonは初期未実行案として保持し、実行用R2と混同しない。
- TARGET-LOCK.jsonの全1377 Git blob / bytes / SHA-256と同一archiveを利用した。archive SHA-256: `984063331d087dc6365d2720da8c1a4e2dd15504c4dbcb831a294419dc3da1da`。固定製品・schema・manifest・registry・承認済み仕様/試験計画の差分は0。

## 正式判定一覧

|case ID|正式判定|採用run末尾|attempt|全入力数|
|---|---|---|---|---|
|F3:R02-01|PASS|001|2|2|
|F3:R02-02|PASS|001|2|3|
|F3:R02-03|PASS|001|2|9|
|F3:R02-04|PASS|001|2|17|
|F3:R02-05|PASS|002|3|15|
|F3:R02-06|PASS|001|2|29|
|F3:R02-07|PASS|001|2|3|
|F3:R02-08|PASS|001|2|8|
|F3:R02-10|PASS|001|2|6|
|F3:R02-11|PASS|001|2|5|
|F3:R02-12|PASS|001|2|81|
|F3:R02-13|PASS|001|2|4|
|F3:R02-14|PASS|001|2|4|
|F3:R02-15|PASS|001|2|3|
|F3:R02-16|PASS|001|2|4|
|F3:R02-17|PASS|001|2|4|
|F3:R02-18|PASS|001|2|5|
|F3:R02-19|PASS|001|2|6|
|F3:R02-20|PASS|001|2|5|
|F3:R02-21|PASS|001|2|3|
|F3:R02-22|PASS|001|2|463|
|F3:R02-23|PASS|001|2|1|
|F3:R02-24|PASS|001|2|2|
|F3:R02-25|PASS|001|2|3|
|F3:R02-26|PASS|001|2|6|
|F3:R02-27|PASS|001|2|5|
|F3:R02-28|PASS|001|2|10|
|F3:R02-29|NOT VERIFIABLE|001|1|5|
|F3:R02-30|PASS|001|1|5|
|F3:R02-31|PASS|001|1|1|
|F3:R02-32|PASS|001|2|2|
|F3:R02-33|PASS|001|2|2|
|F3:R02-34|PASS|001|2|2|
|F3:R02-35|PASS|001|2|3|
|F3:R02-36|PASS|001|3|3|
|F3:R02-37|PASS|001|2|3|
|F3:R02-38|PASS|001|3|3|
|F3:R02-39|PASS|001|3|3|
|F3:R02-40|PASS|001|2|2|

正式判定の正本はFORMAL-VERDICTS.json。raw runner結果と意味を分けている。上表のR02-29は自動assertionのPASSを正式PASSへ採用しない。case別の元source、採用run、attempt、全input数、result証拠とhashをJSONにも記録。

## 実測と独立oracle

- UTF8/BOM、root/nested/escaped decoded-key duplicate、root order、Unicode/slash escape、unknown own-key、nested値型、数値、Unicode scalar/NFCを原文ごとに検証。unknown keyはextra/__proto__/constructor/prototypeを個別入力とし、snapshot各record/answersも展開。
- R02-22: 承認recipe CONTROL-ALLの77 code points × 前/中央/後 × raw/escaped =462入力＋control。raw C0はJSON字句段階、escaped/C1/bidiはJSON parse後の拒否を区別する。
- R02-23: DIGEST-01定数とNode createHashの独立値を照合。restore-valid fileの受理試験とは混同しない。
- R02-24/38: ASCII日付をexactly1-byte変更し、schemaが有効なまま旧checksum据置、独立SHA不一致、製品のdigest実行後拒否を記録。
- R02-25/36/39: 元vectorと、scanner member上限内のunknown answers keyを別入力にし、独立の正しいchecksumとschema拒否を確認。未承認のINVALID_FILE固定期待は使用しない。早期拒否は後段digest実証と読み替えない。
- R02-26/27: 未知algorithm、uppercase/63/65/nonhexを別入力にした。
- R02-28: import/export双方でcontrolとSHA reject/不正長0/31/33。生成成功なし、input/dataset不変、write0を確認。画面表示/物理保存完了を実証したとは扱わない。
- R02-30: normal/emergency full/partial/noneについて、独立schema serializerのfull rawと、実際にSHAへ渡された6-field payloadのbytesを照合。snapshot/overview/category/service/answers/pending/operation/context/checksumの順をschemaに結び付けた。生成された正常export bytesも一致。
- R02-31: 独立serializerでACTIVE registryにbindingしたV-VALID-01を再生成し、元fixtureとbytes一致。実際のimport/prepareRestore APIでservices3/pending0/omitted0、EMPTY preview受理。空DBのtransaction traceはreadonly3回、readwrite0、DBはnullのまま。確認用importとpreview token用importの2回を区別。commitRestoreは呼んでいない。
- 各入力は元のBufferとFile返却arrayBufferの前後hash、File/parse/digest回数を記録。外部通信・console・不許可writeの試行0。
- 独立oracleはNode JSON/UTF8/createHash、SUTと別実装のtoken-stack decoded-key検出、BigInt/safe整数規範、承認manifestとfield orderに基づく。製品validatorで期待値を生成していない。全input/expected/actual/oracleはinputs/とruns/に記録し、SHAへ渡したbytesも別binとして収録。

## 基盤不備と未解決事項

初回run `F5-REG-R02-M1-20261020-001` は38 PASS / 1 NOT VERIFIABLE（R02-05）。R02-05の2入力でruntime oracleのundefined own-propertyがJSON計画では省略され、同じ表現で比較できなかった。製品呼出し前の基盤問題であり製品不具合と判定しない。初回740観測とledger/manifestを全保全し、JSON保存表現へ揃える比較だけを修正。期待・fixtureは変えず、commit済み新計画によりrun002でR02-05全15入力を新attemptで実行しPASS。38件の既存PASSを無条件に再判定/再実行していない。

R02-29はJSON内容・キー・SHA前後hashは不変で、内容write試行0。しかしEM-FULLで6件、EM-PARTIALで1件のdescriptor hardeningを元parsed dependsOnOperationIds配列に観測した。原因は検証tokenとparsed配列の参照共有の下でのObject.freeze。実行前のdraft runnerは値を変えないhardeningを内容書換えと区別したため自動assertionはPASSとなったが、**元の承認要求「parsed objectを書換えない」がこの除外を認めるとは確定できない**。狭い内容条件だけで正式PASSへ昇格させず、NOT VERIFIABLEとする。元runner記録は上書きせず、R29-REVIEW-REQUIRED.jsonへ7件のpath/入力hash/元観測を保存した。

次工程では制作管理室に、このdescriptor-only変更の扱いとR02-29適合判定を依頼する。厳密なdescriptor不変を必要とする場合は、parsed配列をfreeze対象と共有しない最小修正（例: pendingCanonicalでdependsOnOperationIdsを独立copy）を別途承認対象として検討できる。今回製品修正は実施しておらず、未承認の仕様緩和もしない。

準備段階では構文checkと独立fixture校正が、adapter brace欠落とunknown root key脱落を検出した。正式実行前に試験側だけ修正し、その履歴もPREEXECUTION.mdに残した。旧V-HASH-01の不備は元ファイル3605 bytesを維持し、派生3607 bytesのone-byte fixtureと分離。旧fixture不備履歴を削除/上書きしていない。

## 整合性・証拠・停止

- 初回740＋retry15＝755観測を全保持（観測単位のPASS753 / NOT VERIFIABLE2）。この数を正式case PASS数へ置き換えない。
- 新固定対象1,377ファイルと旧成果物全1763ファイルは両run前後でbytes/hash一致。Node/dependency hashも一致。旧99e対象、旧75 PASS/3 FAIL、是正検証、R02-09再試験、全ledger/fixture不備履歴を変更していない。
- 開発117件を今回再実行していない。成功結果を正式PASSへ転記していない。
- runsごとのEVIDENCE-MANIFEST.jsonと最終ARTIFACT-MANIFEST.jsonにbytes/SHA-256を収録。AUDIT.jsonはsource commit・各expected/oracle・全証拠・ledger・対象/旧証拠の一致を製品再実行なしで検証した記録。
- 実ブラウザー/File picker/UI、実機、transactionの実環境動作、最大容量時の性能は本小バッチの実証範囲外。R02-29判定解釈と合わせて未解決事項として残す。
- 残る55ケースはBATCH-CASE-STATUS.jsonにNOT RUNで列挙。他F5/F6、第2バッチ、本番公開、mainマージ、R005凍結解除は一切実施していない。F5/F6全体の正式PASSを宣言しない。

制作管理室へ、本小バッチ38 PASS / 1 NOT VERIFIABLE、基盤retryの保全、R02-29の追加観測を独立レビュー依頼として提出する。ここで停止する。
