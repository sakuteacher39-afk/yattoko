# F5実ブラウザー試験：実行前Gate照合

対象準備commit `1725d1fa939bd12b8dac896e72ed41e3ccabe58a`、固定製品 `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。専用ブランチ `codex/f5-browser-gate`。今回も正式F5を実行せず、累積台帳70 PASS / 427 NOT RUNをbyte一致で保持した。

## Gate別の結果

| Gate | 結果・実行可否 |
|---|---|
| F2:RST-15 適用範囲 | 条件を明確化。承認済みF2 §2.1はdisplayCode非正本・UI導出・将来file収録時のみ不一致拒否、試験原文も「file形式に存在する場合」。現行6-key category schemaにdisplayCodeはない。専用不一致分岐は現行非適用。case全体の処置は制作管理室の適用判断待ちで正式NOT RUNを維持 |
| F2 独立oracle | 承認commitの原文から12対応表とcategory許可keyを抽出し、F4 UI/serializerと照合。未知displayCodeは一致値でも不一致値でもunknown field拒否が期待。これを専用不一致分岐の証明に置き換えない。将来schema追加は別承認・別製品固定が必要 |
| F3:R07-09 非ACTIVE | 固定製品での動的検証は **NOT VERIFIABLE（Gate評価）**。registryはmodule lexicalなObject.freeze ACTIVE定数。引数やruntime設定の注入経路がない。file version不一致、module通信失敗、global変数、freezeへの書込失敗は非ACTIVE guard実行の代替にならない。正式台帳に新attemptを作っていないためcase正式状態はNOT RUNのまま |
| Headed接続 | Chrome 155.0.8059.86の実ウィンドウを隔離profileで起動。headless引数なし・visible・native CDPを記録。固定ファイルをそのまま配信し、driverが開始画面→カテゴリ画面→native File選択→preview→空のdummy復元まで接続。native crypto/IndexedDBとGUARD→CLEAR→PUT→READBACK→completeの観測を確認。正式variant試験ではない |
| 人間確認 | OS picker・保存dialog・明示確認・Console/Network・性能/永続性の操作と証拠責任を`HUMAN-WORK.md`で定義。今回humanObserved=false、OSDialogExercised=false。自動接続を人間の署名へ読み替えない |
| R07-05 coverage | 代表72画面方式を採用せず、全600 variant×partial/completed×5段階=6,000確認行、最低9,600表示観測を計画。全行に独立期待・fixture bytes/hash・証拠・人間署名欄。未確認は未確認のまま保持 |

承認原文のGit blob/bytes/SHA-256と行引用は`SOURCE-CROSSCHECK.json`。F3試験計画は後続MAN追加によって全file hashが変わっているが、今回引用した承認済みR03-18/R04-12/R07-05/R07-09の原文は変更されていない。関連原文一致と全文一致は区別した。

## 7ケースの更新状態

| case | 現段階 | 残るGate・独立判定 |
|---|---|---|
| F2:RST-15 | 適用判断まで保留 | 条件付き分岐の非適用処置を制作管理室が判断。unknown field拒否だけでcase PASSとしない |
| F3:R03-18 | native接続成立、条件付き実施準備 | 全予定variant/phase故障のdriver対応と人間UI確認を実行前固定。全native窓・source処理順・完了前表示を取得できなければNOT VERIFIABLE |
| F3:R04-12 | 計測Gateあり | 小さな空dummyからstress性能を推測しない。1MB/256操作全条件のstage区分・sampling/overhead校正・人間評価を事前固定 |
| F3:R06-09 | context/workflow coverage Gateあり | main page接続だけでは全frame/worker/service-worker・全workflowの通信禁止を証明しない。全sink/context接続と人間Network確認が必要 |
| F3:R06-10 | context/workflow coverage Gateあり | 全console level/exception/remote objectと人間Console確認を必要とする。観測欠落を0件PASSにしない |
| F3:R07-05 | 全variant手順確定、人間/driver Gateあり | 空dummy接続はservice表示driverの全coverage証明ではない。全6,000行の証拠・署名取得までPASS不可 |
| F3:R07-09 | 固定対象ではNOT VERIFIABLE | 下記の別承認が必要。異なるartifactでの成功を現行revisionへ移植しない |

現在ただちに正式実行可能とするcaseは0件（今回の承認範囲も正式実行を含まない）。R03-18/R04-12/R06-09/R06-10/R07-05の5件はnative Chromiumを用いる手順が対象に適合し、残る方法・coverage・人間Gateの解消と正式実行承認後の候補である。新しい承認を得るまで実行しない。

## R07-09に必要な別承認

選択肢A：非ACTIVE negative buildまたは注入可能な製品seamを明示的に承認し、変更commit・hash・影響評価・対象再固定を行う。その別artifactの結果は現行製品へ自動転記しない。

選択肢B：production build/deployment gateとしての適用範囲と必要証拠を制作管理室が承認する。現行の静的build provenanceをどこまで原文の証明と認めるかを人間が判断し、試験担当が独断で要求を緩和しない。

いずれも今回は実施せず、製品変更を提案以上に進めない。

## 接続記録・限界

`connection/YTK-GATE-CONNECTION-20261026-001/`にwindow/commandline/browser、4画面、nativeイベント、API trace、phase source stackを保存。driverによるcheckboxクリックは専用dummy操作であり、人間の明示確認の証明ではない。CDP setFileInputFilesは実Fileを製品に渡すがOS dialogを迂回した。

この接続では実quota、OS保存、永続性、background、stress性能、全variant故障、全context通信/Consoleを試験していない。Chrome起動成功や単一phase接続を正式PASSへ転記していない。旧証拠と製品・依存の前後hashを監査する。最終結果は`AUDIT.json`、成果物hash一覧は`EVIDENCE-MANIFEST.json`。

制作管理室へ、F2条件の適用処置、R07-09の検証不能と別承認、5候補の残Gate、全variant人間確認範囲、接続記録の独立レビューを依頼する。成果物をcommit・push後に停止する。正式F5、F6、本番公開、mainマージ、R005凍結解除は行わない。
