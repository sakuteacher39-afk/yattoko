# F5自動試験再開 第2バッチ：制作管理室提出

固定製品 `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。直近成果物 `d27b3d342f2d600d11d2d60597e0add22567639b`。専用ブランチ `codex/f5-auto-resume-batch2`。

実行前固定commit：`4604452fc4bfc8769f2e104267e0c4bc46b78df5`。新run ID：`F5-AUTO-RESUME-B2-20261026-001`。Node v24.20.0 / Windows 11 Home / x64。import・digestはnative Node Web Cryptoとraw File adapter、保存系はfake-indexeddb6.2.4のfresh factory/DBをvariantごとに使用した。jsdom/実ブラウザーは使用せず、native永続性・quota・画面・人間確認を証明していない。

## 候補照合と事前固定

ユーザー指示の省略表記を前回NEXT一覧の正確な20 IDへ照合した。F3:R02-21/22/23/32/33/34/35/37/38、F2:R07-01〜04、F2:R08-06〜12。全20件が現行製品のNOT RUNであり、保留Gate5件ではないことを確認した。

各承認済み原文はF2承認commit0d5dfa38 / F3承認commit3b54acbeから直接Git blobを読み、行・文言・SHA-256をケースごとに記録した。CASEBOOK/FIXTURES/VARIANT-RECIPES/FAULT-CATALOG、manifest、target、Node executable・依存・全runner/helperを実行前固定した。CANDIDATE-READINESS-20.jsonおよびPREEXECUTION.jsonを参照。原文の要求を自動検証できる境界に限定し、今回は除外候補0件。

準備R1も保持した。正式実行前の校正でDIGEST-01をdigest専用oracleへ統一し、R07 abortはguard読込中ではなく書込みrequest成功後の注入へ限定した。これらは未実行の試験基盤の校正であり、製品・原文・過去証拠は変更していない。最終R2の4,898 variantを実行前commitへ固定し、その後は実行runner・fixture・期待値を変更していない。

## ケース別正式判定と証拠hash

| case ID | 正式判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
| F3:R02-21 | PASS | 3/3 | 3 | 52517ee4ea873191ec35ebd421dddaec561c337800dc49503a1887508e27594f |
| F3:R02-22 | PASS | 463/463 | 3 | 89d9e7616368ed79a37ec0f2ba74641d360f0fb6afd91374d3b817ea4f1f1c0c |
| F3:R02-23 | PASS | 1/1 | 3 | b4f92b80d4bcd12c62f38209860101143737160db02df306b7bd093a9192ce1c |
| F3:R02-32 | PASS | 2/2 | 3 | 0c023f6fd5cfcc044c726085f389c9d5f85d4e75ba2fb0257c4bb438f1ac0afe |
| F3:R02-33 | PASS | 2/2 | 3 | c00763f02bde70f567df1448cd15f7bb01f357f274f15481bc8a46db5a0e0b69 |
| F3:R02-34 | PASS | 2/2 | 3 | 0db361a7de7cca7144232acf8e0d8a0f49a37f9be0fb60cb06ef5c5c9ca6e8f6 |
| F3:R02-35 | PASS | 3/3 | 3 | 8c493a102d201ef23e7a9a518c61463818ac5748a798d8f58676eeac4bcf76a8 |
| F3:R02-37 | PASS | 3/3 | 3 | 216eb6fae58399f5693271fe6bb54a263423cb9abfde7e7760cdbc5bb6b73485 |
| F3:R02-38 | PASS | 3/3 | 4 | 0c639a2470d8e9761f544d04a13b62832a27691a1297f01b27da819c2c508a11 |
| F2:R07-01 | PASS | 72/72 | 1 | c6c943a9f5bd30a6837f31886cdd86e6ab9b7536bed9c5f7b356b7673980d966 |
| F2:R07-02 | PASS | 72/72 | 1 | 2580177d809d99dfdb64ab36e82707c5dd23a25c6d762882932742de9a8de9ce |
| F2:R07-03 | PASS | 72/72 | 1 | ee306b480e04eec9078aa63af8f26a0e39b7b7311a6dad0f8bc3a96f2620415b |
| F2:R07-04 | PASS | 360/360 | 1 | bfa119f504f71d4c19e6db499cd457c0740095de8aa6b0c6bcc345a0eb1e8928 |
| F2:R08-06 | PASS | 48/48 | 1 | 8c806498f6b4a72ca9483882fefc082a2bb70dff42d384ce87a4782d5fa1c5e4 |
| F2:R08-07 | PASS | 48/48 | 1 | 33712d081b8c5c0d41796906b31958cda336076d46eeefcb5a7ec7aea0218a2f |
| F2:R08-08 | PASS | 24/24 | 1 | 3737db919871992f1a0eacc9c3a977e098ea0ffb813be0478b7b71b9c479b175 |
| F2:R08-09 | PASS | 1390/1390 | 1 | fcc735be3be60c956b05b3f2fa4023dcf6835276be7f4f97ea01ddb8a6154313 |
| F2:R08-10 | PASS | 280/280 | 1 | bb89bdc7d9449957dd9d26f8712b4f80aefcb01aebb055a9eec87b28d4ed34aa |
| F2:R08-11 | PASS | 480/480 | 1 | 3fea428bca8d7921ed56e3acb37ceb787911caf76eac0ee1c9576454a2b59d02 |
| F2:R08-12 | PASS | 1570/1570 | 1 | 0bb6cb4ae2a5883ba99961031a8e465955fb60c847a301c102615f5b0382628f |

結果は20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（選定範囲）、全4,898 variant完了。停止条件に該当する不一致・証拠欠落は発生しなかった。新しいrun/attemptへappend-only ledgerと排他的新規証拠ファイルを作成した。旧revision・開発テスト・旧90件の結果を今回のrunへコピーしていない。

各variantの入力bytes/SHA-256、原文要求、独立oracle、期待と実測、fault条件、開始/終了時刻、判定はrun/casesのobservation.jsonにある。上表のcase resultとrunのEVIDENCE-MANIFESTで全証拠を結び付けた。

## 独立oracle・全variant範囲

- F3：non-NFC、全77禁止codepoint×前/中央/後×raw/escaped、公開DIGEST-01定数、duplicate decoded key、property順、数値、Unicode/BOM、checksum異常とpositive controls。R02-22は全463 variant。V-HASH-01の過去の「厳密1byteではない」fixture履歴を保持し、独立に校正した1ASCII byteの派生入力と元fixture拒否を別観測とした。
- F2:R07：12カテゴリ×3初回status×EMPTY/既存dataset内の未回答カテゴリ。独立baselineからstatus/intention/revision/globalのexpected datasetを構成。R07-04ではmeta/overview/対象category/最終categoryの書込みsuccess後に同期abortし、全4ストアの旧状態維持を照合。全書込みが同一readwrite transactionに属し、complete後にsave Promiseがresolveしたことをtraceから確認。
- F2:R08-06/07/08：全12カテゴリのcompleted+unknown controlとcompleted+unanswered拒否。import/restoreはnormal/emergency双方、normal loadは実CanonicalStore.read。
- F2:R08-09：全12カテゴリのempty-name検証、共通name path上の全77禁止codepoint×3位置、empty/trim/NFC/UTF16長/type/secret-like各クラス。import/restore/load/save/backupの5境界。60UTF16、surrogate pair、NFC、NFKCを勝手に適用しないpositive controlsを含む。名前規則はcategory非依存の共通経路のため全名称クラスはmailで展開し、カテゴリ差は12カテゴリempty/controlで別に確認した。未観測のcartesian組合せを実行済みと記していない。
- F2:R08-10/11：唯一のconditional subscription.billingSourceを、partial/completed・normal/emergency・親条件・全7 child enumで展開し、5 API境界を確認。canonical baseline生成後に子fieldを削除/挿入し、その後は再projectionしない。raw payloadをそのまま独立SHA-256署名し、不正field・位置・親条件・checksumが残っていることを実行前と監査時に照合。
- F2:R08-12：上記で構成したinvalid completedの全クラスを5 API境界で拒否し、元inputとraw store上のrecordStateを含む全データが不変であることを確認。valid completedを利用者が編集してpartialに戻す別動作とは区別した。

File kindに意味があるのはimport/restore境界。load/saveはdatasetの検証、backupは通常backupの共通snapshot validationを呼ぶもので、emergency OS保存の実証と扱わない。restore拒否は実import→prepareRestoreのpipelineで不正fileを拒否し、readwrite未開始・旧状態不変を確認した。偽造verified tokenで到達不能なbranchを製品テストとして捏造していない。

## 証拠監査・整合性

実行時と監査時に、製品3441ファイル、過去成果物29726ファイル、依存1978ファイルの前後bytes/SHA-256一致を確認。target lockのGit blob・archiveも照合した。旧tracked差分は今回の新規バッチディレクトリ以外なし。runner/helperは実行前commit上のbytesと一致した。

F2の4,416 variantについて、記録済みraw4-store dumpを独立に読み直し、return valueだけでなく保存後datasetを事前expected datasetと比較した。全requestのtransaction ID、complete/abort、前後hash、不正conditional保持も再監査した。F2-STORE-EVIDENCE-AUDIT.jsonを参照。これは新しい製品実行ではなく、採取済み証拠の検算である。

外部通信・console logging・不許可書込み試行は0件。F2のdummy DBへの予定されたsave/seedだけを使用し、失敗時の旧状態保護とfixture input不変を検証した。

run EVIDENCE-MANIFEST.jsonのSHA-256：`1af3ab20752ffedd524cbadacf488b8a4825b78e1d05475b84e79c8c24ef889d`。全18183ファイルをbytes/hashで監査済み。提出物全体はARTIFACT-MANIFEST.json。

## 累積台帳・未解決事項

現行497件は **110 PASS / 387 NOT RUN**。今回20件の新証拠だけを追加した。既存90 PASSとそのhistory/proofを保持し、元90/407台帳を変更していない。F5-CUMULATIVE-497-AFTER.json/CSVにcase ID・固定revision・run/attempt・証拠path/hashを保存した。

未実施387件の主分類は、自動候補295、実ブラウザー65、人間判定22、仕様適用判断待ち5。分類の基準は前バッチを維持する。F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07のGateは未着手。その他の保留browser5件もNOT RUN。R07-05の人間確認範囲や承認済み基準を変更していない。

今回範囲の未実施・不一致・証拠不足は0件。fake-indexeddbの結果を実ブラウザー永続性・実quota・native scheduling・表示・OS操作・人間判断へ拡張することはできない。既存の仕様適用Gateも解消したとは扱わない。

## 次バッチ候補（未実行）

- F2:CON-01
- F2:CON-02
- F2:CON-03
- F2:CON-04
- F2:CON-05
- F2:CON-06
- F2:CON-07
- F2:DIR-01
- F2:DIR-02
- F2:DIR-03
- F2:DIR-04
- F2:DIR-05
- F2:DIR-06
- F2:DIR-07
- F2:DIR-08
- F2:DIR-09
- F2:DIR-10
- F2:DIR-11
- F2:DIR-12
- F2:CAP-16

generation/revision競合guard、肯定/否定方向整合、prospective容量超過時の旧状態保護を優先する候補。各原文・全variant・独立oracle・faultと実行前commitを次の承認範囲で準備する必要がある。今回は実行しない。

制作管理室へ、20ケースの原文対応・全4,898 variant・fixture保持・raw store検算・累積更新の独立レビューを依頼する。commit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。F5全体PASSは宣言しない。
