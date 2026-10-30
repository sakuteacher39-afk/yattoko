# F5第5バッチ 残り4ケース 正式試験提出

固定製品 `15a146a9b2c4f80c63798eb31d64b6774a4c2e99`、直近成果物 `f5e8551f3dfe9788b939b925dc69e938022c62b2`。専用ブランチ `codex/f5-b5-remaining4`。実行前commit `4e26e00f9e15508a6105a6b79cbed58c2e84cb10`。run `F5-B5-REMAINING4-20261030-001`。

## 対象・事前固定

省略表記は前回の未実施一覧CAP-15/CAP-17/CAP-01/CAP-02へ照合。4件とも現行固定製品NOT RUN、Gate5対象外。承認F2原文のGit blob・行・SHAを照合し、全105variantを固定した。旧未実施fixtureのraw bytesを変えず、pure F2意味model、明示的canonical property順、Buffer UTF8 bytesで全期待datasetを再計算し、旧期待hashとも一致した。製品validator/実測から期待を生成していない。

observerはCAP-14是正版とbyte-identical。transaction単位WeakSetで多重wrap防止。1/20/19,996反復アクセスで実putと記録件数が一致。承認済みCAP14の陽性control/計測有無比較を根拠として参照し、今回の正式PASSへ転記しない。証拠は各store別JSONとtrace JSONL、例外stack/段階/memoryを保存。実行環境はNode v24.20.0 / Windows 11 Home、fake-indexeddb6.2.4。子process限定Git core.longpaths=trueを事前固定した。

CAP-15は9,999,999/10,000,000/10,000,001のcontrol込み3境界。CAP-17は2件/19,996件の最初・中央・最後削除6variant、revision/global増分を含む正確な容量減少。CAP-01/02は全12category×partial/completed×canonical/reversed入力順の各48variant。明示top/overview property順、通常export snapshot、全4storeを確認した。

## 正式判定

|case|判定|実施/計画variant|result SHA-256|
|---|---|---:|---|
|F2:CAP-15|PASS|3/3|e42def34541847888139fb1855dac1195fdcfffdabf0aea93daba6fa6870b4df|
|F2:CAP-17|PASS|6/6|f8b8216bb67a30115da985babd66c85a5ee6bb716107013dfec88bc8a12920bd|
|F2:CAP-01|PASS|48/48|be45a23b60c0a3816b669c8b341dd7517850615c6a512be3ff37434644d3da8b|
|F2:CAP-02|PASS|48/48|1d63af2c2d71a5b0cb25ca53b94640015773e686785c8b8218305014c9de00ea|

合計105/105variant。停止理由null。実行証拠manifest SHA-256：`379378b94186e6371403e6ae542d2e62211f2590efddadf12ea1e3ef9a939752`。ケース別全入力・期待・oracle・実測はPREEXECUTIONと各observation、phase/trace/storeへ保存。独立監査105variantで保存結果・UTF8容量・request件数・readwrite終端数を照合。容量超過は旧全4store/revision維持・write0・abort完了。削除後容量は文字数ではなくcanonical UTF8 bytesで減少を確認。

## 累積・保全・限界

497件：{"NOT RUN":327,"PASS":170}。未選定493レコードは不変、旧PASS/FAIL/NOT VERIFIABLE/ledger/fixture履歴を保持。CAP14の旧NOT VERIFIABLEも履歴に残る。製品3441、旧対象/証拠89620、依存1978ファイルの前後bytes/hash一致。旧tracked diffは新フォルダを除き空。外部送信/log試行0。製品/schema/registry/承認仕様を変更していない。

実ブラウザー・実quota・物理保存・画面・永続性は今回未観測でPASSを付けない。計測器の時間/メモリへの影響がゼロとは主張せず、同一objectの再wrap防止と記録/結果の整合性を確認した範囲に限定する。異常がある場合は記録したstack/phaseを保持し、製品異常とobserver/記録異常を区別してレビューする。

Gate5件と他F5/F6は未実施。次バッチは別指示と事前照合が必要。制作管理室へ本成果物の独立レビューを依頼し、commit・push後に停止する。F5全体PASS、本番公開、mainマージ、R005凍結解除は行わない。
