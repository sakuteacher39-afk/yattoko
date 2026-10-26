# R04-13 独立計測基盤と限定再試験 実行前固定

固定製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99、旧成果物 5670635aad6ece7cd210befb44d0d263f75f5db3。旧NOT VERIFIABLEと19 PASS、全証拠を保持する。R04-13 attempt2のみ。

承認済みF3 v0.3設計のGit bytesは3b54acbeと固定製品で完全一致。R04-13の原文も同一。REQUIREMENTS.jsonとAPPROVED-SOURCE-CROSSCHECK.jsonを参照。scannerがraw/textを全objectの別巨大treeとして保持しない要求と、F6でのiPhone peak memory/16MB安全性判定を分離する。

Acorn（実行Nodeに内蔵のソースを試験側へ抽出、バージョン/hash固定）で固定scannerを独立解析した。全constructor/object/array/call/assignment/returnを列挙し、動的tree producer無し、局所decoded-key Setのみ、JSON.parseは引用符付き4096文字以内tokenのみ、返却はscalar string以外無しを監査。全体parse・manual object/arrayを追加した試験側ソースcopy3件が検出される感度を確認した。製品ソースは変更していない。

runtimeは機密環境変数を継承しない別Node processで実施。in-process inspector（TCP listener無し）によるallocation timeline/stack tracking/sampling、V8 heap graph checkpointを採取する。JSON.parse/File/encode/digestの外部observerはnative引数・返却値・入力bytesを変更しない。heap取得はGC/stop-the-worldの観測効果があるので性能や無計測peak memoryを認定しない。

独立heap oracleはメモリ量/marker名を使わず、heap objectのfileFormat→snapshot.services→recordId/answersというedge構造と独立service件数から実treeを認識し、snapshot node IDで共有rootを重複計上しない。

陽性control2件は実際にnative JSON.parseで第二treeを生成する。retainedはscanner終了まで保持、transientはpeak checkpoint後に解放/GCする。peak graphで検出し、retained終了時存在・transient終了時不在・transient allocation frame保持・trace tree採取を全て満たした場合だけformal runを開始する。control結果は正式製品判定へ転記しない。

正式6variant: 旧canonical control、dense canonical control（snapshot9,999,999 bytes、19996 service）、旧raw16MBのSP/LF padding2件、dense raw16MBのSP/LF padding2件。全入力bytes/hash固定。bareとprofiledを比較し、after-decodeとscanner-exitでtree0、native parse後にtree検出、scalar parseのみ、canonical/encode/SHA順序、source allocation policy、陽性感度、整合性の全てが揃えばNodeの当該scanner要求のみPASS。反例はFAIL、証拠不足はNOT VERIFIABLE。raw16MB padding拒否を完全受理とみなさない。

正式run ID F5-R04-13-ALLOCATION-20261026-001、陽性control ID F5-R04-13-SENSITIVITY-20261026-001。順序はcommit→control→感度gate→formal→監査。感度不成立ならformalはNOT RUN、旧NOT VERIFIABLEを維持する。例外・counterexample・固定対象/旧証拠改変時は停止して修正しない。

本証明は固定scannerと捕捉済みnative intrinsic、6入力のNode実行を対象とする。一般のJavaScriptや任意の代替scannerを証明するものではない。native V8内部/全heap分類への完全な可視性は無く、それを必要とする結論は出さない。低メモリ/parse1回だけを不存在証明に使わない。F6、実ブラウザー7ケース、16MB安全性、F5全体PASS、公開・mainマージ・R005解除には進まない。
