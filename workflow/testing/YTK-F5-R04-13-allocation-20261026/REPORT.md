# F5-R04-13 独立検証基盤・限定再試験報告

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。旧成果物：`5670635aad6ece7cd210befb44d0d263f75f5db3`。専用ブランチ：codex/f5-r04-13-allocation-validation。実行前固定commit：`ec8dd7134509071de61918b16d14be24b09a4614`。

陽性感度run：`F5-R04-13-SENSITIVITY-20261026-001`。限定正式run：`F5-R04-13-ALLOCATION-20261026-001`、attempt2。

**F3:R04-13：新attempt PASS（正式6 variantすべてPASS）。** 保持型・一時型の第二AST陽性controlが両方検出された後にだけ正式runを開始した。旧NOT VERIFIABLE・証拠・ledgerは保持し、受理済み19 PASSやブラウザー必須7件を再実行・転記していない。判定は固定scannerのNode上の当該要求に限定し、F5全体・16MB安全性・Safari性能の認定ではない。

## 正確な要求と経路の照合

承認済みF3設計v0.3（3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641）と固定製品に含まれる設計文書のGit bytesは完全一致した。試験計画には後続の承認済み追加があるが、R04-13原文は一致する。設計738行はscanner自体がraw/textを全objectの別巨大treeとして保持しないこと、試験244行はraw16MBでduplicate scannerが別巨大ASTを作らないことを要求する。APPROVED-SOURCE-CROSSCHECK.jsonとREQUIREMENTS.jsonにGit blob・bytes/hash・行・原文を保存した。

静的経路：File.size guard→fatal UTF8 decode→scanJSON→全体JSON.parse→exact schema/version/field検証→schema順canonical再生成とraw bytes比較→checksumを除く6 root fieldsのUTF8 payload生成→SHA-256→追加semantic検証→verified token。noncanonical padding fileはcanonical比較で止まり、checksumへ進まない。scannerは各objectのdecoded key Setを持ち、string tokenだけをscalar JSON.parseで解釈する。

F3設計9.3のiPhone/Safari peak memory測定と16MB安全性の最終採用は別要求である。本Node試験で代替せず、F6はNOT RUN、16MB安全性は未認定のままとする。

## 独立した方式と陽性感度

1. Acorn 8.18.0（実行Nodeに内蔵されたソースを試験toolingに抽出しhash固定）で固定scannerの全constructor・Object/Array literal・producer call・assignment・returnを監査した。許可される構造はinput非依存のnumeric limits object、固定literal配列、局所decoded-key Setのみ。動的tree producer、propertyへの連結代入、未知callが無く、非void returnはscalar stringのみ。JSON.parse引数は引用符付き4096文字以内tokenで、unicodeによるstring検査を経てkey Setへ入る。runtimeでも全scalar parseがstringであることを確認した。STATIC-AUDIT.jsonに全callと行を記録した。
2. 全体parse、manual object、manual arrayの生成を挿入した試験側ソースcopy3件を上記監査が全て拒否した。実製品のファイル・実行コードは変更していない。
3. in-process Node Inspectorでallocation tracking・sampling（回収されたobjectのsampleも保持）とV8 heap snapshotを採取した。heap oracleはtotal heap量や陽性marker名を使わず、実object edgeのfileFormat→snapshot.services→recordId/answersと、独立に計算した全service件数でtreeを認識する。snapshot node IDで共有payload/canonical wrapperを重複計上しない。
4. 保持型controlはnative JSON.parseで第二treeを作りscanner終了まで保持した。peakで1 tree、scanner終了時1 treeを検出。一時型controlはpeak後に解放・GCし、peak1 tree、scanner終了時0 tree、解放後にもmakeSecondAST由来allocation stackを検出した。両controlのallocation traceも実在する。単なる終端heap量では一時treeを見落とすことも同時に示した。
5. 両感度条件が成立したSENSITIVITY.jsonのhashを正式environmentへ結び付けた後、新runを開始した。正式runでは静的producer閉包監査、heap graph、scalar parse観測を組み合わせた。heap checkpointだけで全時点の不存在と断定したものではない。

Node InspectorのAPI根拠は[公式ドキュメント](https://nodejs.org/api/inspector.html)。実際のNode v24.20.0 / V8 13.6.233.17-node.53で機能を確認し、Node binary hashも固定した。Inspector TCP listenerは開いていない。

## 正式実測

旧runの3入力（canonical control、raw16MB SP/LF）はraw bytes/SHA-256が完全一致する形で保持した。追加3入力はsnapshot9,999,999 bytes・19996 serviceのdense canonical controlと、そのraw16MB SP/LF paddingである。全入力はdummy data。各variantを最小observerとheap-profiled workerで実行し、受理/拒否・parse回数・digest回数が一致した。

| variant | raw bytes | services | tree：decode後 / scanner終了 / parse後 | 実処理 | digest回数 | 判定 |
| --- | ---: | ---: | --- | --- | ---: | --- |
| old-canonical-control | 3607 | 3 | 0 / 0 / 1 | 受理 | 1 | PASS |
| dense-canonical-control | 10000243 | 19996 | 0 / 0 / 1 | 受理 | 1 | PASS |
| old-raw16000000-32 | 16000000 | 3 | 0 / 0 / 1 | CANONICAL拒否 | 0 | PASS |
| old-raw16000000-10 | 16000000 | 3 | 0 / 0 / 1 | CANONICAL拒否 | 0 | PASS |
| dense-raw16000000-32 | 16000000 | 19996 | 0 / 0 / 1 | CANONICAL拒否 | 0 | PASS |
| dense-raw16000000-10 | 16000000 | 19996 | 0 / 0 / 1 | CANONICAL拒否 | 0 | PASS |

全variantでFile read1、全体JSON.parse1。全scalar parseはstringを返しtoken長4096以内だった。scanner終了時のtree0に加え、native full parse後にtree1を検出しているため、detectorが何も見ていない状態の0を合格根拠にしていない。正規2件ではcanonical full生成→canonical payload生成→SHA呼出の順序、raw16MB padding4件ではcanonical拒否・SHA0を確認した。RESULT.jsonのchecksは「期待との一致bool」であり、padding fileの実受理値はfalseである。

## allocation・heap証拠と限界

allocation-timeline.jsonl、trace tree/trace function infosを含むheap graph（.heapsnapshot.gz）、sampling-profile.json.gz、phase別memory/parse/encode/digest観測、input raw、独立oracle、対象hashを保存した。gzip保存物には元heap bytes/SHA-256とcompressed hashを併記し、監査で両方を照合した。

同期scanner中のInspector通知は細粒度の連続配送ではなく、heapStats/lastSeen通知だけから一時allocation不存在を証明できない。samplingも完全な全allocation記録ではない。そのため低メモリ値やparse回数のみを根拠にせず、固定ソースの全producer/escape制約を独立監査し、runtimeの実tree graph検出と組み合わせた。graph detector単体はこのJSONデータ形状を認識するもので、任意の別表現ASTや全V8内部構造を証明するものではない。固定source監査が成立しない別コードへの一般化はしない。

heap取得にはstop-the-world/GCの観測効果がある。記録したmemory値を無計測時のpeakやSafari性能に読み替えない。後続canonical projectionが作る正当なobjectはscanner windowと分離し、追加treeとして誤判定していない。

## 保全・監査

125証拠ファイルのbytes/SHA-256を照合し、36 heap graphを独立に再計算した。各heapのallocation trace tuple・allocation数・function infoが実在し、sampling/profile・timeline通知も存在することを確認した。全6variantのstage順序、observer前後の処理結果一致、陽性感度gate→正式runという順序も再確認した。POSTRUN-AUDIT.jsonを参照。監査は製品の追加実行を行っていない。

固定対象3,441ファイル、依存1,978ファイル、過去履歴28,313ファイルの試験前後bytes/hashが一致。旧NOT VERIFIABLEと19 PASS、旧FAIL・是正履歴・fixture・ledgerも保持した。新workerの監視対象sinkへの外部通信・console出力試行は0件。

子processへ明示した環境変数は4項目だが、Windowsのlibuvが必須OS変数を補完し、実測では13 keysだった。初回監査のexact4という想定を一次資料で照合し、明示4＋補完対象のexact setで再監査した。製品・計測runner・raw証拠・正式結果を変更/再実行したものではない。AUDIT-HISTORY.jsonに経緯とactual keysを保存した。対応する[libuv v1.52.1のrequired_vars/make_program_env](https://raw.githubusercontent.com/libuv/libuv/v1.52.1/src/win/process.c)と一致し、その他のaccount/API環境keyは観測されなかった。heapには通常のWindows OS metadataは含まれる。環境変数の値を報告書へ出力していない。

変更は新規workflow/testing/YTK-F5-R04-13-allocation-20261026/のみ。全変更ファイルはCHANGED-FILES.txt、全成果物のbytes/hashはARTIFACT-MANIFEST.json（自分自身を除く）。製品、schema、registry、承認済み仕様・試験計画を変更していない。Acorn/toolingとinstrumentationは試験領域だけにある。

## 提出・停止

新attemptの当該Node scanner要求はPASSとして提出し、制作管理室の独立レビューを待つ。旧NOT VERIFIABLEを上書きしていない。他19 PASSは再実行・移植していない。実ブラウザー必須7ケースはNOT RUN、F6はNOT RUN、16MB全体安全性は未認定。F5全体PASS、本番公開、mainマージ、R005凍結解除を宣言・実施しない。監査・commit・push完了で停止する。

Windows Gitの既定path長制限で証拠ファイルのindex追加が一度失敗したため、Git操作にcore.longpaths=trueを指定した。証拠のpathやbytesは変更していない。Windowsで同じ深いworkspaceへcheckoutする場合もlongpaths対応が必要。

試験toolingへ同梱したAcornのMIT noticeと由来をtooling/LICENSE-acorn.txt、tooling/PROVENANCE.mdへ添付した。実行済みparser source・runner・入力・証拠のbytesは変更していない。
