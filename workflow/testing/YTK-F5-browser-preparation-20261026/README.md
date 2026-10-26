# F5 実ブラウザー試験準備（正式実行なし）

固定製品は `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`、履歴照合の基準は `86be3f28470aae8ad2ae428af15b3ec1ddd62c4b`。製品ファイル、承認済み仕様、過去証拠は変更しない。今回の7ケースはすべて NOT RUN。環境canaryの成功はF5判定に使わない。

## 提出物の読み方

- `REGRESSION-76.json`：統合76件のcase ID・revision・正式証拠blob/bytes/SHA-256。69 PASS、7 NOT RUN。
- `F5-CUMULATIVE-497.json` / `.csv`：全497件。現行製品に対し70 PASS、427 NOT RUN。76件の外にあるF3:R02-29の限定正式PASSを1件含む。旧revisionのPASSは混入させず、JSONのotherRevisionHistoryに保持する。
- `CASE-HISTORY-REGISTER.json`：旧FAIL・NOT VERIFIABLE・fixture履歴を含む正式記録の参照と有効証拠manifest照合。開発テスト、variant単独観測、未実行batch枠は正式判定へ転記しない。
- `BROWSER-CASEBOOK-7.json` / `plans/`：承認済み原文の出典・hash、操作手順、期待、独立oracle、人間確認、判定条件。
- `FIXTURE-REGISTER.json`：入力raw bytes/SHA-256と生成時の独立条件確認。製品受理をまだ実証していないfixtureを正式PASSとしない。
- `BROWSER-LOCK.json` / `PREPARATION-LOCK.json`：Chromeバイナリ・version資源、Node・依存、runner、製品3441ファイル、過去証拠の固定。
- `environment/`：製品を配信しない環境canaryだけ。失敗attemptも保持。
- `ENVIRONMENT-AND-LIMITS.md`：自動化と人間の分担、環境依存事項、正式実行前の未解決事項。
- `AUDIT.json` / `EVIDENCE-MANIFEST.json`：最終監査と提出物hash。

## 試験環境

Google Chrome 155.0.8059.86 / Windows / Node 24.20.0。正確なOS・CPU・メモリ・起動引数・CDPプロトコルhashは環境記録に保存。Chromium本体のnative IndexedDB、Web Crypto、File APIを使用する。jsdom / fake-indexeddbをブラウザー証明に用いない。

Node組込みWebSocketでCDPへ接続する独立harnessを用意した。隔離した新規profile、固定loopback origin、deny proxyと外部DNS遮断、CDPの外部request拒否を組み合わせる。observerはメソッドの引数・戻り値・Promiseをそのまま渡し、API種別と時刻・transaction窓だけを記録する。製品の配信は明示的な将来承認オブジェクトがなければ403で閉じる。今回の環境確認はcanary専用HTML・専用dummy DBだけを使用する。

`runner/probe.mjs` は環境canary専用であり正式case runnerではない。正式実行にはheaded起動、製品画面のcase driver、実ユーザー操作・画面確認・故障phaseを接続して再固定する工程が残る。現在のheadless canary結果でheaded環境や製品画面の動作を実証したとは扱わない。

## 将来の正式実行の入口（今回は行わない）

1. 制作管理室が本準備、RST-15とR07-09の前提、人間確認範囲を照合する。
2. 正式実行承認、case・全variant・期待・oracle・fault条件・人間担当・新run ID/attemptを固定する。既存runを上書きしない。
3. Chrome更新があれば停止して環境を再固定する。binary/資源、全製品/依存/runner/fixture/旧証拠のbytes/hashを実行直前に照合する。
4. 製品画面driverとheaded CDP接続の準備検証を別記録で行い、正式runのrunner hashを実行前commitへ固定する。今回の環境profileを再利用しない。
5. 全variantの期待・実測・native trace・DOM・画面・人間署名を新規証拠に保存する。条件不足はNOT VERIFIABLE、不一致はFAIL、未実行はNOT RUN。すべての条件を実証した場合だけcase PASS。
6. 外部送信、重大な破壊、対象改変を検出したら停止する。試験終了後に製品・依存・旧証拠を再照合し、manifestとledgerへ新attemptとして追記する。

F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は行わない。
