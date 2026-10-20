# 実行前固定（R2が実行用）

- 承認範囲: REGRESSION-IMPACTの94件のうちF3:R02-01..40から09を除いた39件のみ。残る55件、R02-09の再実行、他F5/F6は対象外。
- 固定subject: 168274010a1aa45794de98dc71ac5735cb9d0ae1、既存TARGET-LOCKの全1,377ファイル/同一archiveを利用し、製品・spec・旧正式証拠は一切編集しない。
- 実行用plan: PREEXECUTION-R2.json。39ケース/740入力を排他作成済みinputへ固定。全input/期待値/独立oracle/原文行/実施方法/fault/環境・runner hash/既存証拠一覧を実行前にcommitする。
- 既存PREEXECUTION.jsonは製品実行前の初期案として保持し、R2へ更新した履歴を残す。正式実行には使わない。
- Node v24.20.0、SHA-256はnative Web Cryptoを観測ラップ。独立oracleはNode createHash、JSON/UTF8、独自token stackのdecoded-key照合、承認済みmanifest、F2/F3 field順。SUT validatorを期待値生成に使用しない。
- control/bidi recipeは77code points × before/middle/after × raw/escaped =462入力をR02-22に展開。unknown root/nested snapshotはextra/__proto__/constructor/prototypeを別入力にした。数値・Unicode・escape・checksumの原文variantを個別固定。
- R02-28はimport/export双方でnative controlとSHA reject/不正長0/31/33を確認。READ-FAILをこのcaseの合格条件へ追加/転記しない。
- R02-29は成功/失敗・normal/emergencyのparsed JSON内容を、digest直前/直後/returnでhash照合する。透過proxyで値set/delete/define/prototype変更の試行を記録し、データ書換え試行0を要求する。値を変更しないObject.freezeのdescriptor hardeningは別metadataとして記録し、JSON内容の書換えと区別する。全体parse回数はJSON.parse成功後ではなく呼出し前に計数し、例外を隠さない。
- R02-30はnormal/emergency full/partial/noneで独立schema serializerに対するraw一致と、実際にSHAへ渡す6-field payloadのbytes一致を観測。exportの正常出力も独立bytesと照合。
- R02-31はregistry literalにbindingして独立再生成したV-VALID-01と、実際のimport/prepareRestore APIを使用する。新規fake-indexeddb6.2.4だけを外部依存として使用。検証用importとpreview token用importは別の2回の読込で、同一固定bytesを渡す。preview先は空DB、readonly transaction以外は停止。commitRestoreには触れない。ブラウザー/UI/F6の実証とは扱わない。
- すべての入力はダミー。Fileが返すbytesと元bytesの不変、外部通信・consoleへの出力・不許可writeの不在を記録。検出時に停止する。
- V-HASH-01は旧不備を保持し、元vectorの拒否を別観測にする。one-byte requirementは校正済みASCII日付1byte変更の派生vectorで検証。FIXTURE-CALIBRATION.jsonに両者のbytes/hash/差分を記録。旧不備履歴は変更しない。
- 準備中の構文checkでadapterの閉じbrace欠落を修正（製品未実行）。独立校正がunknown-root生成時のkey脱落を検出したため、入力のunknown own-keyを維持し、checksumは既知6fieldに対して算出するようfixture生成器を修正した。校正失敗を製品不具合とは扱わず、正常入力や製品成功へ読み替えていない。
- caseの全variant/必要観測が揃い期待と一致した場合のみPASS。不一致FAIL、基盤/観測不足NOT VERIFIABLE、未実施NOT RUN。740入力の事前固定の一部を省略したcaseはPASSにしない。
- runnerとplanのcommit確認後だけ実行。RUN/ledger/evidenceは別領域へ排他作成。既存PASS/FAILや開発117件は一切転記しない。

この小バッチを終えたらcommit/pushして停止し、制作管理室の独立レビューを待つ。
