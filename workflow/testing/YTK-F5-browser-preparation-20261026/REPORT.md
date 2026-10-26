# 制作管理室提出：F5実ブラウザー試験準備

専用ブランチ：`codex/f5-browser-preparation`。固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。旧証拠基準：`86be3f28470aae8ad2ae428af15b3ec1ddd62c4b`。

今回は準備のみであり、正式F5ケースは0件実行した。7件の判定はすべてNOT RUNを維持した。実施計画・664 fixture・独立生成条件・runner・Chrome/Node/依存・証拠方式を固定し、製品を配信しない隔離Chromeの環境canaryを確認した。

## 累積状態

| 対象 | 現行製品PASS | NOT RUN | 現行FAIL | 現行NOT VERIFIABLE |
|---|---:|---:|---:|---:|
| 回帰統合76件 | 69 | 7 | 0 | 0 |
| F5全497件 | 70 | 427 | 0 | 0 |

全497件に含まれる追加の1 PASSは、統合76件の外で限定正式再試験したF3:R02-29である。197件のcase-level履歴を照合し、現行製品以外の123記録は現行判定から除外した。有効な8 evidence/artifact manifestをbytes/hashで検証した。旧PASS/FAIL/NOT VERIFIABLE、ledger、fixture不備履歴を削除・上書きしていない。開発テストやdefault NOT RUN枠、variant観測単体を正式PASSへ転記していない。

ケース別状態・製品revision・run/attempt・証拠Git blob/bytes/SHA-256は`F5-CUMULATIVE-497.json`、簡易一覧は同名CSV。集計方法と旧revision履歴もJSONに保存した。

## ブラウザー必須7件

| case ID | 今回判定 | 計画の主題 |
|---|---|---|
| F2:RST-15 | NOT RUN | categoryKey/displayCodeの条件付き前提、未知field拒否、表示整合 |
| F3:R03-18 | NOT RUN | native readwrite内の非同期待機禁止、GUARD→CLEAR→PUT→READBACK、complete前の成功禁止 |
| F3:R04-12 | NOT RUN | 1MB/256操作の検証時間・メモリ計測と人間評価 |
| F3:R06-09 | NOT RUN | 各操作経路・各contextの外部送信禁止 |
| F3:R06-10 | NOT RUN | 整理内容のconsole出力禁止 |
| F3:R07-05 | NOT RUN | 親未回答時fallbackを含む600 variant / 1200 service表示 |
| F3:R07-09 | NOT RUN | ACTIVE registryなしでproduction export/importを有効化しない条件 |

原文・操作・期待・oracle・判定・証拠の詳細は`plans/`と`ENVIRONMENT-AND-LIMITS.md`。実行前固定の起点commitは`707cf5c`、環境修正も各新attempt前に別commitへ固定した。

## 環境確認

Google Chrome 155.0.8059.86、Windows、Node 24.20.0、native CDP。バイナリと266個のversion資源をhash固定した。正式試験はheadedを計画し、今回のcanaryはheadless=newで実施した。native IndexedDB/Web Crypto/File API、readwrite窓中のtimer/crypto/file観測感度、native Console、worker、外部request阻止、未承認製品route403を確認した。製品配信0件、正式case0件。

成功記録は`environment/YTK-BROWSER-PREP-20261026-004/`。その前のsandbox Crashpad起動失敗、環境ページ到達失敗、DNS除外設定の誤りはattempt001〜003とGit履歴に保持した。環境側だけを修正しており、これらを製品FAILまたは正式F5結果として扱っていない。

製品画面driverとheaded運用、人間のOS dialog・画面確認、source位置付きphase計測は正式実行前の接続確認・再固定が必要。環境canary成功はこれらの製品動作の証明ではない。Node/jsdom/fake-indexeddbをnative transaction、画面、OS保存、quota、永続性、背景移行の代替認定に使わない。

## 監査

製品3,441ファイル、過去成果物28,473ファイル、依存1,978ファイルの前後bytes/hash一致、固定browser資源、runner、fixture raw/canonical bytes/checksum・境界条件を監査した。Gitのtracked差分は今回の新規準備ディレクトリのみ。

監査初回はcheckoutのREADME改行変換をraw Git blob差分と誤認した。`AUDIT-ATTEMPT-001.json`と旧audit runnerを保持し、v2ではraw前後比較とGit-normalized tracked差分を分けた。旧ファイルの改行は書き換えていない。case-levelの正式証拠は集計時にraw Git blob照合も実施した。

最終結果は`AUDIT.json`。`EVIDENCE-MANIFEST.json`は監査時点の一覧、`FINAL-MANIFEST.json`は本報告を含む提出物全体のbytes/SHA-256一覧。manifest自体のhashは外側の提出記録に記す。

## 未解決事項・独立レビュー依頼

1. RST-15は正本schemaにdisplayCodeがない条件付き試験であり、適用判断が必要。未知field拒否だけで専用binding検査PASSとしない。
2. R07-09は固定registryがcompile-time ACTIVEであり、module欠落だけでは非ACTIVE packageの証明にならない。変更禁止のまま必要条件を実証できなければNOT VERIFIABLEとする。
3. headed画面、人間担当、R07-05の72代表画面範囲、製品driver・全context coverage・fault phaseの接続と実行前固定を確認する。
4. 実quota、物理保存、OS異常終了、背景移行、Safari/iPhone性能は未検証。計測方法と限界を資料に明記した。

制作管理室へ、集計revisionの分離、7件の前提・oracle、隔離環境と未実証範囲、将来正式実行の入口の独立レビューを依頼する。本準備の終了時点で停止し、正式ブラウザー試験を開始しない。F5全体PASS、F6、本番公開、mainマージ、R005凍結解除を行わない。
