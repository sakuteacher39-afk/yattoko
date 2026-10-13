# YTK-F2 保存設計 修正後レビュー依頼

制作管理室 御中

F2安全性審査（2026-10-13）でCHANGES_REQUIREDとなったS01〜S09について、最新のNotion F2ドラフト、ヤットコ最新状態マスター、GitHub上のR001/R002/R003正本・R001/R002 prototype・正式reviewを再照合し、修正設計を作成しました。

本提出は**F2全体の自己承認ではありません**。
また、設計完了を安全性試験PASSとして扱いません。

## 提出成果物

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. 本審査依頼

## 主な修正点

- 旧R002の `R2.records[] / editIndex` を保存層の識別に使わない
- service recordはstable internal `recordId` で管理
- `inheritedIntention` を保存せず、overrideがなければ現在のcategory intentionを参照
- 人間承認済みrecord revisionに加え、`globalRevision + generationId` を競合保護候補として追加
- 全削除・全置換復元でgenerationを切り替え、古いtabからの復活を防止
- R001/R002の依存更新を同一readwrite transactionで整合審査・commitする
- IndexedDB request successではなくtransaction `complete` だけを保存成功とする
- 同一tab内のsave coordinator + mutation sequenceで古い完了イベントの逆流を防ぐ
- canonical JSON / UTF-8容量判定を10,000,000 byte境界へ適用
- committed snapshotと未保存pending overlayを分離してF3へ安全引継ぎ
- 秘密情報・XSS・外部送信防止のallowlist境界を明記

## 制作管理室に確認してほしい事項

### A. 既存承認との整合
- IndexedDB、10MB、B案、保存失敗UI、ファイル退避、保存3原則を変更していないか
- R001/R002/R003の承認範囲を拡張・改変していないか

### B. revision設計
以下の3層をF2の技術要件として採用可能か:
- record revision
- globalRevision
- generationId

特にdelete-all / restore時のgeneration切替を確認願います。

### C. transaction境界
- categories / overview / services / metaの依存変更をatomicに扱う範囲
- transaction completeだけを保存成功とすること
- capacity判定とrevision照合を同じ保護経路に置くこと

### D. R001/R002整合
- R003どおり肯定方向だけ自動整合
- 否定方向は自動確定しない
- 判断不能時は保存停止または再確認へ送る

### E. F3への引継ぎ境界
本提出ではF3ファイル形式を正式決定していません。
以下をF3必須要件として引き継ぐことだけを審査してください。

- strict import validation
- atomic restore
- generation切替
- committed / pending意味分離
- file生成失敗を成功表示しない

### F. F5/F6
添付試験項目がS01〜S09の是正条件を実証するのに十分か確認願います。

## 人間へ差戻しが必要になる条件

技術レビューの結果、次のいずれかが必要になった場合のみ人間判断へ差戻してください。

- 既承認UXの追加変更
- 10MB上限または計測方式の変更
- 新しい定期通知/backup催促
- private modeの検知/遮断追加
- persistent storage等の新しいbrowser permission/挙動
- third-party analytics導入
- 外部resource / 課金
- R005再開

## 維持する禁止事項

- F2全体の自己承認
- F3詳細仕様の正式承認
- F4実装への着手
- 本番公開
- R005凍結解除
- 認証・クラウド基盤再開

## 希望判定

制作管理室には、少なくとも以下を分けて判定してください。

- S01〜S09 設計是正: PASS / CHANGES_REQUIRED
- F2設計全体: REVIEWED / NOT APPROVED
- F5/F6試験計画: SUFFICIENT / CHANGES_REQUIRED
- 人間追加判断: REQUIRED / NOT REQUIRED

正式レビュー完了までは次工程へ進みません。
