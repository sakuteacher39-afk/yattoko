# 第7バッチ・独立照合用監査サマリー

対象成果物commit：d18db02241566cb230ac9fe7aa8e798e60bf51d0。固定製品commit：15a146a9b2c4f80c63798eb31d64b6774a4c2e99。専用ブランチ codex/f5-b7-audit-summary。

既存証拠の読み取り・抽出・独立検算のみを実施した。製品コード、既存runner、fixture、result、observation、AUDIT、manifest、ledgerは変更していない。製品API・旧正式試験を実行せず、正式PASSの再認定や累積台帳の更新もしていない。原本台帳の記載値は190 PASS / 307 NOT RUNのまま。

## 提出物と原本との対応

- cases/<case ID>/summary.json：14件の小規模集計。originalFormalStatusは原本からの引用で、今回の認定ではない。
- 同directoryのaudit-*.json：元AUDIT.checksを32行単位でそのまま分割し、sourceStart/sourceEndExclusiveで原本配列位置を指定。
- variants-*.json：32variantごとのobservation hash、期待/実測の一致、ledger照合、証拠件数と欠落・不一致。
- original-audit-metadata.json：checks以外の元AUDIT全fieldと原本hash。
- SOURCE-MAPPING.json/.csv：ケース別原本resultのGit blob SHA1・bytes・SHA256と、原本checks範囲・分割先を対応付け。
- source-inventory/*.json：対象commitにある第7バッチ全63,881ファイルのGit blob SHA1・bytes・SHA256。256ファイル単位に分割。Git blobはGit object SHA1で、内容SHA256とは区別している。各実体のGit blob hashを再計算して対象commitへ結び付けた。
- verification/cases/*.json：Pythonによる14ケースの独立集計。verification/trace/*.json：別のidentity/trace照合。
- verification/VERIFICATION.json、BYTE-RECONSTRUCTION.json、PROVENANCE-AND-TRACE.json：全体検算結果。

## ケース別集計

|case|原本実施/計画|期待・実測一致|原本oracle file proof|期待faultのfileなし|必要oracle欠落|旧4store保持|検算|
|---|---:|---:|---:|---:|---:|---:|---|
|F2:BKP-01|432/432|432|144|288|0|432|MATCH|
|F2:BKP-02|432/432|432|144|288|0|432|MATCH|
|F2:BKP-03|432/432|432|144|288|0|432|MATCH|
|F2:BKP-04|432/432|432|144|288|0|432|MATCH|
|F2:BKP-05|936/936|936|312|624|0|936|MATCH|
|F2:BKP-06|936/936|936|312|624|0|936|MATCH|
|F2:BKP-08|15/15|15|5|10|0|15|MATCH|
|F2:BKP-10|936/936|936|312|624|0|936|MATCH|
|F3:R01-01|24/24|24|24|0|0|24|MATCH|
|F3:R01-05|72/72|72|72|0|0|72|MATCH|
|F3:R01-08|96/96|96|96|0|0|96|MATCH|
|F3:R01-09|96/96|96|96|0|0|96|MATCH|
|F3:R01-10|96/96|96|96|0|0|96|MATCH|
|F3:R01-11|144/144|144|144|0|0|144|MATCH|

14ケース・5,079variantすべてのcase/run/attemptとledgerが対応した。原本監査行5,079件を欠落・重複なく分割・再結合でき、期待/実測一致5,079、旧4store保持5,079、証拠欠落・不一致0。原本の独立oracle file proofは2,045件。READ/SHA失敗でfileを生成しないことが期待される3,034件のproof=nullを欠落と混同せず分離した。必要なoracle証拠の欠落は0。

## 独立検算方法と根拠

Node抽出器とPython検算器はコードを共有せず、検算器は元AUDIT、元result、元observation、元input、元manifest、元ledgerを別に読み直した。原本file全63,881件のGit blob・bytes・SHA256、manifest登録63,395件、入力hash、ケース集計、全before/after storeのraw hash、期待/実測を照合した。記録済みoracleの存在・値一致を確認するとともに、成功file2,045件のchecksum・canonical bytes・snapshot・operation/context/base/依存ordinal・omitted範囲を、原本に固定された期待モデルからPythonで再構成して比較した。元製品や元oracle実行コードはimportしていない。Nodeの追加検算では全traceとphaseを読み、readwrite/write0と期待したfault例外を再照合した。

原本AUDITの全fieldを再構成した結果、2736496 bytesでbyte単位に一致。原本と再構成SHA256はともに 4d06b71a4df8881e5a90cd7c07630484721eedbd01dd95e29783155e57cf0ebf 。巨大な再構成fileを追加保存せずhashと結果だけを残した。抽出不一致0、Python検算findings0、追加provenance/trace不一致0。

固定製品3,441ファイルも既存の固定用directoryから読み取り、指定製品commitのGit blob・bytes・SHA256と照合した。元実行のbefore/after製品・過去履歴・依存metadataと実行前planの対応も一致。これは既存の前後記録を検算したもので、正式試験を再実行して前後状態を新たに作ったわけではない。

## 範囲・留意点

元の期待モデルが承認仕様を十分に網羅するか、正式PASSを受理するかは制作管理室のレビュー事項として残す。今回のMATCHは分割・集計・原本証拠との一致を示し、F5再認定ではない。新たな不一致・証拠欠落は見つからなかった。実ブラウザー、実quota、物理保存、F5第8バッチ、F6、本番公開、mainマージ、R005凍結解除へ進んでいない。

## 再現と上書き防止

使用環境：Node v24.20.0、Python 3.12.14 (main, Aug 25 2026, 14:01:42) [MSC v.1944 64 bit (AMD64)]、ローカルGit。標準libraryのみ。実行scriptとhashはPROCESS.json。書込は新規サマリーdirectoryのみ、すべて排他的新規作成として既存出力を上書きしない。再現時はrepositoryのworkflow/testing直下の新しい別名directoryへscriptsのみをコピーし、extract.mjs → verify.py → verify-provenance.mjs → reconstruct-bytes.pyの順に実行する。元資料は対象commitのまま保持する。既存のverificationに再実行して上書きしない。

制作管理室へ小規模サマリー・原本対応表・検算結果の独立レビューを依頼し、commit・push後に停止する。
