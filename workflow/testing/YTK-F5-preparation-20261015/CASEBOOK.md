# F5正式試験ケース別実施要領（準備のみ）

対象 99e566da100ee6924149ec3244893bbddf7e8c4d。原文497件＋F4境界10gate。全正式結果NOT RUN。分類は自動実施可能性であり、正式専用runnerが全497件実装済みという意味ではない。casebookは手順書であり試験結果ではない。詳細JSONには原文の期待補足・source行・hash・前後比較・判定条件を保持する。

## F2:CAT-01 — A↔device

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:12
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: A↔device
- 期待: A↔device
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: A↔device 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-02 — B↔base

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:13
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: B↔base
- 期待: B↔base
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: B↔base 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-03 — C↔mail

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:14
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: C↔mail
- 期待: C↔mail
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: C↔mail 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-04 — D↔social

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:15
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: D↔social
- 期待: D↔social
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: D↔social 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-05 — E↔cloud

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:16
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: E↔cloud
- 期待: E↔cloud
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: E↔cloud 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-06 — F↔subscription

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:17
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: F↔subscription
- 期待: F↔subscription
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F↔subscription 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-07 — G↔finance

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:18
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: G↔finance
- 期待: G↔finance
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: G↔finance 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-08 — H↔commerce

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:19
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: H↔commerce
- 期待: H↔commerce
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: H↔commerce 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-09 — I↔auth

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:20
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: I↔auth
- 期待: I↔auth
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: I↔auth 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-10 — J↔license

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:21
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: J↔license
- 期待: J↔license
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: J↔license 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-11 — K↔carrier

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:22
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: K↔carrier
- 期待: K↔carrier
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: K↔carrier 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-12 — L↔business

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:23
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: L↔business
- 期待: L↔business
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: L↔business 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-13 — persisted categoryKeyがR001 C[].idと一致

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:24
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: persisted categoryKeyがR001 C[].idと一致
- 期待: persisted categoryKeyがR001 C[].idと一致
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: persisted categoryKeyがR001 C[].idと一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-14 — R2CAT参照keyと一致

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:25
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: R2CAT参照keyと一致
- 期待: R2CAT参照keyと一致
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R2CAT参照keyと一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-15 — R2Q参照keyと一致

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:26
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: R2Q参照keyと一致
- 期待: R2Q参照keyと一致
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R2Q参照keyと一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-16 — unknown categoryKeyをsave拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:27
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: unknown categoryKeyをsave拒否
- 期待: unknown categoryKeyをsave拒否
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown categoryKeyをsave拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-17 — unknown categoryKeyをimport/restore拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:28
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: unknown categoryKeyをimport/restore拒否
- 期待: unknown categoryKeyをimport/restore拒否
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown categoryKeyをimport/restore拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-18 — fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:29
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否
- 期待: fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 固定対象にdisplayCode field/専用move APIはない。未知field拒否とidentity不変を確認する。未実装分岐のsynthetic modelだけで製品PASSとしない。適用前提をレビューし、不能ならNOT VERIFIABLEを記録。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-19 — ordinary service editでcategoryKey変更を拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:30
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: ordinary service editでcategoryKey変更を拒否
- 期待: ordinary service editでcategoryKey変更を拒否
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ordinary service editでcategoryKey変更を拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:CAT-20 — synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:31
- 実施: manifest.categoryKeys、R001 C、R002 R2CAT/R2Qを固定sourceから抽出して照合。未知key/誤IDはsaveと署名済みimportの両境界へ入力し、ordinary editでidentity変更も拒否させる。 このケース固有の入力・操作・順序: synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない
- 期待: synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない
- fixture: DS-BASE, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 固定対象にdisplayCode field/専用move APIはない。未知field拒否とidentity不変を確認する。未実装分岐のsynthetic modelだけで製品PASSとしない。適用前提をレビューし、不能ならNOT VERIFIABLEを記録。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:PART-01 — datasetなしの初期表示は12category/5問すべて未回答として再構成

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:35
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: datasetなしの初期表示は12category/5問すべて未回答として再構成
- 期待: datasetなしの初期表示は12category/5問すべて未回答として再構成
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: datasetなしの初期表示は12category/5問すべて未回答として再構成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-02 — first category answerでbaseline+mutationを1transaction

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:36
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: first category answerでbaseline+mutationを1transaction
- 期待: first category answerでbaseline+mutationを1transaction
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: first category answerでbaseline+mutationを1transaction 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-03 — first transaction後globalRevision=1

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:37
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: first transaction後globalRevision=1
- 期待: first transaction後globalRevision=1
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: first transaction後globalRevision=1 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-04 — untouched categoryはusageStatus/intention=unanswered

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:38
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: untouched categoryはusageStatus/intention=unanswered
- 期待: untouched categoryはusageStatus/intention=unanswered
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: untouched categoryはusageStatus/intention=unanswered 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-05 — 12categoryの一部だけ回答→reloadして未回答との意味不変

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:39
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: 12categoryの一部だけ回答→reloadして未回答との意味不変
- 期待: 12categoryの一部だけ回答→reloadして未回答との意味不変
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 12categoryの一部だけ回答→reloadして未回答との意味不変 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-06 — overview 5問を1問だけ回答→reload

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:40
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: overview 5問を1問だけ回答→reload
- 期待: overview 5問を1問だけ回答→reload
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: overview 5問を1問だけ回答→reload 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-07 — unknownとunansweredを別値として保持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:41
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: unknownとunansweredを別値として保持
- 期待: unknownとunansweredを別値として保持
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknownとunansweredを別値として保持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-08 — explicit intention=undecidedとunansweredを別値として保持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:42
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: explicit intention=undecidedとunansweredを別値として保持
- 期待: explicit intention=undecidedとunansweredを別値として保持
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: explicit intention=undecidedとunansweredを別値として保持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-09 — category回答1変更につき対象record revision+1 / global+1

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:43
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: category回答1変更につき対象record revision+1 / global+1
- 期待: category回答1変更につき対象record revision+1 / global+1
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category回答1変更につき対象record revision+1 / global+1 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-10 — overview回答1変更につきoverview revision+1 / global+1

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:44
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: overview回答1変更につきoverview revision+1 / global+1
- 期待: overview回答1変更につきoverview revision+1 / global+1
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: overview回答1変更につきoverview revision+1 / global+1 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-11 — 同じ値を再選択してもrevision/globalが増えない

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:45
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: 同じ値を再選択してもrevision/globalが増えない
- 期待: 同じ値を再選択してもrevision/globalが増えない
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同じ値を再選択してもrevision/globalが増えない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-12 — transaction abortした回答は未commit、直前commit済み回答は維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:46
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: transaction abortした回答は未commit、直前commit済み回答は維持
- 期待: transaction abortした回答は未commit、直前commit済み回答は維持
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction abortした回答は未commit、直前commit済み回答は維持 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:PART-13 — STEP移動だけではrevisionを増やさない

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:47
- 実施: empty factoryからload→対象R001 mutationをsave。前後の全store projection/revisionsとtransactionイベントを取得。無操作/同値/STEP移動を独立操作として区別。 このケース固有の入力・操作・順序: STEP移動だけではrevisionを増やさない
- 期待: STEP移動だけではrevisionを増やさない
- fixture: DS-BASE / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: STEP移動だけではrevisionを増やさない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R07-01 — usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:51
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction
- 期待: usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-02 — R07-01でcategory record revisionは1回だけ増加

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:52
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: R07-01でcategory record revisionは1回だけ増加
- 期待: R07-01でcategory record revisionは1回だけ増加
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R07-01でcategory record revisionは1回だけ増加 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-03 — R07-01でglobalRevisionは1transaction分だけ増加

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:53
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: R07-01でglobalRevisionは1transaction分だけ増加
- 期待: R07-01でglobalRevisionは1transaction分だけ増加
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R07-01でglobalRevisionは1transaction分だけ増加 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-04 — R07-01 transaction abortでusageStatus/intentionの片側だけ残らない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:54
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: R07-01 transaction abortでusageStatus/intentionの片側だけ残らない
- 期待: R07-01 transaction abortでusageStatus/intentionの片側だけ残らない
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R07-01 transaction abortでusageStatus/intentionの片側だけ残らない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-05 — status確定後reloadでintention=undecidedを再構成

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:55
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: status確定後reloadでintention=undecidedを再構成
- 期待: status確定後reloadでintention=undecidedを再構成
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: status確定後reloadでintention=undecidedを再構成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-06 — R002 intentionOverride=nullのeffective表示がparent undecidedと一致

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:56
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: R002 intentionOverride=nullのeffective表示がparent undecidedと一致
- 期待: R002 intentionOverride=nullのeffective表示がparent undecidedと一致
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 intentionOverride=nullのeffective表示がparent undecidedと一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-07 — intention=keepのcategoryでstatus変更してもkeep維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:57
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: intention=keepのcategoryでstatus変更してもkeep維持
- 期待: intention=keepのcategoryでstatus変更してもkeep維持
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intention=keepのcategoryでstatus変更してもkeep維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-08 — intention=deleteのcategoryでstatus変更してもdelete維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:58
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: intention=deleteのcategoryでstatus変更してもdelete維持
- 期待: intention=deleteのcategoryでstatus変更してもdelete維持
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intention=deleteのcategoryでstatus変更してもdelete維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-09 — intention=familyのcategoryでstatus変更してもfamily維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:59
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: intention=familyのcategoryでstatus変更してもfamily維持
- 期待: intention=familyのcategoryでstatus変更してもfamily維持
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intention=familyのcategoryでstatus変更してもfamily維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-10 — intention=undecidedのcategoryでstatus変更してもundecided維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:60
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: intention=undecidedのcategoryでstatus変更してもundecided維持
- 期待: intention=undecidedのcategoryでstatus変更してもundecided維持
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intention=undecidedのcategoryでstatus変更してもundecided維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R07-11 — untouched categoryだけusageStatus=unanswered/intention=unansweredを維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:61
- 実施: 未回答parentからstatusを確定。keep/delete/family/undecided各意向の組合せもcloneで作成。親/子/overviewの差分とeffectiveIntentionを比較。 このケース固有の入力・操作・順序: untouched categoryだけusageStatus=unanswered/intention=unansweredを維持
- 期待: untouched categoryだけusageStatus=unanswered/intention=unansweredを維持
- fixture: DS-BASE, DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: untouched categoryだけusageStatus=unanswered/intention=unansweredを維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F2:R2INT-01 — known service選択確定直後にpartial recordをcommit

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:65
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: known service選択確定直後にpartial recordをcommit
- 期待: known service選択確定直後にpartial recordをcommit
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: known service選択確定直後にpartial recordをcommit 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-02 — known service identity確定直後にreloadしresume可能

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:66
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: known service identity確定直後にreloadしresume可能
- 期待: known service identity確定直後にreloadしresume可能
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: known service identity確定直後にreloadしresume可能 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-03 — 「その他」選択だけではrecordを作らない

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:67
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: 「その他」選択だけではrecordを作らない
- 期待: 「その他」選択だけではrecordを作らない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 「その他」選択だけではrecordを作らない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-04 — otherServiceName入力中はpendingのみ

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:68
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: otherServiceName入力中はpendingのみ
- 期待: otherServiceName入力中はpendingのみ
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: otherServiceName入力中はpendingのみ 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-05 — valid name「利用状態へ」確定直後にpartial recordをcommit

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:69
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: valid name「利用状態へ」確定直後にpartial recordをcommit
- 期待: valid name「利用状態へ」確定直後にpartial recordをcommit
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: valid name「利用状態へ」確定直後にpartial recordをcommit 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-06 — otherServiceName確定直後にreloadしresume可能

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:70
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: otherServiceName確定直後にreloadしresume可能
- 期待: otherServiceName確定直後にreloadしresume可能
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: otherServiceName確定直後にreloadしresume可能 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-07 — usageStatus確定直後にreloadし値保持

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:71
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: usageStatus確定直後にreloadし値保持
- 期待: usageStatus確定直後にreloadし値保持
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: usageStatus確定直後にreloadし値保持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-08 — optional 1問だけ回答後にreloadし値保持

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:72
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: optional 1問だけ回答後にreloadし値保持
- 期待: optional 1問だけ回答後にreloadし値保持
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: optional 1問だけ回答後にreloadし値保持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-09 — active optional未回答はunanswered

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:73
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: active optional未回答はunanswered
- 期待: active optional未回答はunanswered
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active optional未回答はunanswered 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-10 — inactive conditional keyは不存在

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:74
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: inactive conditional keyは不存在
- 期待: inactive conditional keyは不存在
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: inactive conditional keyは不存在 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-11 — parent changeでconditional child非表示時、child keyを同一transactionで削除

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:75
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: parent changeでconditional child非表示時、child keyを同一transactionで削除
- 期待: parent changeでconditional child非表示時、child keyを同一transactionで削除
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent changeでconditional child非表示時、child keyを同一transactionで削除 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-12 — parent changeでchild表示時、child keyをunansweredで生成

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:76
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: parent changeでchild表示時、child keyをunansweredで生成
- 期待: parent changeでchild表示時、child keyをunansweredで生成
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent changeでchild表示時、child keyをunansweredで生成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-13 — intentionOverride確定直後にreload

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:77
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: intentionOverride確定直後にreload
- 期待: intentionOverride確定直後にreload
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intentionOverride確定直後にreload 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-14 — complete押下でrecordState=completed

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:78
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: complete押下でrecordState=completed
- 期待: complete押下でrecordState=completed
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: complete押下でrecordState=completed 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-15 — optional未回答のままcompleted可能

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:79
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: optional未回答のままcompleted可能
- 期待: optional未回答のままcompleted可能
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: optional未回答のままcompleted可能 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-16 — partialとcompletedをreload後に識別可能

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:80
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: partialとcompletedをreload後に識別可能
- 期待: partialとcompletedをreload後に識別可能
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: partialとcompletedをreload後に識別可能 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-17 — completed recordを開いただけではcompleted維持

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:81
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: completed recordを開いただけではcompleted維持
- 期待: completed recordを開いただけではcompleted維持
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed recordを開いただけではcompleted維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-18 — completed recordの最初の変更で変更値+recordState=partialをatomic commit

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:82
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: completed recordの最初の変更で変更値+recordState=partialをatomic commit
- 期待: completed recordの最初の変更で変更値+recordState=partialをatomic commit
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed recordの最初の変更で変更値+recordState=partialをatomic commit 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-19 — edit再完了でcompletedへ戻る

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:83
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: edit再完了でcompletedへ戻る
- 期待: edit再完了でcompletedへ戻る
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: edit再完了でcompletedへ戻る 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-20 — 「いったん詳細整理を終わる」単独でsave/revisionしない

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:84
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: 「いったん詳細整理を終わる」単独でsave/revisionしない
- 期待: 「いったん詳細整理を終わる」単独でsave/revisionしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 「いったん詳細整理を終わる」単独でsave/revisionしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R2INT-21 — save abortではそのmutationだけpending、直前committed partialは維持

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:85
- 実施: ChromeでR001結果→詳しく整理→カテゴリ→known/その他→確定→途中中断/再読込をケースの時点で実施。未確定入力・完了・変更・戻るを区別し、操作ごとにAPI levelの正本と実画面を照合。 このケース固有の入力・操作・順序: save abortではそのmutationだけpending、直前committed partialは維持
- 期待: save abortではそのmutationだけpending、直前committed partialは維持
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: save abortではそのmutationだけpending、直前committed partialは維持 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-01 — partial + usageStatus=unansweredはvalid

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:89
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: partial + usageStatus=unansweredはvalid
- 期待: partial + usageStatus=unansweredはvalid
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: partial + usageStatus=unansweredはvalid 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-02 — complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:90
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない
- 期待: complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-03 — completed + usageStatus=usingはvalid

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:91
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: completed + usageStatus=usingはvalid
- 期待: completed + usageStatus=usingはvalid
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed + usageStatus=usingはvalid 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-04 — completed + usageStatus=dormantはvalid

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:92
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: completed + usageStatus=dormantはvalid
- 期待: completed + usageStatus=dormantはvalid
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed + usageStatus=dormantはvalid 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-05 — completed + usageStatus=unknownはvalid

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:93
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: completed + usageStatus=unknownはvalid
- 期待: completed + usageStatus=unknownはvalid
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed + usageStatus=unknownはvalid 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-06 — importでcompleted + usageStatus=unansweredをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:94
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: importでcompleted + usageStatus=unansweredをreject
- 期待: importでcompleted + usageStatus=unansweredをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: importでcompleted + usageStatus=unansweredをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-07 — restoreでcompleted + usageStatus=unansweredをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:95
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: restoreでcompleted + usageStatus=unansweredをreject
- 期待: restoreでcompleted + usageStatus=unansweredをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restoreでcompleted + usageStatus=unansweredをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-08 — normal loadでcompleted + usageStatus=unansweredをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:96
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: normal loadでcompleted + usageStatus=unansweredをreject
- 期待: normal loadでcompleted + usageStatus=unansweredをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal loadでcompleted + usageStatus=unansweredをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-09 — completed other service + empty/invalid otherServiceNameをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:97
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: completed other service + empty/invalid otherServiceNameをreject
- 期待: completed other service + empty/invalid otherServiceNameをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed other service + empty/invalid otherServiceNameをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-10 — active conditional field missingをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:98
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: active conditional field missingをreject
- 期待: active conditional field missingをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active conditional field missingをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-11 — inactive conditional field presentをreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:99
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: inactive conditional field presentをreject
- 期待: inactive conditional field presentをreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: inactive conditional field presentをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-12 — invalid completedをpartialへ自動補正しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:100
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: invalid completedをpartialへ自動補正しない
- 期待: invalid completedをpartialへ自動補正しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid completedをpartialへ自動補正しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R08-13 — intentionOverrideはnull/keep/delete/family/undecided以外をreject

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:101
- 実施: partial/completed×usage全enumをmanifestから列挙。通常save/load・署名済みimport・restoreの指定境界へ各fixtureを入力。invalid completedをpartialへ直さない。 このケース固有の入力・操作・順序: intentionOverrideはnull/keep/delete/family/undecided以外をreject
- 期待: intentionOverrideはnull/keep/delete/family/undecided以外をreject
- fixture: DS-MIX, DS-CONDITIONAL / fault: RAW-CORRUPT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intentionOverrideはnull/keep/delete/family/undecided以外をreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-01 — parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:105
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定
- 期待: parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-02 — service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:106
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない
- 期待: service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-03 — parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:107
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback
- 期待: parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-04 — reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:108
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- 期待: reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-05 — browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:109
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- 期待: browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-06 — normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:110
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成
- 期待: normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-07 — parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:111
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随
- 期待: parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-08 — service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:112
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない
- 期待: service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-09 — child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:113
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit
- 期待: child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-10 — R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:114
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない
- 期待: R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:R09-11 — R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:115
- 実施: 未回答親のpartial service/override=nullを初期化。親意向→keep、override→delete、child→usingを別cloneで適用。保存projectionに派生意向がないこととresolver/画面を比較。 このケース固有の入力・操作・順序: R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加
- 期待: R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加
- fixture: DS-MIX / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:DIR-01 — parent=not_using + new child usage=using -> parent=usingへ同一transaction

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:120
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: parent=not_using + new child usage=using -> parent=usingへ同一transaction
- 期待: parent=not_using + new child usage=using -> parent=usingへ同一transaction
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent=not_using + new child usage=using -> parent=usingへ同一transaction 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-02 — R001 billing=no + service billing=yes -> billing=yesへ同一transaction

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:121
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: R001 billing=no + service billing=yes -> billing=yesへ同一transaction
- 期待: R001 billing=no + service billing=yes -> billing=yesへ同一transaction
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 billing=no + service billing=yes -> billing=yesへ同一transaction 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-03 — R001 finance=no + finance asset=yes -> finance=yes

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:122
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: R001 finance=no + finance asset=yes -> finance=yes
- 期待: R001 finance=no + finance asset=yes -> finance=yes
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 finance=no + finance asset=yes -> finance=yes 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-04 — R001 data=no + service importantData=yes -> data=yes

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:123
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: R001 data=no + service importantData=yes -> data=yes
- 期待: R001 data=no + service importantData=yes -> data=yes
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 data=no + service importantData=yes -> data=yes 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-05 — R001 family=known + service familyKnow=no -> family=hidden

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:124
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: R001 family=known + service familyKnow=no -> family=hidden
- 期待: R001 family=known + service familyKnow=no -> family=hidden
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 family=known + service familyKnow=no -> family=hidden 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-06 — positive整合transaction abortでchildだけ/summaryだけ残らない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:125
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: positive整合transaction abortでchildだけ/summaryだけ残らない 原文補足: #### R001 negative変更起点
- 期待: positive整合transaction abortでchildだけ/summaryだけ残らない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: positive整合transaction abortでchildだけ/summaryだけ残らない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-07 — child usingありでparentをnot_using -> commit拒否/再確認

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:128
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: child usingありでparentをnot_using -> commit拒否/再確認
- 期待: child usingありでparentをnot_using -> commit拒否/再確認
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: child usingありでparentをnot_using -> commit拒否/再確認 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-08 — service billing=yesありでR001 billingをno -> silent commitしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:129
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: service billing=yesありでR001 billingをno -> silent commitしない
- 期待: service billing=yesありでR001 billingをno -> silent commitしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service billing=yesありでR001 billingをno -> silent commitしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-09 — finance asset=yesありでR001 finance=no -> silent commitしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:130
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: finance asset=yesありでR001 finance=no -> silent commitしない
- 期待: finance asset=yesありでR001 finance=no -> silent commitしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: finance asset=yesありでR001 finance=no -> silent commitしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-10 — importantData=yesありでR001 data=no -> silent commitしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:131
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: importantData=yesありでR001 data=no -> silent commitしない
- 期待: importantData=yesありでR001 data=no -> silent commitしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: importantData=yesありでR001 data=no -> silent commitしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-11 — familyKnow=noありでR001 family=known -> silent commitしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:132
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: familyKnow=noありでR001 family=known -> silent commitしない
- 期待: familyKnow=noありでR001 family=known -> silent commitしない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: familyKnow=noありでR001 family=known -> silent commitしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-12 — reject時にchildを削除/変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:133
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: reject時にchildを削除/変更しない 原文補足: #### detail negative / delete
- 期待: reject時にchildを削除/変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reject時にchildを削除/変更しない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-13 — child using->dormant後もparentをnot_usingへ自動変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:136
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: child using->dormant後もparentをnot_usingへ自動変更しない
- 期待: child using->dormant後もparentをnot_usingへ自動変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: child using->dormant後もparentをnot_usingへ自動変更しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-14 — last billing=yes->noでもR001 billingをnoへ自動変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:137
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: last billing=yes->noでもR001 billingをnoへ自動変更しない
- 期待: last billing=yes->noでもR001 billingをnoへ自動変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: last billing=yes->noでもR001 billingをnoへ自動変更しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-15 — last asset=yes->noでもfinanceをnoへ自動変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:138
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: last asset=yes->noでもfinanceをnoへ自動変更しない
- 期待: last asset=yes->noでもfinanceをnoへ自動変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: last asset=yes->noでもfinanceをnoへ自動変更しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-16 — last importantData=yes->noでもdataをnoへ自動変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:139
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: last importantData=yes->noでもdataをnoへ自動変更しない
- 期待: last importantData=yes->noでもdataをnoへ自動変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: last importantData=yes->noでもdataをnoへ自動変更しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-17 — last familyKnow=no->yesでもfamilyをknownへ自動変更しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:140
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: last familyKnow=no->yesでもfamilyをknownへ自動変更しない
- 期待: last familyKnow=no->yesでもfamilyをknownへ自動変更しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: last familyKnow=no->yesでもfamilyをknownへ自動変更しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:DIR-18 — service削除後parent/overviewをnegativeへ自動更新しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:141
- 実施: 子のpositive→親整合、親negative→拒否、子negative/delete→親非自動negativeをケース記載のfield/valueで実行。child/parent/overview全件を差分比較。 このケース固有の入力・操作・順序: service削除後parent/overviewをnegativeへ自動更新しない
- 期待: service削除後parent/overviewをnegativeへ自動更新しない
- fixture: DS-MIX, DS-CONDITIONAL / fault: TX-ABORT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service削除後parent/overviewをnegativeへ自動更新しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore

## F2:ID-01 — serviceはrecordIdで編集し配列順を使わない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:145
- 実施: 同名異IDの3serviceを作り、配列順入替・中央削除後にrecordId指定で編集。変更対象集合をIDで比較しmergeがないことをassert。 このケース固有の入力・操作・順序: serviceはrecordIdで編集し配列順を使わない
- 期待: serviceはrecordIdで編集し配列順を使わない
- fixture: DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: serviceはrecordIdで編集し配列順を使わない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry

## F2:ID-02 — 中央record削除後も誤更新なし

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:146
- 実施: 同名異IDの3serviceを作り、配列順入替・中央削除後にrecordId指定で編集。変更対象集合をIDで比較しmergeがないことをassert。 このケース固有の入力・操作・順序: 中央record削除後も誤更新なし
- 期待: 中央record削除後も誤更新なし
- fixture: DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 中央record削除後も誤更新なし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry

## F2:ID-03 — 同名service複数でもmergeしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:147
- 実施: 同名異IDの3serviceを作り、配列順入替・中央削除後にrecordId指定で編集。変更対象集合をIDで比較しmergeがないことをassert。 このケース固有の入力・操作・順序: 同名service複数でもmergeしない
- 期待: 同名service複数でもmergeしない
- fixture: DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同名service複数でもmergeしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry

## F2:CON-01 — tab A save後、旧global tab B save拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:148
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: tab A save後、旧global tab B save拒否
- 期待: tab A save後、旧global tab B save拒否
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: tab A save後、旧global tab B save拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-02 — partial serviceも競合保護

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:149
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: partial serviceも競合保護
- 期待: partial serviceも競合保護
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: partial serviceも競合保護 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-03 — completed serviceも競合保護

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:150
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: completed serviceも競合保護
- 期待: completed serviceも競合保護
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed serviceも競合保護 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-04 — conflict単純retryでforce overwriteしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:151
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: conflict単純retryでforce overwriteしない
- 期待: conflict単純retryでforce overwriteしない
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: conflict単純retryでforce overwriteしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-05 — delete-all後旧generation save拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:152
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: delete-all後旧generation save拒否
- 期待: delete-all後旧generation save拒否
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all後旧generation save拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-06 — restore後旧generation save拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:153
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: restore後旧generation save拒否
- 期待: restore後旧generation save拒否
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore後旧generation save拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:CON-07 — BroadcastChannel通知なしでもversion checkで拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:154
- 実施: 同一factoryの独立2接続でexpectedを保持。Aのedit/deleteAll/restore後Bのstale saveを実行。retryでもforce overwrite不可、通知なしでもtransaction guardで拒否。 このケース固有の入力・操作・順序: BroadcastChannel通知なしでもversion checkで拒否
- 期待: BroadcastChannel通知なしでもversion checkで拒否
- fixture: DS-MIX / fault: OTHER-TAB, DROP-NOTIFY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: BroadcastChannel通知なしでもversion checkで拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F2:SAVE-01 — request successでは保存済み表示しない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:158
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: request successでは保存済み表示しない
- 期待: request successでは保存済み表示しない
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: request successでは保存済み表示しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-02 — transaction completeのみ保存済み

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:159
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: transaction completeのみ保存済み
- 期待: transaction completeのみ保存済み
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction completeのみ保存済み 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-03 — abort/errorで保存済み表示なし

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:160
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: abort/errorで保存済み表示なし
- 期待: abort/errorで保存済み表示なし
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: abort/errorで保存済み表示なし 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-04 — save中の次mutationをqueue

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:161
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: save中の次mutationをqueue
- 期待: save中の次mutationをqueue
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: save中の次mutationをqueue 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-05 — 古いcompleteが新pendingを保存済みにしない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:162
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: 古いcompleteが新pendingを保存済みにしない
- 期待: 古いcompleteが新pendingを保存済みにしない
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 古いcompleteが新pendingを保存済みにしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-06 — 100連続変更で最終値が最新

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:163
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: 100連続変更で最終値が最新
- 期待: 100連続変更で最終値が最新
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 100連続変更で最終値が最新 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-07 — 1transaction内の複数record更新でもglobalRevisionは1回

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:164
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: 1transaction内の複数record更新でもglobalRevisionは1回
- 期待: 1transaction内の複数record更新でもglobalRevisionは1回
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 1transaction内の複数record更新でもglobalRevisionは1回 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-08 — changed record revisionは各1回

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:165
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: changed record revisionは各1回
- 期待: changed record revisionは各1回
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: changed record revisionは各1回 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:SAVE-09 — idempotent no-opはrevision不変

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:166
- 実施: SaveCoordinatorへ単発/同値/100変更をenqueue。request successとcompleteを別観測し、queue長・保存表示・global/record revisionを時系列取得。 このケース固有の入力・操作・順序: idempotent no-opはrevision不変
- 期待: idempotent no-opはrevision不変
- fixture: DS-MIX / fault: TX-TRACE, TX-ABORT, REQUEST-HOLD
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: idempotent no-opはrevision不変 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-01 — NFC normalizationを適用

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:170
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: NFC normalizationを適用
- 期待: NFC normalizationを適用
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: NFC normalizationを適用 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-02 — NFKCを適用しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:171
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: NFKCを適用しない
- 期待: NFKCを適用しない
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: NFKCを適用しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-03 — leading/trailing whitespaceをtrim

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:172
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: leading/trailing whitespaceをtrim
- 期待: leading/trailing whitespaceをtrim
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: leading/trailing whitespaceをtrim 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-04 — trim後empty拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:173
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: trim後empty拒否
- 期待: trim後empty拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: trim後empty拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-05 — C0 control拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:174
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: C0 control拒否
- 期待: C0 control拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: C0 control拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-06 — DEL拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:175
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: DEL拒否
- 期待: DEL拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: DEL拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-07 — C1 control拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:176
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: C1 control拒否
- 期待: C1 control拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: C1 control拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-08 — U+061C拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:177
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: U+061C拒否
- 期待: U+061C拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: U+061C拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-09 — U+200E/U+200F拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:178
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: U+200E/U+200F拒否
- 期待: U+200E/U+200F拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: U+200E/U+200F拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-10 — U+202A〜U+202E拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:179
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: U+202A〜U+202E拒否
- 期待: U+202A〜U+202E拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: U+202A〜U+202E拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-11 — U+2066〜U+2069拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:180
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: U+2066〜U+2069拒否
- 期待: U+2066〜U+2069拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: U+2066〜U+2069拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-12 — canonical UTF-16 length=60受理

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:181
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: canonical UTF-16 length=60受理
- 期待: canonical UTF-16 length=60受理
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical UTF-16 length=60受理 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-13 — canonical UTF-16 length=61拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:182
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: canonical UTF-16 length=61拒否
- 期待: canonical UTF-16 length=61拒否
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical UTF-16 length=61拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-14 — emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:183
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致
- 期待: emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-15 — save/import/restore/emergency exportで同一validator

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:184
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: save/import/restore/emergency exportで同一validator
- 期待: save/import/restore/emergency exportで同一validator
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: save/import/restore/emergency exportで同一validator 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-16 — secret-like regex該当を保存しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:185
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: secret-like regex該当を保存しない
- 期待: secret-like regex該当を保存しない
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: secret-like regex該当を保存しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:TXT-17 — invalid importを自動修復しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:186
- 実施: case記載のUnicode/control/bidi/NFC/UTF16長入力をotherServiceNameへ設定。save正規化とimportの非修復拒否を分け、save/import/restore/capture全境界を照合。 このケース固有の入力・操作・順序: invalid importを自動修復しない
- 期待: invalid importを自動修復しない
- fixture: NAME-INPUTS, DS-MIX / fault: NONE
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid importを自動修復しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, ui

## F2:CAP-01 — top-level property order固定

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:190
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: top-level property order固定
- 期待: top-level property order固定
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: top-level property order固定 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-02 — overview property order固定

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:191
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: overview property order固定
- 期待: overview property order固定
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: overview property order固定 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-03 — categoriesはdevice→business固定12順

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:192
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: categoriesはdevice→business固定12順
- 期待: categoriesはdevice→business固定12順
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categoriesはdevice→business固定12順 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-04 — unanswered categoryも全12件含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:193
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: unanswered categoryも全12件含む
- 期待: unanswered categoryも全12件含む
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unanswered categoryも全12件含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-05 — serviceはrecordId昇順

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:194
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: serviceはrecordId昇順
- 期待: serviceはrecordId昇順
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: serviceはrecordId昇順 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-06 — partial serviceも含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:195
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: partial serviceも含む
- 期待: partial serviceも含む
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: partial serviceも含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-07 — completed serviceも含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:196
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: completed serviceも含む
- 期待: completed serviceも含む
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed serviceも含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-08 — pending overlayはcommitted capacityから除外

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:197
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: pending overlayはcommitted capacityから除外
- 期待: pending overlayはcommitted capacityから除外
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending overlayはcommitted capacityから除外 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-09 — active optional unansweredを含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:198
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: active optional unansweredを含む
- 期待: active optional unansweredを含む
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active optional unansweredを含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-10 — inactive conditional keyを含めない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:199
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: inactive conditional keyを含めない
- 期待: inactive conditional keyを含めない
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: inactive conditional keyを含めない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-11 — normalized otherServiceNameで計測

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:200
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: normalized otherServiceNameで計測
- 期待: normalized otherServiceNameで計測
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normalized otherServiceNameで計測 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-12 — record IDs/revisions/schema/question version/metaを含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:201
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: record IDs/revisions/schema/question version/metaを含む
- 期待: record IDs/revisions/schema/question version/metaを含む
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: record IDs/revisions/schema/question version/metaを含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-13 — 同じsemantic datasetはinsert順に関係なく同byte数

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:202
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: 同じsemantic datasetはinsert順に関係なく同byte数
- 期待: 同じsemantic datasetはinsert順に関係なく同byte数
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同じsemantic datasetはinsert順に関係なく同byte数 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-14 — 10,000,000 exactly受理

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:203
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: 10,000,000 exactly受理
- 期待: 10,000,000 exactly受理
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 10,000,000 exactly受理 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-15 — 10,000,001拒否

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:204
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: 10,000,001拒否
- 期待: 10,000,001拒否
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 10,000,001拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-16 — update後prospective stateで計測しoverなら旧commit維持

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:205
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: update後prospective stateで計測しoverなら旧commit維持
- 期待: update後prospective stateで計測しoverなら旧commit維持
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: update後prospective stateで計測しoverなら旧commit維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-17 — delete後size減少を許可

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:206
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: delete後size減少を許可
- 期待: delete後size減少を許可
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete後size減少を許可 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:CAP-18 — browser quota errorをapp 10MB超過と混同しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:207
- 実施: 独立serializerのcanonical UTF8 bytesとsubject projectionを比較。sort/order/meta/conditional/partial/completedを個別assert。prospective超過とphysical quotaを別faultで検証。 このケース固有の入力・操作・順序: browser quota errorをapp 10MB超過と混同しない
- 期待: browser quota errorをapp 10MB超過と混同しない
- fixture: DS-BYTES-9999999, DS-BYTES-10000000, DS-BYTES-10000001, DS-MIX, DS-CONDITIONAL / fault: QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: browser quota errorをapp 10MB超過と混同しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, backup, restore

## F2:BKP-01 — normal backupにcompleted serviceを含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:211
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: normal backupにcompleted serviceを含む
- 期待: normal backupにcompleted serviceを含む
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backupにcompleted serviceを含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-02 — normal backupにcommitted partial serviceを含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:212
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: normal backupにcommitted partial serviceを含む
- 期待: normal backupにcommitted partial serviceを含む
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backupにcommitted partial serviceを含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-03 — normal backupにR001 unansweredを含む

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:213
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: normal backupにR001 unansweredを含む
- 期待: normal backupにR001 unansweredを含む
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backupにR001 unansweredを含む 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-04 — normal backupにpending overlayを含めない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:214
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: normal backupにpending overlayを含めない
- 期待: normal backupにpending overlayを含めない
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backupにpending overlayを含めない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-05 — emergency exportはcommittedとpendingを別領域

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:215
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: emergency exportはcommittedとpendingを別領域
- 期待: emergency exportはcommittedとpendingを別領域
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: emergency exportはcommittedとpendingを別領域 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-06 — pending metadataからbase generation/revisionを判別可能

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:216
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: pending metadataからbase generation/revisionを判別可能
- 期待: pending metadataからbase generation/revisionを判別可能
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending metadataからbase generation/revisionを判別可能 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-07 — invalid pendingはfileへ入れず「退避成功」と表示しない

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:217
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: invalid pendingはfileへ入れず「退避成功」と表示しない
- 期待: invalid pendingはfileへ入れず「退避成功」と表示しない
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid pendingはfileへ入れず「退避成功」と表示しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-08 — emergency fileが10MB超でもIndexedDB上限違反と即断しない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:218
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: emergency fileが10MB超でもIndexedDB上限違反と即断しない
- 期待: emergency fileが10MB超でもIndexedDB上限違反と即断しない
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: emergency fileが10MB超でもIndexedDB上限違反と即断しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-09 — export file generation failureで成功表示しない

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:219
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: export file generation failureで成功表示しない
- 期待: export file generation failureで成功表示しない
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: export file generation failureで成功表示しない 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-10 — pending dependency不整合をsilent exportしない

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:220
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: pending dependency不整合をsilent exportしない
- 期待: pending dependency不整合をsilent exportしない
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending dependency不整合をsilent exportしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:BKP-11 — pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:221
- 実施: createBackupに同一readonly snapshotとqueue/draftを渡す。出力raw bytes/checksum/snapshot/pending、元queue/DBの不変、生成失敗時の表示を照合。 このケース固有の入力・操作・順序: pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示
- 期待: pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示
- fixture: DS-MIX, EM-FULL, EM-PARTIAL / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F2:RST-01 — normal restoreでpartial/completed状態を保持

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:222
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: normal restoreでpartial/completed状態を保持
- 期待: normal restoreでpartial/completed状態を保持
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal restoreでpartial/completed状態を保持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-02 — restore atomic replace失敗時は旧dataset維持

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:223
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: restore atomic replace失敗時は旧dataset維持
- 期待: restore atomic replace失敗時は旧dataset維持
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore atomic replace失敗時は旧dataset維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-03 — restore成功でgeneration変更

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:224
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: restore成功でgeneration変更
- 期待: restore成功でgeneration変更
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore成功でgeneration変更 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-04 — emergency pendingをsilent commitしない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:225
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: emergency pendingをsilent commitしない
- 期待: emergency pendingをsilent commitしない
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: emergency pendingをsilent commitしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-05 — pending再適用は通常save pipelineを通す

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:226
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: pending再適用は通常save pipelineを通す
- 期待: pending再適用は通常save pipelineを通す
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending再適用は通常save pipelineを通す 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-06 — pending再適用で10MB超なら保存拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:227
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: pending再適用で10MB超なら保存拒否
- 期待: pending再適用で10MB超なら保存拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending再適用で10MB超なら保存拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-07 — unknown schema/question version拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:228
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: unknown schema/question version拒否
- 期待: unknown schema/question version拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown schema/question version拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-08 — unknown categoryKey拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:229
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: unknown categoryKey拒否
- 期待: unknown categoryKey拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown categoryKey拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-09 — duplicate recordId拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:230
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: duplicate recordId拒否
- 期待: duplicate recordId拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: duplicate recordId拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-10 — malformed/empty datasetを新規状態として上書きしない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:231
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: malformed/empty datasetを新規状態として上書きしない
- 期待: malformed/empty datasetを新規状態として上書きしない
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: malformed/empty datasetを新規状態として上書きしない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-11 — required field欠落拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:232
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: required field欠落拒否
- 期待: required field欠落拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: required field欠落拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-12 — unexpected field拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:233
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: unexpected field拒否
- 期待: unexpected field拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unexpected field拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-13 — unexpected nested object拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:234
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: unexpected nested object拒否
- 期待: unexpected nested object拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unexpected nested object拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-14 — duplicate category拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:235
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: duplicate category拒否
- 期待: duplicate category拒否
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: duplicate category拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-15 — categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合）

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:236
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合）
- 期待: categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合）
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合） 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 固定対象にdisplayCode field/専用move APIはない。未知field拒否とidentity不変を確認する。未実装分岐のsynthetic modelだけで製品PASSとしない。適用前提をレビューし、不能ならNOT VERIFIABLEを記録。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-16 — completed + usageStatus=unansweredをreject

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:237
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: completed + usageStatus=unansweredをreject
- 期待: completed + usageStatus=unansweredをreject
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed + usageStatus=unansweredをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-17 — completed other serviceのinvalid otherServiceNameをreject

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:238
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: completed other serviceのinvalid otherServiceNameをreject
- 期待: completed other serviceのinvalid otherServiceNameをreject
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completed other serviceのinvalid otherServiceNameをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-18 — active conditional missing / inactive conditional presentをreject

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:239
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: active conditional missing / inactive conditional presentをreject
- 期待: active conditional missing / inactive conditional presentをreject
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active conditional missing / inactive conditional presentをreject 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:RST-19 — invalid completed stateを自動補正しない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:240
- 実施: file→strict import→prepareRestore→preview→明示commit。成功/失敗双方で全store bytes・generation/global/record revision・pending別操作を照合する。 このケース固有の入力・操作・順序: invalid completed stateを自動補正しない
- 期待: invalid completed stateを自動補正しない
- fixture: V-VALID-01, DS-MIX, EM-FULL / fault: TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid completed stateを自動補正しない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F2:DEL-01 — category deleteでcategory record + child servicesを同一transactionで削除

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:244
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: category deleteでcategory record + child servicesを同一transactionで削除
- 期待: category deleteでcategory record + child servicesを同一transactionで削除
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category deleteでcategory record + child servicesを同一transactionで削除 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:DEL-02 — category delete途中abortでcategory/childrenとも旧状態維持

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:245
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: category delete途中abortでcategory/childrenとも旧状態維持
- 期待: category delete途中abortでcategory/childrenとも旧状態維持
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category delete途中abortでcategory/childrenとも旧状態維持 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:DEL-03 — category delete成功後に一部childだけ残らない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:246
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: category delete成功後に一部childだけ残らない
- 期待: category delete成功後に一部childだけ残らない
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category delete成功後に一部childだけ残らない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:DEL-04 — delete-all途中abortで旧datasetを全体維持

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:247
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: delete-all途中abortで旧datasetを全体維持
- 期待: delete-all途中abortで旧datasetを全体維持
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all途中abortで旧datasetを全体維持 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:DEL-05 — delete-all成功で新generationIdへ切替

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:248
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: delete-all成功で新generationIdへ切替
- 期待: delete-all成功で新generationIdへ切替
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all成功で新generationIdへ切替 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:DEL-06 — delete-all成功後、旧generation tabの保存を拒否

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:249
- 実施: 通常deleteCategory/deleteAllをsave。各PUT後abortとcomplete成功を別fixtureで実施し、旧正本全件/子全件/新generation/旧tab拒否を照合。pending再適用に転用しない。 このケース固有の入力・操作・順序: delete-all成功後、旧generation tabの保存を拒否
- 期待: delete-all成功後、旧generation tabの保存を拒否
- fixture: DS-MIX / fault: TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all成功後、旧generation tabの保存を拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1

## F2:ERR-01 — ①app 10MB超過を正しく分類し既存committed stateを維持

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:253
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ①app 10MB超過を正しく分類し既存committed stateを維持
- 期待: ①app 10MB超過を正しく分類し既存committed stateを維持
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ①app 10MB超過を正しく分類し既存committed stateを維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-02 — ②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:254
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない
- 期待: ②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-03 — ③保存機能制限をstorage unavailable/permission相当の根拠で分類

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:255
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ③保存機能制限をstorage unavailable/permission相当の根拠で分類
- 期待: ③保存機能制限をstorage unavailable/permission相当の根拠で分類
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ③保存機能制限をstorage unavailable/permission相当の根拠で分類 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-04 — ④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:256
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない
- 期待: ④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-05 — ⑤一時的保存失敗は合理的根拠がある場合だけ分類

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:257
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ⑤一時的保存失敗は合理的根拠がある場合だけ分類
- 期待: ⑤一時的保存失敗は合理的根拠がある場合だけ分類
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ⑤一時的保存失敗は合理的根拠がある場合だけ分類 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-06 — ⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:258
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: ⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示
- 期待: ⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-07 — 全6分類で未保存入力を保持し保存済み誤表示なし

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:259
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: 全6分類で未保存入力を保持し保存済み誤表示なし
- 期待: 全6分類で未保存入力を保持し保存済み誤表示なし
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 全6分類で未保存入力を保持し保存済み誤表示なし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-08 — retry可能/不可能の導線が分類に一致

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:260
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: retry可能/不可能の導線が分類に一致
- 期待: retry可能/不可能の導線が分類に一致
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: retry可能/不可能の導線が分類に一致 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-09 — conflictでは「再試行」だけで保存せず最新版確認を要求

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:261
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: conflictでは「再試行」だけで保存せず最新版確認を要求
- 期待: conflictでは「再試行」だけで保存せず最新版確認を要求
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: conflictでは「再試行」だけで保存せず最新版確認を要求 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:ERR-10 — technical exception name/secret/bodyを利用者文言やlogへそのまま出さない

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:262
- 実施: 6分類別の既知faultとunknown例外を投入。code・利用者文言・pending保持・retry可否を照合。例外本文のfixture sentinelを画面/console/networkへ漏らさない。 このケース固有の入力・操作・順序: technical exception name/secret/bodyを利用者文言やlogへそのまま出さない
- 期待: technical exception name/secret/bodyを利用者文言やlogへそのまま出さない
- fixture: DS-MIX, EM-FULL / fault: QUOTA, STORAGE-DENIED, TX-ABORT, OTHER-TAB, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: technical exception name/secret/bodyを利用者文言やlogへそのまま出さない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, file-save-ui

## F2:SEC-01 — D区分field拒否

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:266
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: D区分field拒否
- 期待: D区分field拒否
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: D区分field拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-02 — free memo fieldなし

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:267
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: free memo fieldなし
- 期待: free memo fieldなし
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: free memo fieldなし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-03 — HTML/JS文字列をtextとして表示

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:268
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: HTML/JS文字列をtextとして表示
- 期待: HTML/JS文字列をtextとして表示
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: HTML/JS文字列をtextとして表示 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-04 — prototype pollution系key拒否

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:269
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: prototype pollution系key拒否
- 期待: prototype pollution系key拒否
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: prototype pollution系key拒否 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-05 — error logにserviceName/answer/pending本文なし

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:270
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: error logにserviceName/answer/pending本文なし
- 期待: error logにserviceName/answer/pending本文なし
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: error logにserviceName/answer/pending本文なし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-06 — network mockで整理内容外部送信0

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:271
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: network mockで整理内容外部送信0
- 期待: network mockで整理内容外部送信0
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: network mockで整理内容外部送信0 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:SEC-07 — analytics/APM/replay hookへpayloadなし

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:272
- 実施: unknown/D区分/__proto__/constructor/prototypeの各位置を入力。textContentとDOM要素/イベントを比較。全console/network/analytics相当sinkを観測し、本体・例外payloadの流出0を確認。 このケース固有の入力・操作・順序: analytics/APM/replay hookへpayloadなし
- 期待: analytics/APM/replay hookへpayloadなし
- fixture: NAME-INPUTS, V-UNK-01, DS-MIX / fault: SINK-SPY, UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: analytics/APM/replay hookへpayloadなし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, ui

## F2:LONG-01 — 利用開始のlong-term loss注意を維持

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:276
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: 利用開始のlong-term loss注意を維持
- 期待: 利用開始のlong-term loss注意を維持
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 利用開始のlong-term loss注意を維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F2:LONG-02 — 利用開始の適宜backup推奨を維持

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:277
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: 利用開始の適宜backup推奨を維持
- 期待: 利用開始の適宜backup推奨を維持
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 利用開始の適宜backup推奨を維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F2:LONG-03 — 完了/回答変更/定期backup催促を追加していない

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:278
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: 完了/回答変更/定期backup催促を追加していない
- 期待: 完了/回答変更/定期backup催促を追加していない
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 完了/回答変更/定期backup催促を追加していない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F2:LONG-04 — private mode専用detector/blockを追加していない

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:279
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: private mode専用detector/blockを追加していない
- 期待: private mode専用detector/blockを追加していない
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: private mode専用detector/blockを追加していない 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F2:LONG-05 — 原因不明保存エラーのprivate mode補足を維持

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:280
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: 原因不明保存エラーのprivate mode補足を維持
- 期待: 原因不明保存エラーのprivate mode補足を維持
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 原因不明保存エラーのprivate mode補足を維持 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F2:LONG-06 — 「永久」「消えない」等の保証表現なし

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md:281
- 実施: 固定HTMLとlocal文言を全画面経路で採録。長期保持/private補足/backup推奨を原文と比較し、detector/定期催促/保証語の追加なしをsource/人間両方で確認。 このケース固有の入力・操作・順序: 「永久」「消えない」等の保証表現なし
- 期待: 「永久」「消えない」等の保証表現なし
- fixture: DS-BASE / fault: UNKNOWN-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 「永久」「消えない」等の保証表現なし 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: ui

## F3:R01-01 — confirmed-pending 1件をcapture candidateとして認識。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:27
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: confirmed-pending 1件をcapture candidateとして認識。 原文補足: - 期待：committedへ混ぜずpending operationになる。
- 期待: committedへ混ぜずpending operationになる。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: committedへ混ぜずpending operationになる。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-02 — dependent-pending chain（service create→usage→answer）をordinal順で保持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:29
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: dependent-pending chain（service create→usage→answer）をordinal順で保持。 原文補足: - 期待：dependsOnOperationIdsが先行operationを指し、並替なし。
- 期待: dependsOnOperationIdsが先行operationを指し、並替なし。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: dependsOnOperationIdsが先行operationを指し、並替なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-03 — current UI draftがF2 validator合格。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:31
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: current UI draftがF2 validator合格。 原文補足: - 期待：canonical candidateとしてのみcapture可能。
- 期待: canonical candidateとしてのみcapture可能。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical candidateとしてのみcapture可能。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-04 — current UI draftがinvalid/secret-like。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:33
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: current UI draftがinvalid/secret-like。 原文補足: - 期待：fileへ入れずomittedCountに加算、画面値はclearしない。
- 期待: fileへ入れずomittedCountに加算、画面値はclearしない。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: fileへ入れずomittedCountに加算、画面値はclearしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-05 — dependency missing。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:35
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: dependency missing。 原文補足: - 期待：component全体をpending export対象外。独立componentへ影響なし。
- 期待: component全体をpending export対象外。独立componentへ影響なし。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: component全体をpending export対象外。独立componentへ影響なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-06 — dependency cycle。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:37
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: dependency cycle。 原文補足: - 期待：component全体reject。自動並替/修復なし。
- 期待: component全体reject。自動並替/修復なし。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: component全体reject。自動並替/修復なし。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-07 — conditional childがparent expected stateと不整合。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:39
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: conditional childがparent expected stateと不整合。 原文補足: - 期待：component reject。
- 期待: component reject。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: component reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-08 — service identity pendingに依存する後続3操作の1つがinvalid。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:41
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: service identity pendingに依存する後続3操作の1つがinvalid。 原文補足: - 期待：identityを含む同dependency component全体を除外。
- 期待: identityを含む同dependency component全体を除外。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: identityを含む同dependency component全体を除外。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-09 — 独立した2componentの片方だけinvalid。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:43
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: 独立した2componentの片方だけinvalid。 原文補足: - 期待：valid componentだけpartial capture、captureStatus=partial。
- 期待: valid componentだけpartial capture、captureStatus=partial。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: valid componentだけpartial capture、captureStatus=partial。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-10 — captureStatus=partial時candidate/exported/omitted件数が一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:45
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: captureStatus=partial時candidate/exported/omitted件数が一致。
- 期待: captureStatus=partial時candidate/exported/omitted件数が一致。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: captureStatus=partial時candidate/exported/omitted件数が一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-11 — omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:46
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。
- 期待: omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-12 — operation ID重複。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:47
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: operation ID重複。 原文補足: - 期待：pending validator reject。
- 期待: pending validator reject。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending validator reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-13 — ordinal重複/逆行。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:49
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: ordinal重複/逆行。 原文補足: - 期待：reject。
- 期待: reject。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-14 — unsupported operation（delete-all/restore等）をpendingへ入れる。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:51
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: unsupported operation（delete-all/restore等）をpendingへ入れる。 原文補足: - 期待：reject。
- 期待: reject。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: deleteAll/restore pendingは不許可。収録時はcomponent未収録、import全体拒否、reapply独立guard拒否。通常deleteAll許可/成功generation更新は別ケースで維持。
- 正式結果: NOT RUN。開発証拠候補のみ: s4-r01.test.mjs（収録拒否・SHA正常の取込拒否・独立再適用guard・通常deleteAll・画面統合）

## F3:R01-15 — capture開始後readonly snapshotのgeneration/globalとpending baseが一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:56
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: capture開始後readonly snapshotのgeneration/globalとpending baseが一致。
- 期待: capture開始後readonly snapshotのgeneration/globalとpending baseが一致。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: capture開始後readonly snapshotのgeneration/globalとpending baseが一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-16 — 別tabがglobalRevision更新済み。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:57
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: 別tabがglobalRevision更新済み。 原文補足: - 期待：古いbaseのcomponentをBASE_CONFLICTで退避不可。
- 期待: 古いbaseのcomponentをBASE_CONFLICTで退避不可。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 古いbaseのcomponentをBASE_CONFLICTで退避不可。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-17 — generationが変わった。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:59
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: generationが変わった。 原文補足: - 期待：全古いpending componentを自動rebaseしない。
- 期待: 全古いpending componentを自動rebaseしない。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 全古いpending componentを自動rebaseしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-18 — target recordRevisionだけ変化。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:61
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: target recordRevisionだけ変化。 原文補足: - 期待：対象componentを退避不可。
- 期待: 対象componentを退避不可。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 対象componentを退避不可。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-19 — baseSnapshotChecksumSha256不一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:63
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: baseSnapshotChecksumSha256不一致。 原文補足: - 期待：pending自動適用/「完全退避」表示なし。
- 期待: pending自動適用/「完全退避」表示なし。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending自動適用/「完全退避」表示なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-20 — baseContentFingerprint不一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:65
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: baseContentFingerprint不一致。 原文補足: - 期待：pending-only recovery候補にしない。
- 期待: pending-only recovery候補にしない。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending-only recovery候補にしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-21 — pending 999,999 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:70
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: pending 999,999 bytes。
- 期待: pending 999,999 bytes。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending 999,999 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-22 — pending 1,000,000 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:71
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: pending 1,000,000 bytes。
- 期待: pending 1,000,000 bytes。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending 1,000,000 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-23 — pending 1,000,001 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:72
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: pending 1,000,001 bytes。 原文補足: - 期待：無断truncateせずcaptureStatus=noneまたは明示partial rule。画面値保持。
- 期待: 無断truncateせずcaptureStatus=noneまたは明示partial rule。画面値保持。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 無断truncateせずcaptureStatus=noneまたは明示partial rule。画面値保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-24 — operations 255件。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:74
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: operations 255件。
- 期待: operations 255件。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: operations 255件。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-25 — operations 256件。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:75
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: operations 256件。
- 期待: operations 256件。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: operations 256件。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-26 — operations 257件。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:76
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: operations 257件。 原文補足: - 期待：無断truncateなし。candidate/exported/omitted表示。
- 期待: 無断truncateなし。candidate/exported/omitted表示。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 無断truncateなし。candidate/exported/omitted表示。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-27 — Blob生成失敗。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:78
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: Blob生成失敗。 原文補足: - 期待：緊急退避成功表示なし、画面値保持。
- 期待: 緊急退避成功表示なし、画面値保持。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 緊急退避成功表示なし、画面値保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-28 — object URL/download起動失敗。

- 実施区分: BROWSER_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:80
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: object URL/download起動失敗。 原文補足: - 期待：成功表示なし、画面値保持。
- 期待: 成功表示なし、画面値保持。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 成功表示なし、画面値保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-29 — downloadが開始できたが物理保存確認不能。

- 実施区分: BROWSER_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:82
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: downloadが開始できたが物理保存確認不能。 原文補足: - 期待：「保存先を確認」表示。救済完了と断定しない。
- 期待: 「保存先を確認」表示。救済完了と断定しない。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 「保存先を確認」表示。救済完了と断定しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-30 — retry後も元画面の未保存回答が残る。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:84
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: retry後も元画面の未保存回答が残る。
- 期待: retry後も元画面の未保存回答が残る。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: retry後も元画面の未保存回答が残る。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R01-31 — file作成失敗後のnavigation warning。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:85
- 実施: frozen pending/draftからcaptureし、依存component・base guard・ID/ordinal・full/partial/noneの合計と離散範囲を照合。各ケース指定の不正候補だけをcloneへ導入し元入力/DB不変をassert。 このケース固有の入力・操作・順序: file作成失敗後のnavigation warning。 原文補足: - 期待：「画面を閉じない」旨を表示、beforeunloadだけに依存しない。
- 期待: 「画面を閉じない」旨を表示、beforeunloadだけに依存しない。
- fixture: DS-BASE, EM-FULL, EM-PARTIAL, EM-NONE-DELETEALL, EM-FORBIDDEN-DELETEALL / fault: OTHER-TAB, SHA-FAIL, FILE-SAVE-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 「画面を閉じない」旨を表示、beforeunloadだけに依存しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, omitted-ranges, ui

## F3:R02-01 — UTF-8 valid / BOMなし canonical input。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:92
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: UTF-8 valid / BOMなし canonical input。
- 期待: UTF-8 valid / BOMなし canonical input。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: UTF-8 valid / BOMなし canonical input。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-02 — UTF-8 BOM付き拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:93
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: UTF-8 BOM付き拒否。
- 期待: UTF-8 BOM付き拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: UTF-8 BOM付き拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-03 — invalid UTF-8 byte sequenceをfatal reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:94
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: invalid UTF-8 byte sequenceをfatal reject。
- 期待: invalid UTF-8 byte sequenceをfatal reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid UTF-8 byte sequenceをfatal reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-04 — root duplicate same key same value。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:95
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: root duplicate same key same value。 原文補足: - 期待：lexical reject。
- 期待: lexical reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: lexical reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-05 — root duplicate same key different value。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:97
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: root duplicate same key different value。 原文補足: - 期待：lexical reject。
- 期待: lexical reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: lexical reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-06 — nested answers duplicate key。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:99
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: nested answers duplicate key。 原文補足: - 期待：lexical reject。
- 期待: lexical reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: lexical reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-07 — "kind" と escaped equivalent key。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:101
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: "kind" と escaped equivalent key。 原文補足: - 期待：decoded-name duplicate reject。
- 期待: decoded-name duplicate reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: decoded-name duplicate reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-08 — root key並替。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:103
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: root key並替。 原文補足: - 期待：canonical raw mismatch reject。
- 期待: canonical raw mismatch reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical raw mismatch reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-09 — 余分な空白/newline。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:105
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: 余分な空白/newline。 原文補足: - 期待：canonical raw mismatch reject。
- 期待: canonical raw mismatch reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical raw mismatch reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-10 — unnecessary unicode escape / slash escape。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:107
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: unnecessary unicode escape / slash escape。 原文補足: - 期待：canonical raw mismatch reject。
- 期待: canonical raw mismatch reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical raw mismatch reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-11 — unknown root key。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:109
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: unknown root key。
- 期待: unknown root key。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown root key。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-12 — unknown nested snapshot key。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:110
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: unknown nested snapshot key。
- 期待: unknown nested snapshot key。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown nested snapshot key。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-13 — unexpected answers nested object。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:111
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: unexpected answers nested object。 原文補足: - 期待：strict reject。
- 期待: strict reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: strict reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-14 — fileFormatVersion 1e0拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:116
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: fileFormatVersion 1e0拒否。
- 期待: fileFormatVersion 1e0拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: fileFormatVersion 1e0拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-15 — revision -0拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:117
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: revision -0拒否。
- 期待: revision -0拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: revision -0拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-16 — leading zero数値拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:118
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: leading zero数値拒否。
- 期待: leading zero数値拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: leading zero数値拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-17 — decimal 1.0拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:119
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: decimal 1.0拒否。
- 期待: decimal 1.0拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: decimal 1.0拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-18 — Number.MAX_SAFE_INTEGER超過拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:120
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: Number.MAX_SAFE_INTEGER超過拒否。
- 期待: Number.MAX_SAFE_INTEGER超過拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: Number.MAX_SAFE_INTEGER超過拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-19 — escaped lone high surrogate拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:121
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: escaped lone high surrogate拒否。
- 期待: escaped lone high surrogate拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: escaped lone high surrogate拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-20 — escaped lone low surrogate拒否。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:122
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: escaped lone low surrogate拒否。
- 期待: escaped lone low surrogate拒否。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: escaped lone low surrogate拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-21 — F2 NFC必須fieldがnon-NFC。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:123
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: F2 NFC必須fieldがnon-NFC。 原文補足: - 期待：normalizeせずreject。
- 期待: normalizeせずreject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normalizeせずreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-22 — F2 control/bidi rejectをimportでも同一適用。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:125
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: F2 control/bidi rejectをimportでも同一適用。
- 期待: F2 control/bidi rejectをimportでも同一適用。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2 control/bidi rejectをimportでも同一適用。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-23 — DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:129
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。
- 期待: DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-24 — body 1 byte変更/checksum据置。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:130
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: body 1 byte変更/checksum据置。 原文補足: - 期待：checksum reject。
- 期待: checksum reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: checksum reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-25 — body+checksumを攻撃者が再生成したがschema unknown fieldあり。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:132
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: body+checksumを攻撃者が再生成したがschema unknown fieldあり。 原文補足: - 期待：checksum一致でもsemantic reject。
- 期待: checksum一致でもsemantic reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: checksum一致でもsemantic reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-26 — checksum algorithm未知。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:134
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: checksum algorithm未知。 原文補足: - 期待：reject。
- 期待: reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-27 — checksum hex uppercase/長さ63/65/非hex。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:136
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: checksum hex uppercase/長さ63/65/非hex。 原文補足: - 期待：reject。
- 期待: reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-28 — SHA API failure。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:138
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: SHA API failure。 原文補足: - 期待：export/import成功扱いしない。
- 期待: export/import成功扱いしない。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: export/import成功扱いしない。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-29 — checksum検証前後でparsed objectを書換えない。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:140
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: checksum検証前後でparsed objectを書換えない。
- 期待: checksum検証前後でparsed objectを書換えない。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: checksum検証前後でparsed objectを書換えない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-30 — full canonical rawとdigest canonical payloadがschema-defined orderを共有。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:141
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: full canonical rawとdigest canonical payloadがschema-defined orderを共有。
- 期待: full canonical rawとdigest canonical payloadがschema-defined orderを共有。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: full canonical rawとdigest canonical payloadがschema-defined orderを共有。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-31 — ACTIVE registryからV-VALID-01を生成しpreview accept。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:145
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: ACTIVE registryからV-VALID-01を生成しpreview accept。
- 期待: ACTIVE registryからV-VALID-01を生成しpreview accept。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ACTIVE registryからV-VALID-01を生成しpreview accept。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-32 — V-DUP-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:146
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-DUP-01 reject。
- 期待: V-DUP-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-DUP-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-33 — V-DUP-02 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:147
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-DUP-02 reject。
- 期待: V-DUP-02 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-DUP-02 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-34 — V-ORDER-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:148
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-ORDER-01 reject。
- 期待: V-ORDER-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-ORDER-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-35 — V-NUM-01 / V-NUM-02 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:149
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-NUM-01 / V-NUM-02 reject。
- 期待: V-NUM-01 / V-NUM-02 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-NUM-01 / V-NUM-02 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-36 — V-UNK-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:150
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-UNK-01 reject。
- 期待: V-UNK-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-UNK-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-37 — V-UTF-01 / V-BOM-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:151
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-UTF-01 / V-BOM-01 reject。
- 期待: V-UTF-01 / V-BOM-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-UTF-01 / V-BOM-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-38 — V-HASH-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:152
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-HASH-01 reject。
- 期待: V-HASH-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-HASH-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-39 — V-HASH-02 checksum一致でもreject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:153
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-HASH-02 checksum一致でもreject。
- 期待: V-HASH-02 checksum一致でもreject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-HASH-02 checksum一致でもreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R02-40 — V-TRUNC-01 reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:154
- 実施: raw byte段階で指定vectorを投入。lexical/canonical/checksum/semanticを別記録し、他のgateによる先行拒否を指定gateの実証と混同しない。署名を再生成するcaseと据置caseを分離。 このケース固有の入力・操作・順序: V-TRUNC-01 reject。
- 期待: V-TRUNC-01 reject。
- fixture: V-VALID-01, V-DUP-01, V-DUP-02, V-ORDER-01, V-NUM-01, V-NUM-02, V-UNK-01, V-UTF-01, V-BOM-01, V-HASH-01, V-HASH-02, V-TRUNC-01, V-ESC-01, DIGEST-01 / fault: SHA-FAIL, READ-FAIL
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: V-TRUNC-01 reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore

## F3:R03-01 — valid dataset→VALID。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:160
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: valid dataset→VALID。
- 期待: valid dataset→VALID。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: valid dataset→VALID。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-02 — metaなし・recordsなし→EMPTY。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:161
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: metaなし・recordsなし→EMPTY。
- 期待: metaなし・recordsなし→EMPTY。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: metaなし・recordsなし→EMPTY。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-03 — meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:162
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。
- 期待: meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-04 — raw read/比較不能→CORRUPT_UNCOMPARABLE。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:163
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: raw read/比較不能→CORRUPT_UNCOMPARABLE。 原文補足: - 期待：in-app restore blocked。
- 期待: in-app restore blocked。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: in-app restore blocked。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-05 — 一部record存在/metaなしをEMPTY扱いしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:165
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: 一部record存在/metaなしをEMPTY扱いしない。
- 期待: 一部record存在/metaなしをEMPTY扱いしない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 一部record存在/metaなしをEMPTY扱いしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-06 — CORRUPT_COMPARABLEで通常backup成功と誤表示しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:166
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: CORRUPT_COMPARABLEで通常backup成功と誤表示しない。
- 期待: CORRUPT_COMPARABLEで通常backup成功と誤表示しない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: CORRUPT_COMPARABLEで通常backup成功と誤表示しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-07 — corrupt復旧は二段階明示確認なしでcommitしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:167
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: corrupt復旧は二段階明示確認なしでcommitしない。
- 期待: corrupt復旧は二段階明示確認なしでcommitしない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: corrupt復旧は二段階明示確認なしでcommitしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-08 — preview後別tab normal edit→B1 guard mismatch、clear前abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:171
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: preview後別tab normal edit→B1 guard mismatch、clear前abort。
- 期待: preview後別tab normal edit→B1 guard mismatch、clear前abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: preview後別tab normal edit→B1 guard mismatch、clear前abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-09 — preview後delete-all→abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:172
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: preview後delete-all→abort。
- 期待: preview後delete-all→abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: preview後delete-all→abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-10 — preview後別restore→abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:173
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: preview後別restore→abort。
- 期待: preview後別restore→abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: preview後別restore→abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-11 — corrupt raw-state preview後raw content変化→同期bytes mismatchでabort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:174
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: corrupt raw-state preview後raw content変化→同期bytes mismatchでabort。
- 期待: corrupt raw-state preview後raw content変化→同期bytes mismatchでabort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: corrupt raw-state preview後raw content変化→同期bytes mismatchでabort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-12 — EMPTY preview後別tabがdataset作成→empty guard mismatch。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:175
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: EMPTY preview後別tabがdataset作成→empty guard mismatch。
- 期待: EMPTY preview後別tabがdataset作成→empty guard mismatch。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: EMPTY preview後別tabがdataset作成→empty guard mismatch。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-13 — guard mismatchで自動再確認→即commitしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:176
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: guard mismatchで自動再確認→即commitしない。
- 期待: guard mismatchで自動再確認→即commitしない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: guard mismatchで自動再確認→即commitしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-14 — new generation/meta込み9,999,999 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:180
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: new generation/meta込み9,999,999 bytes。
- 期待: new generation/meta込み9,999,999 bytes。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: new generation/meta込み9,999,999 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-15 — exactly10,000,000 bytes accept candidate。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:181
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: exactly10,000,000 bytes accept candidate。
- 期待: exactly10,000,000 bytes accept candidate。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: exactly10,000,000 bytes accept candidate。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-16 — 10,000,001 bytesをtransaction開始前にreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:182
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: 10,000,001 bytesをtransaction開始前にreject。
- 期待: 10,000,001 bytesをtransaction開始前にreject。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 10,000,001 bytesをtransaction開始前にreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-17 — preflightでFile decode / strict validation / SHA-256 / expectedCanonicalBytes生成が全部完了してからreadwrite transactionをopen。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:183
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: preflightでFile decode / strict validation / SHA-256 / expectedCanonicalBytes生成が全部完了してからreadwrite transactionをopen。
- 期待: preflightでFile decode / strict validation / SHA-256 / expectedCanonicalBytes生成が全部完了してからreadwrite transactionをopen。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: preflightでFile decode / strict validation / SHA-256 / expectedCanonicalBytes生成が全部完了してからreadwrite transactionをopen。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-18 — transaction開始後にcrypto.subtle.digest / File API / Blob.arrayBuffer / network / timerを呼ばない。

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:184
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: transaction開始後にcrypto.subtle.digest / File API / Blob.arrayBuffer / network / timerを呼ばない。
- 期待: transaction開始後にcrypto.subtle.digest / File API / Blob.arrayBuffer / network / timerを呼ばない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction開始後にcrypto.subtle.digest / File API / Blob.arrayBuffer / network / timerを呼ばない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-19 — transaction handlerがasync functionではなく、await / Promise.then / queueMicrotask / setTimeoutを使用しないことを静的検査。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:188
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: transaction handlerがasync functionではなく、await / Promise.then / queueMicrotask / setTimeoutを使用しないことを静的検査。
- 期待: transaction handlerがasync functionではなく、await / Promise.then / queueMicrotask / setTimeoutを使用しないことを静的検査。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction handlerがasync functionではなく、await / Promise.then / queueMicrotask / setTimeoutを使用しないことを静的検査。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-20 — trace順序がGUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:189
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: trace順序がGUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。
- 期待: trace順序がGUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: trace順序がGUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-21 — 各phase最後のsuccess callbackがreturn前に次phase requestをenqueueしている。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:190
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: 各phase最後のsuccess callbackがreturn前に次phase requestをenqueueしている。
- 期待: 各phase最後のsuccess callbackがreturn前に次phase requestをenqueueしている。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 各phase最後のsuccess callbackがreturn前に次phase requestをenqueueしている。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-22 — readbackVerified=falseのままtransaction.oncompleteが発火した場合、テストをFAILにするsentinel。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:191
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readbackVerified=falseのままtransaction.oncompleteが発火した場合、テストをFAILにするsentinel。
- 期待: readbackVerified=falseのままtransaction.oncompleteが発火した場合、テストをFAILにするsentinel。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readbackVerified=falseのままtransaction.oncompleteが発火した場合、テストをFAILにするsentinel。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-23 — fault injectionで次phase request enqueue時にTransactionInactiveError相当を発生。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:192
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: fault injectionで次phase request enqueue時にTransactionInactiveError相当を発生。 原文補足: - 期待：restore成功表示なし。clear前なら旧正本完全維持。
- 期待: restore成功表示なし。clear前なら旧正本完全維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore成功表示なし。clear前なら旧正本完全維持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-24 — clear request途中abort→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:194
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: clear request途中abort→旧正本全件維持。
- 期待: clear request途中abort→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: clear request途中abort→旧正本全件維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-25 — clear完了後put途中abort→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:195
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: clear完了後put途中abort→旧正本全件維持。
- 期待: clear完了後put途中abort→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: clear完了後put途中abort→旧正本全件維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-26 — category put途中failure→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:196
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: category put途中failure→旧正本全件維持。
- 期待: category put途中failure→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category put途中failure→旧正本全件維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-27 — service put途中failure→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:197
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: service put途中failure→旧正本全件維持。
- 期待: service put途中failure→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service put途中failure→旧正本全件維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-28 — final meta write failure→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:198
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: final meta write failure→旧正本全件維持。
- 期待: final meta write failure→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: final meta write failure→旧正本全件維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-29 — quota exception→旧正本全件維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:199
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: quota exception→旧正本全件維持。
- 期待: quota exception→旧正本全件維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: quota exception→旧正本全件維持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-30 — request単体success / clear success / put success / meta successでは成功表示しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:200
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: request単体success / clear success / put success / meta successでは成功表示しない。
- 期待: request単体success / clear success / put success / meta successでは成功表示しない。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: request単体success / clear success / put success / meta successでは成功表示しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-31 — readbackからF2 canonical projectionを同期再構築。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:204
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readbackからF2 canonical projectionを同期再構築。
- 期待: readbackからF2 canonical projectionを同期再構築。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readbackからF2 canonical projectionを同期再構築。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-32 — TextEncoderでreadbackCanonicalBytesを同期生成。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:205
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: TextEncoderでreadbackCanonicalBytesを同期生成。
- 期待: TextEncoderでreadbackCanonicalBytesを同期生成。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: TextEncoderでreadbackCanonicalBytesを同期生成。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-33 — readback byteLength == expectedByteLengthかつ全byte一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:206
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback byteLength == expectedByteLengthかつ全byte一致。
- 期待: readback byteLength == expectedByteLengthかつ全byte一致。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback byteLength == expectedByteLengthかつ全byte一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-34 — readback byte 1つだけ差し替えるfault injection→callback内abort、旧正本維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:207
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback byte 1つだけ差し替えるfault injection→callback内abort、旧正本維持。
- 期待: readback byte 1つだけ差し替えるfault injection→callback内abort、旧正本維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback byte 1つだけ差し替えるfault injection→callback内abort、旧正本維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-35 — readback canonical sizeを10,000,001へするfault injection→abort、旧正本維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:208
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback canonical sizeを10,000,001へするfault injection→abort、旧正本維持。
- 期待: readback canonical sizeを10,000,001へするfault injection→abort、旧正本維持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback canonical sizeを10,000,001へするfault injection→abort、旧正本維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-36 — readback generationId mismatch→abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:209
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback generationId mismatch→abort。
- 期待: readback generationId mismatch→abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback generationId mismatch→abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-37 — readback globalRevision !=1→abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:210
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback globalRevision !=1→abort。
- 期待: readback globalRevision !=1→abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback globalRevision !=1→abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-38 — readback record count / recordRevision mismatch→abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:211
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: readback record count / recordRevision mismatch→abort。
- 期待: readback record count / recordRevision mismatch→abort。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: readback record count / recordRevision mismatch→abort。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-39 — transaction内でdigest比較を行わずbytes一致を正否根拠にする。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:212
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: transaction内でdigest比較を行わずbytes一致を正否根拠にする。
- 期待: transaction内でdigest比較を行わずbytes一致を正否根拠にする。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction内でdigest比較を行わずbytes一致を正否根拠にする。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-40 — 全readback一致→readbackVerified=true→その後の正常auto-commit→oncompleteで初めて成功。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:213
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: 全readback一致→readbackVerified=true→その後の正常auto-commit→oncompleteで初めて成功。
- 期待: 全readback一致→readbackVerified=true→その後の正常auto-commit→oncompleteで初めて成功。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 全readback一致→readbackVerified=true→その後の正常auto-commit→oncompleteで初めて成功。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-41 — restore successでnew generationId。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:217
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: restore successでnew generationId。
- 期待: restore successでnew generationId。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore successでnew generationId。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-42 — new generation globalRevision=1。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:218
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: new generation globalRevision=1。
- 期待: new generation globalRevision=1。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: new generation globalRevision=1。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-43 — imported record revisionsを保持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:219
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: imported record revisionsを保持。
- 期待: imported record revisionsを保持。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: imported record revisionsを保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-44 — restore後旧tab save→generation mismatch拒否。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:220
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: restore後旧tab save→generation mismatch拒否。
- 期待: restore後旧tab save→generation mismatch拒否。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore後旧tab save→generation mismatch拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-45 — BroadcastChannel通知を落としても旧tab save拒否。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:221
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: BroadcastChannel通知を落としても旧tab save拒否。
- 期待: BroadcastChannel通知を落としても旧tab save拒否。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: BroadcastChannel通知を落としても旧tab save拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-46 — recordId collisionはfile strict validation段階でreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:222
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: recordId collisionはfile strict validation段階でreject。
- 期待: recordId collisionはfile strict validation段階でreject。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: recordId collisionはfile strict validation段階でreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R03-47 — transaction readback bytesがpreflight prospective bytesと一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:223
- 実施: inspectCurrent→prepare→commitの各境界を独立観測。File/SHA終了・GUARD/CLEAR/PUT/READBACK/COMPLETE順・同步bytes・旧正本rollbackを全件比較。case指定phaseでだけfaultを発火。 このケース固有の入力・操作・順序: transaction readback bytesがpreflight prospective bytesと一致。
- 期待: transaction readback bytesがpreflight prospective bytesと一致。
- fixture: DS-MIX, V-VALID-01, FILE-DS-9999999, FILE-DS-10000000, FILE-DS-10000001 / fault: RAW-CORRUPT, TX-TRACE, TX-ABORT, READBACK-ALTER, OTHER-TAB, QUOTA
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: transaction readback bytesがpreflight prospective bytesと一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui

## F3:R04-01 — raw 15,999,999 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:229
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: raw 15,999,999 bytes。
- 期待: raw 15,999,999 bytes。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: raw 15,999,999 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: raw16MB/depth16のfixtureは低位gateだけを観測する。snapshot10MB/pending1MB等の別制限で有効最大ファイル/深さが制約される。padding/vector受理をfull import成功と偽らない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-02 — raw 16,000,000 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:230
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: raw 16,000,000 bytes。
- 期待: raw 16,000,000 bytes。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: raw 16,000,000 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: raw16MB/depth16のfixtureは低位gateだけを観測する。snapshot10MB/pending1MB等の別制限で有効最大ファイル/深さが制約される。padding/vector受理をfull import成功と偽らない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-03 — raw 16,000,001 bytesを内容read/parse前拒否。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:231
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: raw 16,000,001 bytesを内容read/parse前拒否。
- 期待: raw 16,000,001 bytesを内容read/parse前拒否。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: raw 16,000,001 bytesを内容read/parse前拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-04 — pending 999,999 / 1,000,000 / 1,000,001 bytes。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:232
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: pending 999,999 / 1,000,000 / 1,000,001 bytes。
- 期待: pending 999,999 / 1,000,000 / 1,000,001 bytes。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending 999,999 / 1,000,000 / 1,000,001 bytes。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-05 — pending 255 / 256 / 257 operations。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:233
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: pending 255 / 256 / 257 operations。
- 期待: pending 255 / 256 / 257 operations。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending 255 / 256 / 257 operations。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-06 — depth16 / depth17。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:234
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: depth16 / depth17。
- 期待: depth16 / depth17。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: depth16 / depth17。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: raw16MB/depth16のfixtureは低位gateだけを観測する。snapshot10MB/pending1MB等の別制限で有効最大ファイル/深さが制約される。padding/vector受理をfull import成功と偽らない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-07 — huge single stringをfield-specific scannerでparse前拒否。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:235
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: huge single stringをfield-specific scannerでparse前拒否。
- 期待: huge single stringをfield-specific scannerでparse前拒否。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: huge single stringをfield-specific scannerでparse前拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-08 — huge key countをschema path count超過でparse前拒否。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:236
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: huge key countをschema path count超過でparse前拒否。
- 期待: huge key countをschema path count超過でparse前拒否。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: huge key countをschema path count超過でparse前拒否。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-09 — categories array >12をreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:237
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: categories array >12をreject。
- 期待: categories array >12をreject。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categories array >12をreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-10 — ACTIVE registry理論最大service count超過をparse前reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:238
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: ACTIVE registry理論最大service count超過をparse前reject。
- 期待: ACTIVE registry理論最大service count超過をparse前reject。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ACTIVE registry理論最大service count超過をparse前reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-11 — 1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:242
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: 1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。
- 期待: 1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-12 — 1MB/256件が過剰なscenarioでvalidation時間を計測。

- 実施区分: BROWSER_MEASUREMENT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:243
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: 1MB/256件が過剰なscenarioでvalidation時間を計測。
- 期待: 1MB/256件が過剰なscenarioでvalidation時間を計測。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 1MB/256件が過剰なscenarioでvalidation時間を計測。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-13 — raw16MBでduplicate scannerが別巨大ASTを作らない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:244
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: raw16MBでduplicate scannerが別巨大ASTを作らない。
- 期待: raw16MBでduplicate scannerが別巨大ASTを作らない。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: raw16MBでduplicate scannerが別巨大ASTを作らない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: raw16MB/depth16のfixtureは低位gateだけを観測する。snapshot10MB/pending1MB等の別制限で有効最大ファイル/深さが制約される。padding/vector受理をfull import成功と偽らない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-14 — parse failure後も既存IDB不変。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:245
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: parse failure後も既存IDB不変。
- 期待: parse failure後も既存IDB不変。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parse failure後も既存IDB不変。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R04-15 — resource errorをapp 10MB超と誤分類しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:246
- 実施: raw/pending/projection/count/depth各層を独立計測。超過前のread/parse呼出数、低位gate通過後のstrict reject、未収録表示、旧DB不変を分けて記録。size helperだけの成功をvalid full file受理とみなさない。 このケース固有の入力・操作・順序: resource errorをapp 10MB超と誤分類しない。
- 期待: resource errorをapp 10MB超と誤分類しない。
- fixture: RAW-BYTES-15999999, RAW-BYTES-16000000, RAW-BYTES-16000001, EM-PENDING-BYTES-999999, EM-PENDING-BYTES-1000000, EM-PENDING-BYTES-1000001, EM-COUNT-255, EM-COUNT-256, EM-COUNT-257, SCAN-DEPTH16, SCAN-DEPTH17 / fault: READ-FAIL, RESOURCE-ERROR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: resource errorをapp 10MB超と誤分類しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, restore

## F3:R05-01 — emergency snapshot restore後pendingはIDB正本に入らない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:252
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: emergency snapshot restore後pendingはIDB正本に入らない。
- 期待: emergency snapshot restore後pendingはIDB正本に入らない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: emergency snapshot restore後pendingはIDB正本に入らない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-02 — restore transaction complete後だけReapplyContextをmemory生成。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:253
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: restore transaction complete後だけReapplyContextをmemory生成。
- 期待: restore transaction complete後だけReapplyContextをmemory生成。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore transaction complete後だけReapplyContextをmemory生成。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-03 — restore abort時はReapplyContextを生成しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:254
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: restore abort時はReapplyContextを生成しない。
- 期待: restore abort時はReapplyContextを生成しない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore abort時はReapplyContextを生成しない。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-04 — sourceFileIdがfileFormatVersion + validated checksum.hexから一意に導出される。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:255
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: sourceFileIdがfileFormatVersion + validated checksum.hexから一意に導出される。
- 期待: sourceFileIdがfileFormatVersion + validated checksum.hexから一意に導出される。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: sourceFileIdがfileFormatVersion + validated checksum.hexから一意に導出される。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-05 — ReapplyContextにsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / receiptMapを保持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:256
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: ReapplyContextにsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / receiptMapを保持。
- 期待: ReapplyContextにsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / receiptMapを保持。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ReapplyContextにsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / receiptMapを保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-06 — current generationがrestoredGenerationIdと異なる場合context invalid。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:257
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: current generationがrestoredGenerationIdと異なる場合context invalid。
- 期待: current generationがrestoredGenerationIdと異なる場合context invalid。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: current generationがrestoredGenerationIdと異なる場合context invalid。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-07 — 別tab editでglobalRevisionがlastKnownから変わった場合context invalid。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:258
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 別tab editでglobalRevisionがlastKnownから変わった場合context invalid。
- 期待: 別tab editでglobalRevisionがlastKnownから変わった場合context invalid。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 別tab editでglobalRevisionがlastKnownから変わった場合context invalid。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-08 — APPLIED receiptなしでcurrent==intended-after。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:262
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: APPLIED receiptなしでcurrent==intended-after。 原文補足: - 期待：AMBIGUOUS_SAME_VALUE。already-appliedにせず自動skip/auto applyなし。
- 期待: AMBIGUOUS_SAME_VALUE。already-appliedにせず自動skip/auto applyなし。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: AMBIGUOUS_SAME_VALUE。already-appliedにせず自動skip/auto applyなし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-09 — content fingerprint一致だがgenerationが異なる。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:264
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: content fingerprint一致だがgenerationが異なる。 原文補足: - 期待：同じrestoreと扱わない。
- 期待: 同じrestoreと扱わない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同じrestoreと扱わない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-10 — 異なるsource snapshot generationで内容だけ同一。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:266
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 異なるsource snapshot generationで内容だけ同一。 原文補足: - 期待：sourceFileId/provenance不一致、pending-only自動判定なし。
- 期待: sourceFileId/provenance不一致、pending-only自動判定なし。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: sourceFileId/provenance不一致、pending-only自動判定なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-11 — operation current==expected-before、ACTIVE context一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:268
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: operation current==expected-before、ACTIVE context一致。 原文補足: - 期待：利用者確認後のみF2 save gateで適用可能。
- 期待: 利用者確認後のみF2 save gateで適用可能。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 利用者確認後のみF2 save gateで適用可能。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-12 — operation transaction complete後にだけAPPLIED receiptを作成。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:270
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: operation transaction complete後にだけAPPLIED receiptを作成。
- 期待: operation transaction complete後にだけAPPLIED receiptを作成。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: operation transaction complete後にだけAPPLIED receiptを作成。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-13 — receipt sourceFileId + restoredGenerationId + operationId + current globalRevisionが一致。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:271
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: receipt sourceFileId + restoredGenerationId + operationId + current globalRevisionが一致。 原文補足: - 期待：safe already-appliedとして再commitしない。
- 期待: safe already-appliedとして再commitしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: safe already-appliedとして再commitしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-14 — receiptはあるがglobalRevisionが外部変更で進んだ。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:273
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: receiptはあるがglobalRevisionが外部変更で進んだ。 原文補足: - 期待：receiptだけでskipせずcontext invalid。
- 期待: receiptだけでskipせずcontext invalid。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: receiptだけでskipせずcontext invalid。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-15 — same recordId / same valueだけではalready-appliedにしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:275
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: same recordId / same valueだけではalready-appliedにしない。
- 期待: same recordId / same valueだけではalready-appliedにしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: same recordId / same valueだけではalready-appliedにしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-16 — expected-before==intended-afterのpending opをinvalid/no-opとして受け入れない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:276
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: expected-before==intended-afterのpending opをinvalid/no-opとして受け入れない。
- 期待: expected-before==intended-afterのpending opをinvalid/no-opとして受け入れない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: expected-before==intended-afterのpending opをinvalid/no-opとして受け入れない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-17 — operation tapでIN_FLIGHT、同operationの二重tapをreject/ignore。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:280
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: operation tapでIN_FLIGHT、同operationの二重tapをreject/ignore。
- 期待: operation tapでIN_FLIGHT、同operationの二重tapをreject/ignore。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: operation tapでIN_FLIGHT、同operationの二重tapをreject/ignore。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-18 — abortしたoperationへAPPLIED receiptを作らない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:281
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: abortしたoperationへAPPLIED receiptを作らない。
- 期待: abortしたoperationへAPPLIED receiptを作らない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: abortしたoperationへAPPLIED receiptを作らない。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-19 — 同一tab ACTIVE context中に同じemergency fileを二回import。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:282
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 同一tab ACTIVE context中に同じemergency fileを二回import。 原文補足: - 期待：receiptありoperationだけsafe skip、未receiptは再検証。
- 期待: receiptありoperationだけsafe skip、未receiptは再検証。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: receiptありoperationだけsafe skip、未receiptは再検証。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-20 — 別tabで同じfileをimport。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:284
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 別tabで同じfileをimport。 原文補足: - 期待：tab-local receiptなし。already-applied推測禁止。
- 期待: tab-local receiptなし。already-applied推測禁止。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: tab-local receiptなし。already-applied推測禁止。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-21 — 同じ内容へ利用者が別操作で先に変更。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:286
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 同じ内容へ利用者が別操作で先に変更。 原文補足: - 期待：intended-after一致だけではskipしない。
- 期待: intended-after一致だけではskipしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: intended-after一致だけではskipしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-22 — dependency chain op1 complete/op2 abort。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:291
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: dependency chain op1 complete/op2 abort。 原文補足: - 期待：同一sessionではop1 receiptあり、op2以降remaining。
- 期待: 同一sessionではop1 receiptあり、op2以降remaining。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同一sessionではop1 receiptあり、op2以降remaining。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-23 — same session retryでop1を二重commitしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:293
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: same session retryでop1を二重commitしない。
- 期待: same session retryでop1を二重commitしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: same session retryでop1を二重commitしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-24 — op1後に別tab edit→globalRevision差でcontext invalid、op2自動適用なし。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:294
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: op1後に別tab edit→globalRevision差でcontext invalid、op2自動適用なし。
- 期待: op1後に別tab edit→globalRevision差でcontext invalid、op2自動適用なし。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: op1後に別tab edit→globalRevision差でcontext invalid、op2自動適用なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-25 — 10MB超で途中停止。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:295
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: 10MB超で途中停止。
- 期待: 10MB超で途中停止。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 10MB超で途中停止。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-26 — parent R001 conflictで通常save gate停止。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:296
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: parent R001 conflictで通常save gate停止。
- 期待: parent R001 conflictで通常save gate停止。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent R001 conflictで通常save gate停止。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-27 — deleted targetを別recordへmappingしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:297
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: deleted targetを別recordへmappingしない。
- 期待: deleted targetを別recordへmappingしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: deleted targetを別recordへmappingしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-28 — completion opでR08 invariant再検証。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:298
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: completion opでR08 invariant再検証。
- 期待: completion opでR08 invariant再検証。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: completion opでR08 invariant再検証。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-29 — R09 fallbackは保存せず再計算。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:299
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: R09 fallbackは保存せず再計算。
- 期待: R09 fallbackは保存せず再計算。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R09 fallbackは保存せず再計算。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-30 — snapshot restore直後reloadでmemory ReapplyContext消失。

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:303
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: snapshot restore直後reloadでmemory ReapplyContext消失。 原文補足: - 期待：同じfile再選択でも自動skip/auto applyしない。
- 期待: 同じfile再選択でも自動skip/auto applyしない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 同じfile再選択でも自動skip/auto applyしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-31 — partial apply後reload。

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:305
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: partial apply後reload。 原文補足: - 期待：current valueから適用済みprefixを推測しない。
- 期待: current valueから適用済みprefixを推測しない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: current valueから適用済みprefixを推測しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-32 — browser完全終了→再起動→同file再import。

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:307
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: browser完全終了→再起動→同file再import。 原文補足: - 期待：persistent receiptがないためUNPROVEN、利用者再確認。
- 期待: persistent receiptがないためUNPROVEN、利用者再確認。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: persistent receiptがないためUNPROVEN、利用者再確認。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-33 — restart後current==intended-after。

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:309
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: restart後current==intended-after。 原文補足: - 期待：AMBIGUOUS_SAME_VALUE、already-applied扱い禁止。
- 期待: AMBIGUOUS_SAME_VALUE、already-applied扱い禁止。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: AMBIGUOUS_SAME_VALUE、already-applied扱い禁止。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-34 — restart後current==expected-before。

- 実施区分: AUTO_NODE_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:311
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: restart後current==expected-before。 原文補足: - 期待：自動適用せず利用者確認後のみ適用。
- 期待: 自動適用せず利用者確認後のみ適用。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 自動適用せず利用者確認後のみ適用。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-35 — file紛失時、pending復旧可能と誤保証しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:313
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: file紛失時、pending復旧可能と誤保証しない。
- 期待: file紛失時、pending復旧可能と誤保証しない。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: file紛失時、pending復旧可能と誤保証しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-36 — F2正本にsourceFileId / operationId receipt ledgerを保存していないこと。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:317
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: F2正本にsourceFileId / operationId receipt ledgerを保存していないこと。
- 期待: F2正本にsourceFileId / operationId receipt ledgerを保存していないこと。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2正本にsourceFileId / operationId receipt ledgerを保存していないこと。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-37 — current v0.3はrestart跨ぎautomatic exactly-once resumeを保証しないとUI/設計へ明記。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:318
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: current v0.3はrestart跨ぎautomatic exactly-once resumeを保証しないとUI/設計へ明記。
- 期待: current v0.3はrestart跨ぎautomatic exactly-once resumeを保証しないとUI/設計へ明記。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: current v0.3はrestart跨ぎautomatic exactly-once resumeを保証しないとUI/設計へ明記。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R05-38 — persistent exact-onceを要求する将来案はF2変更として別承認が必要と記録。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:319
- 実施: restore complete後の同一sessionで明示ack→operation1件だけapply。receipt/source/generation/global/order/expected-before/no-opを照合。abort・二重tap・他file・別tab・proof消失をcaseの時点で挿入しsave/receipt数を数える。 このケース固有の入力・操作・順序: persistent exact-onceを要求する将来案はF2変更として別承認が必要と記録。
- 期待: persistent exact-onceを要求する将来案はF2変更として別承認が必要と記録。
- fixture: EM-FULL, EM-PARTIAL, DS-MIX, DS-CONDITIONAL, DS-BYTES-10000000 / fault: TX-ABORT, OTHER-TAB, REQUEST-HOLD, SAME-VALUE, PROVENANCE-LOSS
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / all-store before/after raw and canonical byte SHA256; record/global/generation diff; commit/abort count; pending/receipt count / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: persistent exact-onceを要求する将来案はF2変更として別承認が必要と記録。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: restore, restore-ui, ui

## F3:R06-01 — export前に「暗号化されていない」を表示。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:323
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: export前に「暗号化されていない」を表示。
- 期待: export前に「暗号化されていない」を表示。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: export前に「暗号化されていない」を表示。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-02 — service名/利用状況/本人意向が読める可能性を説明。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:324
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: service名/利用状況/本人意向が読める可能性を説明。
- 期待: service名/利用状況/本人意向が読める可能性を説明。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: service名/利用状況/本人意向が読める可能性を説明。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-03 — 共有PC/共有folderの閲覧リスクを説明。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:325
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: 共有PC/共有folderの閲覧リスクを説明。
- 期待: 共有PC/共有folderの閲覧リスクを説明。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 共有PC/共有folderの閲覧リスクを説明。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-04 — iCloud Drive等OS設定による同期可能性を説明。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:326
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: iCloud Drive等OS設定による同期可能性を説明。
- 期待: iCloud Drive等OS設定による同期可能性を説明。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: iCloud Drive等OS設定による同期可能性を説明。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-05 — ヤットコがfileを自動uploadしないと説明。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:327
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: ヤットコがfileを自動uploadしないと説明。
- 期待: ヤットコがfileを自動uploadしないと説明。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ヤットコがfileを自動uploadしないと説明。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-06 — SHA-256が暗号化/作成者証明でないと説明。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:328
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: SHA-256が暗号化/作成者証明でないと説明。
- 期待: SHA-256が暗号化/作成者証明でないと説明。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: SHA-256が暗号化/作成者証明でないと説明。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-07 — 暗号化機能を勝手に追加していない。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:329
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: 暗号化機能を勝手に追加していない。
- 期待: 暗号化機能を勝手に追加していない。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: 暗号化機能を勝手に追加していない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-08 — filenameにサービス名・回答値なし。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:330
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: filenameにサービス名・回答値なし。
- 期待: filenameにサービス名・回答値なし。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: filenameにサービス名・回答値なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-09 — analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:331
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。
- 期待: analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R06-10 — console logにも本文を出さない。

- 実施区分: AUTO_FAULT_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:332
- 実施: バックアップ前の平文/共有/同期/SHA説明、filename、無暗号化・無upload・無loggingを原文/DOM/source/sinkで照合。ファイル物理保存の保証とは分ける。 このケース固有の入力・操作・順序: console logにも本文を出さない。
- 期待: console logにも本文を出さない。
- fixture: DS-MIX, EM-FULL / fault: SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: console logにも本文を出さない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: integration-boundaries, file-save-ui

## F3:R07-01 — categoryKey 12種がF2承認値とexact match。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:336
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: categoryKey 12種がF2承認値とexact match。
- 期待: categoryKey 12種がF2承認値とexact match。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categoryKey 12種がF2承認値とexact match。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-02 — categories canonical orderがF2と一致。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:337
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: categories canonical orderがF2と一致。
- 期待: categories canonical orderがF2と一致。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categories canonical orderがF2と一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-03 — R07初回intention ruleをimport/restore後も維持。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:338
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: R07初回intention ruleをimport/restore後も維持。
- 期待: R07初回intention ruleをimport/restore後も維持。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R07初回intention ruleをimport/restore後も維持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-04 — R08 completed invariantをimport/restoreで維持。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:339
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: R08 completed invariantをimport/restoreで維持。
- 期待: R08 completed invariantをimport/restoreで維持。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R08 completed invariantをimport/restoreで維持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-05 — R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:340
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。
- 期待: R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-06 — inactive conditional fieldをreject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:341
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: inactive conditional fieldをreject。
- 期待: inactive conditional fieldをreject。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: inactive conditional fieldをreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-07 — active conditional unansweredを保持。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:342
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: active conditional unansweredを保持。
- 期待: active conditional unansweredを保持。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active conditional unansweredを保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-08 — normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:343
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。
- 期待: normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-09 — ACTIVE registryなしではproduction export/importを有効化しない。

- 実施区分: AUTO_FAULT_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:344
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: ACTIVE registryなしではproduction export/importを有効化しない。
- 期待: ACTIVE registryなしではproduction export/importを有効化しない。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ACTIVE registryなしではproduction export/importを有効化しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 対象はACTIVE固定。未ACTIVEは外部module mockの反実仮想として区別し、runtime UIが無効化される実証とAPI拒否を混同しない。実パッケージの未ACTIVE配備判定不能ならNOT VERIFIABLE。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-10 — unknown schemaVersion reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:345
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: unknown schemaVersion reject。
- 期待: unknown schemaVersion reject。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown schemaVersion reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-11 — unknown questionSchemaVersion reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:346
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: unknown questionSchemaVersion reject。
- 期待: unknown questionSchemaVersion reject。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown questionSchemaVersion reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-12 — unregistered pair reject。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:347
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: unregistered pair reject。
- 期待: unregistered pair reject。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unregistered pair reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-13 — invalid recordId grammar reject（ACTIVE registry binding後）。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:348
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: invalid recordId grammar reject（ACTIVE registry binding後）。
- 期待: invalid recordId grammar reject（ACTIVE registry binding後）。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid recordId grammar reject（ACTIVE registry binding後）。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-14 — invalid generationId grammar reject（ACTIVE registry binding後）。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:349
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: invalid generationId grammar reject（ACTIVE registry binding後）。
- 期待: invalid generationId grammar reject（ACTIVE registry binding後）。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: invalid generationId grammar reject（ACTIVE registry binding後）。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:R07-15 — version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:350
- 実施: F2承認key/order/R07/R08/R09/conditional/projection、ACTIVE pair/UUIDをsnapshot/import/restoreで同一基準に照合。 このケース固有の入力・操作・順序: version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。
- 期待: version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。
- fixture: DS-MIX, DS-CONDITIONAL, V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries

## F3:N-01 — dataset未作成なら空backup成功表示なし。

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:354
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: dataset未作成なら空backup成功表示なし。
- 期待: dataset未作成なら空backup成功表示なし。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: dataset未作成なら空backup成功表示なし。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-02 — R001 unanswered/unknownを区別して保持。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:355
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: R001 unanswered/unknownを区別して保持。
- 期待: R001 unanswered/unknownを区別して保持。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 unanswered/unknownを区別して保持。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-03 — R002 partial/completed双方を含む。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:356
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: R002 partial/completed双方を含む。
- 期待: R002 partial/completed双方を含む。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 partial/completed双方を含む。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-04 — pending/UI history/mutationSeq/inheritedIntentionを含めない。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:357
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: pending/UI history/mutationSeq/inheritedIntentionを含めない。
- 期待: pending/UI history/mutationSeq/inheritedIntentionを含めない。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: pending/UI history/mutationSeq/inheritedIntentionを含めない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-05 — same readonly transactionのsnapshot。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:358
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: same readonly transactionのsnapshot。
- 期待: same readonly transactionのsnapshot。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: same readonly transactionのsnapshot。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-06 — exportでgeneration/revisions不変。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:359
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: exportでgeneration/revisions不変。
- 期待: exportでgeneration/revisions不変。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: exportでgeneration/revisions不変。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-07 — download開始と物理保存完了表示を区別。

- 実施区分: BROWSER_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:360
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: download開始と物理保存完了表示を区別。
- 期待: download開始と物理保存完了表示を区別。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: download開始と物理保存完了表示を区別。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-08 — normal backup時に未保存画面入力があれば「含まれない」表示。

- 実施区分: AUTO_DOM_AND_BROWSER
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:361
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: normal backup時に未保存画面入力があれば「含まれない」表示。
- 期待: normal backup時に未保存画面入力があれば「含まれない」表示。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal backup時に未保存画面入力があれば「含まれない」表示。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-09 — normal file kind=normal / pending=null。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:362
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: normal file kind=normal / pending=null。
- 期待: normal file kind=normal / pending=null。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal file kind=normal / pending=null。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:N-10 — external transmission zero。

- 実施区分: AUTO_NODE
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:363
- 実施: normal createBackupをempty/途中/完了/未保存画面ありで実施。snapshotだけ、pending=null、同一readonly、revision不変、対象外表示を照合。 このケース固有の入力・操作・順序: external transmission zero。
- 期待: external transmission zero。
- fixture: DS-BASE, DS-MIX, EM-FULL / fault: READ-FAIL, SINK-SPY
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: external transmission zero。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: backup, file-save-ui, ui

## F3:MAN-01 — JSON parseとmanifestFormatVersion=1。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:528
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: JSON parseとmanifestFormatVersion=1。
- 期待: JSON parseとmanifestFormatVersion=1。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: JSON parseとmanifestFormatVersion=1。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-02 — categoryKeysがcanonical 12種exact order。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:529
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: categoryKeysがcanonical 12種exact order。
- 期待: categoryKeysがcanonical 12種exact order。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categoryKeysがcanonical 12種exact order。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-03 — R001 category usageStatus enum exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:530
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R001 category usageStatus enum exact。
- 期待: R001 category usageStatus enum exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 category usageStatus enum exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-04 — R001 category intention enum exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:531
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R001 category intention enum exact。
- 期待: R001 category intention enum exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 category intention enum exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-05 — R001 overview 5 keyと各enum exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:532
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R001 overview 5 keyと各enum exact。
- 期待: R001 overview 5 keyと各enum exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 overview 5 keyと各enum exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-06 — R002 serviceCore recordState / usageStatus / intentionOverride exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:533
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002 serviceCore recordState / usageStatus / intentionOverride exact。
- 期待: R002 serviceCore recordState / usageStatus / intentionOverride exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 serviceCore recordState / usageStatus / intentionOverride exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-07 — R002 category=12、question total=33。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:534
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002 category=12、question total=33。
- 期待: R002 category=12、question total=33。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 category=12、question total=33。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-08 — R002全33 question keyと全canonical answer enum exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:535
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002全33 question keyと全canonical answer enum exact。
- 期待: R002全33 question keyと全canonical answer enum exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002全33 question keyと全canonical answer enum exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-09 — conditional question count=1。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:536
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: conditional question count=1。
- 期待: conditional question count=1。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: conditional question count=1。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-10 — conditional exact：subscription.billingSource active iff billing=="yes"。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:537
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: conditional exact：subscription.billingSource active iff billing=="yes"。
- 期待: conditional exact：subscription.billingSource active iff billing=="yes"。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: conditional exact：subscription.billingSource active iff billing=="yes"。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-11 — unconditional key required + unanswered explicit。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:541
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: unconditional key required + unanswered explicit。
- 期待: unconditional key required + unanswered explicit。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unconditional key required + unanswered explicit。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-12 — active conditional key required + unanswered explicit。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:542
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: active conditional key required + unanswered explicit。
- 期待: active conditional key required + unanswered explicit。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: active conditional key required + unanswered explicit。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-13 — inactive conditional key forbidden。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:543
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: inactive conditional key forbidden。
- 期待: inactive conditional key forbidden。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: inactive conditional key forbidden。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-14 — parent condition false transitionでchild prune、true transitionでunanswered materialize。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:544
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: parent condition false transitionでchild prune、true transitionでunanswered materialize。
- 期待: parent condition false transitionでchild prune、true transitionでunanswered materialize。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: parent condition false transitionでchild prune、true transitionでunanswered materialize。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-15 — positive usageStatus=using→parent category positive整合＋必要時R07。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:545
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: positive usageStatus=using→parent category positive整合＋必要時R07。
- 期待: positive usageStatus=using→parent category positive整合＋必要時R07。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: positive usageStatus=using→parent category positive整合＋必要時R07。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-16 — billing=yes→overview billing positive整合。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:546
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: billing=yes→overview billing positive整合。
- 期待: billing=yes→overview billing positive整合。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: billing=yes→overview billing positive整合。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-17 — finance.asset=yes→overview finance positive整合。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:547
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: finance.asset=yes→overview finance positive整合。
- 期待: finance.asset=yes→overview finance positive整合。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: finance.asset=yes→overview finance positive整合。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-18 — importantData=yes→overview data positive整合。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:548
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: importantData=yes→overview data positive整合。
- 期待: importantData=yes→overview data positive整合。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: importantData=yes→overview data positive整合。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-19 — familyKnow=no→overview family hidden整合。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:549
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: familyKnow=no→overview family hidden整合。
- 期待: familyKnow=no→overview family hidden整合。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: familyKnow=no→overview family hidden整合。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-20 — F2-R07 exact。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:550
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: F2-R07 exact。
- 期待: F2-R07 exact。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2-R07 exact。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-21 — F2-R08 completed+usageStatus=unanswered reject。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:551
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: F2-R08 completed+usageStatus=unanswered reject。
- 期待: F2-R08 completed+usageStatus=unanswered reject。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2-R08 completed+usageStatus=unanswered reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-22 — F2-R09 derived undecidedを保存せず再計算。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:552
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: F2-R09 derived undecidedを保存せず再計算。
- 期待: F2-R09 derived undecidedを保存せず再計算。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2-R09 derived undecidedを保存せず再計算。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-23 — `git hash-object workflow/specs/YTK-F4-canonical-question-manifest-v1.json` 相当でblob SHAを計算しexpected `4a9950b19813e74bc51de2246465096818d375ac` と一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:556
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: `git hash-object workflow/specs/YTK-F4-canonical-question-manifest-v1.json` 相当でblob SHAを計算しexpected `4a9950b19813e74bc51de2246465096818d375ac` と一致。
- 期待: `git hash-object workflow/specs/YTK-F4-canonical-question-manifest-v1.json` 相当でblob SHAを計算しexpected `4a9950b19813e74bc51de2246465096818d375ac` と一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: `git hash-object workflow/specs/YTK-F4-canonical-question-manifest-v1.json` 相当でblob SHAを計算しexpected `4a9950b19813e74bc51de2246465096818d375ac` と一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-24 — registry questionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:557
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: registry questionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact一致。
- 期待: registry questionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: registry questionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-25 — manifestのenumを1値変更しversion未更新→FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:558
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifestのenumを1値変更しversion未更新→FAIL。
- 期待: manifestのenumを1値変更しversion未更新→FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifestのenumを1値変更しversion未更新→FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-26 — manifestのquestion keyを1つ削除しversion未更新→FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:559
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifestのquestion keyを1つ削除しversion未更新→FAIL。
- 期待: manifestのquestion keyを1つ削除しversion未更新→FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifestのquestion keyを1つ削除しversion未更新→FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-27 — billingSource conditionをyes以外へ変更しversion未更新→FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:560
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: billingSource conditionをyes以外へ変更しversion未更新→FAIL。
- 期待: billingSource conditionをyes以外へ変更しversion未更新→FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: billingSource conditionをyes以外へ変更しversion未更新→FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-28 — manifest bytes不変でquestionSchemaVersionだけ変更→FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:561
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifest bytes不変でquestionSchemaVersionだけ変更→FAIL。
- 期待: manifest bytes不変でquestionSchemaVersionだけ変更→FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifest bytes不変でquestionSchemaVersionだけ変更→FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-29 — runtime/generated manifestからenumを1つ欠落→deep-equal FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:562
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: runtime/generated manifestからenumを1つ欠落→deep-equal FAIL。
- 期待: runtime/generated manifestからenumを1つ欠落→deep-equal FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: runtime/generated manifestからenumを1つ欠落→deep-equal FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-30 — runtime/generated manifestへunknown key追加→deep-equal FAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:563
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: runtime/generated manifestへunknown key追加→deep-equal FAIL。
- 期待: runtime/generated manifestへunknown key追加→deep-equal FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: runtime/generated manifestへunknown key追加→deep-equal FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-31 — validatorがhand-written duplicate tableを参照しmanifestと不一致→static/integration FAIL。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:564
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: validatorがhand-written duplicate tableを参照しmanifestと不一致→static/integration FAIL。
- 期待: validatorがhand-written duplicate tableを参照しmanifestと不一致→static/integration FAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: validatorがhand-written duplicate tableを参照しmanifestと不一致→static/integration FAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-32 — registry未ACTIVEまたはmanifest mismatchでproduction export/import/restore entrypoint disabled。

- 実施区分: AUTO_FAULT_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:565
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: registry未ACTIVEまたはmanifest mismatchでproduction export/import/restore entrypoint disabled。
- 期待: registry未ACTIVEまたはmanifest mismatchでproduction export/import/restore entrypoint disabled。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: registry未ACTIVEまたはmanifest mismatchでproduction export/import/restore entrypoint disabled。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 対象はACTIVE固定。未ACTIVEは外部module mockの反実仮想として区別し、runtime UIが無効化される実証とAPI拒否を混同しない。実パッケージの未ACTIVE配備判定不能ならNOT VERIFIABLE。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-33 — R001 approved/current source extractionとmanifestのUI回答enumが一致（canonical unansweredはF2 materialize規則として追加）。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:569
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R001 approved/current source extractionとmanifestのUI回答enumが一致（canonical unansweredはF2 materialize規則として追加）。
- 期待: R001 approved/current source extractionとmanifestのUI回答enumが一致（canonical unansweredはF2 materialize規則として追加）。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001 approved/current source extractionとmanifestのUI回答enumが一致（canonical unansweredはF2 materialize規則として追加）。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-34 — R002 approved/current R2Q extractionとmanifest key/回答enumが一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:570
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002 approved/current R2Q extractionとmanifest key/回答enumが一致。
- 期待: R002 approved/current R2Q extractionとmanifest key/回答enumが一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 approved/current R2Q extractionとmanifest key/回答enumが一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-35 — R002 show condition extractionとmanifest condition一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:571
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002 show condition extractionとmanifest condition一致。
- 期待: R002 show condition extractionとmanifest condition一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002 show condition extractionとmanifest condition一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-36 — F2承認設計のpresence/R07/R08/R09/positive-direction規範とmanifest validatorBindings一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:572
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: F2承認設計のpresence/R07/R08/R09/positive-direction規範とmanifest validatorBindings一致。
- 期待: F2承認設計のpresence/R07/R08/R09/positive-direction規範とmanifest validatorBindings一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2承認設計のpresence/R07/R08/R09/positive-direction規範とmanifest validatorBindings一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-37 — display label/CSSのみ変更fixtureではsemantic manifestを変更せずquestionSchemaVersion据置。

- 実施区分: AUTO_STATIC_AND_HUMAN
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:573
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: display label/CSSのみ変更fixtureではsemantic manifestを変更せずquestionSchemaVersion据置。
- 期待: display label/CSSのみ変更fixtureではsemantic manifestを変更せずquestionSchemaVersion据置。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: display label/CSSのみ変更fixtureではsemantic manifestを変更せずquestionSchemaVersion据置。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## F3:MAN-38 — canonical key/enum/condition変更fixtureではmanifest blob SHA変化によりversion update必須を検出。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md:574
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: canonical key/enum/condition変更fixtureではmanifest blob SHA変化によりversion update必須を検出。 原文補足: **MAN-01〜38はすべてNOT RUN。計画追加をPASS扱いしない。**
- 期待: canonical key/enum/condition変更fixtureではmanifest blob SHA変化によりversion update必須を検出。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: canonical key/enum/condition変更fixtureではmanifest blob SHA変化によりversion update必須を検出。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:REG-01 — fileFormatVersion exact 1のみaccept。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:337
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: fileFormatVersion exact 1のみaccept。
- 期待: fileFormatVersion exact 1のみaccept。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: fileFormatVersion exact 1のみaccept。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-02 — unknown/0/2/string "1" reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:338
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: unknown/0/2/string "1" reject。
- 期待: unknown/0/2/string "1" reject。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: unknown/0/2/string "1" reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-03 — schema/question exact accepted pairのみaccept。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:339
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: schema/question exact accepted pairのみaccept。
- 期待: schema/question exact accepted pairのみaccept。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: schema/question exact accepted pairのみaccept。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-04 — schemaだけcurrent、question unknownをreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:340
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: schemaだけcurrent、question unknownをreject。
- 期待: schemaだけcurrent、question unknownをreject。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: schemaだけcurrent、question unknownをreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-05 — questionだけcurrent、schema unknownをreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:341
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: questionだけcurrent、schema unknownをreject。
- 期待: questionだけcurrent、schema unknownをreject。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: questionだけcurrent、schema unknownをreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-06 — old/future versionをmigrationしない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:342
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: old/future versionをmigrationしない。
- 期待: old/future versionをmigrationしない。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: old/future versionをmigrationしない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:REG-07 — ACTIVE未設定でexport/import/restore entrypoint disabled。

- 実施区分: AUTO_FAULT_AND_HUMAN
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:343
- 実施: exact pair/file versionを許可、型違い/未知pairを署名済みfileへ導入。未ACTIVE条件は外部module mockでregistry exportだけを替え、入口のfail closedを観測。 このケース固有の入力・操作・順序: ACTIVE未設定でexport/import/restore entrypoint disabled。
- 期待: ACTIVE未設定でexport/import/restore entrypoint disabled。
- fixture: V-VALID-01 / fault: REGISTRY-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result / Chrome exact version/origin/profile + DOM text/screenshot + required manual observation; network metadata/console sink counts where relevant
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: ACTIVE未設定でexport/import/restore entrypoint disabled。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 対象はACTIVE固定。未ACTIVEは外部module mockの反実仮想として区別し、runtime UIが無効化される実証とAPI拒否を混同しない。実パッケージの未ACTIVE配備判定不能ならNOT VERIFIABLE。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, integration-boundaries

## REG:MAN-01 — normative manifest JSON parse/schema validation。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:344
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: normative manifest JSON parse/schema validation。
- 期待: normative manifest JSON parse/schema validation。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normative manifest JSON parse/schema validation。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-02 — manifest category=12 / R002 questions=33 / conditional=1をassert。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:345
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifest category=12 / R002 questions=33 / conditional=1をassert。
- 期待: manifest category=12 / R002 questions=33 / conditional=1をassert。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifest category=12 / R002 questions=33 / conditional=1をassert。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-03 — R001全key/enum exact一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:346
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R001全key/enum exact一致。
- 期待: R001全key/enum exact一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R001全key/enum exact一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-04 — R002全key/enum exact一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:347
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: R002全key/enum exact一致。
- 期待: R002全key/enum exact一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: R002全key/enum exact一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-05 — billingSource condition exact一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:348
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: billingSource condition exact一致。
- 期待: billingSource condition exact一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: billingSource condition exact一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-06 — F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:349
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。
- 期待: F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-07 — manifest Git blob SHAとquestionSchemaVersion suffix exact一致。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:350
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifest Git blob SHAとquestionSchemaVersion suffix exact一致。
- 期待: manifest Git blob SHAとquestionSchemaVersion suffix exact一致。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifest Git blob SHAとquestionSchemaVersion suffix exact一致。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-08 — manifest 1byte変更＋version未更新をFAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:351
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: manifest 1byte変更＋version未更新をFAIL。
- 期待: manifest 1byte変更＋version未更新をFAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: manifest 1byte変更＋version未更新をFAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-09 — versionだけ変更＋manifest不一致をFAIL。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:352
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: versionだけ変更＋manifest不一致をFAIL。
- 期待: versionだけ変更＋manifest不一致をFAIL。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: versionだけ変更＋manifest不一致をFAIL。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:MAN-10 — runtime/generated manifestとnormative JSONのdeep-equal。

- 実施区分: AUTO_STATIC
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:353
- 実施: 正本JSONと生成definitionsと承認R001/R002から抽出したkey/enum/conditionを比較。negative driftは外部harnessからreadFileSync返却値だけを差替え、固定sourceを変更せずbuild failureを観測。 このケース固有の入力・操作・順序: runtime/generated manifestとnormative JSONのdeep-equal。
- 期待: runtime/generated manifestとnormative JSONのdeep-equal。
- fixture: DS-BASE / fault: SOURCE-INPUT-FAULT
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: runtime/generated manifestとnormative JSONのdeep-equal。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, integration-boundaries; generate.mjs --check

## REG:RID-01 — overview exact `ovw_main`。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:354
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: overview exact `ovw_main`。
- 期待: overview exact `ovw_main`。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: overview exact `ovw_main`。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-02 — category 12 exact IDs。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:355
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: category 12 exact IDs。
- 期待: category 12 exact IDs。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: category 12 exact IDs。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-03 — categoryKey/recordId mismatch reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:356
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: categoryKey/recordId mismatch reject。
- 期待: categoryKey/recordId mismatch reject。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: categoryKey/recordId mismatch reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-04 — valid svc UUIDv4 accept。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:357
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: valid svc UUIDv4 accept。
- 期待: valid svc UUIDv4 accept。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: valid svc UUIDv4 accept。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-05 — uppercase/braces/v1/v7/invalid variant/service prefix typo reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:358
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: uppercase/braces/v1/v7/invalid variant/service prefix typo reject。
- 期待: uppercase/braces/v1/v7/invalid variant/service prefix typo reject。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: uppercase/braces/v1/v7/invalid variant/service prefix typo reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-06 — duplicate service recordId reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:359
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: duplicate service recordId reject。
- 期待: duplicate service recordId reject。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: duplicate service recordId reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-07 — generator collision fixtureでretry、3回failureでfail closed。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:360
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: generator collision fixtureでretry、3回failureでfail closed。
- 期待: generator collision fixtureでretry、3回failureでfail closed。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: generator collision fixtureでretry、3回failureでfail closed。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:RID-08 — editでrecordId mutation reject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:361
- 実施: UUID prefix/variant/version/case/mismatch/duplicateを各境界へ入力。generatorを固定列で1回衝突→成功、3連続衝突、throwにしsave=0/retained pendingを照合。 このケース固有の入力・操作・順序: editでrecordId mutation reject。
- 期待: editでrecordId mutation reject。
- fixture: DS-MIX / fault: ID-GENERATOR
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: editでrecordId mutation reject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, id-retry, restore

## REG:GEN-01 — valid gen UUIDv4 accept。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:362
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: valid gen UUIDv4 accept。
- 期待: valid gen UUIDv4 accept。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: valid gen UUIDv4 accept。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-02 — initial datasetでgeneration作成。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:363
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: initial datasetでgeneration作成。
- 期待: initial datasetでgeneration作成。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: initial datasetでgeneration作成。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-03 — normal mutationでgeneration不変。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:364
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: normal mutationでgeneration不変。
- 期待: normal mutationでgeneration不変。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: normal mutationでgeneration不変。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-04 — delete-all complete時だけnew generation。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:365
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: delete-all complete時だけnew generation。
- 期待: delete-all complete時だけnew generation。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all complete時だけnew generation。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-05 — delete-all abortで旧generation維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:366
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: delete-all abortで旧generation維持。
- 期待: delete-all abortで旧generation維持。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: delete-all abortで旧generation維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-06 — restore source generationをlocal currentとして再利用しない。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:367
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: restore source generationをlocal currentとして再利用しない。
- 期待: restore source generationをlocal currentとして再利用しない。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore source generationをlocal currentとして再利用しない。 独立oracleによる値・bytes・順序・件数・表示の一致を証拠で確認すること。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-07 — restore abortで旧generation維持。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:368
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: restore abortで旧generation維持。
- 期待: restore abortで旧generation維持。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: restore abortで旧generation維持。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## REG:GEN-08 — old tab writeはgeneration mismatchでreject。

- 実施区分: AUTO_FAULT
- 正本: workflow/proposals/YTK-F4-version-registry-proposal-20261015.md:369
- 実施: 初回・通常編集・通常deleteAll・restoreのgeneration変化とrecord/global revisionを区別。abortでは旧generation、成功後旧tab拒否を照合。 このケース固有の入力・操作・順序: old tab writeはgeneration mismatchでreject。
- 期待: old tab writeはgeneration mismatchでreject。
- fixture: DS-MIX, V-VALID-01 / fault: ID-GENERATOR, TX-ABORT, OTHER-TAB
- 証拠: target-lock SHA256 + source ref + harness SHA256 + environment revision + run/case ID / fixture original/derived byte length + SHA256 + variant/fault parameters / independent expected value and actual assertion/event result
- 判定: 原文の全条件と同一ケースの列挙variantを全て満たすこと（以下を検証）: old tab writeはgeneration mismatchでreject。 拒否/失敗の必要な段階と理由を実証し、禁止write・自動補正・誤成功表示・未保存入力消去がないこと。 必要なbrowser/人間/計測の証拠も揃うこと。missingならNOT RUNまたはNOT VERIFIABLE。既存開発test成功のみで正式PASSにしない。
- 留意: 期待は原文を維持。手順・fixtureの不足や観測不能をPASSへ置換しない。
- 正式結果: NOT RUN。開発証拠候補のみ: stage1, restore, ui

## F4技術境界の補助gate（原文にIDなし）

### F4-BOUNDARY-GATE-01 REGISTRY

ACTIVE exact pair/id及びunknown version fail closed。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-02 MANIFEST

正本JSON parse/count/key/enum/condition一致。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-03 BLOB

manifest Git blob SHAとquestionSchemaVersion一致。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-04 GENERATED

runtime generated manifest deep-equal。不一致build失敗とentrypoint gate。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-05 UUID

UUID grammar/generator/collision最大3試行。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-06 NETWORK

外部送信0のnetwork mockと実browser観測。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-07 LOG

sensitive log sink本文0。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-08 XSS

user-controlled textをHTML解釈しない。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-09 FAULT-DISABLED

配信された固定targetにfault UI/第三者script/試験harnessが含まれない。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。

### F4-BOUNDARY-GATE-10 REGRESSION

承認F2/F3全計画のcase完備。111開発testを正式caseと区別。該当F5ケース証拠を出典別に束ね、固定source全件/配信routeを照合。未実証条件は残す。 正式結果NOT RUN。
