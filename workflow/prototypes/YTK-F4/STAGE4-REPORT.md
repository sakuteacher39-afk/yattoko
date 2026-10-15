# F4第4段階｜統合・開発テスト報告

- 基準commit: `8797650d0187daa521f859529ec4d9195e1b97bb`
- 専用branch: `codex/f4-stage4-integration`
- 対象: 第1〜第3段階の統合確認・開発テスト・試験資料整備。
- 状態: 開発自動テスト105件成功。独立レビュー待ち。F5/F6正式PASSではない。

## 成果

製品コードの変更は不要だった。既存の保存・バックアップ・復元をそのまま統合検証し、5件の回帰テストを追加した。既存100件は削除・変更・弱体化していない。schema/manifest/registry、元R001/R002、R005、承認済み設計は変更していない。

1. 実際の生成済み画面をjsdomで動かし、保存quota失敗→未保存保持/後続保存停止→緊急file生成→厳格取込→snapshot全置換→確認付きpending再適用→新画面で通常保存まで確認。snapshotだけではpendingが反映されず、再適用ackなしでは保存されない。元画面の回答を自動で消さない。
2. 同一fake-indexeddbへ接続する独立した2画面で、先行保存後と復元generation変更後の旧画面保存が拒否されることを確認。競合で正本が上書きされない。
3. HTML風サービス名が保存・SHA付きbackup・復元・再読込を通じて文字列として保持され、img要素にならないことを確認。
4. 承認済みR001/R002/manifestのLF正規化Git blob hashとruntime manifest deep-equal、ACTIVE registry全fieldを固定照合。
5. 全runtime srcと生成済みHTMLの静的境界確認を追加。network API、console、Web Storage代替保存、外部URL、動的コード実行、HTML挿入を禁止し、既存innerHTMLは固定空文字による消去のみ許容。

R001/R002の画面遷移、途中保存、完了、R07/R08/R09、conditional、ID再生成、容量・件数、canonical/SHA、full/partial/none、破損/不正file、旧正本保持、GUARD→CLEAR→PUT→READBACK→COMPLETE、再適用証跡と競合は既存テストも全件実行した。個々の実行結果は DEVELOPMENT-TEST-RESULTS.txt に収録。

## 実行・結果

環境: Windows / Node.js v24.20.0 / fake-indexeddb 6.2.4 / jsdom 30.1.2。実施日2026-10-15。

|実行|結果|範囲・限界|
|---|---|---|
|node --test test/ui.test.mjs|10/10成功|追加3件含む画面統合。DOMエミュレーション|
|node --test test/integration-boundaries.test.mjs|2/2成功|承認source/registry固定・静的security境界|
|npm.cmd test|105/105成功、fail/cancelled/skipped/todo=0|既存100件＋追加5件。生成チェック・計画対応表チェックも成功|
|node generate.mjs --check|成功|正本manifest/R002 hashとgenerated definitions一致|
|node build-ui.mjs --check|成功|生成画面とsource一致|
|node plan-map.mjs --check|成功|出典hashと497 F5 / 150 F6ケース採録結果一致|

`npm.cmd test` に既存の生成チェックを維持し、計画対応表のdriftチェックを追加した。計画対応表は出典別IDの全採録で、関連test探索先と正式判定を分離。全行正式NOT RUN。F3の計画案は原文のDRAFT / NOT APPROVED状態を保持し、正式F5計画の確定は制作管理室へ委ねる。F4技術境界の非ID項目はF6手順の原子性・API・計測・停止条件で扱い、正式受入れ時に再照合する。

## 変更ファイル

すべて `workflow/prototypes/YTK-F4/` 配下。

- `package.json`: testに対応表チェックを追加。
- `test/ui.test.mjs`: 統合フロー/2画面競合/XSS回帰を追加。
- `test/integration-boundaries.test.mjs`: 承認正本/registryと静的security境界の追加テスト。
- `plan-map.mjs`: 出典namespace付き対応表の生成・drift確認。
- `F5-F6-TRACEABILITY.json`: 出典SHA・全ケース・正式未実施・関連証拠/不足理由。
- `F5-F6-TRACEABILITY.md`: レビュー用対応表。
- `F6-DEVICE-PROCEDURE.md`: 実機手順・観測・失敗判定・未実施事項。
- `DEVELOPMENT-TEST-RESULTS.txt`: 全105件の実行結果。
- `STAGE4-REPORT.md`: 本報告。
- `STAGE4-REVIEW-REQUEST.md`: 制作管理室向け独立レビュー依頼文。

## 未解決事項・残存リスク

1. **F3:R01-14の計画/合格済み実装の不一致。** 計画にはunsupported operation（delete-all/restore等）をpendingに入れたら拒否とある。一方、第2/第3段階PASS済みbaselineのBACKUP-FORMATとallowlistは`deleteAll`を明示的に含む。今回この挙動を変更していない。対応表はREVIEW REQUIREDとし、正式F5の前に制作管理室が設計/計画/bindingを照合して判断する必要がある。無断で期待値の書換えや機能削除をしない。
2. fake-indexeddbは実ブラウザのtransaction activity、quota、OS kill、自然evictionを実証しない。jsdomは物理ファイル保存やlocation.reloadを実行しない。統合テストでは破棄確認の拒否で入力保持をassertし、userが破棄/reloadを選択する境界を新しいappインスタンスで模擬した。実際の破棄承認→reload→再開はF6未実施。
3. 復元後は旧画面を凍結する既存仕様を維持。pending/draftを自動消去/自動再適用/自動再開しない。通常編集再開は必要な退避・手動適用後、既存の明示破棄・再読込を経る。追加の継続ボタンなどの新機能は導入していない。
4. static sink禁止とHTML風nameの一例は包括的なXSS/通信監査の代用ではない。実ブラウザNetwork/console観測、file picker/共有先、Safari primary/fallback等は未実施。
5. raw16MB/pending1MB/256操作は暫定のまま。iPhone最低機種、性能5回測定・peak memory・heartbeat・長期保持は未検証。分割計時/中断観測の実機専用instrumentationも未作成。観測不能項目はNOT VERIFIABLEにする。
6. F5対応表は関連候補の索引であり全497ケースのassert完備を意味しない。synthetic move等の非実装範囲、規範vectorの網羅、許容量境界の有効fixture、registry未ACTIVEの仮想配備などはケースごとに正式試験で補う必要がある。自動開発試験成功を正式計画全項目PASSへ昇格しない。

## 承認仕様との差分・停止

F2/F3/F4の承認仕様、schema/manifest/registry、容量値、pending依存関係、canonical/SHA、原子復元/世代guardの変更なし。外部送信・認証・クラウド・analytics・error logging・秘密保存項目の追加なし。確認した計画上の不一致は上記のとおりで、今回導入した仕様差分ではない。

制作管理室の独立レビューを依頼し、第4段階の作業を停止する。F5/F6正式PASS、本番公開、R005凍結解除は宣言しない。
