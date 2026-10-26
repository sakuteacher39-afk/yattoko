# F5第3小バッチ FAIL2件 是正再試験 実行前固定

製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99。旧成果物 6911ae0c7f8890610bc02e9a821ce30cd39b6ba8。対象はF2:RST-06 / F3:R04-05のattempt2のみ。新run F5-M3-CORRECTION-20261026-001。旧FAIL、runner、fixture、ledger、証拠および受理済み18 PASSを変更せず、残り36件は実行しない。

承認済み原文はSOURCE-RECONCILIATION.jsonへ行番号・SHA-256とともに固定した。saveCalls1という根拠のない期待を除去し、呼出し回数は診断値としてのみ記録する。

F2は追加後canonical容量9,999,999 / 10,000,000 / 10,000,001 bytesの3条件。全source snapshotは10MB以内。独立に新service recordを構成して正確な将来bytesを計算する。上限超過時は拒否、操作前旧4ストア完全維持、receipt0、未適用ID保持、readwrite0を要求する。容量内controlは実保存と独立将来dataset一致、transaction completeを要求する。

F3は255 / 256 / 257操作。generatorとは別のcheckerが操作前状態を追跡し、各操作のID一意性・ordinal・依存関係・snapshot base revision・canonical context・no-op無しを全件確認した。raw16MB / pending1MB / snapshot10MBの全容量条件を検証し、257は件数上限だけの不許可とする。255/256はpreview完全受理、257はfull parse/SHA前拒否と旧保存不変を要求する。全操作追跡はoracles/に保存済み。

全6variantのfixture raw bytes/SHA-256、全期待値・独立oracle・runner/helper hash・環境・過去証拠hashをPREEXECUTION.jsonに固定する。commit後に正式実行する。判定は全条件一致のみPASS、不一致FAIL、観測・fixture・runner不備NOT VERIFIABLE。重大な破壊・外部sink・固定対象改変は停止する。

Node v24.20.0 / fake-indexeddb 6.2.4。実ブラウザー、実quota、物理保存、iPhone性能、F6を認定しない。試験対象コード、仕様、試験計画は変更しない。
