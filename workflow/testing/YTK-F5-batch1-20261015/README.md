# ヤットコ｜F5正式試験 第1バッチ実行報告

- 固定F4対象: `99e566da100ee6924149ec3244893bbddf7e8c4d`
- F5準備: `8f916e33931b6d4a8807f404fb919951b1ea9970`
- 実行したrunner/実行前計画commit: **`5d6ef48a16d7269c601f72f8549ecea90db57f3f`**
- 専用branch: `codex/f5-batch1-formal`
- run ID: `F5-B1-20261015-001`
- 状態: **BATCH1 COMPLETE / INDEPENDENT REVIEW PENDING / OVERALL F5 NOT COMPLETE**

## 1. 実行対象と結果

BATCH1-PLAN.jsonで実行前に78ケースのID・選定理由・原文期待・独立oracle・環境・runner hashを固定しcommitした。その後だけ正式実行した。対象はregistry / manifest / canonical schema / ID generation / strict JSON入口。全IDと個別判定はCASE-VERDICTS.md / .jsonに収録。

|正式実行記録|件数|
|---|---:|
|PASS|75|
|FAIL|3|
|最新case verdictのNOT VERIFIABLE|0|
|未選定F5のNOT RUN|419|
|F4補助gateのNOT RUN|10|
|対象外F6の未実施|150|

計78ケース、525個の入力/期待/実測観測を保存。F3:R02-38のfixture不備による過去attempt1は**NOT VERIFIABLE**として保持し、正確な派生入力を使ったattempt2のPASSと区別している。最新caseの0件表記で過去の不能記録を消していない。

既存111件の開発testを実行/転記していない。runner自己検証4件は別記録HARNESS-SELF-CHECKS.txtであり正式F5 caseに含めない。PASSは個別bindingの全条件を実測したケースだけ。全体F5 PASSは宣言しない。

## 2. 3件のFAILと原因分類

|ケース|事前期待|実測|分類・扱い|
|---|---|---|---|
|F3:R02-09|canonical raw mismatch reject / CANONICAL|先頭space・末尾newline・object内spaceの3種ともLEXICAL、digest呼出0、入力不変|承認原文の拒否段階との整合確認。安全な早期拒否ではあるがstage条件を勝手に弱めずFAIL保持。制作管理室で解釈確認|
|F3:R02-36|runnerはINVALID_FILEを指定|V-UNK-01をMEMBER_LIMITで拒否、digest呼出0、入力不変|**runner oracleの過剰制約**。承認ケースはV-UNK拒否でありこのcode名を要求していない。製品不具合とは認定しない。FAIL記録を維持し独立レビューへ|
|F3:R02-39|runnerはINVALID_FILEを指定|正常な再生成checksumを持つunknown field fileをMEMBER_LIMITで拒否|同じoracle過剰制約。overview 9keyが承認8keyを超えておりpath-specific schema member guardで拒否。署名一致は独立確認。製品欠陥・危険受理と誤報しない|

POSTRUN-ASSESSMENT.jsonに事実/出典/分類を追記し、元のFAIL、期待、実測、ledgerを変更していない。都合よくcode期待を書換えて再実行することも行っていない。stage条件やoracle是正の扱いは制作管理室の独立レビュー待ち。

## 3. fixtureと独立oracle

元の40fixtureは全てcatalogのbytes/SHAと一致。DIGEST-01は公表既定SHAとNode独立計算が一致。calibration記録のhash一致を全fixtureの製品semantic受理と混同しない。選定caseの正例だけを実際に受理確認し、不正入力は個々に拒否観測した。

期待値は承認registry literals、F2 canonical keys/order/UUID、固定normative manifest、Node独立SHA-256/UTF8 byte計測、原文のJSON/schema条件から構成。製品validator/serializerを使って期待値を作っていない。実行時は固定対象moduleをabsolute file URLで直接importし、製品sourceの書換え/VM用書換えをしていない。

V-HASH-01の準備fixtureには不備があった。V-VALID-01の3607 bytesに対し3605 bytesで、3byte日本語codepoint→ASCII置換のため「body1byte変更」の条件を満たさない。原fixture SHA `055a9280747f8b464437c76230736281b77f9b5904898f15f24195c56a88db18` とNOT VERIFIABLE attempt1を保存した。別の派生fixtureで日付のASCII一桁だけを変更し、equal length / differingBytes=1 / checksum据置を独立に実証してから製品のCHECKSUM拒否を測定した。元のFIXTURES.json/40原本は修正していない。

## 4. 実行環境と試験基盤

- Node.js **v24.20.0** / Windows NT 10.0.26300.0 / x64。
- Node binary SHA: `5c976096e04e5c2c1f091938926234cc9fbebfe9787ddd149351b3b0ecc707b5`。準備時と同じbinary。
- built-in modulesのみ。依存install、fake-indexeddb、jsdom、Chrome/Safariは使っていない。本batchに必要なNode static/API/fault部分だけを構築した。
- scoped SHA-failure、UUID generator列/fallbackのfaultを使用。source/manifest/registry定数を改変しない。意図したcrypto fallbackはfinallyで元descriptorへ戻した。
- 対象は独立snapshot。harness/fixture/結果は別領域。未知network・console sinkは送信/出力前にdenyし、payloadをlogへ記録しない。
- 各入力は一度だけ保存（wx）。ledgerはappend-only。新run IDでしか再実行できない。失敗attemptと最新attemptを分離。

## 5. 証拠と対象整合性

`runs/F5-B1-20261015-001/` に保存。

|証拠|内容|
|---|---|
|environment.json|実行Node/hash、runner SHA、plan SHA、絶対対象path、開始時刻|
|target-before.json / target-after.json|全123ファイルの実測bytes/SHA。前後完全一致|
|fixture-calibration.json|原40fixtureのhash/bytes照合、DIGEST-01、semantic受理を未推測|
|cases/<出典-ID>/NNN.input.bin|実際の入力raw bytes。ダミーのみ|
|cases/.../NNN.observation.json|期待・実測・code・digest/read回数・入力不変・oracle・判定|
|cases/.../result.json|caseの最新判定、全観測参照、過去fixture不能attempt|
|ledger.jsonl|開始・各観測・FAIL・fixture不備・case結果・終了の追記記録|
|RESULTS.json|497＋補助10行。選定分のみ更新。未実施はNOT RUN|
|transport-observations.json|instrumented sink呼出0件、外部payload送信0件|
|SUMMARY.json|batchのみの件数、対象不変、critical停止なし、次batch停止|
|EVIDENCE-MANIFEST.json|全1138証拠ファイルのbytes/SHA、manifest自身は除外|

Evidence manifest自身のSHA-256:

`46c9b5f2d4e9834c647f5a9ebdc2290d4da05bde96ccb650c894a4b01488a214`

EVIDENCE-VERIFICATION.jsonに、1138ファイルの照合、target前後一致、全case ID/NOT RUN保持、判定票とraw result一致、0 sinkを独立なpost-run auditで確認した結果を保存。runの原証拠を編集していない。Git保存時もruns配下を-textで改行変換せず、index blobと実測bytesの一致を確認して提出する。

製品コード、承認F2/F3/F4設計・試験計画、準備8f916e3...の既存資料、main、R005には変更なし。本batchはDB save/restore transactionや実ブラウザーを実行していないので、その成功/原子性まで主張しない。

## 6. 未解決事項・次候補

1. 上記stage整合1件とoracle過剰制約2件の独立判断。runnerが要求するerror codeと承認計画が要求する拒否条件の対応を再レビューする必要がある。
2. 原V-HASH-01 fixtureの定義不備。今後使う場合は修正版を別版/hashとして承認・記録し、原本と履歴を保存する。
3. 本runnerは第1バッチ78件のみbinding済み。残419件/補助10件の実行可能なadapterやbrowser観測は次工程。既存111件の開発成功を代用しない。
4. 実browser、native IndexedDB、物理file保存、Safari、性能/メモリ、自然quota/OS中断/長期保持は未検証。

独立レビュー後の次batch候補: oracle/fixture指摘の再検証、manifest全enum/presence/conditional、canonical R07/R08/R09と方向整合、保存atomicity/競合/容量。候補を記しただけで実行しない。第2バッチへは制作管理室レビューを受けるまで進まない。

## 7. 制作管理室への独立レビュー依頼・停止

78件の選定/実行前commit、独立oracle、case bindingの全条件、525観測と75PASSの妥当性、3FAILの分類、原fixtureと派生入力の区別、append-only証拠、123ファイル整合性をご確認ください。本報告を依頼文として提出し、外部メッセージは送信していません。

第1バッチを終了して停止する。F5全体PASS/F6 PASS、本番公開、main merge、R005凍結解除は行わない。
