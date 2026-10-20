# ヤットコ｜F5第1バッチ 独立レビュー対応報告（2026-10-20）

- 元実行成果物: `0a077ba793de538491c023be39c05d25bd3ba97a`
- 固定製品: `99e566da100ee6924149ec3244893bbddf7e8c4d`
- 是正runner/新実行前計画commit: `904a1fc090044c94280b35d302f2a67b32908a13`
- 専用branch: `codex/f5-batch1-review-remediation`
- 新run ID: `F5-B1-REVIEW-20261020-001` / **attempt 2**

## 判定と保存した履歴

|対象|元attempt1（変更なし）|今回attempt2|根拠|
|---|---|---|---|
|F3:R02-36|FAIL|**PASS**|unknown overview fieldと正しいchecksumを独立確認。製品が拒否。field件数が上限内のunknown/missing variantも拒否|
|F3:R02-39|FAIL|**PASS**|再署名済みschema不正でも拒否。valid-schema/stale-checksum controlでdigest呼出と拒否も実測|
|F3:R02-09|FAIL|**FAIL維持**|空白3種は有効なJSONかつcontrolと同一parsed value/checksumだが、LEXICAL拒否・full-document parse0。指定canonical raw比較に到達した証明なし|

**元の第1バッチは75 PASS / 3 FAILとして保持。** 今回の2 PASS / 1 FAILを元集計へ上書きして77/1にしていない。既存75件は実行/再判定していない。原ledger、FAIL、R02-38 fixture不備/NOT VERIFIABLE履歴、準備fixture40原本を変更していない。

## runner是正

旧 `workflow/testing/YTK-F5-batch1-20261015/runner/cases.mjs` のR02-36/39 vectorから、承認原文にないINVALID_FILE固定期待を除去。vectorにcode期待がない場合は「拒否」を判定し、観測したcodeを証拠へ残す。他のvectorの期待code、原plan・結果は変更しない。

新しい専用runnerは3件だけをbindingし、実行前RETEST-PLAN.jsonにケース・原期待・独立oracle・新attempt・Node環境・runner SHA・旧成果物のGit blob/hashを固定してcommitしてから実行した。旧78件runnerを新しい期待で回し直すことはしていない。元runの再現用sourceは元runner/成果物commitに保存されている。

## schema/checksumの独立検証

期待値に製品validatorを使用せず、Node JSON.parse/createHashと承認overviewの8field、required、enum、metaからcase単位oracleを構成。

- valid control: schema正当・独立checksum一致、製品受理、full-document parse1 / digest1。
- 原V-UNK-01 / V-HASH-02: unknown `extra` を独立に特定、9member（承認8）、checksum一致。製品はMEMBER_LIMITで拒否。これは観測値でありPASS条件の固定codeではない。
- 同じ8memberに収めたvariant: unknown `extra` / missing `identity`、checksum一致を独立確認し、製品拒否。単なるmember超過の試験だけで終わらせない。
- R02-39追加control: schema正当・bodyのASCII日付一桁変更・checksum据置。独立checksum不一致、製品はdigest1の後CHECKSUM拒否。

今回22観測（R02-36:6、R02-39:8、R02-09:8）。元fixture不備をこっそり修正したり、schema不正の拒否をchecksum拒否と取り違えたりしていない。各入力は別raw bytes/hashとして保存。

## R02-09の照合と最小修正案

ANALYSIS-R02-09.mdに承認F3設計§3.1/3.5/3.6、試験計画105〜106行、固定sourceの順序、parse/digest実測を記載。

早期LEXICAL拒否は「非canonicalな入力を受理しない」という安全側の結果を満たしている。しかし、承認計画が求めるcanonical raw mismatch検証を実施した証拠にはならない。固定source上もraw比較はJSON.parseより後にあり、full-document parse0という観測から比較段階の未到達が分かる。code名だけの解釈でPASSへ昇格しない。

最小案はscannerの構造token境界だけでJSON whitespace4種を進め、rawそのものを変えず、後続の現行canonical比較で拒否すること。trim/normalizationやcode名の付替えは解決案にしない。duplicate/numeric/Unicode/resource guard等の回帰要件も同文書に整理。**製品修正は実施していない**。適用には別指示・別製品commit・再固定が必要。

## 環境・整合性・証拠

Node v24.20.0、準備時と同じbinary SHA（`5c976096e04e5c2c1f091938926234cc9fbebfe9787ddd149351b3b0ecc707b5`）。Node builtinsのみ。JSON.parseはharnessの外部count wrapperからnative関数へ委譲し、full-documentとscalar tokenを分けた。独立oracleは計数区間外。製品ファイルは書換えていない。

- 固定製品123ファイル: 前後bytes/SHA一致。
- 旧protected artifact **1156ファイル**: 0a077ba...の原Git blobと同一。意図して修正した旧runner/cases.mjsだけを対象外にし、その差分を別記録。
- 元75/3、旧ledger、fixture不備履歴: 完全保持。
- 原fixture40件: 元catalog bytes/hash一致。
- 外部通信/log sink呼出: 0。storage access: 0。DB transaction/F6は実施していない。
- 新証拠56ファイル: 全bytes/SHA照合。manifest自身は除外し、そのSHAは以下。

`257508424e8aa1f7ddf4d31a280e3141c7255a49212fa7010ce1ca1fc62084ae`

証拠: `runs/F5-B1-REVIEW-20261020-001/` の各input/observation/result、ledger、environment、source-phase-audit、before/after integrity、RESULTS、SUMMARY、EVIDENCE-MANIFEST。新証拠もwx/append-onlyで、結果には元attempt1 FAILのpath/hashを保持。CASE-VERDICTS.mdとAUDIT.jsonに一覧と監査結果を収録。

## 変更ファイルの範囲

- 旧runner/cases.mjs: 指定2件の固定code期待除去のみ。
- `workflow/testing/YTK-F5-batch1-review-20261020/`: 専用runner、独立oracle、自己検証3件、実行前計画、新runの証拠、結果監査、R02-09照合/最小案、本報告を追加。
- 固定製品、承認F2/F3/F4設計・試験計画、元結果・ledger・fixture履歴・75 PASS、main/R005の変更なし。

## 制作管理室への提出・停止

R02-36/39の是正oracleと新PASSの根拠、R02-09のFAIL維持・最小修正案、旧結果の不変、新attempt証拠をご確認ください。独立レビュー依頼はこの報告として提出し、外部メッセージ送信はしていません。

対象3件の是正検証を終えて停止。第2バッチ、F6、本番公開、main merge、R005解除へ進まない。F5/F6全体PASSは宣言しない。
