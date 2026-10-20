# F5-R02-09 製品候補の最小修正報告

- 作業基準: `2cf2d008b179ed77dd05b504ea48c194a4e6f9e8`
- 固定F5対象: `99e566da100ee6924149ec3244893bbddf7e8c4d`（変更なし）
- 専用ブランチ: `codex/f5-r02-09-scanner-whitespace`

## 差分

製品変更は `workflow/prototypes/YTK-F4/src/import-json.mjs` のみ。space / tab / LF / CR を構造間で読み進めるindex操作を追加した。raw text/bytesを書き換えず、string・数値の字句処理と各制限値は変更していない。pendingのraw spanはwhitespace読み進め前の位置から計測する。checksum・schema・registry・保存・復元処理は変更していない。

追加ファイル:
- `workflow/prototypes/YTK-F4/test/r02-09-whitespace.test.mjs`
- 本報告、`REGRESSION-RESULTS.txt`、`INTEGRITY.txt`

## 開発回帰試験

Windows / Node v24.20.0 / npm 11.19.0、既存のfake-indexeddb/jsdom環境。ダミーデータのみ使用。

- focused: `node --test workflow/prototypes/YTK-F4/test/r02-09-whitespace.test.mjs` → 6/6成功。
- full: アプリディレクトリで `npm.cmd test` → 既存111 + 追加6 = 117/117成功、失敗・skip・cancel 0。generate / build-ui / plan-map のcheckも成功。
- `git diff --check` → 成功。

追加6件の検証内容:
1. 標準whitespace4種の構造間挿入、空object/array、入れ子、文字列内の空白・escape・日本語・補助平面文字保持。
2. 正常バックアップをcontrolとする34入力（control1 + 各whitespace8箇所×4 + pretty JSON1）。全体のJSON.parseを1回観測。controlはSHA1回で受理、余分な空白は全体parse後CANONICAL拒否、SHA0回、入力bytes完全一致。JSON.parseが独立した構文・値oracleとなる。
3. 空白を含むdecoded重複key拒否、Unicode不正拒否。
4. 非JSON whitespace、構文不正、分断token、不正数値、最大safe integer境界。
5. depth16/17、string token4096/4097、root member7/8、array各上限と上限+1。
6. pending raw1,000,000/1,000,001 bytes境界（leading whitespaceなし/あり）。

scanner単体の境界fixtureは意図的にbackup schemaと独立させた。import試験にはcreateBackupで作成した有効なダミーsnapshotと未変更のchecksumを使用し、空白のみ挿入する。期待されるCANONICAL拒否はF3設計§3.1/§3.6、R02-09の処理段階に対応する。

## 保全と判定の範囲

固定対象archiveの全123ファイルbytes/hash一致。既存trackedファイルについて、workflow/testing全体（正式結果・FAIL証拠・ledger・runnerを含む）、workflow/proposals全体、および許可scanner以外のF4製品・既存テストは基準commitから差分なし。確認コマンドと結果はINTEGRITY.txt参照。

本結果は新しい製品候補の開発回帰試験であり、正式F5再試験の結果へ転記しない。旧第1バッチ75 PASS / 3 FAIL、および是正検証の既存判定を保持する。固定F5対象の再指定や正式R02-09再判定は実施していない。

## 残存リスク・停止

実ブラウザー/実機検証は未実施。独立レビュー後、新製品候補を正式試験対象として承認・固定する手続きと正式再試験が必要。製品変更範囲外の不具合への保証は追加していない。承認済み仕様・試験計画の差分なし。

ここで停止。第2バッチ、F6、本番公開、mainへのマージ、R005凍結解除は実施していない。
