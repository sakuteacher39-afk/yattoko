# 実施計画と計測限界

原文は各 `plans/*.json` のsource path/lineとraw SHA-256で特定する。元の試験計画は編集しない。以下は実行設計であり、7件とも正式未実行である。

| case ID | 実施方法・独立期待 | 自動証拠 | 人間確認・残る前提 |
|---|---|---|---|
| F2:RST-15 | normal/emergency controlsと48件のdisplayCode挿入raw。挿入後に再projectionしない。checksumを含め独立照合し、不正入力拒否と旧4ストア維持を確認 | 入力bytes/hash、native import結果、4-store dump、DOM/画面 | 正本schemaにdisplayCodeは存在しない。原文の「存在する場合」の適用判断が必要。未知field拒否を専用不一致検査のPASSへ置き換えない |
| F3:R03-18 | native readwriteの開始からcomplete/abortまでにFile/crypto/network/timer待機がないこと。preflight後GUARD→CLEAR→PUT→READBACK→completeをsource位置とnativeイベントで照合。容量内control、10MB境界、超過、phase abort | API observer+native IDB trace、pre/post dump、canonical readback、エラー状態 | UI明示確認と成功表示の時刻。instrumentationの影響を記録。タイマーを使わないことと非同期待機の不存在は静的経路照合も必要 |
| F3:R04-12 | pending 999999/1000000 bytes、1/128/255/256操作、dense snapshot併用。foregroundでcold/warmを区別し各5回、段階別時間とheap/processを採取 | performance.now、CDP metrics/heap、段階境界source、入力hash、可視状態 | 原文の計測要求を評価。未定義の速度合格閾値を創作しない。Chromium結果はSafari性能の証明にならない |
| F3:R06-09 | backup/import/restore/pending/error全経路でdummy識別子を利用し外部送信なしを照合。阻止された送信試行もFAIL対象 | Network/Fetch、fetch/XHR/beacon/WebSocket/EventSource、worker/frame、source監査。本文の代わりにbytes/hash | DevTools Networkの目視、全context接続の確認。CDPだけではOS全通信を証明しない。外部アプリ・ブラウザー自身の通信と製品発信を区別 |
| F3:R06-10 | 同じ経路のconsole/exceptionを全contextで観測。整理内容の出力禁止。canaryで観測感度確認 | native Console/Runtime、sanitized引数hashとdummy marker検出、source位置 | DevTools Consoleと遅延remote object表示を確認。generic browser errorと整理内容を区別。実データは使わない |
| F3:R07-05 | 12カテゴリ×親5×override5×normal/emergency=600ファイル、各2service、計1200表示。取込→preview→明示復元→一覧/詳細→reload・再起動、親変更の表示追従 | 独立fallback oracle、native IDB、DOM、全variant画面hash。親未回答/override nullを勝手に保存しない | 72代表画面と全異常表示を人間確認する案。全600目視が必要か制作管理室確認。Nodeのデータ一致だけでは画面PASSにしない |
| F3:R07-09 | ACTIVE controlと依存module request失敗時のfail closed。response bytesは改変しない | registry source/hash、CDP故障記録、到達可能UI、操作不能の確認 | 固定成果物はcompile-time ACTIVE。module欠落は非ACTIVE packageの代替証明にならない。前提が解決しなければNOT VERIFIABLE |

## 環境依存事項

### quotaと容量

製品の10,000,000 UTF-8 bytes制限と、OS/browserの実quotaを分ける。前者は独立UTF-8 oracleで9,999,999/10,000,000/10,000,001境界を固定する。後者は`navigator.storage.estimate()`のusage/quota、空き容量、native QuotaExceededError、旧4-store bytes/hash、UI pending保持を採取する。CDP quota overrideや例外注入はemulationとして記録し、実quota枯渇PASSにしない。実quota試験は使い捨てVM/専用容量制限volume・専用profileでのみ計画し、ユーザー領域を埋めない。今回は枯渇させていない。

### ファイル保存

headed Chromeの実ユーザー操作でpicker表示、キャンセル、例外、選択先、生成blobのbytes/hashとローカル読戻しhashを記録する。OSダイアログ操作と表示文言は人間担当。download完了、write/close resolve、ファイル存在を物理媒体への永続保存保証と同一視しない。電源断耐性は未実証。今回ファイルpicker/製品backup保存を実施していない。

### メモリと時間

CDP Runtime.getHeapUsageとPerformanceを同時刻系列で採取し、必要に応じBrowser/SystemInfo process IDからOSのprivate bytes/working setを採る。観測者のメモリは分ける。GC・CPU・電源設定・可視状態・cold/warm・sampling間隔を保存する。heapとprocess memoryは別指標であり、samplingは瞬間peakを逃す。少ないメモリだけから第二AST不存在を断言しない。既存R04-13のNode証拠をブラウザー実測へ転記しない。今回のcanary heap値は製品性能値ではない。

### 永続性・背景移行

同じ正式専用profileでページ再読込→正常ブラウザー終了→再起動し、native IDBの全4-storeとgenerationをhash照合する。サイトデータ削除、OS異常終了、電源断は別条件であり通常再起動から保証しない。navigator.storage.persist()の許否と実際の保持は別に記録する。背景移行はheaded実tab切替/最小化とvisibility/focus/pageshow、復帰時刻、generation guardを記録する。CDP lifecycle freezeは人工故障として分離する。バックグラウンド時の間引きやSafari/iPhoneの休止は今回証明しない。

## 証拠と判定の運用

新run/attempt専用フォルダを排他的作成し、raw fixture・oracle・全variant計画を実行前commitに固定する。API observerだけに依存せずnative CDP・source経路・人間の表示確認を突き合わせる。window/worker/frame/service workerの未接続contextがあれば通信・consoleケースをPASSにしない。観測ロジックの陽性/陰性canary不成立時は正式実行を開始しない。

request bodyや整理内容をログへ保存しない。dummy markerの有無・bytes/hashとsource位置を保存する。画面・DB dumpもダミーデータのみ。エラー・失敗・fixture不備は消さず新attemptに分ける。正式結果templateのpreparationOnlyフラグを、承認された正式run作成時だけ別ファイルで設定する。

## 正式実行前の未解決事項

1. RST-15の条件付き前提とR07-09のcompile-time ACTIVE前提の適用判断。
2. headed画面、OS picker、人間レビュー担当・72代表画面範囲の承認。
3. 製品case driver、source位置付きphase故障/段階計測、全context coverageの接続確認と実行前再固定。環境canaryはこれらを製品上で検証していない。
4. 実quota、物理保存、OS異常終了・背景移行、Safari性能は未検証。必要な実環境と権限・故障条件を別途固定する。

以上が満たされるまで正式7件を開始しない。本資料はF5/F6合格や公開承認を意味しない。
