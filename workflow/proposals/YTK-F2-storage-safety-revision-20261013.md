# YTK-F2 保存安全性 修正設計書

- 文書種別: F2安全性審査 S01〜S09 対応用・修正設計案
- 作成日: 2026-10-13
- 状態: **PROPOSED / 制作管理室レビュー待ち**
- F2全体承認: 未承認
- F3詳細仕様承認: 未承認
- F4実装: 未着手 / 未承認
- F5自動試験: 未実施
- F6実機試験: 未実施
- 本番公開: 未承認
- R005: 凍結維持

## 1. 参照した最新実データ

### Notion
- YTK-F2｜端末保存仕様｜検討ドラフト｜2026-10-11
  - 2026-10-13時点のS01〜S09審査指摘を含む最新版
- ヤットコ｜最新状態マスター｜2026-10-10方向転換版
  - 端末保存型無料版先行
  - R005凍結保全
  - F2 IN PROGRESS

### GitHub main
確認時HEAD:
`f18cd8d232c44636a3bc8e4dedbbf99906408f05`

確認した主要正本:
- R001 research: `5f66799eb2540d861512c701cdb6b2acfa21d4ce`
- R002 research: `a87e28c77f7b9e40476329cf56ceed8bd42afd9f`
- R003 storage-data: `431ced6d4bc3b0904eaed825b19046f80bfdf119`
- R001 prototype: `f090acdea6bb117f49614689ecf725b0cd14f2de`
- R002 prototype: `7e302dad973b827d2ee5d6026369c9656adf0f35`
- R001 review: `66cf81855e16730bbbc6a672b1da0adb1d4ead26`
- R002 review: `de3dde0209726361351434f397111f6456526fec`

R001/R002のAPPROVEDは非公開UXの承認であり、IndexedDB保存処理・公開仕様・本番公開の承認ではない。

## 2. 既承認事項として固定するもの

本修正では以下を変更しない。

- 端末保存の正式方式: IndexedDB
- アプリ定義上限: 10,000,000 bytes
- 容量判定: 保存後の構造化データ全体を決定的JSON表現へ変換しUTF-8 byte数を測る
- 10,000,000 bytes以下をアプリ側審査通過、10,000,001 bytes以上を拒否
- 保存失敗時: 明示モーダル、未保存入力保持、「保存済み」誤表示禁止
- 保存エラー分類: 主要5分類 + 原因不明
- 複数タブ競合対策B案: 古い内容の保存停止、自動統合・強制上書き禁止
- R001カテゴリ記録とR002サービス記録は分離
- R002は1サービス=1記録
- カテゴリ・サービス記録は一意の内部管理番号 + 更新番号を持つ
- 「その他」自由入力はサービス名だけ
- 自由メモ欄を作らない
- 秘密情報を入力・保存しない
- 外部サービス識別情報の実値を標準保存対象にしない
- R001は全体・カテゴリ単位のサマリー、R002はサービス単位の詳細正本
- サービス単位本人意向上書きはカテゴリ意向へ逆流しない
- 利用開始時に長期消失リスク + 適宜ファイルバックアップ推奨を表示
- 完了時・回答変更時・定期的な追加バックアップ催促は行わない
- プライベートモード専用検知・遮断を追加しない
- 保存失敗時の緊急ファイル退避を維持
- R005凍結を維持

## 3. 修正後の保存モデル

### 3.1 原則

旧R002 prototypeの `R2.records[]` / `editIndex` はUI試作用の一時状態としてのみ扱う。

**IndexedDBへは配列位置を識別子として保存しない。**

保存層では以下の4論理領域へ分離する。

1. categories
2. overview
3. services
4. meta

object storeの正式名称・keyPath等はF4実装開始前の制作管理室レビューで確定する。
本書では論理構造だけを固定候補とする。

### 3.2 category record

候補フィールド:

```text
recordId            内部管理番号。安定した一意ID
categoryId          A〜L
usageStatus         using / not_using / unknown
intention           keep / delete / family / undecided
revision            この記録の更新番号
schemaVersion       対応保存スキーマ版
```

- `recordId` は並び順・表示名・カテゴリラベルから生成しない。
- 1カテゴリ1記録を維持する。
- categoryIdは固定カテゴリ参照であり外部サービス識別情報ではない。

### 3.3 overview record

R001全体5問の正本。

候補:
- identity
- billing
- finance
- importantData
- family
- revision
- schemaVersion

5リスク軸、ToDo、件数等の派生結果は保存しない。

### 3.4 service record

候補フィールド:

```text
recordId
categoryId
serviceCatalogId     カタログ候補を選んだ場合
otherServiceName     「その他」の場合のみ
usageStatus
answers              許可された条件付き回答だけ
intentionOverride    null / keep / delete / family / undecided
revision
schemaVersion
```

保存しない:
- `editIndex`
- 配列位置
- `inheritedIntention`
- 計算済みのeffective intention
- 表示用ラベル
- 画面履歴
- UI選択状態
- 派生リスク
- 外部アカウントID等の実値

本人意向の表示値は常に:

```text
intentionOverride が null
  -> 現在の親カテゴリ intention
intentionOverride が存在
  -> intentionOverride
```

で算出する。

カテゴリ意向変更後も古い継承値がサービス記録へ残らない。

### 3.5 meta record

候補:

```text
schemaVersion
questionSchemaVersion    必要と制作管理室が判断した場合
generationId
globalRevision
```

#### generationId
- 現在のデータ集合の世代を表す内部UUID
- 全削除後に新しい空データ集合を作る場合に更新
- 全置換復元の成功時に更新
- 古いタブが削除前・復元前のデータを再保存することを拒否する根拠に使う

#### globalRevision
- 保存データ集合全体の更新番号
- 成功した保存系トランザクションごとに増加
- 別タブ更新の検知に使用
- record revisionとは別に保持する

#### record revision
- 各カテゴリ / サービス記録の個別更新番号
- 個別レコード修正対象の同定・診断に使用
- globalRevisionの代替にはしない

## 4. 保存要求の共通保護パイプライン

追加・更新・削除・カテゴリ連動変更・全削除・復元など、保存データへ影響する経路を個別実装せず、共通の保存保護層を経由させる。

基本順序:

1. UI入力を保存候補の構造化値へ変換
2. allowlist / 型 / 列挙 / 長さ / 条件分岐を検証
3. 現在タブが保持している `generationId / globalRevision / target revision` をexpected版として保持
4. 保存対象全storeを含むIndexedDB `readwrite` transactionを開始
5. transaction内で最新meta・必要レコードを読み直す
6. generation不一致なら競合停止
7. globalRevision不一致なら競合停止
8. target record revision不一致なら競合停止
9. R001/R002整合性を評価
10. 論理的に一意な「存在方向」の整合だけ候補データへ反映
11. 一意でない変更は保存を停止しユーザー再確認へ回す
12. 非表示となる条件付き回答を除去
13. 変更後の全保存データを決定的表現へ組み立てる
14. UTF-8 byte数を測定
15. 10,000,001 bytes以上ならtransactionをabortし上限超過扱い
16. 関係レコードとmeta revisionを同一transactionで更新
17. transaction `complete` を待つ
18. completeした版だけ「保存済み」へ反映
19. error / abortでは未保存UI状態を保持

注意:
- `put().onsuccess` 等の個別request成功だけで「保存済み」にしない。
- transaction開始後にnetwork / timer / unrelated Promise等を挟まない。
- transaction有効期間内でIndexedDB requestと同期処理を完結できる構造を優先する。

IndexedDB仕様上、transactionはatomicにcommit/abortされ、`complete` はcommit成功後に発火するため、この境界を保存成功判定に使う。

## 5. R001 / R002整合ルール

R003承認済みルールを変更しない。

### 自動整合可能な方向

1件の詳細情報から全体に「存在する」と論理的に確定できる場合だけ肯定方向へ整合する。

例:
- R002 `billing=yes` が存在 -> R001 billing を「あり」
- R002金融系 `asset=yes` -> R001 finance を「あり」
- R002 `importantData=yes` -> R001 importantData を「あり」
- R002 `familyKnow=no` -> R001 family を「知らないものあり」
- R002 `usageStatus=using` -> 親カテゴリが not_using なら using候補

### 自動で否定方向へ変更しない

- 最後のbilling=yesサービス削除 -> R001 billingを自動で「なし」にしない
- 全サービス削除 -> 親カテゴリを自動で「使っていない」にしない
- R002に記録がない -> R001「なし」を自動確定しない

### 親変更時

- R002条件付き質問の親回答変更 -> 非表示子回答を同じ保存候補から除去
- R001カテゴリを「使っていない」へ変更し、配下にusingサービスがある -> 確認なしでは保存しない
- カテゴリ削除 -> 明示確認後、カテゴリ記録と配下service recordsを同一transactionで削除
- カテゴリ意向変更 -> service `intentionOverride` は維持。override=nullのサービスだけ表示上新親意向を参照

## 6. 複数タブ・古いデータ復活防止

各タブは最後に読込成功した:
- generationId
- globalRevision
- 編集対象record revision

を保持する。

保存時の最新metaと1つでも不一致ならB案に従い保存停止。

競合時:
- 自動mergeしない
- force overwriteしない
- 同じ古いexpected版での単純retryを許可しない
- 未保存入力は画面上で保持
- 最新版読込・差分確認へ誘導

BroadcastChannel等の通知は補助にのみ使う候補。
保存可否の正本判定は必ずIndexedDB transaction内の版比較とする。

### 全削除 / 全置換復元

成功時に新しいgenerationIdを発行する。

これにより削除前・復元前のタブはgeneration mismatchとなり、旧recordIdが手元に残っていても再保存できない。

## 7. 同一タブ内の保存順序

同一タブからの保存を並列実行しない。

タブ内にsave coordinatorを置く候補とし、保存処理は1本ずつ直列化する。

各入力確定には一時的な `mutationSeq` を付与する。

例:
- seq 10 保存開始
- 保存中に利用者がseq 11へ変更
- seq 10 transaction complete
- DB上はseq 10相当までcommit済み
- 画面はseq 11が存在するため「現在の入力が保存済み」とは表示しない
- seq 11を次の保存対象として処理

古い保存完了イベントが新しい入力へ「保存済み」を誤表示しないことを必須とする。

`mutationSeq` はUI一時状態でありIndexedDB正本へ保存しない。

## 8. 削除の安全境界

### サービス1件削除
- recordIdで対象を特定
- 配列indexやサービス名で特定しない
- R001全体回答を否定方向へ自動変更しない
- transaction complete後に削除済み表示

### カテゴリ削除
「使っていないへ変更」と「カテゴリ保存データ削除」を別操作として維持。

明示確認後:
- category record
- そのcategoryId配下のservice records

を同一transactionで削除する。

### 全削除
- 全利用者整理recordを1transactionで削除
- metaは新generationへ更新
- 途中失敗時は旧データ集合を維持
- 古いタブはgeneration mismatchで保存拒否

ブラウザー保存版ではサーバーバックアップやサーバーtombstoneは存在しない。
F3ファイルバックアップからの復元で削除データを復活させる問題は復元時generation切替と明示確認で扱う。

## 9. 復元へのF2安全要件

詳細ファイル形式・最大入力ファイルサイズはF3で決定し、本書では正式承認しない。

F3へ以下を必須要件として引き継ぐ。

復元前に:
- raw file byte上限
- parse後データ量
- schemaVersion
- 必須field
- unknown field
- field type
- enum
- 文字長
- 禁止情報field
- 予期しないnested object
- duplicate recordId
- duplicate category
- category/service整合
- 条件分岐整合
- 10MBアプリ上限

をallowlist検証する。

不正・未知・破損・空データを「新規利用状態」とみなして現在データを上書きしない。

全置換復元は利用者の明示確認後、全対象store + metaを同一transactionで置換する。
commit失敗時は既存データを維持する。

成功時:
- generationId更新
- globalRevision更新
- 古いタブを無効化

## 10. 秘密情報・XSS・外部流出防止

### 入力 / 保存
既存R003 D区分をそのまま継承する。

専用fieldを作らない:
- password
- PIN / passcode
- OTP / OTP seed
- recovery code
- private key / seed phrase
- full card number
- CVV / CVC
- passkey secret
- API key
- access / refresh token
- SSH private key
- cookie / session token
- その他、直接ログイン・本人確認突破・送金・資産操作に使用できる秘密

### 「その他」サービス名
- 用途はサービス表示名だけ
- 現行R002に合わせ最大60文字
- NFKC等の正規化候補
- 制御文字・bidi制御等を拒否候補
- 外部識別情報らしい入力を保存しない
- 秘密語検知regexは補助防御であり安全保証に使わない
- 保存 / 復元時も同じvalidatorを通す

### 描画
利用者入力文字列をHTMLとして解釈しない。
`textContent` 相当の安全なテキスト挿入を使用する。

### JSON取込
unknown keyを柔軟に保持しない。
想定外nestをそのまま保存しない。

### 外部送信
整理内容を以下へ送らない:
- analytics
- error monitoring
- APM
- session replay
- screen recording
- crash report
- remote logging

エラーには内容本文ではなく:
- error category
- operation type
- internal opaque IDが本当に必要な場合のみ
等のallowlist情報だけを使用する。

公開origin・第三者script・CSPはF4開始前に別途構成審査する。
F2設計だけで外部流出防止をPASS扱いしない。

## 11. 容量判定

### canonical capacity projection

IndexedDB内部の物理サイズではなく、人間承認済みのアプリ定義サイズを算定する。

容量計測用に固定順序のprojectionを生成する候補:

```text
{
  schemaVersion,
  questionSchemaVersion?,
  generationId,
  globalRevision,
  overview,
  categories: categoryId順,
  services: recordId順
}
```

各record内のproperty順も実装で固定する。

含める:
- ID
- revisions
- schemaVersion
- 保存対象の構造化回答
- 「その他」サービス名

除外:
- UI一時状態
- 派生結果
- 保存禁止情報

`JSON.stringify(canonicalProjection)` を `TextEncoder` でUTF-8化しbyteLengthを測る。

判定:
- <= 10,000,000: アプリ側容量条件PASS
- >= 10,000,001: 書込拒否

ブラウザー実quotaとは別。
`navigator.storage.estimate()` 等を使う場合も参考値に留め、保存成功判定には使わない。

### performance

最大近傍の全量serializationはPCよりiPhone Safariで負荷が高い可能性がある。

安全性を落として古いsnapshotを使う最適化はF5/F6前に採用しない。

F5/F6で10MB近傍の処理時間・UI停止・transaction維持を測り、許容できない場合は容量計算方式の安全な最適化を再設計して再審査する。

## 12. 保存失敗

既承認の6分類を維持。

保存処理中の候補データは「保存済み」と区別する。

成功:
- transaction complete
- expected mutation/versionと対応している
場合のみ保存済み表示。

失敗:
- transaction error / abort
- app上限
- quota関連
- storage利用不可
- conflict
- その他

では画面上の未保存入力を保持する。

競合は一般retryでは解決させない。
最新版確認を先に要求する。

再試行で回復しない保存失敗では既承認の緊急ファイル退避を提示する。

## 13. 通常バックアップ / 緊急退避の境界

F3詳細形式は未承認。

F2からF3へ以下の意味分離を要求する。

### committed snapshot
IndexedDB transaction complete済みの正本。

### pending overlay
画面には存在するがIndexedDBへcommitされていない直近入力。

緊急退避ではpendingを含めてよいが、committedと同じ意味で混ぜない。

F3共通形式は:
- committed部分
- pendingが存在するか
- pendingがどのrecord / operationへ適用される候補か
- base generation / base revision
を判別できる必要がある。

pendingも書出し前に:
- allowlist
- type
- enum
- length
- 禁止field
- dependency
を検証する。

復元時、pendingを自動でcommittedへ昇格させず、復元後の最新データへ再適用できるか検証して利用者確認へ回す設計をF3で審査する。

ファイル生成開始だけを成功扱いしない。
ブラウザーが保存完了を直接保証できない場合は利用者へファイル存在確認を促す。

## 14. 端末保存の長期消失

IndexedDBはブラウザー保存であり、保存成功と長期保持は別。

維持する表示:
- 利用開始時にデータ消失可能性
- Safari等の長期未利用リスク
- 適宜ファイルバックアップ推奨
- 共用端末では他者閲覧可能性

追加しない:
- 完了時催促
- 回答変更時催促
- 定期通知
- プライベートモード専用検知 / 遮断

「保存済み」は直近transaction commit済みを意味するだけで、「消えない」「永久保存」を意味しない。

## 15. 修正前後の主な違い

### 修正前
- R002の配列 / editIndexが保存版へ入り得る境界
- inheritedIntention複写
- record revisionだけでは全削除 / 復元競合が不足
- request successとtransaction completeの境界が未定義
- pending入力とcommittedデータのバックアップ境界が未定義
- 復元 / 全削除後の古いタブ復活防止が未定義

### 修正後案
- stable recordIdで個別記録を管理
- intentionOverrideだけ保存し親意向は都度参照
- record revision + globalRevision + generationId
- 保存系経路を共通transaction guardへ集約
- transaction completeだけを保存成功
- save coordinatorで同一タブの順序逆流を防止
- restore / delete-allでgeneration切替
- committed snapshotとpending overlayを明確に分離
- canonical JSON/UTF-8容量判定
- F3へ安全な復元境界を明示

## 16. 設計段階で残るもの

本書はF2修正設計案であり、以下を証明しない。

- IndexedDB実装が正しい
- Chrome / Safariで同じように動く
- 10MB近傍で十分な性能
- 長期データ保持
- ファイルバックアップ成功
- 復元成功
- XSS不存在
- 外部送信不存在
- 複数タブ競合防止の実動作
- 保存失敗分類精度

これらはF5 / F6およびF7以降のゲート対象。

## 17. 停止位置

本書を制作管理室へ提出し、正式レビュー待ちで停止する。

禁止:
- F2全体の自己承認
- F3詳細仕様の正式承認
- F4実装開始
- 本番公開
- R005凍結解除
- 認証 / クラウド基盤再開
