# 第2小バッチ 実行前固定

対象製品は15a146a9b2c4f80c63798eb31d64b6774a4c2e99。前回55件と追加30件の重複9件を除き統合対象76件とする。詳細と由来はINTEGRATED-TARGETS.json、ケース別期待・独立oracle・入力hash・全3,113 variantはPREEXECUTION.jsonに固定する。

安全性の優先順で20ケースを選定した。旧データ保護・atomic rollback、不正入力拒否、pending禁止操作・依存条件、schema整合、明示確認と手動再適用を対象とする。残る56ケースは実行しない。旧PASS、開発テスト結果を転記しない。

実行環境はNode v24.20.0およびfake-indexeddb 6.2.4。製品の実際の保存・復元・再適用関数を、独立したダミーデータと独立reducerで照合する。fault injectionはtransaction abort、同期例外、readback不一致を使用する。実ブラウザーのquota発生条件、永続性、UI、物理ファイル保存はこの実行で証明しない。広域fault catalogの全faultを各拒否ケースに一律適用するものではなく、ケース固有の要求条件を検証する。

PREEXECUTION.jsonにrunnerおよび参照helper、環境・依存関係、旧証拠、対象全3,441ファイルの固定情報を保持する。実行前commit後にrunner/run.mjsを実行する。結果は新run F5-REG-M2-20261026-001へ追記保存し、FAIL・観測不能を保持する。重大なデータ保護違反・外部送信・対象改変を検出した場合は停止する。
