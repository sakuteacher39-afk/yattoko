# 正式開始前の環境追補

最初の固定commitは `d31631196a48c12a5b51e2be4121f9e956cb5441`。
開始前のGit blob照合でWindowsの長いパス制限が発生した。失敗位置はrun.mjsの製品module import・runフォルダ作成・ledger作成より前で、正式variant実行は0件。記録は `preflight/FAILED-START-01.json`。

runner・fixture・oracle・PREEXECUTION.jsonは変更せず、子process限定の `core.longpaths=true` をlauncherと `ENVIRONMENT-ADDENDUM.json` へ固定した。repositoryのGit configは変更していない。実行後は既存環境変数をfinallyで復元する。

追補を固定した実行前commitは `a9c3c0a9147662728ca40eb32131a9c80d46f638`。正式runはこのcommitから初めて作成された `F5-CAP14-20261030-002`、attempt 2である。旧NOT VERIFIABLEや正式試行を上書き・削除していない。
