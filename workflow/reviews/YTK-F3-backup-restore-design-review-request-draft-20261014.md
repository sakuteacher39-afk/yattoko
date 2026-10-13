# YTK-F3｜バックアップ・緊急退避・復元 詳細設計案 レビュー依頼（未正式提出）

- 起案：2026-10-14
- 状態：**DRAFT / REQUEST PREPARED / NOT REVIEWED / NOT APPROVED**
- F2人間承認：`workflow/reviews/YTK-F2-human-approval-20261014.md`（commit `263efbf030693efb5d8071fcba6f93e4970971b1`）
- F3設計案：`workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`
- F3試験計画案：`workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md`

制作管理室へお願いしたい独立審査は、F2承認済み仕様を不変の前提として、以下の技術面と人間判断境界を確認すること。

## 必須審査論点

1. **F2との整合**：R001/R002全項目、unanswered/unknown、partial/completed、R07/R08/R09、カテゴリー親子整合、revision/globalRevision/generationId、容量10,000,000 bytes、秘密情報入力禁止、既承認バックアップの通知頻度。
2. **v1 envelopeの成立性**：`fileFormat`/`fileFormatVersion`/`kind`/`snapshot`/`pending`/`checksum`、JSON正規化順とSHA計算対象、ファイル名、未来のversion不一致のfail-closed。現F2ではschemaVersion/questionSchemaVersion実値未確定である点をどう安全にF4前へ引き継ぐか。
3. **raw 16MBとpending 1MB/256件**：iPhone Safariのピークメモリ・読み取り負荷を考慮し、アプリ側10MB計算とは別の閾値が妥当か。採用する場合の根拠、境界試験、超過時の利用者への説明。
4. **normal backup**：同一readonly transactionの一貫したスナップショット、committed partial含有、pending不含有、ファイルが物理保存されている保証がないことを踏まえた表示。
5. **emergency**：保存失敗時の全pending保存可能性、複数mutationの依存、base版、秘密情報混入防止、pending invalid時の明示、committed部分だけ退避した場合の誤表示防止。緊急ファイル自体も保存失敗する出口。
6. **strict import**：UTF-8 fatal decoding、JSON duplicate-key、root/nested allowlist、unknown version、recordId/categoryKeyの一意性、cross-field invariant、checksumは真正性・暗号化でないという限界。
7. **atomic restore**：プレビューまで書込なし、既存データの明示置換確認、競合guard、schema/10MBの検査、完全置換でgeneration更新、abort時旧正本維持。削除済みデータの無断復活や自動merge禁止。
8. **緊急pending再適用**：snapshot復元後の未commit扱い、ユーザー明示操作、旧baseから新generationへの照合、通常save gateを通し、quota/競合時に再度拒否できること。
9. **安全性とUX**：非暗号化平文ファイルの秘匿性、共有PC/Filesアプリ/クラウド同期のリスク、追加ポップアップを増やさない方針、iPhone Safari互換性、内容を外部送信しないこと。
10. **F5/F6試験計画**：境界値／破損／不正file／原子失敗／別端末双方向復元／Safariのファイル操作・メモリ・ブラウザー終了再起動まで網羅しているか。試験未実施をPASS扱いしない。
11. **意図しないF2変更の有無**：設計案がF2承認範囲を超える場合は人間へ差戻し、F2を黙って書換えない。
12. **人間判断事項**：非暗号化JSON、full replaceのみ、raw16MB・pending1MB/256件、表示文言などを変更／追加するなら、リスクと推奨案を非専門家に説明できる形で提出。

## 判定様式（候補）
- Envelope & integrity：PASS / CHANGES_REQUIRED
- Normal backup：PASS / CHANGES_REQUIRED
- Emergency pending：PASS / CHANGES_REQUIRED
- Strict import/restore & atomicity：PASS / CHANGES_REQUIRED
- Size / performance gates：PASS / CHANGES_REQUIRED
- F2 approved constraints：MAINTAINED / REGRESSED
- F5/F6 test plan：SUFFICIENT / CHANGES_REQUIRED（実施結果はNOT RUN）
- F3設計：DESIGN REVIEW PASS / CHANGES_REQUIRED / HUMAN APPROVAL PENDING
- 人間判断：REQUIRED / NOT REQUIRED、必要なら個別に明示

## 停止位置

**F3は現時点でドラフト。制作管理室レビューも未実施。**
- ツール操作・提出の有無に関わらず、F3自己承認、F4実装、F5/F6 PASS、本番公開、R005凍結解除は禁止。
- レビュー結果をGitHub原本へ記録し、Notion F3子ページ・最新マスターを更新する際は承認済みF2との境界を維持する。
