# F5第4小バッチ残件 実行前固定

固定製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99、最新成果物 dc84c49afc4aa4ef4502e4a37586ce5a85bc69e4。新run F5-M4-REMAINING-20261026-001。過去20+18+是正2+第4小バッチ8+R07-06是正1の49 PASSをcase IDで照合し、重複なし49件を除外した。未実施27件のうちNode候補20件すべてを対象とし、ブラウザー/人間必須7件は実行しない。過去PASSの再判定・転記を行わない。

最初の11件は前回停止後の未実施11ケースを優先。対象20件: F3:R07-07、F3:R07-08、F3:R07-13、F3:R07-14、F3:R02-08、F3:R02-09、F3:R02-10、F3:R02-13、F3:R02-25、F3:R02-30、F3:R02-39、F3:R07-01、F3:R07-02、F3:R07-10、F3:R07-11、F3:R07-12、F3:R02-31、F3:R02-36、F3:R04-11、F3:R04-13。全804 variantをraw bytes/SHA-256、期待値、独立oracle、runner/helper hashとともに固定する。

最終raw JSONから各invalid ID/version/pair/order/unknown own field/nested answer object/escapeを直接assertして不正条件消失を防ぐ。active conditional unansweredはchild own fieldと親yesを照合する。canonical拒否vectorはJSON-validでchecksum一致かつcanonical raw相違を別に確認。生成正常controlは全canonical raw/checksumを独立照合する。CHECKERのroot/category order取り違えを準備時に修正し、履歴と生成済みdraft入力hashを保持した。製品は準備段階で実行していない。

R04-11は実CanonicalStoreの最初のsaveへQuotaExceededErrorを注入し、実SaveCoordinatorへ257/512/256操作をqueueする。停止・全pending保持・旧保存不変を確認し、実createBackupとNode/jsdom上の実backup UIで未収録件数/範囲表示と画面入力保持を確認する。物理保存ボタンを押さない。件数超過2条件と、256件同一footprintの依存ID配列だけで1MB超となる容量条件を分ける。

R04-13はraw16MB、full parse回数・string token parse・heap値・固定scanner source hashを観測する。しかしこれだけでは一時的な第二ASTを含むallocation graph不在を実証できない。独立allocation graphが無い限り必須証拠不足としてNOT VERIFIABLEにする。parse1回等だけでPASSにしない。この事前制約は結果を後から弱めるものではなく、未実証条件を保持するための判定規則である。

Node v24.20.0、fake-indexeddb6.2.4、jsdom30.1.2。依存node_modules全1,978ファイルの前後hashを照合する。jsdomはNode DOMで、ブラウザー必須7ケースや実quota、iPhone性能を認定しない。

commit後、一度だけ正式実行する。不一致・外部sink・旧保存破壊・対象改変は停止し修正・再試験しない。観測不足はNOT VERIFIABLE、未実施はNOT RUN。旧FAIL/再試験/fixture履歴・仕様・製品・schema・registryを変更しない。

除外7件: F2:RST-15、F3:R03-18、F3:R04-12、F3:R06-09、F3:R06-10、F3:R07-05、F3:R07-09。F5全体PASSを宣言せず、監査・commit・push後に停止する。他F5/F6、本番公開、mainマージ、R005凍結解除は実施しない。
