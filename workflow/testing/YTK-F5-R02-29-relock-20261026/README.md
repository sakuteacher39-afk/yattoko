# F5-R02-29 再固定・限定正式再試験報告（2026-10-26）

**新固定対象のF3:R02-29はPASS**。新runの39入力すべてについて、parsed graphの完全な反射情報の不変性と、成功時token全体のimmutabilityを実測した。F5全体の合格を意味しない。

## 固定対象・差分

- 旧固定製品: `168274010a1aa45794de98dc71ac5735cb9d0ae1`
- 新固定製品: `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`
- 新Git tree: `331bfb971989a400c708a9cb4b1735614c34b48f`
- 新subject revision: F5-subject-r3-20261026。
- 全対象: 3441ファイル。TARGET-LOCK.jsonに各path/Git blob/bytes/SHA-256を記録。
- archive: 11705027 bytes / SHA-256 `f7aa81394a828165498a8689b169d145171e328677327e9edb4d4d7987994093`。
- 旧1,377ファイル中1376は同一、削除0。変更は承認済みimport-backup.mjsのpendingCanonicalによる依存配列の独立copyのみ。製品側追加は開発回帰testファイル1件でruntime entrypointではない。その他追加2063ファイルは過去試験等のprovenance。
- checksum/registry/schema/manifest/canonical JSON/operation順序/依存validator/承認済み仕様・試験計画の変更なし。TARGET-DIFF.jsonに製品差分を収録。
- 専用branch: `codex/f5-r02-29-formal-retest`

## 正式再試験

|項目|結果|
|---|---|
|case|F3:R02-29|
|run ID|F5-R02-29-R3-20261026-001|
|attempt|2|
|runner/実行前計画commit|bd117b38f281dced9f6a265402a9c3119e5a2e52|
|正式判定|PASS|
|入力数|39（受理control5、拒否/失敗34）|
|parsed graph checkpoint|219、全件初期snapshotと一致|
|書換え試行|0（descriptor-only / preventExtensionsも含む）|
|他F5|新対象では496件NOT RUN|
|旧38 PASS|旧対象証拠として保全、新対象への自動移植なし|

実行前にPREEXECUTION-R2.jsonとrunnerをcommitしてから実行した。R1案はrunner構文checkで閉じbrace欠落を検出したため未実行として保持し、製品実行前にR2へ更新した。期待値・input・run IDは変えていない。正式runの基盤エラー/欠落証拠/再試行はない。

環境: Windows_NT 10.0.26300 / x64 / Node v24.20.0。Node binary SHA-256: `5c976096e04e5c2c1f091938926234cc9fbebfe9787ddd149351b3b0ecc707b5`。builtinsのみで、browser/IndexedDB/development testは実行していない。

## 条件と独立oracle

- 正常V-VALID-01、EM-FULL、EM-PARTIAL、EM-NONE-DELETEALL、emergency pending=null派生の5種類。EM-NONE-DELETEALLは未収録scopeのmetadataであり、実行可能deleteAll pendingを受理した意味ではない。
- 各種類のschema不正、checksum不一致、SHA API拒否を別入力にした。fullの依存欠落/重複/並替、不正依存型/要素/未知ID、件数不整合、snapshot/content base hash不整合、SHA2/3回目の拒否、不正digest長0/31/33も追加。
- 原本fixtureのbytes/hashは旧FIXTURESと照合。派生入力は試験側の明示的JSON edit/6-field署名から作成し、全39入力を実行前に固定。SUT validatorによる期待値生成をしていない。
- 独立oracleはNode JSON/UTF8/createHash、既承認manifest/orderに基づく旧独立serializer。old/new manifest bytesは同一。canonical input・checksumの期待値をSUTと別に確認した。
- 各入力のexpected/actual/独立oracle/時刻/input hashはNNN.observation.json、元入力はinputs/に保存。SHAへ実際に渡した68個のbytesもbin/hashとして収録。

## parsed objectとtokenの観測

全体JSON.parseで得たnative objectについて、identity-awareな反射snapshotを保存した。値/own key/配列内容とlength/各descriptorのwritable-configurable-enumerable/accessor/prototype identity/extensible/sealed/frozenを、parse直後、各SHA直前/直後、import returnで照合。単なるJSON値一致へ縮小していない。

透過proxyはset/define/delete/preventExtensions/setPrototypeOfをReflectへforwardして記録するため、書換えを禁止して隠す仕組みではない。self-checkでは各変更と、同値に見える別objectへの置換まで検出できることを確認。descriptor-only hardeningも除外せず、全39入力で試行0だった。

受理5件ではtoken内全nodeがfrozen/non-extensibleで、parsed graphとの参照共有0。Reflect set/define/delete/prototype変更は失敗しtokenは不変。envelope JSONは独立canonical rawと完全一致し、checksum/operation/依存順序を維持した。検証終了後の試験専用source mutationでtokenが変わらないことを確認し、sourceを復元して初期snapshot一致を再確認した。拒否34件はtokenを返さず、parsed情報とraw入力も保持した。

## 整合性・旧履歴

- 新固定対象3441ファイルは実行前後でGit blob/bytes/SHA-256一致。
- 既存tracked履歴3441ファイルもraw bytes/SHA-256一致。旧PASS/FAIL/NOT VERIFIABLE・ledger・fixture不備履歴は削除/上書きしていない。
- 旧R02-29正式NOT VERIFIABLEとdescriptor変更7件の証拠は旧対象のまま保全。旧38 PASSも保持したが、新対象のcase stateへは移していない。
- 製品・承認済み資料・既存試験ディレクトリのGit差分0。新branchの変更は本試験成果物だけ。
- 外部通信/console/不許可storage/input変更の試行0。ダミーデータのみ。
- 開発120件は今回実行/転記していない。
- EVIDENCE-MANIFEST.json: 333ファイル、SHA-256 `2fc2f3319d71b46a2217dd7b6473f7b091283add776c2610be3a91e29689b4be`。AUDIT.jsonで全39観測・219graph・68digest inputs・ledger・対象/旧履歴を製品再実行なしで再照合した。

## 回帰影響・未解決事項

全497ケースを静的に評価し、追加再試験推奨30件をREGRESSION-IMPACT.json/mdにcase ID・理由・実施方式付きで記録した。主にpending依存関係の拒否、emergency canonical/checksum、pending容量/件数/割当性能、preflight、下流の手動reapply/receiptの最小integration。これらは一覧提出だけで、一切実行していない。旧回帰55件は全件NOT RUNとして列挙した。

修正に固有の追加再試験を特定しなかった466件についても、正式PASSや未実施試験の免除を意味しない。今回の単一caseは他のF5ケースの合格を証明しない。

本限定runで製品不具合・不一致は観測しなかった。実ブラウザー/File picker/UI、実機、transaction実環境、最大pending時の性能は未検証。独立レビューと、追加回帰計画の承認が残る。

制作管理室へ、新target固定・R02-29正式PASS・旧証拠保全・30件の回帰候補の独立レビューを依頼する。ここで停止し、残る55件/他F5/F6、本番公開、mainマージ、R005凍結解除には進まない。F5全体PASSは宣言しない。
