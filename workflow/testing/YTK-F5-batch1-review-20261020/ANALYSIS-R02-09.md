# F3:R02-09｜設計・処理順の照合と最小修正案

状態: **FAIL維持 / 製品変更なし / 修正案のみ提出**。固定製品 `99e566da100ee6924149ec3244893bbddf7e8c4d`。

## 承認済み要求

正本 `workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`:

- §3.1（90〜102行）: lexical scanner（step3）→JSON.parse（step4）→envelope等の検査（step5）→schema-defined canonical full JSON再生成とraw byte-for-byte照合（step6）→checksum処理（step7/8）→残るsemantic検証（step9）→preview（step10）。
- §3.5（138行以降）: unknown field / required missing / unexpected object等を拒否。
- §3.6（146〜154行）: schema-defined field order、spaceなし、raw全体一致。余分な空白等の非canonical表現を排除する。

承認済み試験計画 `workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md` 105〜106行は、R02-09の余分な空白/newlineに対し **canonical raw mismatch reject** を期待している。

これらの原文・期待値を今回変更していない。LEXICAL/CANONICALというinternal code自体を新たな承認規範にはしないが、指定された検証段階を実行した根拠は必要である。

## 新attemptでの実測

有効なV-VALID-01をcontrolとし、先頭space、末尾newline、object内colon後spaceの3入力を別々に保存した。

|観測|control|空白3種|
|---|---|---|
|独立Node JSON.parse|受理|受理|
|parsed object / overview schema|正当|controlと同一・正当|
|独立checksum|一致|一致|
|rawと独立再直列化|一致|不一致|
|製品import|受理|LEXICALで拒否|
|製品full-document JSON.parse呼出数|1|各0|
|製品digest呼出数|1|各0|
|入力bytes変化 / storage access|なし / 0|なし / 0|

JSON.parseをharness側で計数し、native関数へそのまま委譲した。full text一致の呼出とscannerのstring token parseを分け、独立oracleのparseは計数区間外で行った。source-phase-audit.jsonの固定source hash/offsetは、実際のraw照合branchがfull-document parseより後にあることを確認している。

安全な非canonical入力拒否という結果は観測できた。しかし、これだけではstep6でcanonicalを再生成してraw不一致を検証したことにならず、step4にも到達していない。承認試験の指定段階を満たす証明が得られないため **R02-09はFAILのまま**。元FAILも今回のFAILも保持する。

## 不一致の原因

固定 `src/import-json.mjs` のscanJSONは、consume内で現在文字をそのまま分類し、token境界のJSON whitespaceを進める処理を持たない。

- 先頭space: root valueを開始できずLEXICAL。
- 内部space: colon後のvalueを開始できずLEXICAL。
- 末尾newline: root消費後にindex!=text.lengthとなりLEXICAL。

`src/import-backup.mjs` はscanJSON失敗を受けて中断するため、後続のJSON.parseとraw canonical比較へ進まない。code名だけの問題ではなく、比較段階の未実行が観測された。

## 最小修正案（未実装）

変更候補は `src/import-json.mjs` のtoken境界処理に限定する。

1. JSON標準の構造間whitespaceだけ（U+0020/U+0009/U+000A/U+000D）をskipする小さな処理を導入。
2. root開始/終了、object key・colon・value・comma・close、array要素・comma・closeの適切なtoken境界でのみ使用する。string内部の文字やescapeには介入しない。
3. scannerが進めるのはindexだけ。入力raw text/bytesをtrim・圧縮・normalizationして置換しない。
4. scanner合格後は現行JSON.parseへ**元のraw text**を渡す。schema-defined canonical全体との現行同期bytes照合が余分な空白を検出し、step6で拒否する。
5. `import-backup.mjs` のcanonical serializer・raw比較・SHA処理順は維持し、空白入力の偽の成功や自動修復を追加しない。

単にLEXICALをCANONICALへrenameする案、先にtrimしてraw不一致を消す案、codeだけを合わせてstep6を未実行にする案は解消にならない。

必要な回帰確認（将来の修正承認後に別commit/再固定して実施）:

- JSON whitespace4種とleading/trailing/object/array token境界の非canonical inputが、正当JSONとしてscan/parseされた後にcanonical raw比較で拒否されること。
- string内空白・escape・unescaped controlの扱い不変。非JSON whitespaceを新たに受理しない。
- duplicate decoded key、-0/負数/指数/小数/leading zero/数字途中のspaceを従来どおり拒否。別tokenを結合しない。
- depth/member/array/token/raw/pending guardを維持。bytes計測は元rawに基づき、skipで上限を抜けさせない。
- checksum、canonical order、Unicode、既存有効fileの受理・不正file拒否を維持。保存/復元transactionの境界やschema/registryを変えない。

この案を適用していない。製品修正の別指示と独立レビューなしに固定対象を変更しない。
