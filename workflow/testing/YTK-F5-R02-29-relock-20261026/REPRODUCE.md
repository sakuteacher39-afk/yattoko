# 再現・証拠検証手順

- 固定製品commitは15a146a9b2c4f80c63798eb31d64b6774a4c2e99。成功runのrunner/実行前計画commitはbd117b38f281dced9f6a265402a9c3119e5a2e52。
- archive/F5-TARGET-15a146a.zipをrepo兄弟フォルダへ展開し、F5-TARGET-15a146a/とする。snapshotへnode_modulesや試験harnessを追加しない。TARGET-LOCK.jsonの全Git blob/bytes/SHA-256を照合する。
- archiveは `git -c core.autocrlf=false archive --format=zip 15a146a9b2c4f80c63798eb31d64b6774a4c2e99` から作成。全3441ファイルのexact Git bytesを使用。
- Node v24.20.0 / Windows x64、binary hashはPREEXECUTION-R2.json参照。実行はNode builtinsのみ、browser/IndexedDB/npm dependencyは不要。製品importはsnapshotのimport-backup.mjsだけをentrypointとする。
- 旧test serializerの純粋helperを独立oracleとして利用。旧snapshotのmanifest読取だけを行うため、既存F5-TARGET-1682740/も配置する（旧archiveは旧再固定成果物に収録）。old/new manifest blobは同一。期待値生成にSUT validatorは使用していない。
- fixtures/は原本4種類のbytes/hash照合済みコピーと独立派生1種類。実行inputはinputs/の39ファイルで固定され、実行時には生成しない。
- 実行時コマンド（事前commitのrunner/planを使用）:
  `node workflow/testing/YTK-F5-R02-29-relock-20261026/runner/run.mjs PREEXECUTION-R2.json`
- 既存runが存在するcheckoutでは排他作成guardで停止する。過去runを消して再実行しない。新規実行には新plan revision/run ID/attemptと承認が必要。
- 読取のみの検証: ARTIFACT-MANIFEST.json / runs/<runId>/EVIDENCE-MANIFEST.jsonの全bytes/hashを照合する。observerのgraph snapshotは単なるJSON値hashではなく各property descriptor・object/prototype identity・extensibilityを含む。全checkpointが同じ初期snapshotであることを確認する。
- runner/audit.mjsはSUTを実行せず、39観測・219graph・SHA入力bytes・ledger・target/旧履歴・旧判定を再照合する。既存AUDIT.jsonはwxで上書きできない。再検証は別出力名の検証領域で記録し、既存証拠を削除しない。
- token immutabilityの独立性probeはimport return後に試験側がnative parsed sourceを一時変更/復元する。製品処理中の書換え試行とは分離し、復元後にも初期graph一致を記録する。元raw入力やfixtureは変更しない。
- 120件の開発test、旧38 PASS、他496件、残る55件、F6の正式判定をこのcaseへ移植しない。
