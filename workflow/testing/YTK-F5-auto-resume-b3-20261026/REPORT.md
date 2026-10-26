# F5自動試験再開 第3バッチ：制作管理室提出

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。直近成果物：`837e3500dc6be49cd6aee8bb4f666d2cdf6396a9`。専用ブランチ：`codex/f5-auto-resume-batch3`。

実行前固定commit：`3fc431cb4e9150676b1aba7cee1ca80bb6775c42`。新run ID：`F5-AUTO-RESUME-B3-20261026-001`。Node v24.20.0 / Windows 11 Home / x64、fake-indexeddb6.2.4。UI/jsdom/実ブラウザーは使用していない。2つのstore接続で論理的な競合順序を再現し、nativeブラウザー複数tab・永続性・quota・notification配送・OS操作の証明には用いない。

## 候補・原文・実行前固定

ユーザーの省略表記を前回NEXTの正確な20 IDへ照合した。F2:CON-01〜07、F2:DIR-01〜12、F2:CAP-16。全20件は現行台帳のNOT RUNで、Gate5件に含まれない。

承認済みF2 commit0d5dfa38から各試験原文をGit blobで取得し、行・文言・SHA-256をケースごとに固定。casebook/fixture/variant/fault catalog、normative manifest、製品全ファイル、Node executable、依存、全実行runner/helperをPREEXECUTION.jsonへ固定した。CANDIDATE-READINESS-20.jsonには各全variant範囲と実行可否を保存。除外候補0件。

独立oracleは製品からimportしないF2意味規則モデル。操作によるrecord差分とrevision/global増分、R07と肯定方向整合、質問manifestのpresence、UTF8 bytesを独立に算出した。別の事前checkerで全初期状態・期待状態の妥当性、負方向操作が依然矛盾を作ること、容量境界の有効controlを校正した。準備R1を保持し、通知なし条件をA commit前から有効にしたR2を実行前commitへ固定した。校正で製品を実行していない。

## ケース別正式結果・全variant数・証拠hash

| case ID | 判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
| F2:CON-01 | PASS | 120/120 | 1 | 52affbdc42f5c06a79a62761b9152adf09c6367bd58f79b4ddb0ffacf28a49c4 |
| F2:CON-02 | PASS | 36/36 | 1 | 010b57f8ed571d5276a0e3af84203b640ce0e720c5e2fc745aa60602f978ddaa |
| F2:CON-03 | PASS | 36/36 | 1 | d411a3dc1aaf973ac325b2764945a6725d6f174685323c3a3e4fd58da6952907 |
| F2:CON-04 | PASS | 48/48 | 1 | bc54808a4ca95e2d44cd6558dbd845310bdc58849c991c3d4073f4de69338632 |
| F2:CON-05 | PASS | 72/72 | 1 | 28e090683bb21c669e8352c940c2f1cf5f7ac34e15d8192ef20445be81725ae5 |
| F2:CON-06 | PASS | 72/72 | 1 | 5de8318563bdb388152241047bbf8744fbe6340fc4db234b78e879b5c591f9d9 |
| F2:CON-07 | PASS | 120/120 | 1 | bf94c92ead510414c3826d07510b753e1c66402bd9a9b1037dc95b04a5a6bf73 |
| F2:DIR-01 | PASS | 96/96 | 1 | 42b8033c1290870c8d6a834dfe1a9f7e1f118ec3df6d31edde4c9a16de70cfd8 |
| F2:DIR-02 | PASS | 90/90 | 1 | ab5254a3e132e60a28ec64aca4692cef01d596230e332868ff1ce6e6695ecc69 |
| F2:DIR-03 | PASS | 18/18 | 1 | beb5ed4a40e3c5dff935f13939431f2d70571c8480087f2e6224d4954b4de8b8 |
| F2:DIR-04 | PASS | 126/126 | 1 | 6ed2efe8f745e5934dd036426c8916ad9c48270e7ba1ff660f796a5ac6a80a6e |
| F2:DIR-05 | PASS | 36/36 | 1 | 67dcd6b5c6876791e836c1a33bea16baf6e67df0352f8fd6ab7aede46243c772 |
| F2:DIR-06 | PASS | 2196/2196 | 1 | 1ca109f6ba61da261bcfe9dbc42c0b4a8a9f9ef898419f0aae90340a000adc82 |
| F2:DIR-07 | PASS | 48/48 | 1 | e59b1971c1d499109bcf8ef6db18ea9f4ca95f7efdb50ad70befe9c2d2b5fd9e |
| F2:DIR-08 | PASS | 60/60 | 1 | d2b19a2a8083d146910722d7b1f095a38125b609602bee7fbcf4e2add6436ebe |
| F2:DIR-09 | PASS | 12/12 | 1 | e2bfd9200dd5a0cd23dda653437cbe6304201bd54a27510188d97baee65beac9 |
| F2:DIR-10 | PASS | 84/84 | 1 | e51bb8b85895e33243e14cd26052fc729d9ee31ad05d984c7bb9d70215856f3c |
| F2:DIR-11 | PASS | 24/24 | 1 | ae7517fb7398940733e1587363b5b3e29fc392386bf6d9d7589326bf9e174043 |
| F2:DIR-12 | PASS | 228/228 | 1 | a8bfa7f7758f6a18544d599dce7536bb26b71e6a4b67ec82a39b6d104431396b |
| F2:CAP-16 | PASS | 3/3 | 1 | 5be52d9825e68c4543c0ed43c74aaa0082f66556653d645ead85a25e85740ec4 |

計20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回範囲）、全3,525 variant完了。不一致・証拠不足による停止は発生しなかった。新run/attemptのimmutable resultとappend-only ledgerを作成し、過去結果・旧revision・開発テストを今回のPASSへ転記していない。

原文・入力bytes/hash・事前oracle・期待・実測・注入位置・時刻・判定は各observation.jsonにある。initial/before/afterの全4ストアdumpとA/B接続別transaction traceも保存した。CASE-RESULTS.csvと累積CSVからcase証拠hashを参照できる。

## 重点検証と範囲

- CON-01〜03：B旧状態取得→A正常commit→B保存。全12カテゴリ、partial/completedを原文に応じ展開。stale globalに加えglobalだけを現在値へ合わせてrecord revision差を孤立させるvariant、カテゴリ/サービスrecord差、fresh controlを含む。正常なB操作が古い期待状態で拒否され、A commit後の全データが維持されることを確認した。
- CON-04：実SaveCoordinatorがconflictで停止し、同じpendingを保持。retry3回がconflictで拒否され、B save呼出しは最初の1回だけ。強制上書きや後続保存を発生させないことを確認した。
- CON-05：実deleteAll完了でgeneration変更後、旧generation保存を拒否。globalを合わせても拒否するvariantを含む。初期record revision0の有効fixtureを使い、本caseに無関係な新世代record counterの解釈を追加しない。fresh controlは通常commit経路で同じB操作の妥当性を確認する。
- CON-06：実importBackup→prepareRestore→confirmed commitRestoreを実行し、source generationも旧local generationも再利用しない。完了後の旧B保存を拒否。preview/checkboxのnative UI承認を検証したとは扱わない。
- CON-07：BroadcastChannelをA commitより前からB保存終了まで利用不能にし、通知なしでもguardが拒否。ブラウザーの通知配送成功/失敗を観測したものではない。
- DIR-01〜05：全適用カテゴリ、partial/completed、肯定前の未回答/不明/否定概要、既存本人意向を展開。R07連携、active billingSourceのunanswered materialize、変更record各1回/global1回の増分を含め、独立expected datasetと保存済み全データを照合した。
- DIR-06：上記全肯定経路で、meta/overview/category/先頭service/末尾serviceのwrite-success後に同期abort。child/summaryの片側だけを残さず、全4ストア・全revisionを旧状態に維持した。
- DIR-07〜12：肯定childと負方向操作をfixture内に保持し、再projectionや正規化で矛盾を消さない。整合した同値controlと矛盾操作を分離。拒否時に2つのchildや概要・カテゴリを変更/削除しないことを全dumpで確認した。
- CAP-16：有効なdense既存datasetにintentionOverride更新とrevision/global増分を加え、独立prospective UTF8 bytesが9,999,999 / 10,000,000 / 10,000,001となる3境界。2controlは保存成功、超過はcapacity拒否・write request0・旧全データ維持。実quotaエラーや物理保存の実証に転用しない。

## 監査

全3,525 variantを記録済みraw dump・traceから独立に検算した。SUTの戻り値だけでなく、保存済み全datasetを事前expected fileと照合し、hash・record数・transaction ID・complete/abort・retry・容量を確認。STORE-EVIDENCE-AUDIT.jsonを参照。これは既存証拠の検算であり、新たな製品実行ではない。

製品3441ファイル、旧成果物48918ファイル、依存1978ファイルの前後bytes/SHA-256一致。target lockのGit blob/archiveと実行前runner/helperのcommit bytesも照合済み。新規バッチディレクトリ以外の旧tracked差分なし。外部通信・console logging・不許可書込み試行0件。

run EVIDENCE-MANIFEST.json SHA-256：`91abb52dc25bca4bb7ff812e86c5e30f524e6ab7596326a7e987cbff4d79a27b`。全17652証拠ファイルをbytes/hashで再監査。提出物全体はARTIFACT-MANIFEST.json。

## 累積更新・残件・未解決事項

現行497件：**130 PASS / 367 NOT RUN**。元110 PASSの履歴/proofはそのまま参照し、今回20件の新しい正式証拠だけを追加した。元110/387台帳は変更せず、F5-CUMULATIVE-497-AFTER.json/CSVを新規作成した。

残件主分類：自動候補275、実ブラウザー必須65、人間判定22、仕様適用判断待ち5。主分類は前バッチの基準を維持し、候補すべてのrunner完成や実行許可を意味しない。

今回の未実施・不一致・証拠不足は0。Gate5件（F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07）およびその他保留browser5件はNOT RUNのまま。R07-05の人間確認範囲や正式基準は変更していない。fake-IDB結果をnative browser・人間判断の代替にせず、F5全体PASSは宣言しない。

## 次バッチ候補（未実行）

- F2:DIR-13
- F2:DIR-14
- F2:DIR-15
- F2:DIR-16
- F2:DIR-17
- F2:DIR-18
- F2:SAVE-04
- F2:SAVE-06
- F2:SAVE-07
- F2:SAVE-08
- F2:SAVE-09
- F2:R07-07
- F2:R07-08
- F2:R07-09
- F2:R07-10
- F2:R07-11
- F2:ID-01
- F2:ID-02
- F2:ID-03
- F2:PART-12

否定方向への自動伝播禁止、queue/revision、record ID、直前commit維持を優先する候補。原文・全variant・独立oracle・fault・実行前固定を次回の承認範囲で準備する。今回は進まない。

制作管理室へ、20ケースの原文対応、3,525 variant、fixture校正、Node観測範囲、全store検算、累積更新の独立レビューを依頼する。専用ブランチへcommit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。
