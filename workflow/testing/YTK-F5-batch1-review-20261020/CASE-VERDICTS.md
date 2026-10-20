# F5第1バッチ独立レビュー対応｜対象3件の新attempt判定

原run 75 PASS / 3 FAILを保持。既存75件は再判定しない。今回のattempt2は2 PASS / 1 FAILで、旧判定の上書き集計ではない。

|ケース|旧attempt1|新attempt2|観測数|result SHA-256|
|---|---|---|---:|---|
|F3:R02-36|FAIL（保存）|PASS|6|744d9aa7313083e766daef5c48963901c68ece565f1542b3c205e59f3a30e947|
|F3:R02-39|FAIL（保存）|PASS|8|33fa1ed94c546fc8aa0e29bccce9bdfe996c0bdd65bd4b46a34cd8955002f52e|
|F3:R02-09|FAIL（保存）|FAIL|8|e1ea6fd682caf0611988c81018525dbb6c538cd11b02f742c9160ed3d6e8fe3d|
