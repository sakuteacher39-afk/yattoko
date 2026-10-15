# ヤットコ｜F5正式試験準備計画

状態: **PREPARATION COMPLETE / FORMAL EXECUTION NOT STARTED / NOT RUN**。
対象: **99e566da100ee6924149ec3244893bbddf7e8c4d**。人間によるF4全4段階の独立レビューPASS通知を次工程の根拠とする。本成果物は試験準備だけを実施し、正式F5/F6の実行・合格判定は行っていない。

## 1. 固定対象と変更境界

- TARGET-LOCK.jsonで対象commit/tree、123個のGit blob、各bytes/SHA-256、配布ZIPのSHA-256を固定する。
- `F5-TARGET-99e566d.zip` は `git -c core.autocrlf=false archive --format=zip 99e566da100ee6924149ec3244893bbddf7e8c4d` で作成。Windowsのcheckout/archive改行変換を試験対象へ持ち込まない。
- 展開先は `work/F5-TARGET-99e566d`。verify-target.mjsはexact bytesと全ファイル集合を検査する。ここへharness、node_modules、計測UI、fixture、結果ファイルを置かない。
- 正式実行前後に対象のhash照合。相違があれば実行を停止し、直前runを無効として原因記録。対象コードを直して同じrunを継続しない。修正が必要なら新commit→独立レビュー→再固定。
- preparation branchのcommitは**手順/harness補助/記録形式の版**でありSUT commitではない。CASEBOOK/RESULTSには常に上記99e566...を記録。
- 今回のGit差分は `workflow/testing/YTK-F5-preparation-20261015/` の新規資料/補助toolのみ。製品・承認仕様・計画原文・既存111test・既存traceabilityを変更しない。

## 2. 正本照合とケース母集団

SOURCE-ALIGNMENT.jsonを参照。

|出典|照合結果|扱い|
|---|---|---|
|F2計画 / 承認0d5dfa38...|承認時blobと対象内blobが同一|全F5 IDを採録|
|F3計画v0.3 / 承認3b54acbe...|承認本文が維持。末尾にF4 manifest追加61行|原承認ケースと追加MAN-01〜38の由来を分離|
|F4 registry / 技術境界30362751...|承認時blobと対象内blobが同一|REG namespaceのID＋§9のID未付与gate|
|対象内F5-F6-TRACEABILITY|3出典SHA・全ID照合一致|F5 497件、F6 150件を区別|

F3原文のDRAFT / NOT APPROVEDは履歴表記。F3人間承認記録と照合報告eae5400...に従い、R01-14を含む計画を承認済み境界として維持する。deleteAll/restore pendingは禁止、通常deleteAllは許可。schema/manifest/registryの具体値はF4 ACTIVE bindingを使う。

既存traceabilityの内部baseline=8797650...は開発履歴。今回の正式試験対象をその値へ戻さず99e566...へ固定した。出典の同名MAN/R07は `F2:ID` / `F3:ID` / `REG:ID` で区別する。F4技術境界§9の10gateには**準備用補助ID** F4-BOUNDARY-GATE-01〜10を付けた。原承認計画のID新設・変更ではない。

## 3. ケース別要領と分類

CASEBOOK.md / CASEBOOK.jsonに全497件について以下を記載した。

- 原文の入力・操作、期待補足、source行/SHA。
- 実施区分、API/UI/静的検査の手順、必要seed fixture、fault種別。
- 期待結果、独立oracleと全variantを含む判定条件。
- 必須証拠、未実装前提・観測不能・低位gate/全体成功の混同防止。
- 開発証拠候補と正式NOT RUNの分離。

|分類|件数|実施方式|
|---|---:|---|
|AUTO_NODE|185|Node内の固定module/API＋fake-indexeddb、独立fixture/oracle|
|AUTO_FAULT|193|同上＋外部dependency/native request fault injection|
|AUTO_STATIC|37|Git blob/manifest/生成物/sourceの静的照合|
|AUTO_DOM_AND_BROWSER|12|UI moduleのDOM検査＋Chrome実画面|
|AUTO_NODE_AND_BROWSER|35|API検査＋Chrome reload/restart/画面遷移等|
|AUTO_FAULT_AND_BROWSER|7|sink/fault unit検査＋Chrome実観測|
|AUTO_STATIC_AND_HUMAN|21|静的照合＋承認文言/保証/適用前提の人間確認|
|BROWSER_AND_HUMAN|3|download/取消等の実操作と人間の観測|
|BROWSER_MEASUREMENT|1|実Chromeのvalidation時間計測|
|AUTO_FAULT_AND_HUMAN|3|未ACTIVE等の反実仮想faultと配備/UI条件のレビュー|

自動実施可能415件、browser/人間/計測の併用必須82件。補助F4 gate10件は別枠。分類は試験方式であり497件の正式runner実装完了・合格を意味しない。ケース手順を試験harnessへ結び付ける際も、既存111test名への単純対応で判定を流用しない。

## 4. 111開発testとの区別

DEVELOPMENT-TEST-INVENTORY.jsonに対象commitの111個のtest titleとsource hashを採録。今回それらを再実行していない。S4-R01の111成功記録は過去の開発回帰証拠であり、RESULTS-TEMPLATEの正式結果へコピーしない。

正式F5ではケースID単位で独立したrun/fixture/variant/fault/expected/actual/evidence/verdictを記録する。同じ既存testを再利用する場合も、そのrunが原計画の全条件を満たした証拠を新規保存する。1つのtestが複数IDを担当できるが、個々の期待条件を実証しないIDへPASSを伝播させない。逆に1IDに複数test/人間確認が必要なら全件を束ねる。

## 5. 確定した実行環境と領域

ENVIRONMENT.jsonは準備時のinventory。正式実行直前に版とbinary hashを再照合し、変更があれば新しいenvironment revisionを採番する。

- Windows NT 10.0.26300.0 / x64。
- Node.js **v24.20.0** / npm **11.19.0**。
- fake-indexeddb **6.2.4** / jsdom **30.1.2**、対象package-lock SHAを固定。追加frameworkは不要。
- PC Chrome **155.0.8059.40**。実行ファイルpath/SHAはENVIRONMENT.json。今回Chromeの起動・操作はしていない。
- 実browser originは **http://127.0.0.1:4175**、専用profile。crypto/File/IDBの可用性をrun開始時に実測し、使えなければ環境エラーとして止める。Edgeやheadlessへ黙って代替しない。
- F6のiPhone/Safari/private/最低機種性能は今回の母集団外。Chrome結果でF6を合格扱いしない。

領域:

```text
work/F5-TARGET-99e566d/                # 123個の固定対象。追加・編集禁止
work/F5-TARGET-99e566d.zip             # 固定対象ZIP
work/F5-FIXTURES-99e566d/              # 独立生成した40 fixture
work/f5-run/<runId>/harness/           # 正式case adapter/観測器、対象外
work/f5-run/<runId>/node_modules/      # lock準拠依存、対象外
work/f5-run/<runId>/chrome-profile/    # 専用origin/データのみ
work/f5-run/<runId>/derived-fixtures/  # ケース別variant/hash
work/f5-run/<runId>/evidence/          # JSONL/trace/assert/画像、fixtureのみ
```

依存導入はformal run前の環境構築として分ける。package.json/package-lock.jsonは固定対象からrun領域へコピーし、`npm.cmd ci --ignore-scripts --offline` を**run領域**で実施する。cache不足は環境準備NOT READY。別途依存取得工程を記録し、fixtureを開いた本試験中に外部取得をしない。原対象へnpm install/generate/buildの書込みをしない。

正式harnessはNode test runnerで起動し、固定moduleをabsolute file URLからimportする。mockが必要なcaseだけ独立processで `--experimental-test-module-mocks` を使用。依存はrun領域のものをimportし、SUT sourceはそのまま実行。既存development testを再実行する場合のimport解決も外部loaderで固定し、subjectへnode_modulesを置かない。

Chromeは専用user-data-dirで起動し、同期/拡張機能を使用せずlocalhostだけを見る。browser手動操作も同じcase記録規則を適用する。CDPを使うならloopback/専用profileに限り、driver版・全注入設定を記録する。自動化を実装していない項目は手動手順で実施し、不能ならNOT RUN/NOT VERIFIABLE。

## 6. fixtureと独立oracle

FIXTURES.jsonに40個の生成物のbyte数・SHA・用途・期待を記録。製品moduleをimport/実行せず、承認manifestとF3形式から独立serializerで生成した。fixture生成・hash/サイズ照合は準備確認であり、製品が受理した試験記録ではない。

- baseline、partial/completed/R09混在、active conditional。
- F3 normative DIGEST-01、V-VALID/DUP/ORDER/NUM/UNK/UTF/BOM/HASH/TRUNC/ESC群。
- emergency full/partial/none、禁止deleteAll pendingの正常checksum file。
- canonical **9,999,999 / 10,000,000 / 10,000,001** bytesのdatasetと署名済みfile。
- pending JSON **999,999 / 1,000,000 / 1,000,001** bytes。全candidateは256操作以内の実operation/依存chainで構成し、padding unknown fieldでサイズだけを作っていない。
- 255/256/257操作、raw **15,999,999 / 16,000,000 / 16,000,001** bytes、depth16/17。
- Unicode長/NFC/制御/HTML風/secret-likeのダミーname。

VARIANT-RECIPES.jsonで全enum/key/presence、control/bidi全code point、UUID各grammar、unknown/missing/pollution、全transaction phase、receipt/proof lifecycle、6エラー分類の派生方法を固定した。必要variantはcase原文の全列挙を採用し、実行時には派生byte/hashを保存する。

**独立oracle:** manifest/承認原文、Node Buffer.byteLength UTF8、Git blob hash、Node createHash SHA-256、before/after全store比較、明示した期待revision/count/event順。製品projection/validateを呼んだ結果だけを期待値へ逆輸入しない。製品serializer自身でfixtureとexpectedを同時生成して一致を主張しない。

注意:

1. raw16MB以下はread可能な入口条件であり、10MB snapshot＋1MB pending等を満たすvalid full file受理を意味しない。raw境界fixtureは末尾空白による**意図的なnoncanonical file**。16MB超はread前拒否、以下はread後のstrict rejectを別観測する。有効full file最大を無理なpaddingで証明しない。
2. depth16 fixtureもscanner gate専用。schema-valid fileの深さは別制約。helper/scanner単体受理をimport/restore受理と記録しない。
3. prospective restoreで生成されるgeneration/metaも含めて容量を再計算。ここではUUID文法長・global=1を固定した独立fixtureを用意したが、正式runでactual prospective bytesを照合する。
4. candidate fixtureのsemantic calibrationは正式実行前の各case controlとして必要。期待が違う場合はfixture不備か製品不一致かを独立oracleで調査し、都合よくexpectedを書き換えない。

## 7. fault injectionと対象不変

FAULT-CATALOG.jsonで21種（NONEを含む）のtrigger・注入点・制約・oracleを確定。production hookは追加しない。

- Node: dependency引数、外部module mock、専用store/factory/objectStore wrapper。
- Chrome: ページ開始前の外部観測、native IDBメソッドの薄いwrapper、case指定success event内の同期abort。対象JS/HTML/manifestは編集しない。
- GUARD/CLEAR/PUT/READBACK/COMPLETEをphase別に観測。native request/transactionは維持し、product callback内へawait/Web Crypto/timerを挿入しない。
- 模擬quota/TransactionInactiveError/READBACK差分と、実環境の自然quota/OS killは別証拠。後者は主にF6。
- 未ACTIVE/manifest driftは外部依存から返す入力の反実仮想。対象ファイルは不変。API fail closed・静的branch・UI配備無効化を別々に判定する。ACTIVE固定パッケージだけで実証不能な未ACTIVE配備はNOT VERIFIABLEとし、変造buildを本対象としてPASSにしない。
- control runとfault runを分け、注入器が観測結果を作ってしまわないようdescriptor/listenerを毎case復元。harness version/hashと注入pointを必須記録。

## 8. browser/人間確認の具体的な実施

CASEBOOKの該当78件に以下を併用する。

1. `serve-target.mjs --target <固定展開先>` でhash確認済みindex/moduleだけを配信。GET/HEADだけ、127.0.0.1:4175。API/upload/第三者資産/リクエスト本文logなし。試験harness/fixtureを配信しない。CSP等でXSS結果を隠す追加防御headerは入れない。
2. 新規profileでR001開始→回答→結果→R002選択/その他→利用状態→任意問→意向→完了。ケース指定の時点で通常reload/完全終了再起動。前後全storeと画面を記録。jsdom fresh realmだけで実reload/restartの証拠にしない。
3. backupの平文説明/対象外/未収録件数/範囲→picker取消/失敗、restore preview→ack→全置換→pending別ack/1件適用を確認。物理ファイルの存在は人間が別確認し、製品表示の保存完了保証と混同しない。
4. 同一origin2タブで先行edit/restore/deleteAll→旧タブ拒否。通知を落としてもguardが効くことを確認。
5. HTML風nameのDOM、外部通信、console全levelを操作成功/失敗の両方で観測。sentinelはダミーのみ。外部宛ては送信前blockし、attempt自体をFAIL条件として記録。localhost静的資産取得は別集計。
6. case-specificの必要証拠を撮影/採録。言い回し、秘密項目なし、保証なし、将来変更の承認境界は人間確認者名も記録する。

F5内のChrome確認は該当F5 caseの証拠であり、別工程F6全150件の正式実施とは区別する。

## 9. 結果記録と判定

RESULTS-TEMPLATE.jsonは497＋補助10行を全NOT RUN、時刻/actual evidence空で用意した。正式開始時にrunID、subject SHA、harness commit、environment revision、担当者を記録。各行へvariants・fixture hash・fault params・expected/actual・evidence path・開始終了・判定者・理由を埋める。証拠pathはrun領域の相対path、全証拠SHAは別evidence manifestへ記録する。

|判定|基準|
|---|---|
|PASS|原文の全期待・全列挙variant・必要なbrowser/人間/計測・証拠が全て揃い一致|
|FAIL|期待に1つでも反する。誤成功表示、旧データ破壊、秘密/整理内容流出、二重適用等もFAIL|
|NOT RUN|未実行、環境/harness/fixture準備不足、証拠未取得|
|NOT VERIFIABLE|実行しても必要観測が不能、前提未実装、ACTIVE固定で反実仮想配備を実証できない等。理由を残しPASSにしない|

失敗caseを消さない。調査/再実行は新attemptを追記し、過去のFAILを上書きしない。条件付き/非適用項目は独断でSKIP/PASSに変えず、原文条件と観測可能性を制作管理室へ渡す。

fixtureはダミーだけ。evidenceはcase ID・code・count・hash・eventと必要なfixture画面に限定し、実利用内容/secretを収集しない。production loggingや外部分析を追加しない。

## 10. 実行順・停止条件

次の正式実施指示後、以下の順で実施する（今回は未実行）。

1. target/ZIP/environment/lock/integrity確認。別run領域の依存・case adapter・観測器を準備しhash固定。
2. fixture controlと独立oracleを校正。母集団497＋補助10がresultsに存在することを確認。
3. registry/manifest/identity/strict JSON、保存R07〜09/方向/容量、backup/pending、atomic restore/競合、reapply、異常/faultをcase単位で実施。
4. browser/人間必須項目とsecurity sink、暫定上限のF5計測を実施。F6固有の端末メモリ/長期evictionは未実施として残す。
5. hash不一致、harness異常、データ破壊、外部送信を検知したら該当runを停止。コードを直してそのままPASSにしない。証拠保存と独立レビューへ返す。
6. 全結果/未実証/FAIL/適用前提を制作管理室へ提出。今回の準備段階ではF5/F6正式PASS・本番公開・R005解除を宣言しない。

## 11. 準備段階で確認したこと・未実施事項

準備確認: 123 target file/ZIP SHA一致、承認原文/trace全IDとsource hash/line一致、497 case手順・fixture/fault参照・判定/証拠欄完備、40 fixtureのhash/層別正確bytesとDIGEST-01 hash、111開発title採録、正式結果507行すべてNOT RUN。PREPARATION-CHECKS.txtに記録。

未実施: 製品moduleの実行、111testの再実行、正式F5 case実行、browser起動/操作、fault注入、candidate fixtureの製品によるsemantic calibration、正式case adapterの全件実装、F6実機性能/メモリ/長期保持。これは試験準備計画の提出であり、実行済み試験suiteの納品ではない。

補助scriptsの`node --check`は構文確認だけ。fixture生成は独立codeで行いsubjectを実行していない。開始前のharness bindingと観測不能前提の扱いは、CASEBOOKに従い実施工程で記録する。

準備成果物を提出して停止する。F5/F6正式PASS、本番公開、R005凍結解除は宣言しない。
