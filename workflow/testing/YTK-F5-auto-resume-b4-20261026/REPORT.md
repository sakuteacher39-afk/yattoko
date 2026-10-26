# F5自動試験再開 第4バッチ：制作管理室提出

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。直近成果物：`38b7505710cbb21c94f6f02d7dee8d958d1508d4`。専用ブランチ：`codex/f5-auto-resume-batch4`。

実行前固定commit：`1cded11b0c577a69f74c1380bf6ccd34c9bba19f`。新run ID：`F5-AUTO-RESUME-B4-20261026-001`。Node v24.20.0 / Windows 11 Home / x64、fake-indexeddb6.2.4。実ブラウザー/jsdom/OS保存は使わず、native永続性・quota・画面・人間判断のPASSを付与していない。

## 候補・事前照合

省略表記を前回NEXTの正確な20 IDへ照合：F2:DIR-13〜18、SAVE-04/06〜09、R07-07〜11、ID-01〜03、PART-12。全20件が現行製品のNOT RUNで、Gate5件の対象外。F2:R07-09は本人意向family維持のケースであり、保留中のF3:R07-09非ACTIVE registry試験ではない。

承認済みF2 commit0d5dfa38の原文をGit blobから取得し、caseごとの行・文言・SHA-256を記録した。casebook/fixtures/variant/fault catalog、normative manifest、全製品、Node executable、依存、全実行runner/helperを実行前commitへ固定した。CANDIDATE-READINESS-20.jsonに各全variant範囲を保存。準備不足による除外0件。

独立oracleはF2意味規則のpure modelとmanifest、record-ID単位の差分、全store expected state、revision/globalの明示増分。製品validatorで期待を作っていない。準備R1を保持し、全初期・期待状態の妥当性、100連続変更のno-op混入0、失敗時のpendingの値・IDを独立に校正したR2を実行前固定した。校正で製品は実行していない。

## ケース別正式判定・全variant数・証拠hash

| case ID | 判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
| F2:DIR-13 | PASS | 48/48 | 1 | 6fdab189f6cebcb0f99d1ad96245cda3a784034bf916257b2a89209b13fb5cfe |
| F2:DIR-14 | PASS | 20/20 | 1 | d944df202f52979182c0455fce2d30b3248e9478a5e55fbaab9e582e39e67bbc |
| F2:DIR-15 | PASS | 4/4 | 1 | c1f38bc9004064cedb938f455e5581070fa0ae9db7a057b148074f653842a58c |
| F2:DIR-16 | PASS | 28/28 | 1 | ab5738db53bc7ed10bfab33082f57be50690ab82d87c0b01255cf12d2437021c |
| F2:DIR-17 | PASS | 8/8 | 1 | 45bf6c45b24a0198d9cf9fc167880c4d9d1431f8a2f5d9d9ea75193da28d869a |
| F2:DIR-18 | PASS | 108/108 | 1 | e05863efad17a46802b5628e377280ae5e35631a0c476bd6ff1da06da6560c68 |
| F2:SAVE-04 | PASS | 12/12 | 1 | ef0c045ed94611c6cb25894bf70df63dc3f21da5507396d6afd33cb8960723e3 |
| F2:SAVE-06 | PASS | 12/12 | 1 | 9ca5f689e1a2015f899228bee72280f46796f617def7b5140c6bdbbe85b9170a |
| F2:SAVE-07 | PASS | 366/366 | 1 | 8ae017dcf2b70e26666ead9b0368d43257cec1434a23e2388d9b07eebf143360 |
| F2:SAVE-08 | PASS | 366/366 | 1 | 1089180b0219395a44ce33666bdff7ad7b11006c33b17a5b88091af7027b79ee |
| F2:SAVE-09 | PASS | 160/160 | 1 | 2747f6eb19609965ecb65595d731c19adf51f93dfc2aadb105051617c9edf719 |
| F2:R07-07 | PASS | 108/108 | 1 | c717d643c58467bb7e907e6062193e0bfc4dd86c12bba8291416a628f20342cf |
| F2:R07-08 | PASS | 108/108 | 1 | 65c4860ee615a8e17d3caffa9f842d84c0c6693450187f194ced44ad8601435b |
| F2:R07-09 | PASS | 108/108 | 1 | 3934005398a96bc4b369d9e6c3913ad5c9e9f01153acae2ae07de4f2b838a453 |
| F2:R07-10 | PASS | 108/108 | 1 | 6c673b712df5f77ae0cd8bd91af4511f25c1e532263476081a9e2382b075c048 |
| F2:R07-11 | PASS | 108/108 | 1 | 51d1c5048ebbc06a9ad418fa69933d2152060830a9012fabb630eeb03fbc67c1 |
| F2:ID-01 | PASS | 432/432 | 1 | f989169a8d2de535fb97eb05cb8e894a5504b449ece01c6f1ff6a5c8a48c3350 |
| F2:ID-02 | PASS | 288/288 | 1 | ebe3a5f6bfb410a73eeea63bdfa59a70349f57ebc89faec1664cb9972ef644e1 |
| F2:ID-03 | PASS | 192/192 | 1 | 525739e9a53369ac9c4fe0d57cf9b02bac87637eda43df5256ac706d072204c6 |
| F2:PART-12 | PASS | 20/20 | 1 | a24d54fd76a28025953c3edfd0a8cdb89b7f84cf8fb47f119165c8d0b1b062d0 |

計20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回範囲）、全2,604 variant完了。停止条件に該当する不一致・証拠不足は発生しなかった。新run/attemptへ排他的新規証拠とappend-only ledgerを記録し、旧revision/開発テスト/過去PASSを今回runへ転記していない。

各observation.jsonに原文・入力bytes/hash・独立oracle・期待・実測・fault・時刻・判定を保存。全storeのinitial/after dump、request/complete/abort trace、coordinator呼出し/通知/pending/中間commitも記録した。CASE-RESULTS.csvおよび累積CSVにcase証拠hashを記載。

## 重点検証

- DIR-13〜18：全適用カテゴリ、partial/completed、last/他の非肯定childを展開。child using→dormant、最終billing/asset/importantData yes→no、familyKnow no→yes、service削除後も親/概要の肯定値を勝手に否定へ戻さない。subscriptionのinactive child pruneも独立モデルへ反映し、親/概要の全値・revision不変を校正した。
- SAVE-04：3mutationをburst投入、またはfirst write-successかつcomplete前の時点で後続を投入。pendingの順序、maxInFlight=1、attempt/commitのmutationSeq、各expected globalとstoreを観測した。
- SAVE-06：100個の非no-op変更を3対象種（概要/カテゴリ/サービス）×2record state×2投入timingで実行。最終値だけでなく100回それぞれのcommit済みstoreとglobalを事前期待へ照合。二重commit/順序逆転を認めない。
- SAVE-07/08：前回の366 valid positive multi-record fixtureを新case IDへ使い、固定製品で再実行した。旧結果は使用しない。1transaction/global+1、changed record各+1を全datasetで確認。未変更recordも同じtransactionでputされる実装であり、dirty recordだけをputするという主張はしていない。
- SAVE-09：全12カテゴリ/両record state、概要/カテゴリ/service core/全always answersの同値操作。revision/globalを増やさず、completed recordも同値操作だけでpartialへ変えない。
- R07-07〜11：12カテゴリの有効status遷移でkeep/delete/family/undecidedを保持。target以外の11カテゴリはunanswered/unansweredと全revisionを維持する。
- ID-01：全6挿入順、shuffled expected record順、12カテゴリ/両state、3つの編集対象。配列位置ではなくrecordIdで期待targetだけを変更する。
- ID-02：canonical中央IDを削除した後、残る各IDを編集。全6挿入順/12カテゴリ/両stateで誤更新を検出する。
- ID-03：同名recordをmergeせず、IDごとの4-record状態を照合。fresh、1/2回衝突後成功、3連続衝突、generator throw/malformed、2件目生成失敗、作成待ちcandidateとの衝突を展開。既存IDだけでなくpublic submit/onChangeから投入した明示candidateも占有IDとして扱う。製品内部stateを直接変更せず、生成失敗時はpendingの値・null IDを保持して停止した。
- PART-12：op1をcommit後、op2のmeta/overview/category/first-last service write-successでabort。op3は保存せずpendingへ保持し、直前commit済み全storeを維持。別の明示retry controlでop2/op3を1回ずつcommitする。失敗段階のdump・pending・error/stoppedも残し、abortをなかったことにしていない。

submitを発火するhookは試験環境側の同期success listener。product transaction callbackへawaitを入れず、commit状態の読戻しはtransaction complete後の外側wrapperで行った。これによりNodeの論理queue契約を観測したが、実ブラウザーのnative scheduling/表示/永続性を証明したとは扱わない。

## 証拠・整合性監査

全2,604 variantを記録済みraw stores/中間commit/trace/pendingから再検算した。最終storeがexpected fileと一致すること、全commit sequenceの重複なし、100変更の全global順序、失敗時の正確な未保存値・ID、retryの失敗段階を確認。STORE-EVIDENCE-AUDIT.jsonを参照。証拠の読直しであり製品の追加実行ではない。

製品3441ファイル、旧成果物68161ファイル、依存1978ファイルの前後bytes/SHA-256一致。target lockのGit blob/archive、実行前runner/helperのcommit bytesも照合した。今回の新規ディレクトリ以外の旧tracked差分なし。外部通信・console logging・不許可書込み試行0件。

run EVIDENCE-MANIFEST.json SHA-256：`2242dfe4dc9267766e7ee37fd27423e88fb515b5a646ff8d9c7a4b16beb92722`。全13047証拠ファイルをbytes/hashで再監査。提出物全体はARTIFACT-MANIFEST.json。

## 累積497ケース・未解決事項

現行累積：**150 PASS / 347 NOT RUN**。元130 PASSとhistory/proofはそのまま参照し、今回20件の新正式証拠だけを追加した。元130/367台帳は変更せず、新しいF5-CUMULATIVE-497-AFTER.json/CSVを保存した。

残件主分類は自動候補255、実ブラウザー必須65、人間判定22、仕様適用待ち5。分類は各runnerの準備完了や実行許可を意味しない。今回範囲の未実施・不一致・証拠不足は0件。

Gate5件（F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07）は未着手。その他の保留browser5件もNOT RUN。R07-05の人間確認案/承認済み判定基準を変更していない。Node/fake-IDB成功を未観測browser/UI/人間判断へ転用せず、F5全体PASSは宣言しない。

## 次回候補（未実行）

- F2:TXT-01
- F2:TXT-02
- F2:TXT-03
- F2:TXT-04
- F2:TXT-05
- F2:TXT-06
- F2:TXT-07
- F2:TXT-08
- F2:TXT-09
- F2:TXT-10
- F2:TXT-11
- F2:TXT-12
- F2:TXT-13
- F2:TXT-16
- F2:TXT-17
- F2:CAP-14
- F2:CAP-15
- F2:CAP-17
- F2:CAP-01
- F2:CAP-02

canonical nameのNFC/trim/control/bidi/secret拒否、容量境界・順序・削除後サイズ減少を優先する候補。各原文・全variant・独立oracle・fault・実行前固定を次回承認範囲で準備する。今回は進まない。

制作管理室へ、原文対応、2,604 variant、queue各commit、ID collision/再生成、pending保持、全store監査、累積更新の独立レビューを依頼する。専用ブランチへcommit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。
