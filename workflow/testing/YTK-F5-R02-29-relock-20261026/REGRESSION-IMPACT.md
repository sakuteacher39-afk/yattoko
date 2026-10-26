# R02-29修正の回帰影響評価

全497ケースを分類。追加再試験推奨30件は一覧のみ提出し、実行していない。旧38 PASSや先の94ケースの分類を新対象へ自動移植しない。

|case|理由|実施方式|今回|
|---|---|---|---|
|F2:RST-04|検証済みtokenを受けるrestore/手動pending適用の最小integration smoke。自動commitしない境界と通常save pipeline維持を確認。|AUTO_FAULT|NOT RUN|
|F2:RST-05|検証済みtokenを受けるrestore/手動pending適用の最小integration smoke。自動commitしない境界と通常save pipeline維持を確認。|AUTO_FAULT|NOT RUN|
|F3:R01-02|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R01-06|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R01-07|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R01-12|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R01-13|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R01-14|依存順序/循環/欠落/重複ID/禁止操作等の不正pendingは、配列copy後も既存validatorが拒否する必要がある。capture/export実装は不変だがimport側の適合証拠を再確認する。|AUTO_FAULT|NOT RUN|
|F3:R02-08|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-09|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-10|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-13|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-25|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-28|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-30|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-31|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-36|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R02-39|pendingCanonicalが変更箇所。emergency入力のcanonical raw、payload順/bytes、正しいchecksum付き不正schema、SHA失敗、preview受理が変わらないことを正式caseごとに再確認する。R02-29の補助観測をこれらのPASSへ転記しない。|AUTO_NODE|NOT RUN|
|F3:R03-17|copy・検証・hashがreadwrite transaction前に完了する経路をintegrationで確認。transaction実装自体は不変。|AUTO_FAULT|NOT RUN|
|F3:R04-04|依存配列のcopyにより追加割当が発生する。pending1MB/256操作の境界、長い依存鎖、validation時間/メモリを既存条件のまま確認する。今回性能測定はしていない。|AUTO_FAULT|NOT RUN|
|F3:R04-05|依存配列のcopyにより追加割当が発生する。pending1MB/256操作の境界、長い依存鎖、validation時間/メモリを既存条件のまま確認する。今回性能測定はしていない。|AUTO_FAULT|NOT RUN|
|F3:R04-12|依存配列のcopyにより追加割当が発生する。pending1MB/256操作の境界、長い依存鎖、validation時間/メモリを既存条件のまま確認する。今回性能測定はしていない。|BROWSER_MEASUREMENT|NOT RUN|
|F3:R05-04|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-05|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-11|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-12|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-16|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-19|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-22|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|
|F3:R05-23|verified tokenの参照分離とimmutabilityがsource ID、operation順、依存鎖、receipt、retryに影響しないことを確認。reapply処理は未変更で、対象外の全reapply再試験を要求するものではない。|AUTO_FAULT|NOT RUN|

NO_ADDITIONAL_FIX_SPECIFIC_RETEST_IDENTIFIEDは、この最小修正に関する追加の影響を特定しなかったという静的判断であり、正式試験免除や新対象PASSではない。残る旧55件はJSONへ全件NOT RUNで列挙した。

次工程案: 独立レビューで新target/R02-29判定とこの一覧を確認し、その後に限定回帰の実行前計画と実施承認を得る。F6や未承認の製品修正には進まない。
