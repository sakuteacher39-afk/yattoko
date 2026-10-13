# YTK-F3 バックアップ・復元詳細設計｜制作管理室 独立正式レビュー1

- 審査日：2026-10-14（JST）
- 対象commit：`b1a6f6a08d21f677eab0450b9d620df960c412be`
- 対象3文書：`workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`、`workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md`、`workflow/reviews/YTK-F3-backup-restore-design-review-request-draft-20261014.md`
- 照合：Notion F3専用ページ・最新状態マスター、F2正式承認（`263efbf030693efb5d8071fcba6f93e4970971b1`）と承認対象F2設計（`0d5dfa387f924e5dc3dc9196b9f236986c910281`）
- 総合判定：**CHANGES_REQUIRED / F3 NOT APPROVED**
- F5/F6計画：**CHANGES_REQUIRED / NOT RUN**
- F2：**APPROVED維持（承認範囲に変更なし）**
- F4：**NOT AUTHORIZED**、本番公開：**NOT AUTHORIZED**、R005：**FROZEN**

## 審査の概要

通常バックアップがcommitted partialとcompletedを含みpendingを除外する設計、同一readonly transactionで一貫したsnapshotを取得する方針、取込時のstrict schema validation、全置換の明示確認、readwrite transaction completeまで復元成功と表示しない方針は評価できる。ただし、緊急退避の原子性・未退避の扱い、duplicate-key/canonical digestの検証、復元後の世代・容量処理と競合復旧、ファイルサイズ閾値に不備／未規範化がある。設計PASSの前に是正が必要。

## 正式差戻し事項（制作部への修正指示）

### F3-R01【P0】emergency pendingの完全性・依存関係を規範化
- 現行設計は「複数pendingが不整合ならcommittedのみ」とするが、保存失敗・競合で直近の画面の回答が失われ得る場合に何を保持し、何が退避できなかったかの判定と操作順序が十分一意ではない。
- F2のpending overlayが実際に保持する単位（確定操作、current unsaved、dependent mutation）、最大256件／1MB超過時、部分validation失敗時、別タブ更新時の扱いを状態遷移表で固定する。未退避の全件数・該当範囲を表示し、画面上の未保存入力は保持し、file作成開始だけで救済成功と表示しない。
- snapshot取得時のgeneration/globalRevisionとpendingのbaseを照合し、取込時もchecksum・version・target identityを再検証する。相互依存が壊れたpendingは黙って順番を入れ替えたり一部だけ確定しない。
- F5：複数依存pending、部分invalid、競合発生、上限超過、emergency download failure、UI喪失前の対処を追加。

### F3-R02【P0】duplicate JSON key・checksumの認証範囲を固定
- 現行の「duplicate-key検出またはcanonical byte一致検証」は代替手段の曖昧な記載。JSON.parseのみではduplicate keyが消える。受理形式、非canonical原文、数値表現（指数/負ゼロ/整数範囲）、escaped key、Unicode正規化、不正UTF-8/BOM、root/nested全層での拒否条件を固定する。
- digest対象を単一の決定的serializationへ固定し、checksum検証前後のparser再解釈差を禁止する。少なくとも正常・重複key・escape同値key・key並替・指数数値・未知nest・部分破損を含む規範test vectorを提示。
- SHA-256は真正性・改ざん防止・暗号化ではない。合致してもstrict validator合格前に安全判定しない。

### F3-R03【P0】全置換復元の失敗原子性と世代境界を確定
- Preview前読取不可・破損した既存正本への復旧経路で、metaが検証不能のときに競合検知を省略して意図しない上書きを認めないこと。破損と未初期化を区別し、競合を確認できない場合の明示停止／別の復旧確認と、データ喪失警告を規範化。
- version comparison、store一括削除＋全insert＋meta新generation、新prospective10MB測定を単一readwrite transactionで一貫して実行する。precomputeとtransaction中の検証を分離し、無関係なawait・transaction inactivityを避ける実装可能な手順を明記。
- 新generationId/globalRevision=1/recordRevision保持がF2のrevision・世代規則に適合すること、移行後のrecordId衝突・世代切替・rollback・旧タブ拒否を規範化。new generation/meta byteを含めた10MB判定は書込みの前後で一致する必要がある。
- F5：meta破損、preview競合、途中abort、quota例外、最終meta書込み失敗、上限境界、旧タブ再書込、pending再適用前競合の全経路を追加。

### F3-R04【P1】16MB/1MB/256件の上限根拠と資源枯渇耐性
- 16,000,000 raw bytesは10,000,000 committed + pending 1,000,000 + envelopeに余裕を持たせる暫定候補として合理性はあるが、iPhone Safariの最大ピークメモリ・JSON parse/serialize/hashの複製数・UI応答性は未実測。『安全』と認定できない。
- raw file size事前拒否に加え、parse前に可能なトークン・ネスト・配列／キー数の制御、parse失敗時のメモリ保護、タイムアウト／UI停止時の利用者保護を詳細化。端末性能によっては閾値引下げを提案する。
- 1MB/256件が多すぎる／少なすぎる事例を評価し、F5境界・iPhone実機F6の数値・PASS基準を明記。採用の最終判断は人間へ付議する。

### F3-R05【P1】緊急ファイル復元後のpending保持・再適用UX
- pendingをIndexedDBへ無断保存しない方針は維持するが、snapshot全置換後にリロード・画面遷移・Safari background/killが起きた場合、pendingが消失する危険がある。ファイルからの再取込導線と警告、どの操作まで未確定か、再適用が一部成功した場合の残余と再実行時の二重適用防止を定義。
- operation ID、base generation/revision、依存連鎖、復元後の対象record mapping、競合時の再確認、ファイル選択から再適用までの状態遷移を明記。無断silent commitは禁止。
- F5/F6：再読込、バックグラウンド復帰、途中適用失敗、二重タップ、二回目取込、操作順依存、最後の削除済対象などを追加。

### F3-R06【P1】平文JSONの利用者説明と取扱境界
- 平文JSONは秘密情報を集めないR003と直ちに矛盾しないが、サービス利用状況・本人意向・資産に関する整理は私的情報であり、ファイル・iCloud Drive等への自動同期／共有／共用端末からの閲覧リスクがある。
- 書出し前に平文であること、ファイル保存先の自己管理、不要な共有を避けることを短く具体的に説明。Webアプリはファイルを自動アップロードしない。SHA-256で秘匿されないことを説明。UI文言案を提示する。
- 暗号化有無と全置換方式・容量上限は、人間がF3で別途判断する。暗号化や外部送信を勝手に追加しない。

### F3-R07【P1】version registryとF2承認正本との一意な接続
- schemaVersion/questionSchemaVersion・recordId形式がF2で具体値未確定。v1が受け入れる完全なversion registry、正規snapshot field order/enum、R07-R09 resolver、category mapping、inactive conditional field、不正IDの拒否を仕様付属書で一意に固定する。仮のschemaVersion=1を本番値とみなさない。
- F2のauthoritative dataset、normal backup、emergency snapshot、restore prospective datasetのbyte計測方法を同一規範で記述する。F2そのものの変更が必要なら新規人間承認を要し、F3のレビューで黙って変更しない。

## 審査9項目の判定

1. 通常backup：基本設計妥当。ただしversion/schemaの一意化まで条件付き。
2. 緊急退避：CHANGES_REQUIRED（R01/R05）。
3. 不正ファイル：CHANGES_REQUIRED（R02/R07）。
4. 復元失敗時旧正本維持：CHANGES_REQUIRED（R03）。
5. raw16MB：暫定候補として説明可能だが合理性の実測不足（R04）。
6. iPhone Safari：File API/Blob方式は設計候補だが実機未検証（R04/R05）。
7. 暗号化なし：直ちに禁止ではない。プライバシー説明と人間の明示判断が必要（R06）。
8. F2整合：F2承認原則は概ねMAINTAINED。接続詳細未確定をR07として差戻し。
9. F5/F6：広範囲を網羅するがR01〜R07の失敗経路テスト不足。CHANGES_REQUIRED / NOT RUN。

## 次工程・停止境界

制作部はR01〜R07を設計・試験計画・審査依頼の3成果物へ反映し、commit SHAと変更一覧を付けて再提出。制作管理室は原本照合の上で独立再レビューする。残存設計問題が解消するまでF3の人間承認付議は保留。F2人間承認は維持。F3 NOT APPROVED、F4 NOT AUTHORIZED、F5/F6 NOT RUN、本番公開 NOT AUTHORIZED、R005 FROZEN。
