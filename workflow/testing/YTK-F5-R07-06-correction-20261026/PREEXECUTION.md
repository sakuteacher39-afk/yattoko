# F3:R07-06 是正再試験 実行前固定

対象製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99、旧成果物 df8181591e17f2c081a0b1f8e7c024d9e504fcf6。run F5-R07-06-CORRECTION-20261026-001、attempt2、対象ケースF3:R07-06のみ。既存8 PASS、旧FAIL、旧fixture/runner/ledger/証拠、未実施11ケースは変更・実行・自動移植しない。

旧48 variantは不正42件（2kind×3inactive parent×7child値）と正常6件だった。今回の「全48variantにchildが存在する」条件は不正48件として満たし、旧不正42件にchildをbillingの前へ挿入する6件を追加する。旧childなしcontrol6件を別枠で維持し、合計54件を同ケース内で実施する。全対応はOLD-VARIANT-MAPPING.json。

canonical baselineを最初に生成し、そのparsed envelopeへ不正childを挿入する。signRawはpayload6fieldの構造とchildをそのままJSON化し、native SHA-256で署名する。挿入後のfixtureにprojectionをかけない。独立checkerは親inactive、child実在・enum値・位置、raw key/value byte offsetとfragmentを全件照合し、childを含むpayloadのhashとchecksumを照合する。childを除いた独立cloneがbaselineと完全一致することも確認し、それ以外のfield/schema条件が変わっていないことを記録する。

不正48件は拒否・verified token無し・preview無し・full parse1・digest0・旧4ストア完全維持・readwrite0を期待する。正常6件はchild無しを事前確認し、strict importとpreview受理、旧保存維持を期待する。INVALID_FILE等の固定error codeは合否条件にせず診断値として残す。独立checkerはchild欠落・checksum改変の両方を検出できることを準備時に確認した。

全raw bytes/SHA-256、baseline、期待値、独立oracle、runner/helper hash・環境をPREEXECUTION.jsonに固定した。正式実行はcommit後に一度だけ。不一致・データ保護違反・外部sink・固定対象改変時は停止し、修正・再実行しない。観測不足はNOT VERIFIABLE、未実施はNOT RUN。

Node24/fake-indexeddb6.2.4の結果は実ブラウザー、物理保存、実quota、iPhone性能、F6を証明しない。他F5・F6・本番公開・mainマージ・R005凍結解除に進まない。
