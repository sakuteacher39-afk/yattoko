# F5回帰試験 統合・第2小バッチ 結果

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。実行前固定・runner commit：`8f39f084bbdadb2711a0bcdad867a353f0840b63`。run ID：`F5-REG-M2-20261026-001`。

前回55件と追加30件をcase IDで照合し、重複9件を除いた76件を統合した。由来・承認済み計画の行とhash・環境・fixture・独立oracle・選定理由はINTEGRATED-TARGETS.jsonに記録した。旧結果の移植および開発テスト結果の転記は行っていない。

安全性を優先して選定した20ケース、全3,113 variantを実行した。20 PASS / 0 FAIL / 0 NOT VERIFIABLE。未選定56件はNOT RUN。497ケースの本run記録は20 PASS / 477 NOT RUNであり、過去runの判定とは別管理である。

| ケースID | variant数 | 本run判定 |
| --- | ---: | --- |
| F2:RST-02 | 76 | PASS |
| F2:RST-10 | 11 | PASS |
| F3:R04-14 | 5 | PASS |
| F3:R04-03 | 2 | PASS |
| F3:R01-14 | 6 | PASS |
| F3:R01-12 | 4 | PASS |
| F3:R01-13 | 5 | PASS |
| F3:R05-16 | 4 | PASS |
| F2:RST-07 | 9 | PASS |
| F2:RST-09 | 4 | PASS |
| F2:RST-11 | 850 | PASS |
| F2:RST-12 | 549 | PASS |
| F2:RST-13 | 1561 | PASS |
| F2:RST-14 | 7 | PASS |
| F2:RST-16 | 4 | PASS |
| F2:RST-18 | 6 | PASS |
| F2:RST-19 | 4 | PASS |
| F2:RST-04 | 3 | PASS |
| F2:RST-05 | 1 | PASS |
| F3:R05-22 | 2 | PASS |

## 環境・期待値・証拠

Node v24.20.0、fake-indexeddb 6.2.4。実行環境・依存全ファイルhash・runner/helper hashはPREEXECUTION.jsonとrun内environment.jsonに記録した。製品は固定archiveのソースを読み込み、製品保存・復元・再適用関数を実行した。ダミー旧datasetを4ストアに事前配置し、拒否・中断後の全ストア値を比較した。期待値は承認済みmanifest・schema制約と独立canonical serializer、独立reducerから生成し、製品validatorをoracleとして使用していない。

復元atomic性は成功controlおよび29 request位置のabort、21 mutation位置のQuotaExceededError/DataError、4ストアreadback不一致を検証した。pending手動再適用は7許可operation種類を8操作で実行し、通常save呼出し・canonical guard・各保存状態・complete後receiptを照合した。依存chainではop1完了後にop2をabort/Quota例外で失敗させ、op1のみreceipt・op2以降remaining・旧op1保存状態維持を確認した。op2 retryケースは未実施。

原fixture10件は原カタログのbytes/SHA-256と一致し、派生入力3,113件は実行前にraw bytes/hashと独立oracleを固定した。good controlのcanonical raw/checksumと、欠落・未知field等の変形が署名再生成で補修されていないこともprepare時に照合した。原カタログのpreparationOnly/formalStatusは原記録として保持し、今回の正式判定はrun内各case/result.jsonを正本とする。fixture不備による未判定は本runで観測されなかった。

各variantの期待・実測・独立oracle・入力hash・判定はruns/F5-REG-M2-20261026-001/cases内のobservation.json、before/after全ストアおよびtransaction traceへ保存した。ledger.jsonlはrun内の追記記録。EVIDENCE-MANIFEST.jsonは証拠12,487ファイルのbytes/SHA-256を記録し、POSTRUN-AUDIT.jsonで全件再照合した。監査は追加製品ケースを実行していない。

## 整合性と保全

固定対象全3,441ファイルのbytes/hashは試験前後一致。最新承認成果物6228444745abd253381e5dc97acad64c491584c6に含まれる旧履歴3,839ファイルもbytes/hash一致。依存関係も前後一致。外部通信・consoleへの出力試行は監視対象sinkで0件。製品、schema、registry、仕様、旧ledger・証拠は変更していない。入力rawも変更されていない。

## 残件・残存リスク・次回提案

統合76件中、今回20件を終了し、残件56件（Node候補49件、実ブラウザー/人間確認を含む7件）。次回候補20件と理由はNEXT-CANDIDATES.jsonに記録した。容量・深さ・件数上限、preflight順序、依存関係、receiptと再試行、SHA失敗を優先候補とする。候補の実行前固定・fixture校正は別途必要であり、本作業では実行していない。

fake-indexeddbでの例外注入は、ネイティブブラウザーのquota発生条件、OS障害・電源断時の永続性、UI表示、実ファイルの物理保存を証明しない。ブラウザー/人間必須7件はF2:RST-15、F3:R03-18、R04-12、R06-09、R06-10、R07-05、R07-09。各監視sink0件は選定ケースのNode経路の観測に限定し、外部通信禁止の全製品境界を認定するものではない。raw16MB/pending1MB/256操作は既存の暫定値を変更していない。

制作管理室へ本成果物の独立レビューを依頼する。第2小バッチ終了により停止する。F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は行っていない。
