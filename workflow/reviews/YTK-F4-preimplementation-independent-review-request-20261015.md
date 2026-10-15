# YTK-F4｜version registry・実装前条件 独立レビュー依頼

制作管理室 御中

F2/F3人間承認済み設計を基準に、F4実装開始前の未確定技術条件を具体化しました。

本提出は**F4実装開始承認ではありません**。
アプリ本体コード、production公開、R005、課金、AWS resourceは変更していません。

## 1. 正本

- F2承認設計commit：`0d5dfa387f924e5dc3dc9196b9f236986c910281`
- F3承認対象commit：`3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- F3制作管理室最終レビューcommit：`3856a9b5dc98fdf054bdb71673d779c2ae0457c2`
- F3人間正式承認記録commit：`efcde632a3d1aa5486f248d667f5514608555f9e`
- Notion：ヤットコ｜最新状態マスター｜2026-10-10方向転換版

## 2. 審査対象

1. `workflow/proposals/YTK-F4-version-registry-proposal-20261015.md`
2. `workflow/proposals/YTK-F4-preimplementation-technical-boundaries-20261015.md`
3. 本レビュー依頼書

## 3. ACTIVE registry候補

- fileFormatVersion：`1`
- schemaVersion：`ytk-f2-20261014-0d5dfa38`
- questionSchemaVersion：`ytk-q-r001r002-20261015-f090acde-7e302dad`
- overview recordId：`ovw_main`
- category recordId：`cat_<canonical categoryKey>`
- service recordId：`svc_<lowercase UUIDv4>`
- generationId：`gen_<lowercase UUIDv4>`

generator：
- Web Crypto `crypto.randomUUID()` primary。
- 必要なら`crypto.getRandomValues`によるUUIDv4 fallback候補。
- `Math.random()` / timestamp / sequence onlyは禁止。

registry状態はまだ`CANDIDATE`であり、制作管理室レビュー＋必要な人間承認前にACTIVEとしない。

## 4. version validation

- fileFormatVersion exact match。
- schemaVersion/questionSchemaVersionは1組のregistered pair exact match。
- recordId/generationIdはACTIVE grammar exact match。
- old/future/unknown versionを推測migrationしない。
- duplicate/invalid IDを自動再生成してimport救済しない。
- registry未ACTIVEでproduction export/import/restoreを有効化しない。

## 5. F2/F3維持確認

変更していない：
- canonical categoryKey 12種
- R07/R08/R09
- IndexedDB
- record/global revision semantics
- generationの意味
- 10,000,000 byte
- F2 canonical capacity projection
- 保存失敗6分類
- multi-tab B
- pending semantics
- full replace restore
- strict import validation
- atomic replace
- private mode注意方式
- secret禁止
- plaintext JSON v1
- F3 pending provenance
- raw16MB/pending1MB/256はPROVISIONAL

F2/F3 semantic変更が必要だと審査で判明した場合はF4へ進まず、変更案件として差戻してください。

## 6. F4計測方針候補

無料版v1：
**external analyticsなし / external error loggingなし / service整理データ外部送信なし**。

F4へanalytics SDK、remote crash reporter、session replay、remote APMを追加しない。

外部送信禁止：
- 整理内容
- service名
- 回答
- 本人意向
- otherServiceName
- backup/restore file内容
- pending
- secret

将来計測は別設計・別承認。

## 7. XSS / network boundary

- user textはtext render。
- user valueをinnerHTMLへ入れない。
- eval/new Function禁止。
- third-party scriptなしを第一候補。
- application fetch/XHR/sendBeacon/WebSocket/EventSourceはv1で不要。
- public deployment CSP/network restrictionはF7前に別確認。

## 8. 審査してほしい事項

1. schemaVersionが単なる仮1ではなくF2承認schemaへ追跡可能にbindingされているか。
2. questionSchemaVersionが現行R001/R002 canonical question manifestへ適切にbindingされているか。
3. deterministic overview/category IDとrandom service IDの分離がF2のrecordId意味を変えていないか。
4. UUIDv4 grammar/generator/uniqueness/import rejectが十分か。
5. generationIdの初期化・delete-all・full replace restore・multi-tab guard接続がF2/F3と一致するか。
6. version exact match / no migration / registry未ACTIVE gateが十分か。
7. analytics/error loggingなし案が無料版v1のprivacy境界として妥当か。
8. XSS/network boundaryがF4実装条件として十分か。
9. raw16MB/pending1MB/256を安全値と誤認していないか。
10. F2/F3承認仕様を変更・後退していないか。
11. F4実装開始前に追加の設計差戻しまたは人間判断が必要か。

## 9. 希望判定

- version registry：DESIGN REVIEW PASS / CHANGES_REQUIRED
- F2/F3 compatibility：MAINTAINED / REGRESSED
- ID grammar/generator：PASS / CHANGES_REQUIRED
- version validation：PASS / CHANGES_REQUIRED
- telemetry/privacy boundary：PASS / CHANGES_REQUIRED
- F4 preimplementation conditions：READY FOR HUMAN DECISION / CHANGES_REQUIRED
- F4 implementation：**NOT AUTHORIZED until explicit human approval**

## 10. 人間判断候補

1. registry候補をACTIVEとして採用するか。
2. prefixed UUIDv4 recordId/generationIdを採用するか。
3. 無料版v1をexternal analytics/error loggingなしで実装する方針を採用するか。
4. 制作管理室PASS後、F4実装開始を明示承認するか。

## 11. 停止点

制作管理室の独立レビュー待ち。

禁止：
- F4コード実装開始
- F5/F6 PASS宣言
- production公開
- R005凍結解除
- 認証/cloud保存再開
- paid plan変更
- AWS resource作成
