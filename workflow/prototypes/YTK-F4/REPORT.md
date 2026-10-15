# F4 第1段階 実装報告（2026-10-15）

第1段階の実装・開発テスト終了時点で停止。F5/F6の合格、本番公開、R005凍結解除は宣言しない。第2段階のバックアップ・緊急書出し・取込・復元は未着手。

## 根拠

- F2: `0d5dfa387f924e5dc3dc9196b9f236986c910281`
- F3: `3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- F4設計・実装ベース: `3036275123420d1be4a4607e4e64d7ec1ab9304c`
- ACTIVE: `ytk-free-v1-registry-20261015`
- 開始承認: 今回の人間指示、およびNotionマスター最上位の2026-10-15正式承認節を照合。

承認済み設計書の過去のNOT AUTHORIZED/CANDIDATE表記は書き換えず、現在の承認状態と区別する。

## 実装

- 正本manifestからruntime定義を生成。LFのGit blob bytesに正規化して承認済みSHAと照合し、生成物の完全一致も検査。既存R002カタログは承認済みprototypeから生成し、そのblobも固定照合。
- database `yattoko-free-v1` / IndexedDB version 1。stores: meta (`key`)、overview/categories/services (`recordId`)。既存store構成・keyPath不一致、未知schema/question versionは拒否。自動migrationなし。
- 最初の回答でmeta・overview・12category baseline・回答を同一transactionで作成。閲覧だけでは正本作成しない。
- R001 category/overview/intention、R002既知service確定・その他名確定・利用状態・質問・意向・完了を保存イベントへ接続。途中serviceはpartialで復元。
- R07同時初期化、R08完了条件と編集時partial化、R09派生意向（未回答parentへの書戻しなし）。
- manifest由来の条件質問のmaterialize/prune、positive整合とnegative矛盾停止。未知field/enum/ID/category/サービス、秘密情報らしいその他名を拒否。NFC/trim/UTF16長/control/bidi検査。
- 保存の成否はtransaction complete/abortで判定。直列coordinator、generation/globalRevision/全record revisionのtransaction内照合。B案の最終guardを実装し、競合時は保存停止・上書きretry禁止。
- 容量は承認済みcanonical property/record/question順のJSON UTF-8。10,000,000以下を許可し、10,000,001以上を拒否。
- 保存失敗6分類、未保存operationとbase snapshotをtab memoryに保持。画面には未保存回答を表示し、失敗後の後続保存を停止。競合以外の明示retryも同じguardを通す。破棄・再読込は利用者確認付き。
- service削除/category配下削除は保存APIとして用意。既存UIに新しい個別削除操作は追加せず、既存「最初から」の全削除だけ明示確認・atomic generation切替へ接続。
- 既存R001/R002原本は無変更。別の非公開F4入口を生成し、質問順・選択肢・主要画面構成を再利用。保存説明・開始時注意・保存状態表示と保存中操作制御を追加。
- 外部送信・analytics・remote logging・認証・クラウド・新しい秘密情報fieldなし。

## 検証

`npm run generate` 成功。
`npm test` 成功: 25 tests / 25 pass / 0 fail / 0 skip。

内訳: canonical/IndexedDB/coordinator 22件、jsdom画面接続3件。
対象: 全33質問enum、R07/R08/R09、条件child、全positive binding、negative guard、未知version/field/ID、サービス名防御、容量境界・10MB超candidate、UUID/collision、初期atomic保存、再open、2接続同時保存、request success後abort、初期abort、削除・世代無効化、直列pending、保存失敗6分類、明示retry、破損/使用不可DB、schema keyPath、外部transport/log sink不使用、R001→R002→完了→reload、画面上pending、その他の入力中非保存。

これは第1段階の開発テスト結果。F5/F6の正式計画全体を実施・合格したとの判定ではない。

## 未解決・既知のリスク

- PC Chrome / iPhone Safari実機、private mode、バックグラウンド復帰、ブラウザー再起動、OS kill、実browser quota、長期保存消失、Network panel観測は未検証。fake-indexeddb/jsdomによる自動試験は実機の代替にならない。
- 各保存transactionは全dataset snapshotを読み込み検査する。10MB近傍のiPhone性能・メモリ・transaction時間と、全recordのputコストは後続実測が必要。
- 未保存回答は同一tab memoryにのみ保持。reload/close/crash後の復旧保証なし。beforeunload警告にもbrowser依存がある。緊急退避は第2段階まで提供しない。
- その他名のsecret-like検査は補助防御であり、任意の秘密の完全識別を保証しない。
- B案はIndexedDB transactionでstale writerを停止する。BroadcastChannel等による事前通知は未追加で、他tab更新は次の保存時に検知する。
- 競合・validation失敗時の入力修正は、未保存回答の確認後、明示破棄・再読込から行う。自動merge/rebaseは提供しない。
- ローカルHTTP配信とES modulesが必要。file://直接起動は対象外。本番配信/CSP/origin審査は未実施。
- 制作管理室の独立実装レビューは未実施。

## 承認仕様との差分

F2/F3/F4のcanonical schema・質問semantic・R07/R08/R09・容量規範・競合規範の意図的変更なし。実装上の具体化はDB/store名・keyPath、生成script、保存API、UI接続・エラー表示。承認manifest・version値は変更なし。

F3のbackup/restoreとpending再適用は今回の指示に従い未実装。これは第1段階の範囲制限であり、F3仕様の削除・緩和ではない。

## 変更ファイル一覧

全て `workflow/prototypes/YTK-F4/` 配下の新規ファイル:

- `.gitattributes`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `generate.mjs`
- `build-ui.mjs`
- `index.html`
- `src/definitions.mjs`
- `src/canonical.mjs`
- `src/storage.mjs`
- `src/ui-adapter.inc`
- `test/stage1.test.mjs`
- `test/ui.test.mjs`
- `REPORT.md`

## 再実行

このdirectoryで `npm ci --ignore-scripts`、`npm run generate`、`npm test`。
開発用HTTP serverで同directoryを配信し `index.html` を開く。deployment操作・外部resource追加は不要。test dependencyはruntimeに含まれない。
