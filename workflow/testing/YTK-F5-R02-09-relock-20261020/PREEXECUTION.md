# 実行前記録 — R02-09限定正式再試験

製品対象を99e566dから1682740へ切り替える人間承認に基づく。今回の正式実行は **F3:R02-09のみ**。旧attempt1/2のFAIL、元第1バッチ75 PASS / 3 FAILを上書きしない。

- 新subject revision: F5-subject-r2-20261020。全Git tree 1,377ファイルをexact Git blob bytesでarchive/extractし、blob SHA-1 / bytes / SHA-256をTARGET-LOCK.jsonへ固定。
- 旧123ファイル中122は不変。動作差分は許可されたimport-json.mjsのみ。追加の開発テスト1ファイルと試験関連文書はruntime entrypointではない。
- Node v24.20.0 Windows x64、builtinsのみ。runner/環境binary/fixture/planのhashを実行前に固定し、runnerとplanをcommitしてから実行する。
- run ID: F5-R02-09-R2-20261020-001、attempt3。新subjectの他496ケースはNOT RUN（旧PASSを移植しない）。補助gate10/F6は実行しない。
- controlは旧FIXTURES.jsonに固定されたV-VALID-01。各空白variantは元fixtureからbyte挿入のみで生成する。
- 全JSON tokenを独立tokenizerで再構成し元textとの完全一致を検証。元controlに存在する隣接token種別19種類＋先頭/末尾の計21位置×space/tab/LF/CR＝84variant、全境界mixed whitespaceとpretty JSON各1、正常control1、計87入力。
- 独立oracle: ECMAScript JSON.parseが受理し同じ構造・値・field順・checksumを維持、Node createHashで6-field payloadのSHA-256を照合。製品validatorをoracleへ流用しない。
- 実測: importBackupのFile読込1回、全体JSON.parse1回、空白variantはCANONICAL拒否/digest0回、controlは受理/digest1回。scanner成功は全体parse到達と固定sourceの制御順から証明する。CANONICALの唯一のthrow位置とraw比較→digestの順序をsource hash付き記録と対応させる。
- Fileから返したarrayBufferと元入力の前後hashを両方確認する。rawをtrim/再エンコードして製品へ渡さない。
- 外部通信/console出力/IndexedDBアクセスをtrapし、発生または対象改変時に即停止する。試験データはダミーのみ。
- 複数ケースへの一般化、実ブラウザーでの表示、transactionの動作は今回のPASS根拠に含めない。
- 固定tree、archive、旧証拠1,267ファイルの前後一致を検証し、input/observation/ledger/summaryを新runに排他作成する。既存runは再実行・上書きできない。
- 不一致はFAIL、基盤/必要証拠の取得失敗はNOT VERIFIABLE。87入力すべてを実証した場合のみR02-09をPASSとする。F5全体PASSは宣言しない。

実行後は回帰影響一覧を提出し停止する。追加の正式ケースは承認待ちとする。
