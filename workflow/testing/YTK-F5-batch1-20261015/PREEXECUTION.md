# F5第1バッチ｜実行前記録

対象製品: `99e566da100ee6924149ec3244893bbddf7e8c4d`。準備: `8f916e33931b6d4a8807f404fb919951b1ea9970`。

BATCH1-PLAN.jsonを正式実行前に固定する。registry/manifest/schema/UUID/strict JSONの78ケースを選定。各IDの選定理由・原文期待・独立oracle・実施区分・fixture/fault参照・runner hash・Node実行環境を記録済み。全選定ケースはAUTO_NODE / AUTO_STATIC / AUTO_FAULTであり、ブラウザー/F6は実行しない。

環境は準備済みNode v24.20.0と同一binary SHA。runnerはNode builtinsだけを使用し、製品とは別のこのディレクトリに置く。固定対象123ファイルはworkの独立snapshotで実行前後と各ケース開始前にhash照合する。package導入・製品編集・approved document変更は不要。

正式caseは runner/cases.mjs に独立bindingを実装。expectは承認値・normative manifest・Nodeの独立SHAとUTF8 byte算定・明示したUUID/JSON/schema条件から構成し、既存111開発testの結果やそのtest codeをコピーしない。HARNESS-SELF-CHECKS.txtの4件はrunner自己検証だけで正式F5 verdictではない。

run.mjsはpredeclared hashとGit commit内runner bytesを確認してから対象moduleをimportする。全入力/観測/resultはwxで一度だけ保存、ledgerは追記だけ。FAILでも証拠を保持し、criticalなtarget改変/外部通信/log sinkがあれば直ちに停止。残ケースはNOT RUN。第2バッチの自動進行はない。

V-HASH-01の「1byte変更」preconditionは独立校正する。準備fixture不備があれば原本とNOT VERIFIABLE attempt1を保存し、1byte差を実証した別の派生入力をattempt2へ記録する。原fixtureの上書きや製品修正はしない。F3:R02-09の原期待「canonical raw mismatch reject」はそのまま維持し、別段階で拒否した場合も正式期待との相違として記録する。

実行結果はruns/<runId>/へ保存し、497件＋F4補助10件の結果票のうち選定実施分だけを更新する。F6 150件は対象外。F5全体/F6 PASS、本番公開、R005解除を宣言しない。第1バッチ提出後に独立レビュー待ちで停止する。
