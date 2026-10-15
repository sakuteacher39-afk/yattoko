# F4-S4-R01 修正報告・独立レビュー依頼

- 修正前基準: `40686f470b08e0f08b143d3389ba6bfd7cbe65ed`
- 照合報告: `eae5400da5105e8710b9ae7795ceeba23aa9a696`
- 専用branch: `codex/f4-s4-r01-pending-allowlist`
- 人間承認方針: 通常deleteAll維持、緊急pendingへの収録・取込・再適用禁止。
- 状態: 修正と開発テスト完了。制作管理室の独立レビュー待ち。正式F5/F6は未開始。

## 修正内容

`backup.mjs` の通常保存操作一覧と緊急pending専用allowlistを分離してfreezeした。通常操作一覧はdeleteAllを含み、pending専用allowlistは含まない。収録候補のdeleteAllはUNSUPPORTED_OPERATIONとして除外する。既存の依存component単位の全件除外を維持し、deleteAllの全体footprintにより関連候補も未収録となる。候補ordinalを詰めず、未収録件数・離散範囲を保持する。

`import-backup.mjs` はpending専用allowlistでoperationを検証し、decodeでも禁止操作を拒否する。正しいSHA-256を持つ旧実装生成相当のdeleteAll pendingファイルもファイル全体を拒否し、正本を書き換えない。禁止operationだけを黙って取り除く救済やmigrationはしない。

`reapply.mjs` に独立したpending allowlist検査を追加し、保存・receipt確認前に禁止操作を拒否する。deleteAllだけgeneration変更を許す例外を削除した。正常pending再適用はrestored generationを維持し、通常save pipeline・内容guard・revision・証跡の既存処理を維持する。

通常のdeleteAll実装 (`canonical.mjs` / `storage.mjs`) は変更していない。成功時fresh generation・旧タブ拒否、abort/保存失敗時の旧データ完全維持は回帰試験で確認した。

`omittedScopes` は実行可能operationと分離している。既知のdeleteAllは未収録の説明に限ってoperationType=deleteAll / targetKind=overviewを許容する。これを含むsnapshot-only emergencyは正常に取込可能で、全削除の持越しはない。未知操作はunsupported / unknownとし、任意の入力文字列をscopeへ入れない。

## 変更ファイル一覧

すべて `workflow/prototypes/YTK-F4/` 配下。

|ファイル|変更|
|---|---|
|src/backup.mjs|通常操作一覧とpending-safe一覧分離、収録拒否|
|src/import-backup.mjs|pending operation拒否とscope metadata検証の分離、decode拒否|
|src/reapply.mjs|独立拒否guard、generation例外削除|
|BACKUP-FORMAT.md|許可operation・未収録metadata・通常deleteAll維持の説明修正|
|test/s4-r01.test.mjs|単体・画面統合6件追加|
|plan-map.mjs|R01-14証拠・承認照合結果の反映|
|F5-F6-TRACEABILITY.json|対応表再生成、正式NOT RUN維持|
|F5-F6-TRACEABILITY.md|対応表再生成、修正の独立レビュー待ち表示|
|S4-R01-TEST-RESULTS.txt|全111件の開発テスト実行結果|
|S4-R01-REPORT.md|本報告と独立レビュー依頼|

## 開発テスト

環境: Windows / Node.js v24.20.0 / fake-indexeddb 6.2.4 / jsdom 30.1.2。

- `node --test test/s4-r01.test.mjs`: 6/6成功。
- `npm.cmd test`: **111/111成功、失敗0、cancelled/skipped/todo=0**。既存105件を削除・変更・弱体化せず全件実行。
- 正本manifestと生成画面のチェック成功。ACTIVE registry・承認R001/R002/manifest固定の既存テスト成功。
- 計画対応表チェック成功: F5 497件 / F6 150件、全正式判定NOT RUN。F3:R01-14は開発証拠を更新し修正の独立レビュー待ち。

追加6件の確認内容:

1. 通常allowlistでdeleteAllを維持し、pending allowlistから除外。decodeはdeleteAll/restore拒否。
2. deleteAll単独・非連続ordinalの混在候補を除外。依存component全件・件数・範囲・入力不変を検証。full/partial/none各収録結果のordinal集合が候補全件と一致し、重複/収録済み混入なし。
3. SHA-256正常のdeleteAll/restore pendingファイルをOPERATIONで拒否。readwriteを開始せず旧正本維持。
4. 再適用層の独立拒否。別のtest processだけでprovenance検査をmockして上流境界破損を模擬し、直接applyでもsave=0、receipt=0をassert。製品に検証迂回経路を追加していない。
5. 通常deleteAllのPUT後abortでもサービスを含む旧正本全件を維持。成功時generation更新と旧generation保存拒否。
6. 保存quota失敗→pending保持・停止→緊急file生成→未収録3件/個別範囲表示→禁止file拒否→収録0件の正当file復元まで実際のbackup/restore UIとDBを接続して確認。snapshotを維持し、再適用ボタンは無効。元の未保存入力/pendingは消去しない。

## 残存リスク・制約

- deleteAllを含む旧緊急ファイルは全体拒否となる。承認方針に基づく拒否であり、snapshotだけを救済する取込は追加していない。
- deleteAll候補は全体footprintを持つため、同じ緊急captureの関連候補も未収録となり得る。件数・範囲を表示し、画面のpendingは保持する。後日全削除したい場合は通常操作として改めて実行する必要がある。
- 既存の範囲情報/依存検証/容量上限を維持。正確な未収録metadataだけで上限超過なら従来どおり生成を中止する。raw16MB・pending1MB・256操作は暫定のまま。
- 実端末Safari/Chromeのquota・OS中断・ファイル物理保存・再読込・性能/メモリは今回も未検証。jsdom/fake-indexeddbの結果を実機PASSに代用しない。既存F6-DEVICE-PROCEDURE.mdを引き続き利用する。
- 独立再適用guardのテストはNodeのexperimental test-module-mocksを別processで使用する。製品実行条件・依存packageの変更なし。

## 承認境界と独立レビュー依頼

前段階報告のR01-14不一致について、人間承認された照合結果に従いimplementation driftを是正した。F3試験計画は人間承認済み範囲であり、原文のDRAFT表記だけから未承認扱いしないよう対応表の説明を訂正した。F2/F3設計・試験計画の原文/期待値、schema/manifest/registry、R001/R002、R005、canonical形式・SHA-256・容量・依存検証・原子復元は変更していない。新機能・外部送信・認証・クラウド・loggingの追加なし。

制作管理室には、3層の拒否、通常deleteAllの不変、omittedScopesと実行可能operationsの区別、依存component除外時の件数/範囲、追加テストの妥当性をご確認いただきたい。本書を独立レビュー依頼文として提出し、外部メッセージは送信していない。

修正commit提出後は停止する。F5/F6正式試験開始、本番公開、R005凍結解除は行わない。
