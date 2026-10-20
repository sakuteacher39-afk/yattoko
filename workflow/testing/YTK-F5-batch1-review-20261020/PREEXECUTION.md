# F5第1バッチ 独立レビュー対応｜実行前計画

基準実行成果物: 0a077ba793de538491c023be39c05d25bd3ba97a。固定製品: 99e566da100ee6924149ec3244893bbddf7e8c4d。

今回の対象はF3:R02-36 / F3:R02-39 / F3:R02-09の3件だけ。既存78件の75 PASS / 3 FAILは歴史記録として保持し、新run F5-B1-REVIEW-20261020-001 / attempt2を別保存する。既存75 PASSを実行・再判定・集計し直さない。

R02-36/39について旧runnerのvectorMapから承認原文にないINVALID_FILE固定期待を除去した。その他ケースの期待は変更しない。旧runの再現は元runner commitで行うものであり、修正後のworking sourceで元planを再実行しない。今回のrunnerは独立した3-case binding。

署名済みunknown field fileについて、Node独立SHA-256・承認overview allowlist/enum/metaでschema不正/checksum一致を事前確認し、実測拒否を確認する。valid control、同じ8memberに収まるunknown/missing variantも使用。R02-39にはvalid-schema/stale-checksum controlを追加。internal error codeは観測値であって合格条件に固定しない。

R02-09は設計§3.1/§3.6と承認試験のcanonical raw mismatchを維持する。Node JSON.parseで有効な空白JSONと同一parsed value/checksumを独立確認し、製品のfull-document parse/digest呼出数を観測する。JSON.parse未到達のLEXICAL拒否だけでは§3.1 step6のraw照合を実施したと証明しない。満たさなければFAIL維持、製品修正をせず案だけ提出。

RETEST-PLAN.jsonは実行前にcase/期待/環境/runner hash/1156個の旧protected fileのhashと原Git blobを固定する。原fixture40件・固定製品123ファイルを照合し、before/afterを保存。旧ledger、FAIL、R02-38 fixture不備履歴を上書きしない。新evidenceもwx/append-only。自己試験3件はharness検証のみで正式caseの合格数には含めない。

製品コード/承認仕様/試験計画/main/R005は変更せず、3件の是正報告後に停止する。第2バッチ/F6/本番公開へ進まない。
