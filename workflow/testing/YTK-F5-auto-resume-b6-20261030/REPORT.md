# F5自動試験再開 第6バッチ

固定製品：`15a146a9b2c4f80c63798eb31d64b6774a4c2e99`。基準成果物：`84b2166f383f1f445bcf01fd8b39dcc192fa1422`。専用ブランチcodex/f5-auto-resume-batch6。実行前commit：`b66a83443c10eeb5bd91a144bd334cf79d84627d`。run：`F5-AUTO-RESUME-B6-20261030-001`。

327 NOT RUNをcase IDで全照合し、AUTO235/browser65/human22/仕様適用保留5へ分類。原子的削除・失敗時旧データ保護・世代競合を優先し、全variant準備済みDEL-01〜06の6件のみ選定。分類・選定理由・見送った候補はCLASSIFICATION-327.json。承認F2原文Git blob/行/hashと全fixture/oracleを実行前固定。F3復元・容量・バックアップ・SAVE timelineは全variantの事前準備が未完了で今回は未実行。

categoryはF2 canonical schemaでunansweredも固定12件を保持するため、category整理の削除は当該回答をunansweredへresetし子サービスを削除する正本状態を期待する。物理的にcategory行を欠落させる期待ではない。deleteAllは新generation、global+1、resetで変更したrecord revision+1。独立modelは製品validatorや実測から生成していない。全12category×partial/completed×子0/1/3＋他category1件。DEL02/04は正常controlと全PUT/DELETE request成功後の各ordinalでabort。DEL06は旧期待値と、他の値を現行に合わせgenerationだけ古い独立controlを用いた2接続試験。実ブラウザー複数タブのPASSではない。

observerはCAP14是正版とbyte-identical。1/20/19996反復で記録数が一致。fault側もtransactionごとのWeakSetで同一storeを一度のみwrap。最大4サービス/18writeの小規模試験。store別JSONとJSONL、stack/phase/memoryを記録し巨大trace stringifyを避けた。Node v24.20.0 / Windows 11 Home / fake-indexeddb6.2.4。

|case|正式判定|実施/計画variant|result SHA256|
|---|---|---:|---|
|F2:DEL-01|PASS|72/72|771dffa0d8853a8e598ed76750b380a176c9523c549ef42d455373793572933b|
|F2:DEL-02|PASS|1248/1248|2e2cb504e95c749d2422d4af599ebcf225577c2c29f404cdcb21eccabc304886|
|F2:DEL-03|PASS|72/72|0e4b24a42af84ce38a2463dbec74877e79f18f8d1058d0e5bde78a921d257a10|
|F2:DEL-04|PASS|1248/1248|22aa82154c1c9b33ac9a4a8aafa49480baf281f074302d73653bab876980931c|
|F2:DEL-05|PASS|72/72|ad9cb0f1bdbb56118e52d8cf0c7f083720a52e4b9cb5f01bbb85b978208adb9a|
|F2:DEL-06|PASS|144/144|070738d1fea3a70c2064b43bad67ffcd5ace3a629e0fc7176d5c8939fd6a901c|

合計2856/2856。停止：null。実行証拠manifest SHA256：`84ede3ca5dd0687d372985fb4cb99b3a83ad910cabee5420a3183fcbe71f4628`。全variantの入力・期待・独立oracle・実測・raw4store・trace・phaseを保存し、2856件の結果と全store/write数/complete-abortを独立監査した。source generationや他categoryを勝手に変更せず、abort時は全旧store維持。

累積497件：{"NOT RUN":321,"PASS":176}。未選定491レコードは不変。旧PASS/FAIL/NOT VERIFIABLE/ledger/fixture不備を維持し、CAP14の旧NOT VERIFIABLEも履歴に残る。固定製品3441・旧証拠92041・依存1978ファイルの前後bytes/hash一致、新folder以外のtracked差分なし。外部送信/log試行0。

製品/schema/registry/承認仕様の変更なし。実ブラウザー・実quota・OS保存・画面・F6は未検証。Gate5件・他のF5へ進まない。次候補は容量/backup/restore優先だが別途原文・全variant・oracle準備と承認が必要。制作管理室へ独立レビューを依頼し、commit/push後停止。F5全体PASS、本番公開、mainマージ、R005凍結解除は宣言しない。
