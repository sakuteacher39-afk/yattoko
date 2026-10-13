# YTK-F2 端末保存仕様｜人間正式承認記録

- 承認日：2026-10-14（JST）
- 判定：**F2 DESIGN APPROVED（人間明示承認）**
- 承認者：人間編集・運営責任者（チャット上の明示決定）
- 審査対象設計commit：`0d5dfa387f924e5dc3dc9196b9f236986c910281`
- 制作管理室正式再レビュー3 commit：`d9f56a8d9b8095382d809cdd4921e08062953a22`
- 正式レビュー原本：`workflow/reviews/YTK-F2-storage-safety-formal-rereview3-20261013.md`

## 人間の承認内容

> ヤットコのF2設計全体を正式承認する。
> ただし、この承認はF2設計に限定する。F3詳細仕様、F4実装開始、F5/F6試験PASS、本番公開、R005凍結解除は承認しない。
> 残存リスクは後続工程で検証し、安全性を確認すること。

## 承認範囲と非承認事項

- F2設計全体：**APPROVED**。S01〜S09設計是正PASS、F2-R01〜R09解消を前提に、上記commitの5設計成果物を対象とする。
- F5/F6試験計画：**SUFFICIENT / NOT RUN**。実施・PASSの承認ではない。
- F3詳細仕様：**NOT APPROVED**。ファイル形式、容量境界、復元詳細などは別途審査。
- F4実装開始：**NOT AUTHORIZED**。別途明示承認が必要。
- F5/F6試験結果：**NOT RUN**。安全性実証済みとは扱わない。
- 本番公開・課金・外部リソース作成：**NOT AUTHORIZED**。
- R005：**FROZEN**。凍結解除・認証／クラウド同期再開は未承認。

## 残存リスク・次の作業

Safariの長期natural eviction、browser quota、iPhone Safariの10MB近傍性能、private modeの実挙動、file download/restore、CSP/origin/第三者script、F3のfile size境界、XSS/外部送信等は後続F3〜F7の該当審査・試験に引き継ぐ。未試験をPASS扱いしない。

**次工程はF3詳細仕様の検討・設計案作成に限定**。F3の正式承認、F4実装開始は行わず、必要な審査と人間の別承認を待つ。

本記録は過去のレビュー原本を改変しない独立した人間承認証跡である。
