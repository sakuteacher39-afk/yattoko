# YTK-F3｜バックアップ・緊急退避・復元 詳細設計案 v0.1

- 起案：2026-10-14
- 状態：**DRAFT / NOT REVIEWED / NOT APPROVED / NO IMPLEMENTATION**
- 対象：端末保存型無料版。外部通信・ログイン・サーバー保存なし。
- 正本：F2人間正式承認記録 `workflow/reviews/YTK-F2-human-approval-20261014.md`（commit `263efbf030693efb5d8071fcba6f93e4970971b1`）。
- F2承認対象設計：`workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`（commit `0d5dfa387f924e5dc3dc9196b9f236986c910281`）。
- R003：`workflow/research/YTK-R003-storage-data.md`。
- 本書は**技術的な提案**であってF3の正式仕様ではない。F2承認内容の変更、F3正式承認、F4実装、F5/F6のPASS、本番公開、R005凍結解除を行わない。

## 1. 利用者向けの約束と対象外

- 通常バックアップ：IndexedDBでtransaction `complete` 済みの**全確定データ**を端末上のファイルに書き出す。R001未回答、R002 `partial` と `completed` をすべて含む。`pending`、画面履歴、入力途中の「その他」未確定名は含めない。
- 緊急退避：保存失敗・競合で未commit操作が画面に残り、再試行不能または再試行で復旧しない場合、**確定済みsnapshot＋未保存操作（別領域）**をファイルに出す。未保存操作を確定済みデータとして偽らない。pending自体を退避できない場合は、確定済み部分のみのファイルであると**明示**してよいが、未保存部分の退避成功とは表示しない。
- 復元：ユーザーが手元のファイルを選択し、内容の厳格な検査と上書き確認が通った場合のみ、現在の端末データを**丸ごと置換**する。無断merge・欠損自動修復・削除済みデータの無断復活をしない。
- データ移行：PC ChromeとiPhone Safariなど、異なる端末／ブラウザー間を同じファイル形式で移せることを目標にする。ブラウザー側の端末領域やOSがファイルを消す可能性は残る。
- ファイルは**暗号化なしのJSONを初期候補**とする。サービス名・本人意向等が含まれるため、端末の共有・ファイル共有・クラウドドライブへの自動同期を含め、利用者への注意が必要。暗号化を無断採用せず、必要性は人間判断項目とする。アプリ側の無断クラウドアップロードは行わない。
- 自動的な繰返しバックアップ催促は追加しない。利用開始時の「消失リスク＋適宜バックアップ推奨」はF2承認どおり維持。復元／緊急退避時の必要な確認表示は催促とは別の、安全操作のためのUI。

## 2. 共通ファイル仕様案

### 2.1 ファイル名・媒体
- ファイル名：通常 `yattoko-backup-YYYYMMDD-HHMMSS-XXXXXXXX.json`、緊急 `yattoko-emergency-YYYYMMDD-HHMMSS-XXXXXXXX.json`。時刻はローカル表示用、8桁部分はランダム値等（ユーザーデータやアカウント識別子ではない）。ファイル名の重複を避ける目安にすぎず、保存先での重複・上書きを防ぐ保証ではない。
- Content-Type候補：`application/json;charset=utf-8`、UTF-8（BOMなし）。ファイル選択UIは`.json`優先。ただし拡張子・MIMEは信用せず内容で判定する。
- 初期形式：非圧縮単一ファイル。ZIP・GZIP・暗号化ZIP・HTML・CSV・アーカイブ等はv1で扱わない。
- 形式互換性：`fileFormat="yattoko-backup"`、`fileFormatVersion=1`、snapshot内の`schemaVersion` / `questionSchemaVersion`を独立に検証する。F2の後二者の実値はF4前のversion registry審査で確定する。未登録のバージョンは推測変換せず拒否。

### 2.2 v1 envelope概形（すべて候補、最終キーは要審査）
```json
{
  "fileFormat": "yattoko-backup",
  "fileFormatVersion": 1,
  "kind": "normal",
  "exportedAt": "2026-10-14T00:00:00.000Z",
  "snapshot": {
    "schemaVersion": 1,
    "questionSchemaVersion": 1,
    "generationId": "example-opaque-id",
    "globalRevision": 1,
    "overview": {},
    "categories": [],
    "services": []
  },
  "pending": null,
  "checksum": {
    "algorithm": "SHA-256",
    "hex": "64 lowercase hex characters here"
  }
}
```
- 上は**形状を示す非実用例**であり、`overview={}`・`categories=[]` は有効なバックアップ内容ではない。実ファイルはF2正本のすべての必須項目と12カテゴリー等を含む。
- `kind` は`normal` または`emergency`のみ。normalの場合`pending=null`を必須にする。emergencyの場合もpending部分が退避できなければ`pending=null`を許し、**UIに「未保存回答は含まれない」と示す**。
- rootキーと順序は`fileFormat,fileFormatVersion,kind,exportedAt,snapshot,pending,checksum`。unknown root key / nested key、重複JSONキー、非法整数、不正文字列を拒否。完全な正規化形式および二重キー検知方法は制作管理室のレビュー対象。
- snapshotはF2のcanonical capacity projection（`schemaVersion,questionSchemaVersion,generationId,globalRevision,overview,categories,services`）と同じ意味・キー・並び順。categoriesは既承認の12キー順、servicesはrecordId順。**確定済みpartial serviceも出力する**。
- `exportedAt` は情報提供用で、正当性・新しさの証明には使わない。端末時計は信用しない。機微な識別子・メール・ログイントークン・端末ID・外部サービスアカウントIDを別途追加しない。

### 2.3 整合性チェック
- v1候補はSHA-256を使用。`checksum`を除くroot6フィールドを**定義順のJSON/UTF-8の決定的な直列化**でバイト列にしてdigestし、lowercase hexへ格納。再読込時にも同じ表現から検証する。
- digest不一致・形式不一致・重複キー・不正構造は**復元開始前に拒否**。`checksum`は偶発的破損の検出に役立つが、**認証・改ざん防止・暗号化ではない**。攻撃者は中身とdigestを同時に書き換え得る。
- Web Cryptoの`SubtleCrypto.digest`等の使用はHTTPS secure context前提で互換性を実機確認。digest生成失敗時は成功表示禁止。
- digest計算はIndexedDB transaction外で行い、読込transaction内に無関係な`await`を挟まない。
- 書出したファイルをブラウザーが**実際に保存したか**を常に判定できるわけではない。アプリは`ファイル保存の操作を開始しました。保存先のファイルを確認してください`等の事実だけを表示し、端末保管完了を断定しない。

## 3. ファイルサイズ・メモリ保護（初期候補／人間未承認）

F2の**IndexedDB側10,000,000 byte上限と別**の境界を提案する。

| 境界 | v0.1候補 | 判定 |
|---|---:|---|
| ローカルに読込む生ファイル | 16,000,000 bytes 以下 | 超過は読込・parse前に拒否 |
| snapshot内F2正本の容量projection | 10,000,000 UTF-8 bytes 以下 | 1 byte超過でも拒否 |
| 緊急pending領域の直列化量 | 1,000,000 UTF-8 bytes 以下 | 超過はpendingの退避不可と明示 |
| 緊急pending操作数 | 最大256件 | 超過を無断切捨てしない |
| JSON構造の深さ | 最大16 | 過深は拒否、v1の本来の階層はもっと浅い |
| JSON展開後の容量 | raw限界だけでなくsnapshot/pendingごとの上限と構造allowlistで制限 | サイズだけで安全とみなさない |

- 通常ファイルは10MBのsnapshotにenvelopeを足すため、ファイル上限を10MBと同一にしない。緊急時はpendingがさらに追加される。
- pendingが上限を超過／validation失敗でも**古いpendingを黙って消去しない**。committed snapshotのみを出す代替を明示できるが、「未保存分は退避されていません」と必ず表示。元の画面の未保存入力を保持する。
- 上限値はF5境界・性能試験とF6 iPhone Safari実機負荷から修正提案があり得る。**この数値の正式決定はF3独立レビューと人間承認の後**。
- decode/parseの時間・ピークメモリ制約もF5/F6で評価する。読込エラー・メモリ不足は既存保存正本に影響させない。

## 4. 通常バックアップ手順

1. 利用者が通常の「バックアップファイルを保存」操作を選ぶ。
2. IndexedDBの関連storeを**同じreadonly transaction**で読取り、完了時点で整合するcommitted snapshotを得る。別々の非原子的読取りを混ぜない。dataset未作成時は「保存済みデータがありません」と説明し、空ファイルを正常バックアップと誤認させない。
3. すべてのrecord・R001/R002 cross-field・schema・10MB計測をstrict validatorで確認。不整合があれば書出しを止め、「記録を確認できませんでした」と案内。勝手に修復しない。
4. snapshotのcanonical JSONを生成し、envelope・checksumを生成し、16MB制限を満たすことを確認する。新たなID/revisionは書出しによって増加させない。
5. Blob/object URL +ユーザー起点のダウンロード操作を候補とし、PC Chrome/iPhone Safariで実機確認。特定ブラウザーのFile System Access APIだけを必須にはしない。Object URLは早過ぎるrevokeで保存失敗しないよう安全に解放。
6. UIは「ファイル保存が開始された可能性」を正しく表現し、必要な場合保存先確認を促す。通常バックアップは`pending`を含めない。未保存入力が画面上にある場合は同操作内に「未保存の回答は含まれません」と明示するが、定期通知は追加しない。

## 5. 緊急退避：pendingを分離する

- F2における未commit mutationの集合を`pending.operations`（操作順）としてファイルへ記録する**案**。単に画面全体のUI stateをdumpしない。
- pending領域候補：
  - `baseGenerationId`、`baseGlobalRevision`、対象`baseRecordRevision`等
  - `operations`：操作ID（ファイル内一意）、対象内部recordId/categoryKey、承認された操作種別、必要最小限のcanonical値／dependent answer、操作の順序
  - snapshot全体から計算した`baseChecksumSha256`等（pendingとcommittedの関係確認に使用）。これは真正性保証ではない。
- 許可操作はF2保存イベント表（R001 category/overview/intention、R002 known/other identity/usage/optional/override/completed）に限定。削除・全消去・復元を未commit操作として勝手に再実行させない。秘密情報／自由メモ／画面位置／mutationSeqの内部実値は含めない。
- 複数pendingの依存順・baseVersionが一致するかを検証し、未保存操作が**何件あるか**表示。検証できない操作は自動適用せず、未退避部分を明示。静かに一部だけ退避成功と扱わない。
- 同時に別タブで更新された場合も、古い画面から取得したcommitted snapshotとpendingを混ぜて**有効な新正本へ見せかけない**。世代・版・snapshotHashの整合を検証できなければ、pending非退避を表示して確定済みデータだけの退避にとどめる。
- 保存エラーの再試行、未保存入力の画面保持、6分類（原因不明時のプライベートモード補足）はF2承認を維持する。
- ダウンロードの失敗・キャンセル・ファイル不在・容量不足・暗号化未対応などに対して、成功断定を禁止する。

## 6. インポート／復元の安全な手順

**プレビューまで端末の既存データを一切変更しない。**

1. 利用者が選択した`File`の`size`を検査（16MB超は読込前拒否）。raw bytesをUTF-8で**fatal decode**（置換文字による黙ったデータ変更なし）。v1非対応のBOM/圧縮形式は拒否。
2. JSON parse前後で過深／キー重複／巨大配列／重複内部ID・不正値等のリソース上限とallowlistを厳密に検査。標準の`JSON.parse`単体は重複keyを検知できないため、v1実装にはduplicate-key検出またはcanonical byte一致検証が必要。
3. rootの`fileFormat`/version/kind/checksumを確認し、checksumを検証。正常digestだけでファイル内容を「安全・本物」とみなさない。
4. snapshotのF2 schema（12カテゴリ、overview5問、categoryKey、serviceCatalogId、R002条件付き回答のpresence、recordState、`unanswered/unknown`、R07/R08/R09、ID重複、revision/meta/外部ID禁止）を**同じstrict validator**で検証。解釈不能な旧版・未知questionVersionを推測補正しない。category intention表示の`undecided`派生値はsnapshotに複写しない。
5. 厳密に正規化・検査したsnapshotの**復元後prospective容量**をF2 canonical JSON/UTF-8で計算し、10,000,000 bytes超は拒否。保存先新generationId・globalRevision設定の差分も反映して最終審査。
6. ファイル種別、ファイル作成日時（自己申告値）、カテゴリ12件、サービス件数（partial/completed別）、未保存操作件数、復元による置換範囲をプレビュー。サービス名など必要以上の個人内容はプレビューへ晒さない。
7. 端末に保存済みデータまたは画面に未保存入力があれば、**既存データは置き換わる**と具体的に説明し、ユーザーが明示的に「復元して置き換える」を選択しなければ何もしない。確認画面とキャンセル経路必須。自動mergeなし、無断「現在のデータを先に書き出し」なし。バックアップを取る操作は利用者が任意に選べる。
8. 復元前のpreview時点の`generationId/globalRevision`を保持。実際のcommit時に**同一readwrite transaction**で最新metaと比較し、プレビュー後に他タブ編集・全削除・別復元があれば置換を停止して再確認を促す。削除＋新snapshot＋新metaを一括処理し、失敗・abort時は旧正本を維持。
9. 復元成功では**新しいgenerationId**を割り当て、globalRevision・各record revisionはF2が許す整合規則へ合わせて計算する。提案：globalRevisionを当該新世代で1にし、各record revisionは検証済みsnapshot値を保持する（世代の変更が競合境界）。この具体案は制作管理室審査とF5検証待ち。上限容量はこの最終状態で再算定。
10. `transaction complete`を確認して初めて「復元されました」と表示。別タブの旧世代書込を停止。キャンセル・quota・破損・不正・版衝突・容量超過では既存正本を変えず、データ内容を外部ログへ送信しない。
11. 復元後、通常ファイルはcommit済み部分を利用可能にする。緊急ファイルのpendingは**自動commit禁止**。画面に「未保存の回答が別にあります」と説明し、内容を再確認する。利用者が再適用を選択した場合だけ、復元snapshotから新世代への対応関係を検証し、F2の通常save pipeline（入力検証／R001-R002整合／revision競合／10MB判定／transaction complete）を通す。条件が合わなければ停止・再確認。pendingはlocal正本へ事前保存しない。
12. 既存ローカルデータが読めない場合でもファイル自体は検査・プレビュー可能にし、明示確認を経て置換復元する**復旧経路案**を設ける。読込不能を「初回利用」と黙認して自動上書きしない。

## 7. リスクと利用者の意思決定

| 候補 | 提案 | 保留理由・判断境界 |
|---|---|---|
| 通常バックアップ | 非暗号化JSONファイル、現状保存済み全件 | 透明性と機器間互換性優先。ファイル自体は平文であることを表示。暗号化したい場合は明示UX／パスフレーズ管理の別検討 |
| 復元 | **全置換のみ**。詳細確認後commit | mergeは削除済み復活・親子矛盾リスクが高い。merge追加は別の人間判断 |
| raw file size | 16,000,000 bytes | F2の10MBとは別。性能・安全性試験で検証し必要なら再提案 |
| pending cap | 1,000,000 bytes、256 events | 非常時の負荷・破損拒否。超過時の未保存部分は退避不可と明示 |
| digest | SHA-256／平文 | 破損検出のみ、真正性保証でない |
| ブラウザー保存 | Blob/download等の共通方式 | iPhone Safari実機で操作手順・保管実態を確認。File System Access専用実装は不可 |
| 成功表示 | 「操作開始」と「復元のtransaction完了」を区別 | 保存先の物理ファイルの存在はブラウザーから常に確認できない |
| 定期催促 | 追加なし | 人間がF2で承認済み。開始時だけ注意 |
| 外部送信・分析 | なし | R003／R005凍結と一致 |

**人間の追加判断が必要な候補**：平文でよいか／暗号化要否、全置換のみか、16MB上限や緊急pending capが利用上妥当か。制作管理室が安全性とUXを独立審査してから、最終的に人間がF3仕様を承認する。現段階ではいずれも正式採用していない。

## 8. F5 / F6へ渡す必須試験

別紙`workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md`参照。最低限：
- 正常／途中保存含むbackup、別端末復元、ブラウザ再起動後の復元状態。
- 10MB committed / 16MB raw / 1MB pending／256 eventsの全境界。
- hash破損／unknown version／duplicate keys／不正型・列挙値／他カテゴリのquestion混入／active/inactive条件付き回答／R08 completed invariant／R09表示。
- 復元preflight合格後にタブ競合で上書き停止、トランザクションabortで旧データ全件維持、世代切替後の旧タブ再書込拒否。
- 緊急pendingの別領域出力・不正pending除外時の誤成功表示防止・復元後のsilent commit禁止と再適用時の通常save gate。
- File API/Safari共通挙動、物理的なdownload完了の検出限界、端末容量不足、メモリ不足、ファイル名、平文注意、外部送信ゼロ。

## 9. 制作管理室レビューへ渡す重要論点（必ず明示）

1. F2の`schemaVersion`/`questionSchemaVersion`・recordId形式が未凍結のため、v1ファイル形式が将来の実体と食い違わないためのversion registry・schema検証仕様の確定方法。
2. readwrite transaction内で全snapshotを構築・サイズ算定する実装はIndexedDBのinactive/自動commit／Safari性能の影響を受ける。precompute→競合版照合→sync request等の具体方式をF4開始前に設計審査する。
3. 重複JSONキー検出方法、canonical hashのテストベクタ、UTF-8 fatal decoding、完全なallowlistに基づくfile parser仕様。
4. pending複数操作の依存・base snapshotの整合、保存失敗時の1MB超・自動部分退避禁止と利用者への説明。
5. 復元でgeneration切替した後のrevision更新と、pending再適用に用いる旧revision/recordIdの正当性検証。
6. 端末内の旧正本が破損していた場合の救済、ファイル保存に失敗した場合の出口、容量不足時の再実行と旧内容維持。
7. 無暗号ファイルの紛失・誤共有リスク、最小表示、ブラウザ自動保存の限界とPC/iPhoneでのテスト計画。
8. データ内容やファイル本文をanalytics・error logs・URLクエリ・第三者scriptへ流さないこと。第三者タグ未承認。
9. R003のクラウド側バックアップ保持期間・削除ジャーナル候補は凍結中R005に属する。ユーザー自身が書出すF3ファイルにクラウドの30日保持・自動削除を誤って適用しない。

## 10. 停止位置

**F3 DRAFT v0.1 提出後、制作管理室の設計レビュー／人間判断待ち。**
- F2：2026-10-14人間APPROVEDを維持し、勝手に既承認内容を上書きしない。
- F3：DRAFT / NOT APPROVED。
- F4：NOT AUTHORIZED。F5/F6：NOT RUN。本番公開：NOT AUTHORIZED。R005：FROZEN。
- コード変更・本番公開・有料化・外部resource作成・認証/クラウド同期再開は禁止。

## 参考：Web標準（検証すべき実装上の根拠）
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/File
