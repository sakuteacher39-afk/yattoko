# F5-R02-29 製品候補の最小修正（2026-10-26）

製品変更は `workflow/prototypes/YTK-F4/src/import-backup.mjs` のpendingCanonical内の1プロパティのみ。dependsOnOperationIdsが配列の場合だけspreadで独立copyし、parsed配列と検証済みtokenの参照共有を解消した。配列以外の不正値はそのまま既存の検証へ渡し、暗黙の補正/新たな受理をしない。checksum、canonical JSON、property/operation順序、依存関係validator、registry、schema/manifestは変更していない。

- 作業baseline: a3a5e377e8724b950b3f0c5484e0abc82e9b276f。baseline製品は固定168274010a1aa45794de98dc71ac5735cb9d0ae1と同一であることを照合済み。
- 専用branch: codex/f5-r02-29-detach-pending-array。
- 正式F5対象は1682740のまま。今回commitは修正候補であり、正式試験対象へ切り替えていない。

## 差分ファイル

- workflow/prototypes/YTK-F4/src/import-backup.mjs
- workflow/prototypes/YTK-F4/test/r02-29-parsed-immutability.test.mjs（新規開発回帰3件）
- workflow/testing/YTK-F5-R02-29-product-fix-20261026/（本報告、開発テストlog、保全hash一覧）

## 開発回帰テストと結果

Windows / Node v24.20.0 / 既存fake-indexeddb・jsdom環境。ダミー入力のみ使用し、外部通信や依存追加なし。

1. 正常normal、emergency full/partial/none/候補0（pending=null）の5種類で検証。fullは複数操作により空/非空の依存ID配列を含む。
2. 全parsed object graphについて、値・own keys（array lengthを含む）・各property descriptor・prototype・extensibility・sealed/frozen状態を、全体parse直後、SHA直前/直後、returnで照合。透過proxyでset/delete/defineProperty/preventExtensions/setPrototypeOfの試行も記録し、descriptor-only操作を含めすべて0を要求。
3. token graph全体がfrozenかつnon-extensibleであり、元parsed object/arrayとの参照共有がないことを確認。tokenへの書込/pushは拒否。検証終了後に元依存配列へ試験側から追記してもtokenは変化しない。
4. token.envelopeのJSONが元canonical rawと完全一致し、operationと依存ID順序・checksumを維持することを確認。
5. full/partial/none/normalのschema不正、依存欠落/並替/重複/不正型（string/null/object/number/boolean）/不正要素/未知ID、checksum不一致、SHA API失敗を検証。拒否時も入力・parsed graphは不変でtokenを返さない。字句段階で拒否されparsed objectが作られないケースは別扱いにし、後段検証の証明と混同しない。

修正前: 同じ最終回帰テスト3件のうち1件失敗/2件成功。既存製品でparsed配列のextensibility変化を再現（BEFORE-FIX-FINAL-TEST.txt）。

修正後 focused: `node --test workflow/prototypes/YTK-F4/test/r02-29-parsed-immutability.test.mjs` → 3/3成功。

全体: `npm.cmd test --prefix workflow/prototypes/YTK-F4` → **既存117件＋追加3件＝120/120成功**、fail/skip/cancel 0。generate/build-ui/plan-mapのcheckも成功（ALL-TESTS.txt）。

テスト準備中の構文不備、および字句早期拒否を全体parse1回と仮定した初期test helperの不備は製品修正前に修正し、PREPARATION-SYNTAX.txt / BEFORE-FIX.txtも保全した。製品修正前の再現結果は最終テスト版で改めて取得し、製品不具合と試験準備不備を分離した。

## 保全・残存リスク・停止

旧試験/承認済みproposal計3,322ファイルのbytes/SHA-256を前後照合し、一致。既存tracked試験・承認済み計画のGit差分0。旧固定archiveと全1,377ファイルも読取専用で確認し一致。旧F5結果、FAIL/PASS/NV証拠、ledger、不備履歴は一切変更していない。PROTECTED-BEFORE.json / INTEGRITY.json参照。

今回の結果は開発回帰であり、R02-29正式再試験や正式PASSではない。実ブラウザー/実機は未検証。独立レビューと、承認後の製品候補再固定・正式再試験が残る。配列copyの追加メモリ使用は既存の256操作/1MB pending制限内だが、実機性能の新たな計測は行っていない。

ここで停止する。正式試験対象切替、R02-29正式再試験、残る55件、F6、本番公開、mainマージ、R005凍結解除には着手していない。承認済み仕様・試験計画との差分なし。
