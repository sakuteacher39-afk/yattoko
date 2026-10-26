# F5回帰 第4小バッチ 実行前固定

製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99。最新是正成果物 545ca3ba876a4bcc8854c426153737b32d9a4eb5。新run F5-REG-M4-20261026-001。過去runの20 PASS + 18 PASS + 是正2 PASSをcase IDで照合し、重複なし40件を除外した。残り36件 = Node候補29件 + ブラウザー/人間必須7件。そのうち20件・全1017 variantを安全性順に選定する。詳細はSCOPE-MATRIX.jsonとPREEXECUTION.json。

今回選定: F3:R04-01、F3:R04-02、F3:R04-15、F3:R01-02、F2:RST-01、F2:RST-03、F3:R07-03、F3:R07-04、F3:R07-06、F3:R07-07、F3:R07-08、F3:R07-13、F3:R07-14、F3:R02-08、F3:R02-09、F3:R02-10、F3:R02-13、F3:R02-25、F3:R02-30、F3:R02-39。

未選定16件: F2:RST-15、F3:R03-18、F3:R04-11、F3:R04-12、F3:R04-13、F3:R06-09、F3:R06-10、F3:R07-01、F3:R07-02、F3:R07-05、F3:R07-09、F3:R07-10、F3:R07-11、F3:R07-12、F3:R02-31、F3:R02-36。既合格の深さ・pending容量/件数・receipt/retry各ケースは再実行しない。残るraw境界、resource error、依存capture、復元状態とgeneration、F2 R07/R08/conditional、ID、canonical rawとchecksumを優先した。

raw15,999,999/16,000,000 byteは空白paddingした有効JSONでread/parseまで到達し、canonical比較で拒否を期待する。低位raw gate通過を有効最大ファイルの完全受理とみなさない。resource errorはFile read/full parse/digestへ明示注入し、容量超過と誤分類しないことをAPIで確認する（UI表示や実ブラウザーresource挙動は認定しない）。依存chainはservice作成→usage→answerを実captureし、別の状態追跡で先行依存と順序・contextを照合する。

R07は全12カテゴリ・初回3回答・intention全5値のsaveと、不正初回状態を検証する。R08は全12カテゴリのcompleted usage全4値。conditionalは唯一の承認済みconditional questionを、inactive全親値・child全値、およびactive unansweredのpartial/completed/usage各値で検証する。canonicalケースは正常/full/partial/none、root順序・SP/tab/LF/CR構造位置・escapeを固定し、SHA前のcanonical拒否を観測する。checksum再生成攻撃でも未知fieldを消さず拒否を確認する。

元fixture8件のbytes/hashを照合。派生fixture rawと期待・独立oracle・runner/helper・環境hashを実行前に固定した。準備時のsyntax修正とpositive ID controlの配列順不備はPREPARATION-HISTORY.jsonに保持し、製品を実行する前に検出・是正した。

正式実行はcommit後に一度だけ行う。不一致FAILは原因未確定でも直ちに停止し、製品・runner・fixtureをその場で修正しない。観測不足はNOT VERIFIABLE、未実施はNOT RUN。旧PASSや開発テスト結果を移植しない。固定対象・依存・旧証拠を前後hash照合する。

Node v24.20.0 / fake-indexeddb6.2.4は実ブラウザー、物理保存、実quota、iPhone性能の証拠ではない。その他F5・F6・本番公開・mainマージ・R005凍結解除へ進まない。
