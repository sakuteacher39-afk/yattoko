# F4-S2-R01 修正報告（2026-10-15）

対象commit: 3c832a6d5ffa976ff6d626b1a308765e12412b63
専用branch: codex/f4-s2-r01-ordinal-ranges

## 差分

omittedScopesのnone生成を、scopeごとの最小〜最大ordinal集約から、直前の同一scopeかつordinalが連続する場合だけの集約へ修正した。

例: mailのordinal1・3とbaseのordinal2は、mail1〜1 / base2〜2 / mail3〜3の別範囲として保持。mail1〜3へ結合しない。連続するmail1・2だけは1〜2へ集約する。

partialは従来の離散scope生成を維持。収録済みordinalを挟む未収録範囲の回帰を追加した。fullでは未収録範囲が空であることを検証した。

正確な範囲metadataの増加により、summaryだけで既存1,000,000 bytes上限を超える場合は、metadataを省略せずファイル生成をfail closedする。既存pending上限を引上げたり、新しい範囲形式を追加したりしない。元の画面入力は保持する。

## 変更ファイル

全て workflow/prototypes/YTK-F4/ 配下:

- src/backup.mjs: noneの連続範囲集約と既存pending byte上限のsummary検査。
- BACKUP-FORMAT.md: 非連続範囲を結合する旧説明を訂正。field構成は変更なし。
- test/omitted-ranges.test.mjs: 新規7テスト。
- test/file-save-ui.test.mjs: 既存partial表示fixtureの件数と範囲の不一致を修正。
- S2-R01-REPORT.md: 本報告。

## テスト結果

npm test: 67 tests / 67 pass / 0 fail / 0 skip。
git diff --check: 成功。

追加7件:

1. 257件の交互scopeが離散ordinalとして生成・表示され、各scopeが別カテゴリを巻き込まない。
2. 同scopeの連続ordinalだけを集約し、scope変更で範囲を閉じる。
3. partialの未収録1・3に対し、収録済み2を範囲・表示へ混入しない。
4. fullではomittedScopes空、未収録0件表示。
5. pending byte超過noneの連続1〜256範囲と未収録256件が一致。
6. 正確なscope metadataだけで既存pending byte上限を超える場合は生成停止し、元候補を変更しない。
7. 修正済み範囲を含む緊急JSONでも既存field order・SHA-256対象と検証結果を維持する。

範囲を展開して、範囲件数合計=omittedCount、重複なし、収録済みordinalとの交差なし、全candidate ordinalの完全被覆、各ordinalとcategory/operationTypeの対応を検査した。

既存60件も成功。依存component検証、pending上限・境界、SHA-256規範vector、生成/保存失敗・未保存入力保持を含む。

## 維持した仕様・残存リスク

- dependency validation、operations/candidate上限256、pending1MB、raw16MB、SHA-256、canonical file field構成、ACTIVE registry、IndexedDB schemaは変更なし。暫定値は暫定のまま。
- 実PC/iPhone/Safari、物理保存、性能・メモリは引き続き未検証。範囲が細分化されるケースではmetadataと表示量が増える。
- 独立再レビューは未実施。未保存入力のreload/close/crash後の保持は保証しない。
- 第3段階の取込・復元は未着手。F5/F6合格、本番公開、R005凍結解除を宣言せず、本修正と開発テスト終了時点で停止する。
