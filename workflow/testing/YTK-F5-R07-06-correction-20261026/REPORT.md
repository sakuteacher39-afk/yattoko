# F3:R07-06 是正再試験・監査報告

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。旧成果物：`df8181591e17f2c081a0b1f8e7c024d9e504fcf6`。専用ブランチ：codex/f5-r07-06-retest。実行前固定commit：`13bfa32e237bb29aa8bee97291215a39df8d6810`。新run：`F5-R07-06-CORRECTION-20261026-001`、attempt2。

**F3:R07-06：PASS。child存在の不正入力48件すべてを拒否し、childなし正常control6件すべてを受理した。計54件PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回の対象内）。**

旧run F5-REG-M4-20261026-001のFAIL、旧fixture/runner/ledger/証拠は変更・削除していない。受理済み8 PASSは再実行・自動移植せず、旧runの11 NOT RUNもそのまま保持した。

## 48 variantとcontrolの対応

旧48件は不正42件（2kind×3inactive parent×child全7値）とchildなしcontrol6件だった。今回の指示「全48variantについて親inactive・child実在」を不正48件として満たすため、旧不正42件を是正し、childをbillingの前へ挿入する6件を追加した。正常control6件は別枠で維持し、合計54件を同一ケースで実施した。旧48件から新fixtureへの対応はOLD-VARIANT-MAPPING.jsonに記録済み。

| kind | parent billing | child存在の不正入力 | childなしcontrol |
| --- | --- | ---: | ---: |
| normal | no | 8 / 8 PASS | 1 / 1 PASS |
| normal | unknown | 8 / 8 PASS | 1 / 1 PASS |
| normal | unanswered | 8 / 8 PASS | 1 / 1 PASS |
| emergency | no | 8 / 8 PASS | 1 / 1 PASS |
| emergency | unknown | 8 / 8 PASS | 1 / 1 PASS |
| emergency | unanswered | 8 / 8 PASS | 1 / 1 PASS |

各グループの不正8件は、child値unanswered/apple/google/microsoft/direct/other/unknownをbillingの後へ挿入する7件と、unansweredをbillingの前へ挿入する1件。全件の親値は承認済み条件billing=yesを満たさず、子billingSourceはinactiveである。

## fixture是正と独立検証

canonical baselineはchild挿入より先に生成した。JSONとして得たraw envelopeにchildを追加し、その後はprojectionを一切行わず、raw payload6fieldをそのままJSON化しnative SHA-256で署名した。baselineは承認済みDS-CONDITIONALから親値とchild不存在を設定して独立生成し、正常controlの実受理も確認した。

独立checkerは全48件について親inactive、childのown field実在、値が承認enumに含まれること、answers内キー位置、raw key/valueのUTF-8 byte offsetとfragmentを検証した。childを含むpayload bytes/hashとchecksum一致、childを含まないbaselineとはhashが異なることを確認した。さらにchildを除去した別cloneとbaseline本文の値・順序が完全一致することを照合し、不正条件がinactive childの存在であることを記録した。cloneの比較結果をfixture生成や署名へ戻していない。

正常control6件は親inactiveかつchild不存在を独立確認。checker自体がchild欠落とchecksum改変を検出することも実行前に確認した。FIXTURE-CALIBRATION.json、PREEXECUTION.jsonに全値・位置・raw bytes/SHA-256・payload SHA-256・checksum・schema条件を保持する。

## 正式実行と実測

Node v24.20.0 / fake-indexeddb6.2.4。実行前commitに全runner/helper hash・環境・依存ファイル・54 fixtureと6 baseline・期待値・独立oracleを固定した。正式実行開始前に全入力hashとchecker結果を再照合し、新runへattempt2として記録した。

不正48件はfile read1・full parse1の後に拒否され、verified token未発行・preview無し・digest0だった。固定error codeを期待にせず、実際のerrorは診断値として証拠へ残した。checksumは独立oracleで正しく生成・照合済みであり、checksum不備を理由とする拒否試験ではない。

正常control6件はstrict import、SHA-256検証、previewを受理した。全54件で初期旧4ストアと操作後4ストアが完全一致し、readwrite openは0。preview段階までの検証であり、今回対象外のrestore commitやpending適用を実行していない。

## 証拠監査と保全

各variantの期待・実測・判定・入力hash・独立oracleはrun内observation.json、4ストアbefore/afterとtransaction traceは同じrun内へ保存した。ledger.jsonlは新run専用の追記記録。EVIDENCE-MANIFEST.jsonに222証拠ファイルのbytes/SHA-256を記録し、監査で全件一致を確認した。

POSTRUN-AUDIT.jsonで全54入力とoracle、期待・実測、4ストア完全一致、readwrite無しを再照合した。固定対象3,441ファイル、過去履歴23,089ファイル、依存ファイルは試験前後bytes/hash一致。旧FAILと元child欠落fixture、旧8 PASS、旧11 NOT RUNも明示的に保全確認した。監査は追加製品ケースを実行していない。監視対象sinkへの通信・console出力試行0件。

変更は新規workflow/testing/YTK-F5-R07-06-correction-20261026/のみ。全一覧はCHANGED-FILES.txt、全成果物のbytes/hashはARTIFACT-MANIFEST.json（自己除外）。製品コード、schema、registry、承認済み仕様・試験計画、旧証拠は変更していない。

## 残件・制約・停止

本ケースは新attemptでPASSとなったが、旧FAILを上書きしていない。今回対象外の11ケース、他の未選定16ケース（Node9＋ブラウザー/人間7）は未実施のまま。既存PASSを今回のrunへ転記せず、開発テスト結果も転記していない。

実ブラウザー、実quota、物理保存、iPhone Safari性能は未検証。本結果でそれらやF6の安全性を認定しない。暫定raw16MB/pending1MB/256操作は変更していない。

制作管理室へ本是正再試験結果の独立レビューを依頼し、監査・commit・push完了で停止する。未実施11ケース、その他F5・F6、本番公開、mainマージ、R005凍結解除へ進まない。F5全体PASSも宣言しない。
