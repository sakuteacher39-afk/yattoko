# 人間の操作・証拠範囲

本書は正式試験前の分担確定案である。確認済み・署名済みとは扱わない。担当役割は制作管理室の指定実施者（操作と記録）および別の確認者（画面・証拠照合）。氏名と日時は各正式runの実行前固定時に記す。未記入はGate未解消とする。

## 実施者の必須操作

| 操作・観測 | 自動担当 | 人間担当・必要証拠 |
|---|---|---|
| Headed起動・実画面 | CDP window状態、headless引数なし、可視状態、screenshot、browser/hash | 実ウィンドウが対象Chromeで表示され、拡張機能・別profile・filterにより観測が欠けていないことを記名確認。今回の自動screenshotは人間確認の代わりにしない |
| ファイルを選択 | fixture raw/hash、File API後の処理観測 | native pickerを実際に開く、対象ファイル選択、キャンセル、誤選択後の再選択を操作。OS dialog全体の画面と前後のUI・ファイル名・時刻を記録。CDP setFileInputFilesはpickerの証明に使わない |
| backup保存 | blob bytes/hashと結果表示の取得 | native保存先選択・キャンセル・例外時表示・読戻しファイルhashを確認。共有/クラウド同期フォルダを避けた専用dummy領域。物理保存完了を保証する表示がないことを確認。write/closeやdownload完了を物理媒体耐久性に読み替えない |
| 復元preview・明示確認 | 件数・scope・pending・DOM・DB hash、transaction complete時刻 | 旧データ置換、未保存回答別操作、未収録範囲の説明を読んでcheckbox/buttonを本人が操作。確認前に変化せず、完了前に成功表示せず、失敗時入力保持を画面で照合 |
| native transaction | API/phase時刻、source経路、request成功・complete/abort | UI状態とtraceの対応を照合。DevTools pause/stepによってtransactionの寿命を変えない。単一接続canaryから全variantを認定しない |
| Console/Network | native CDPとsink観測、dummy marker検出、全context一覧 | DevTools全level・preserve log・filterなしを確認。遅延remote objectを直ちに展開。全workflowの画面とsanitized traceを照合。拡張/worker/frame/例外の未接続があれば合格署名しない |
| 時間・メモリ・容量 | stage計測・sampling・input境界oracle | 電源設定・CPU/RAM・foreground・他負荷・cold/warm・GC・OS警告・白画面/中断を記録。sampled peakと真のpeakを区別。実quota/物理保存/Safari性能に自動転用しない |
| reload/restart/background | 同profile native IDB dump/hash、visibility/focus/generation trace | 実際の再起動・tab切替/最小化・復帰を操作して表示を照合。CDP freezeを実OS背景休止と混同しない |

## R07-05：代表画面を合格根拠にしない

旧準備の72代表画面方式は本Gate案では採用しない。旧資料は変更せず、新しい`R07-05-HUMAN-COVERAGE-600.json`を追加した。

12カテゴリ×親intention5値×service override5値×normal/emergency2種=600 variant。各ファイルにpartial/completedの2serviceがある。すべてを独立fixture hashと対応付ける。

各variantの両serviceについて、(1)復元後一覧、(2)詳細、(3)reload後の一覧と詳細、(4)同profileのブラウザー正常再起動後の一覧と詳細、(5)親intention変更後の一覧と詳細を確認する。合計6,000確認行。複数画面を含む行は双方の画面証拠を必要とするため、最低9,600の表示観測を予定する。画面を同一captureへまとめる場合も、各対象record/viewを識別し読めることが必要であり、未表示の項目を観測済みにしない。

期待値は承認済みR09規則：overrideがnullなら親を使い、親unansweredだけ表示/effectiveをundecidedとする。overrideがある場合はその値。親変更の期待も各行へ事前固定した。DB上の親unanswered、override nullはfallbackによって書き換えない。親変更は確認した明示操作による値だけを変え、serviceにderived値を複写しない。

自動担当は全variantの入力・DB・DOM・画面hashを保存する。人間は各行の表示と独立期待、record識別子、親/override、タイミングを照合して記名・日時を付ける。すべての人間確認欄は現在null、statusはNOT RUN。未確認行、欠落画面、未接続driver、失敗variantがあればcase PASSを出さない。代表画面の成功や別variantの結果をコピーしない。

本範囲は将来正式実行の手順として制作管理室へ提出する。今回この600 variantを実行していない。
