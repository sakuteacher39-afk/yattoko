# F5回帰試験 第3小バッチ 結果

成果物の専用ブランチ：codex/f5-regression-mini-batch3。固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。参照成果物：`c98a4c027a83889ee2e7c9a81642482afe38fed8`。実行前固定commit：`c557b4613a61650a37e3ce053c61461284a20444`。run ID：`F5-REG-M3-20261026-001`。

残り56件からNodeで正式検証可能な20ケースを選定し、全102 variantを実行した。結果は **18 PASS / 2 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（選定20件内）**。variant別は99 PASS / 3 FAIL。初回FAILを変更・削除せず、追加実行やPASSへの昇格はしていない。

| ケースID | variant数 | 判定 | 根拠 |
| --- | ---: | --- | --- |
| F2:RST-06 | 2 | FAIL | runner期待値不備：容量検査でsave前に拒否。旧データ・receipt保護は観測。正式判定はFAIL保持。 |
| F3:R04-04 | 3 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-05 | 3 | FAIL | fixture不備：255/256操作に初期値と同じno-opを含む。257操作はparse前拒否。FAIL保持。 |
| F3:R01-06 | 4 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R01-07 | 7 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R03-17 | 4 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-12 | 3 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-23 | 2 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-19 | 2 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-11 | 3 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-04 | 8 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R05-05 | 1 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-06 | 2 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-07 | 3 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-08 | 24 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-09 | 2 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R04-10 | 2 | PASS | 実行前固定の期待値・全variantと一致 |
| F3:R02-28 | 3 | PASS | 実行前固定の期待値・全variantと一致 |
| F2:RST-08 | 14 | PASS | 実行前固定の期待値・全variantと一致 |
| F2:RST-17 | 10 | PASS | 実行前固定の期待値・全variantと一致 |

## FAILの分析と未解決事項

F2:RST-06では9,999,999 bytesの有効snapshotを復元後、pending追加により10MBを超える操作がcapacityとして拒否され、4ストアが完全一致、receipt0、remaining1だった。runnerはsaveCalls1を要求していたが、製品は通常saveの前にprospective mutateの容量検査で止まり、実測saveCalls0だった。承認済みRST-06にsave呼出し1回という要求はなく、試験の期待値不備と判定した。保存拒否と旧データ保護の観測を理由に本FAILをPASSへ変更しない。次回は仕様が求める拒否・不変・receipt無しとreadwrite無しを新しい期待値として事前固定する提案にとどめる。

F3:R04-05では255/256操作fixtureの第1操作がdevice usageStatus using→usingとなり、不正no-opとして拒否された。初期値・expectedValue・intended valueの一致は独立に原fixtureから確認できる。257操作は期待どおりscannerでparse前拒否された。255/256の有効性と完全受理は未実証。次回は各操作を独立追跡した現在値から必ず変更するfixtureを作り、全3境界を新attemptで再試験する提案とする。

詳細はFAIL-ANALYSIS.json。いずれも製品不具合の確定根拠とはしないが、当該ケースの正式合格を証明できていない。製品の免責や正式PASSへの読み替えも行わない。

## 実施方法・独立oracle・証拠

Node v24.20.0 / fake-indexeddb 6.2.4。環境・依存ファイル全hash、case ID、全variant、入力bytes/hash、期待結果、独立oracle、fixture/fault参照、runner/helper hashは実行前PREEXECUTION.jsonに固定済み。承認済みmanifestの値を独立serializer/reducerへ入力し、製品validatorを期待値生成に使用していない。helperのmanifestと固定製品manifestのbytes/hash一致はORACLE-BINDINGS.jsonに記録した。

pending 999,999 / 1,000,000 bytesは正規のnone captureとしてpreview受理、1,000,001 bytesはfull parse・SHA前拒否を確認した。深さ16/17、quoted token4096/4097、schema path member上限、理論service件数上限はscanner通過と後続schema拒否を分けた層別controlを用いた。単なる拒否を境界通過の証拠としていない。

preflightはFile read、UTF8 decode、full parse、全SHA完了、verified token発行、prospective canonical bytes生成、prepare完了がreadwrite開始より先であることを外部traceで照合した。receiptはtransaction complete listener時点で無し、apply resolve後に存在することを確認。abort/Quota例外でreceipt無し、同一session retryでop1は再commitせずop2/3を保存し、独立reducerの全状態と照合した。同一file二回importのsource identity、receiptだけsafe skip、未適用操作の再検証も確認した。private receipt Mapは公開status・返却receipt・防御的コピーの観測と固定ソースの構造照合を併用した。

全caseのobservation.jsonに期待・実測・oracle・判定を保存した。全ストアbefore/after、transaction trace、events、session receipt/save traceも保持する。run内ledger.jsonlは追記型。EVIDENCE-MANIFEST.jsonに485証拠ファイルのbytes/SHA-256、POSTRUN-AUDIT.jsonに全件hash照合と102入力・期待値照合、18 PASSの再監査、FAIL差分3件を記録した。監査は追加製品ケースを実行していない。準備段階のfixture経路エラー1件もPREPARATION-HISTORY.jsonに保持している。

## 対象と過去証拠の保全

固定対象全3,441ファイルのbytes/hashは試験前後で一致。参照成果物c98a4c0に含まれる過去履歴19,456ファイルも前後一致。依存ファイルの前後一致、入力raw不変、監視対象の外部通信・console出力試行0件を確認した。変更は新しい試験成果物ディレクトリ内のみ。製品コード・schema・registry・承認済み仕様・旧結果・FAIL・未検証履歴は変更していない。既存開発テストは実行せず、その結果を正式判定に移植していない。

## 残件と次工程への提案

開始時56件のうち20件を実行。未実施は36件（Node候補29件、ブラウザー/人間必須7件）。これに要再試験のFAIL2件を加え、当該56件内の未合格・未実証は38件である。第2小バッチ20 PASSは過去runの履歴として保持し、本runへ再判定・自動移植していない。CASE-STATUS.jsonは本runのみの497件（18 PASS / 2 FAIL / 477 NOT RUN）の記録であり、全体の累積合否とは別である。

次回は試験側不備2件の新attemptを優先し、raw容量境界、resource error分類、依存chain、F2 invariant、ID文法、canonical/署名済み不正fileを候補とする。20候補のID・理由はNEXT-CANDIDATES.json。実行には別の実行前固定が必要であり、今回は実行しない。

fake-indexeddbの結果は実ブラウザーの永続性・実quota・物理ファイル保存・iPhone Safari性能を証明しない。暫定raw16MB/pending1MB/256操作の値は変更していない。監視sink0件の証拠は選定Node経路に限定され、全製品のブラウザー通信境界の認定ではない。

制作管理室へ独立レビューを依頼し、第3小バッチの実行・監査完了時点で停止する。他F5、F6、本番公開、mainマージ、R005凍結解除へ進んでいない。F5全体PASSも宣言しない。
