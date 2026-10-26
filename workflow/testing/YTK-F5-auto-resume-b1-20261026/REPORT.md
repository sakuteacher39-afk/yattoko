# F5未実施ケース 自動試験再開・第1バッチ

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。旧成果物基準：`c51932447f29e4f7c5b155c31318f56b9f64a68f`。専用ブランチ：`codex/f5-auto-resume-batch1`。

実行前固定commit：`2f9a93ea7bc6bd7619709665fe7061a6d433a58b`。新run ID：`F5-AUTO-RESUME-B1-20261026-001`。環境：Node v24.20.0 / Windows 11 Home / x64、native Node Web Crypto、raw File adapter。実ブラウザー/jsdom/fake-indexeddbを実行に使用していない。依存inventoryは既存node_modules全体を前後照合した。

## 分類と選定

| 未実施427件の主分類 | 件数 | 今回実行 | 残件 |
|---|---:|---:|---:|
| 自動実施候補 | 335 | 20 | 315 |
| 実ブラウザー必須 | 65 | 0 | 65 |
| 人間判定必須 | 22 | 0 | 22 |
| 仕様適用判断待ち | 5 | 0 | 5 |

排他的主分類は仕様適用待ち→人間→実ブラウザー→Node/static/faultの順。人間分類にもnative dialog等を必要とするものがあり、他の依存条件が不要という意味ではない。AUTO_EXECUTABLEは手法として自動検証可能な候補で、全335件のfixture/runnerが直ちに実行可能と認定したものではない。今回readyにしたのは選定20件だけ。case ID・根拠・原文・旧classification・選定状態はCLASSIFICATION-427.json/CSVに全件保存した。

安全性優先で未信頼JSONの取込境界を選定した。UTF-8、decoded duplicate、未知field/prototype key、数値、Unicode scalar、checksum、切断JSONの20件。承認済みF3 commitの原文行とhashを個別照合し、既存fixture catalog・variant recipes・fault catalogを読み込んだ。各source固有の全variantとpositive controlを事前固定した。suite全体のrecipe列挙を全caseに機械適用せず、未選定のCONTROL-ALLやSHA/READ故障caseを実行していない。

## ケース別正式結果

| case ID | 判定 | 完了variant | attempt | 原文要求 |
|---|---|---:|---:|---|
| F3:R02-01 | PASS | 2/2 | 3 | UTF-8 valid / BOMなし canonical input。 |
| F3:R02-02 | PASS | 3/3 | 3 | UTF-8 BOM付き拒否。 |
| F3:R02-03 | PASS | 9/9 | 3 | invalid UTF-8 byte sequenceをfatal reject。 |
| F3:R02-04 | PASS | 17/17 | 3 | root duplicate same key same value。 |
| F3:R02-05 | PASS | 15/15 | 4 | root duplicate same key different value。 |
| F3:R02-06 | PASS | 29/29 | 3 | nested answers duplicate key。 |
| F3:R02-07 | PASS | 3/3 | 3 | "kind" と escaped equivalent key。 |
| F3:R02-11 | PASS | 9/9 | 3 | unknown root key。 |
| F3:R02-12 | PASS | 81/81 | 3 | unknown nested snapshot key。 |
| F3:R02-14 | PASS | 4/4 | 3 | fileFormatVersion 1e0拒否。 |
| F3:R02-15 | PASS | 3/3 | 3 | revision -0拒否。 |
| F3:R02-16 | PASS | 4/4 | 3 | leading zero数値拒否。 |
| F3:R02-17 | PASS | 4/4 | 3 | decimal 1.0拒否。 |
| F3:R02-18 | PASS | 5/5 | 3 | Number.MAX_SAFE_INTEGER超過拒否。 |
| F3:R02-19 | PASS | 6/6 | 3 | escaped lone high surrogate拒否。 |
| F3:R02-20 | PASS | 5/5 | 3 | escaped lone low surrogate拒否。 |
| F3:R02-24 | PASS | 2/2 | 3 | body 1 byte変更/checksum据置。 |
| F3:R02-26 | PASS | 6/6 | 3 | checksum algorithm未知。 |
| F3:R02-27 | PASS | 5/5 | 3 | checksum hex uppercase/長さ63/65/非hex。 |
| F3:R02-40 | PASS | 2/2 | 3 | V-TRUNC-01 reject。 |

合計20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回選定範囲）。全214 variantを実測した。variant別の期待・独立oracle・入力bytes/hash・実測trace・判定・開始/終了時刻はrun/cases各フォルダに保存。台帳ledger.jsonlはappend-only、新run/attemptのみ作成し、旧結果を今回runへ転記していない。

独立oracleはNode UTF-8 fatal decode、独立decoded-key stack、承認済みfield集合とmanifest順序、BigInt数値境界、scalar判定、Node createHash。製品validatorを期待生成に用いない。実測側では固定15a146aのimportBackupを呼び、全文JSON.parse回数、crypto呼出し・digest入力、File読込、入力不変、保存領域アクセスを観測した。

## fixture校正と監査履歴

実行前、既存unknown-root生成器がknown rootだけを署名していることを検出した。旧入力と準備R1を保持し、未知fieldを含むraw payload全体でchecksumを計算した4入力を追加した。計214 variantをR2へ固定した。schema-directed checksumとall-raw-field checksumをoracle上で区別し、duplicate decoded keyがある入力について一意のsemantic checksumを主張しない。FIXTURE-CALIBRATION.jsonを参照。過去のfixture不備履歴・旧FAILを変更していない。

post-run監査初回は、メモリoracleのdeclaredChecksum:undefinedと、JSON保存時に同属性が省略される差を誤って不一致にした。実行runnerは初めからJSON round-trip後のoracleを比較している。audit v2はその同一表現へ揃えて証拠を再照合した。旧auditスクリプトと診断を保持し、正式結果・runner・fixture・期待値・実測を変更していない。

## 証拠・整合性

- 製品3441ファイル、旧成果物29225ファイル、依存1978ファイルの試験前後bytes/SHA-256一致。
- 固定snapshotのGit blobとarchiveも既存target lockで照合。実行前runner/helper hashはcommit上のbytesとも一致。前snapshotをデータ参照するmanifest helperは現行manifestと同一bytesを事前・監査時に検証。
- 外部通信・console logging・不許可書込み試行0件。全variantで入力不変・保存領域アクセス0を確認。これはNode import経路の結果であり、未観測browser通信/UIのPASSを意味しない。
- run内のEVIDENCE-MANIFEST.json：SHA-256 `75d449b6a975be2e849cdf05de389132087a0535986d7df41cd610f9b0bbd0e6`。全264証拠ファイルをbytes/hashで再検証。
- 最終提出物全体はARTIFACT-MANIFEST.json。旧tracked差分は新規バッチディレクトリ以外なし。

## 累積台帳と未解決Gate

現行製品497件の累積：**90 PASS / 407 NOT RUN**。旧70 PASSの記録はそのまま参照し、今回20件だけの新しい正式結果を追加した。F5-CUMULATIVE-497-AFTER.json/CSVにcase ID単位のproof path/hashと履歴を保存。元の70/427台帳は変更していない。

F2:RST-15は適用判断待ち、F3:R07-09は非ACTIVE検証の別承認待ち。関連するF2:CAT-18、F3:MAN-32、REG:REG-07も仕様判断の保留群に分類した。ブラウザー必須5件（F3:R03-18/R04-12/R06-09/R06-10/R07-05）はすべてNOT RUN。R07-05の既存人間確認案・承認済み期待・正式基準を今回変更していない。

Node/static/fault候補のうち今回以外はrunner/fixture/oracleの個別準備が未完了。今回の成功から残る315候補や他のbrowser/human caseへ合格を推論しない。

## 次バッチ候補（未実行・今回の実行対象外）

- F3:R02-21
- F3:R02-22
- F3:R02-23
- F3:R02-32
- F3:R02-33
- F3:R02-34
- F3:R02-35
- F3:R02-37
- F3:R02-38
- F2:R07-01
- F2:R07-02
- F2:R07-03
- F2:R07-04
- F2:R08-06
- F2:R08-07
- F2:R08-08
- F2:R08-09
- F2:R08-10
- F2:R08-11
- F2:R08-12

残る文字制限・digest vector・fixture拒否、F2初回状態のatomic整合、completed/conditional invariantを優先する案。全candidateは次回の明示承認・原文/全variant照合・独立oracle・実行前固定を要する。

制作管理室へ分類、fixture校正、214 variant、Node観測範囲、累積更新と旧証拠保全の独立レビューを依頼する。本バッチのcommit・push後に停止する。F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は行わない。
