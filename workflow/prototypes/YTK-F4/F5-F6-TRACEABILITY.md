# F4第4段階｜F5/F6計画との対応表

承認済み計画・計画案の全IDを出典別に採録。F3原文のDRAFT / NOT APPROVED表記は履歴上の記載。照合報告 eae5400da5105e8710b9ae7795ceeba23aa9a696 に従い、R01-14を含むF3試験計画を承認済み境界として扱う。原文・期待値は変更しない。正式判定は全行NOT RUN。関連証拠は開発テストの探索先であり、行ごとの合格証拠ではない。F5/F6正式PASSを宣言しない。

同名MAN等は出典namespaceで区別。raw16MB / pending1MB / 256操作は暫定値。iPhoneの時間・メモリ測定未実施。F3:R01-14は承認方針に基づくpending拒否の開発証拠へ更新し、修正の独立レビュー待ち。通常deleteAllを維持。仕様変更・試験の削除は行わない。

JSON版は出典SHA-256とケース別の未検証理由を含む。`node plan-map.mjs --check` で出典・全ID・生成結果を照合する。

- F2: ../../proposals/YTK-F2-F5-F6-test-plan-20261013.md（LF正規化SHA-256: 328e861436b7c9fbe4cddefcb58a1394a87cbd84321bce6d32b85676d9e95c47）
- F3: ../../proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md（LF正規化SHA-256: 605f16535035eea31510ceb6fc1d50f3e2e578b22fb943ed2818a7754fbecc80）
- REG: ../../proposals/YTK-F4-version-registry-proposal-20261015.md（LF正規化SHA-256: 591699ceace924cf959e81fb407eb079f49b26a7103f23665459511889e4df3f）

|出典:ID|段階|計画の確認対象|開発証拠の位置|開発扱い|正式判定|
|---|---|---|---|---|---|
|F2:CAT-01|F5|A↔device|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-02|F5|B↔base|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-03|F5|C↔mail|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-04|F5|D↔social|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-05|F5|E↔cloud|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-06|F5|F↔subscription|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-07|F5|G↔finance|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-08|F5|H↔commerce|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-09|F5|I↔auth|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-10|F5|J↔license|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-11|F5|K↔carrier|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-12|F5|L↔business|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-13|F5|persisted categoryKeyがR001 C[].idと一致|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-14|F5|R2CAT参照keyと一致|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-15|F5|R2Q参照keyと一致|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-16|F5|unknown categoryKeyをsave拒否|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-17|F5|unknown categoryKeyをimport/restore拒否|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-18|F5|fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-19|F5|ordinary service editでcategoryKey変更を拒否|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAT-20|F5|synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-01|F5|datasetなしの初期表示は12category/5問すべて未回答として再構成|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-02|F5|first category answerでbaseline+mutationを1transaction|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-03|F5|first transaction後globalRevision=1|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-04|F5|untouched categoryはusageStatus/intention=unanswered|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-05|F5|12categoryの一部だけ回答→reloadして未回答との意味不変|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-06|F5|overview 5問を1問だけ回答→reload|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-07|F5|unknownとunansweredを別値として保持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-08|F5|explicit intention=undecidedとunansweredを別値として保持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-09|F5|category回答1変更につき対象record revision+1 / global+1|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-10|F5|overview回答1変更につきoverview revision+1 / global+1|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-11|F5|同じ値を再選択してもrevision/globalが増えない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-12|F5|transaction abortした回答は未commit、直前commit済み回答は維持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PART-13|F5|STEP移動だけではrevisionを増やさない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-01|F5|usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-02|F5|R07-01でcategory record revisionは1回だけ増加|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-03|F5|R07-01でglobalRevisionは1transaction分だけ増加|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-04|F5|R07-01 transaction abortでusageStatus/intentionの片側だけ残らない|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-05|F5|status確定後reloadでintention=undecidedを再構成|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-06|F5|R002 intentionOverride=nullのeffective表示がparent undecidedと一致|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-07|F5|intention=keepのcategoryでstatus変更してもkeep維持|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-08|F5|intention=deleteのcategoryでstatus変更してもdelete維持|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-09|F5|intention=familyのcategoryでstatus変更してもfamily維持|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-10|F5|intention=undecidedのcategoryでstatus変更してもundecided維持|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R07-11|F5|untouched categoryだけusageStatus=unanswered/intention=unansweredを維持|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-01|F5|known service選択確定直後にpartial recordをcommit|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-02|F5|known service identity確定直後にreloadしresume可能|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-03|F5|「その他」選択だけではrecordを作らない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-04|F5|otherServiceName入力中はpendingのみ|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-05|F5|valid name「利用状態へ」確定直後にpartial recordをcommit|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-06|F5|otherServiceName確定直後にreloadしresume可能|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-07|F5|usageStatus確定直後にreloadし値保持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-08|F5|optional 1問だけ回答後にreloadし値保持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-09|F5|active optional未回答はunanswered|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-10|F5|inactive conditional keyは不存在|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-11|F5|parent changeでconditional child非表示時、child keyを同一transactionで削除|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-12|F5|parent changeでchild表示時、child keyをunansweredで生成|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-13|F5|intentionOverride確定直後にreload|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-14|F5|complete押下でrecordState=completed|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-15|F5|optional未回答のままcompleted可能|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-16|F5|partialとcompletedをreload後に識別可能|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-17|F5|completed recordを開いただけではcompleted維持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-18|F5|completed recordの最初の変更で変更値+recordState=partialをatomic commit|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-19|F5|edit再完了でcompletedへ戻る|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-20|F5|「いったん詳細整理を終わる」単独でsave/revisionしない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R2INT-21|F5|save abortではそのmutationだけpending、直前committed partialは維持|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-01|F5|partial + usageStatus=unansweredはvalid|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-02|F5|complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-03|F5|completed + usageStatus=usingはvalid|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-04|F5|completed + usageStatus=dormantはvalid|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-05|F5|completed + usageStatus=unknownはvalid|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-06|F5|importでcompleted + usageStatus=unansweredをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-07|F5|restoreでcompleted + usageStatus=unansweredをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-08|F5|normal loadでcompleted + usageStatus=unansweredをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-09|F5|completed other service + empty/invalid otherServiceNameをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-10|F5|active conditional field missingをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-11|F5|inactive conditional field presentをreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-12|F5|invalid completedをpartialへ自動補正しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R08-13|F5|intentionOverrideはnull/keep/delete/family/undecided以外をreject|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-01|F5|parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-02|F5|service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-03|F5|parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-04|F5|reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-05|F5|browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-06|F5|normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-07|F5|parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-08|F5|service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-09|F5|child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-10|F5|R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:R09-11|F5|R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-01|F5|parent=not_using + new child usage=using -> parent=usingへ同一transaction|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-02|F5|R001 billing=no + service billing=yes -> billing=yesへ同一transaction|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-03|F5|R001 finance=no + finance asset=yes -> finance=yes|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-04|F5|R001 data=no + service importantData=yes -> data=yes|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-05|F5|R001 family=known + service familyKnow=no -> family=hidden|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-06|F5|positive整合transaction abortでchildだけ/summaryだけ残らない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-07|F5|child usingありでparentをnot_using -> commit拒否/再確認|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-08|F5|service billing=yesありでR001 billingをno -> silent commitしない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-09|F5|finance asset=yesありでR001 finance=no -> silent commitしない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-10|F5|importantData=yesありでR001 data=no -> silent commitしない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-11|F5|familyKnow=noありでR001 family=known -> silent commitしない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-12|F5|reject時にchildを削除/変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-13|F5|child using->dormant後もparentをnot_usingへ自動変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-14|F5|last billing=yes->noでもR001 billingをnoへ自動変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-15|F5|last asset=yes->noでもfinanceをnoへ自動変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-16|F5|last importantData=yes->noでもdataをnoへ自動変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-17|F5|last familyKnow=no->yesでもfamilyをknownへ自動変更しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DIR-18|F5|service削除後parent/overviewをnegativeへ自動更新しない|stage1, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ID-01|F5|serviceはrecordIdで編集し配列順を使わない|stage1, id-retry|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ID-02|F5|中央record削除後も誤更新なし|stage1, id-retry|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ID-03|F5|同名service複数でもmergeしない|stage1, id-retry|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-01|F5|tab A save後、旧global tab B save拒否|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-02|F5|partial serviceも競合保護|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-03|F5|completed serviceも競合保護|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-04|F5|conflict単純retryでforce overwriteしない|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-05|F5|delete-all後旧generation save拒否|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-06|F5|restore後旧generation save拒否|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CON-07|F5|BroadcastChannel通知なしでもversion checkで拒否|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-01|F5|request successでは保存済み表示しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-02|F5|transaction completeのみ保存済み|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-03|F5|abort/errorで保存済み表示なし|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-04|F5|save中の次mutationをqueue|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-05|F5|古いcompleteが新pendingを保存済みにしない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-06|F5|100連続変更で最終値が最新|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-07|F5|1transaction内の複数record更新でもglobalRevisionは1回|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-08|F5|changed record revisionは各1回|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SAVE-09|F5|idempotent no-opはrevision不変|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-01|F5|NFC normalizationを適用|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-02|F5|NFKCを適用しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-03|F5|leading/trailing whitespaceをtrim|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-04|F5|trim後empty拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-05|F5|C0 control拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-06|F5|DEL拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-07|F5|C1 control拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-08|F5|U+061C拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-09|F5|U+200E/U+200F拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-10|F5|U+202A〜U+202E拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-11|F5|U+2066〜U+2069拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-12|F5|canonical UTF-16 length=60受理|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-13|F5|canonical UTF-16 length=61拒否|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-14|F5|emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-15|F5|save/import/restore/emergency exportで同一validator|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-16|F5|secret-like regex該当を保存しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:TXT-17|F5|invalid importを自動修復しない|stage1, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-01|F5|top-level property order固定|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-02|F5|overview property order固定|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-03|F5|categoriesはdevice→business固定12順|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-04|F5|unanswered categoryも全12件含む|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-05|F5|serviceはrecordId昇順|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-06|F5|partial serviceも含む|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-07|F5|completed serviceも含む|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-08|F5|pending overlayはcommitted capacityから除外|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-09|F5|active optional unansweredを含む|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-10|F5|inactive conditional keyを含めない|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-11|F5|normalized otherServiceNameで計測|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-12|F5|record IDs/revisions/schema/question version/metaを含む|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-13|F5|同じsemantic datasetはinsert順に関係なく同byte数|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-14|F5|10,000,000 exactly受理|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-15|F5|10,000,001拒否|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-16|F5|update後prospective stateで計測しoverなら旧commit維持|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-17|F5|delete後size減少を許可|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:CAP-18|F5|browser quota errorをapp 10MB超過と混同しない|stage1, backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-01|F5|normal backupにcompleted serviceを含む|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-02|F5|normal backupにcommitted partial serviceを含む|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-03|F5|normal backupにR001 unansweredを含む|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-04|F5|normal backupにpending overlayを含めない|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-05|F5|emergency exportはcommittedとpendingを別領域|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-06|F5|pending metadataからbase generation/revisionを判別可能|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-07|F5|invalid pendingはfileへ入れず「退避成功」と表示しない|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-08|F5|emergency fileが10MB超でもIndexedDB上限違反と即断しない|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-09|F5|export file generation failureで成功表示しない|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-10|F5|pending dependency不整合をsilent exportしない|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:BKP-11|F5|pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-01|F5|normal restoreでpartial/completed状態を保持|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-02|F5|restore atomic replace失敗時は旧dataset維持|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-03|F5|restore成功でgeneration変更|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-04|F5|emergency pendingをsilent commitしない|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-05|F5|pending再適用は通常save pipelineを通す|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-06|F5|pending再適用で10MB超なら保存拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-07|F5|unknown schema/question version拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-08|F5|unknown categoryKey拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-09|F5|duplicate recordId拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-10|F5|malformed/empty datasetを新規状態として上書きしない|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-11|F5|required field欠落拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-12|F5|unexpected field拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-13|F5|unexpected nested object拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-14|F5|duplicate category拒否|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-15|F5|categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合）|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-16|F5|completed + usageStatus=unansweredをreject|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-17|F5|completed other serviceのinvalid otherServiceNameをreject|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-18|F5|active conditional missing / inactive conditional presentをreject|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:RST-19|F5|invalid completed stateを自動補正しない|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-01|F5|category deleteでcategory record + child servicesを同一transactionで削除|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-02|F5|category delete途中abortでcategory/childrenとも旧状態維持|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-03|F5|category delete成功後に一部childだけ残らない|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-04|F5|delete-all途中abortで旧datasetを全体維持|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-05|F5|delete-all成功で新generationIdへ切替|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:DEL-06|F5|delete-all成功後、旧generation tabの保存を拒否|stage1|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-01|F5|①app 10MB超過を正しく分類し既存committed stateを維持|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-02|F5|②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-03|F5|③保存機能制限をstorage unavailable/permission相当の根拠で分類|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-04|F5|④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-05|F5|⑤一時的保存失敗は合理的根拠がある場合だけ分類|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-06|F5|⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-07|F5|全6分類で未保存入力を保持し保存済み誤表示なし|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-08|F5|retry可能/不可能の導線が分類に一致|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-09|F5|conflictでは「再試行」だけで保存せず最新版確認を要求|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:ERR-10|F5|technical exception name/secret/bodyを利用者文言やlogへそのまま出さない|stage1, restore, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-01|F5|D区分field拒否|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-02|F5|free memo fieldなし|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-03|F5|HTML/JS文字列をtextとして表示|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-04|F5|prototype pollution系key拒否|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-05|F5|error logにserviceName/answer/pending本文なし|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-06|F5|network mockで整理内容外部送信0|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:SEC-07|F5|analytics/APM/replay hookへpayloadなし|integration-boundaries, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-01|F5|利用開始のlong-term loss注意を維持|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-02|F5|利用開始の適宜backup推奨を維持|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-03|F5|完了/回答変更/定期backup催促を追加していない|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-04|F5|private mode専用detector/blockを追加していない|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-05|F5|原因不明保存エラーのprivate mode補足を維持|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:LONG-06|F5|「永久」「消えない」等の保証表現なし|ui|RELATED EVIDENCE ONLY|NOT RUN|
|F2:PC-PART-01|F6|R001 category 1件だけ確定 → reload → 他11件unansweredのまま続行|—|NOT RUN|NOT RUN|
|F2:PC-PART-02|F6|R001 overview 1問だけ確定 → reload → unknown/unansweredを区別|—|NOT RUN|NOT RUN|
|F2:PC-R2-01|F6|known service選択確定 → 即中断/reload → partial resume|—|NOT RUN|NOT RUN|
|F2:PC-R2-02|F6|otherServiceName確定 → 即中断/reload → partial resume|—|NOT RUN|NOT RUN|
|F2:PC-R2-03|F6|usageStatus確定 → 即中断/reload|—|NOT RUN|NOT RUN|
|F2:PC-R2-04|F6|optional 1問確定 → 即中断/reload|—|NOT RUN|NOT RUN|
|F2:PC-R2-05|F6|optional未回答のままcomplete → reloadしてcompleted|—|NOT RUN|NOT RUN|
|F2:PC-R2-06|F6|completed record編集1項目 → 中断/reloadしてpartial|—|NOT RUN|NOT RUN|
|F2:PC-DIR-01|F6|service追加 child usingでparent not_usingからusingへatomic整合|—|NOT RUN|NOT RUN|
|F2:PC-DIR-02|F6|child using存在中にparent not_using操作を拒否/再確認|—|NOT RUN|NOT RUN|
|F2:PC-BKP-01|F6|normal backup→restoreでpartial/completed維持|—|NOT RUN|NOT RUN|
|F2:PC-CON-01|F6|2tab競合、旧tab保存拒否|—|NOT RUN|NOT RUN|
|F2:PC-CON-02|F6|restore/delete-all後の旧tab拒否|—|NOT RUN|NOT RUN|
|F2:PC-CAP-01|F6|10MB近傍の操作応答/保存結果|—|NOT RUN|NOT RUN|
|F2:PC-NET-01|F6|Network観測で整理内容外部送信なし|—|NOT RUN|NOT RUN|
|F2:PC-RESTART-01|F6|browser完全終了→再起動後もcommitted partialを保持|—|NOT RUN|NOT RUN|
|F2:PC-RESTART-02|F6|browser完全終了→再起動後もcompletedを保持|—|NOT RUN|NOT RUN|
|F2:PC-DEL-01|F6|category delete成功後にcategory/childrenが一貫して消える|—|NOT RUN|NOT RUN|
|F2:PC-DEL-02|F6|delete-all成功後の新generationで再開でき旧tabは保存拒否|—|NOT RUN|NOT RUN|
|F2:PC-R09-01|F6|R001未回答categoryを「ほかのカテゴリも見る」相当経路から選択→service partial commit→親正本unanswered維持・画面は未決定|—|NOT RUN|NOT RUN|
|F2:PC-R09-02|F6|PC-R09-01直後にreload→parent canonical unansweredを維持し画面/effective未決定を再構成|—|NOT RUN|NOT RUN|
|F2:PC-R09-03|F6|PC-R09-01状態でbrowser完全終了→再起動→同じ未決定fallbackを再構成|—|NOT RUN|NOT RUN|
|F2:PC-R09-04|F6|後からparent intention=keepへ確定→override=null serviceだけkeepへ追随|—|NOT RUN|NOT RUN|
|F2:PC-R09-05|F6|child usage=using確定→parent usage=using + intention=undecidedをatomic反映|—|NOT RUN|NOT RUN|
|F2:IOS-PART-01|F6|R001 category途中 → reload → 続行|—|NOT RUN|NOT RUN|
|F2:IOS-PART-02|F6|R001 overview 1問だけ → reload → 続行|—|NOT RUN|NOT RUN|
|F2:IOS-R2-01|F6|known service identity確定 → reload → partial resume|—|NOT RUN|NOT RUN|
|F2:IOS-R2-02|F6|otherServiceName確定 → reload|—|NOT RUN|NOT RUN|
|F2:IOS-R2-03|F6|usageStatus確定 → reload|—|NOT RUN|NOT RUN|
|F2:IOS-R2-04|F6|optional 1問確定 → reload|—|NOT RUN|NOT RUN|
|F2:IOS-R2-05|F6|complete / partialの識別|—|NOT RUN|NOT RUN|
|F2:IOS-DIR-01|F6|detail positive -> summary positive atomic|—|NOT RUN|NOT RUN|
|F2:IOS-DIR-02|F6|parent negative conflictをsilent commitしない|—|NOT RUN|NOT RUN|
|F2:IOS-CON-01|F6|Safari複数tab競合|—|NOT RUN|NOT RUN|
|F2:IOS-BKP-01|F6|file backup/restore|—|NOT RUN|NOT RUN|
|F2:IOS-CAP-01|F6|10MB近傍でUI停止/crash/transaction失敗の有無|—|NOT RUN|NOT RUN|
|F2:IOS-TXT-01|F6|日本語/emoji/結合文字のnormalization/length|—|NOT RUN|NOT RUN|
|F2:IOS-RESTART-01|F6|Safari通常を終了→再起動後のcommitted partial保持|—|NOT RUN|NOT RUN|
|F2:IOS-RESTART-02|F6|Safari通常を終了→再起動後のcompleted保持|—|NOT RUN|NOT RUN|
|F2:IOS-R07-01|F6|category status初回確定後、再起動してintention=undecidedを再構成|—|NOT RUN|NOT RUN|
|F2:IOS-R08-01|F6|completed serviceがusageStatus非unansweredのinvariantを維持|—|NOT RUN|NOT RUN|
|F2:IOS-R09-01|F6|R001未回答categoryを「ほかのカテゴリも見る」相当経路から選択→service partial commit→親正本unanswered維持・画面は未決定|—|NOT RUN|NOT RUN|
|F2:IOS-R09-02|F6|IOS-R09-01直後にreload→同じ未決定fallbackを再構成|—|NOT RUN|NOT RUN|
|F2:IOS-R09-03|F6|Safari通常を終了→再起動後も同じ未決定fallbackを再構成|—|NOT RUN|NOT RUN|
|F2:IOS-R09-04|F6|parent intention確定後、override=null serviceだけ新parent値へ追随|—|NOT RUN|NOT RUN|
|F2:IOS-R09-05|F6|child usage=using確定時、parent usage=using + intention=undecidedを同一transactionで反映|—|NOT RUN|NOT RUN|
|F2:PRIV-01|F6|開始時赤文字注意|—|NOT RUN|NOT RUN|
|F2:PRIV-02|F6|専用検知/遮断なし|—|NOT RUN|NOT RUN|
|F2:PRIV-03|F6|IndexedDB書込成否を実測|—|NOT RUN|NOT RUN|
|F2:PRIV-04|F6|reload/終了後/再訪挙動|—|NOT RUN|NOT RUN|
|F2:PRIV-05|F6|保存失敗時pending保持|—|NOT RUN|NOT RUN|
|F2:PRIV-06|F6|失敗を保存済み表示しない|—|NOT RUN|NOT RUN|
|F2:PRIV-07|F6|原因不明補足|—|NOT RUN|NOT RUN|
|F2:PRIV-08|F6|emergency export|—|NOT RUN|NOT RUN|
|F2:RESTORE-01|F6|site data削除後backup復元|—|NOT RUN|NOT RUN|
|F2:RESTORE-02|F6|別PC/browser復元|—|NOT RUN|NOT RUN|
|F2:RESTORE-03|F6|PC→iPhoneまたはiPhone→PC復元|—|NOT RUN|NOT RUN|
|F2:RESTORE-04|F6|partial serviceも復元|—|NOT RUN|NOT RUN|
|F2:RESTORE-05|F6|emergency pendingは自動commitされない|—|NOT RUN|NOT RUN|
|F2:RESTORE-06|F6|restore後旧tab保存拒否|—|NOT RUN|NOT RUN|
|F3:R01-01|F5|confirmed-pending 1件をcapture candidateとして認識。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-02|F5|dependent-pending chain（service create→usage→answer）をordinal順で保持。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-03|F5|current UI draftがF2 validator合格。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-04|F5|current UI draftがinvalid/secret-like。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-05|F5|dependency missing。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-06|F5|dependency cycle。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-07|F5|conditional childがparent expected stateと不整合。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-08|F5|service identity pendingに依存する後続3操作の1つがinvalid。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-09|F5|独立した2componentの片方だけinvalid。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-10|F5|captureStatus=partial時candidate/exported/omitted件数が一致。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-11|F5|omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-12|F5|operation ID重複。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-13|F5|ordinal重複/逆行。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-14|F5|unsupported operation（delete-all/restore等）をpendingへ入れる。|s4-r01.test.mjs（収録拒否・SHA正常の取込拒否・独立再適用guard・通常deleteAll・画面統合）|DEVELOPMENT VERIFIED / RE-REVIEW PENDING|NOT RUN|
|F3:R01-15|F5|capture開始後readonly snapshotのgeneration/globalとpending baseが一致。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-16|F5|別tabがglobalRevision更新済み。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-17|F5|generationが変わった。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-18|F5|target recordRevisionだけ変化。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-19|F5|baseSnapshotChecksumSha256不一致。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-20|F5|baseContentFingerprint不一致。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-21|F5|pending 999,999 bytes。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-22|F5|pending 1,000,000 bytes。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-23|F5|pending 1,000,001 bytes。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-24|F5|operations 255件。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-25|F5|operations 256件。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-26|F5|operations 257件。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-27|F5|Blob生成失敗。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-28|F5|object URL/download起動失敗。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-29|F5|downloadが開始できたが物理保存確認不能。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-30|F5|retry後も元画面の未保存回答が残る。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R01-31|F5|file作成失敗後のnavigation warning。|backup, omitted-ranges, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-01|F5|UTF-8 valid / BOMなし canonical input。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-02|F5|UTF-8 BOM付き拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-03|F5|invalid UTF-8 byte sequenceをfatal reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-04|F5|root duplicate same key same value。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-05|F5|root duplicate same key different value。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-06|F5|nested answers duplicate key。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-07|F5|"kind" と escaped equivalent key。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-08|F5|root key並替。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-09|F5|余分な空白/newline。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-10|F5|unnecessary unicode escape / slash escape。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-11|F5|unknown root key。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-12|F5|unknown nested snapshot key。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-13|F5|unexpected answers nested object。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-14|F5|fileFormatVersion 1e0拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-15|F5|revision -0拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-16|F5|leading zero数値拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-17|F5|decimal 1.0拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-18|F5|Number.MAX_SAFE_INTEGER超過拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-19|F5|escaped lone high surrogate拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-20|F5|escaped lone low surrogate拒否。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-21|F5|F2 NFC必須fieldがnon-NFC。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-22|F5|F2 control/bidi rejectをimportでも同一適用。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-23|F5|DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-24|F5|body 1 byte変更/checksum据置。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-25|F5|body+checksumを攻撃者が再生成したがschema unknown fieldあり。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-26|F5|checksum algorithm未知。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-27|F5|checksum hex uppercase/長さ63/65/非hex。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-28|F5|SHA API failure。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-29|F5|checksum検証前後でparsed objectを書換えない。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-30|F5|full canonical rawとdigest canonical payloadがschema-defined orderを共有。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-31|F5|ACTIVE registryからV-VALID-01を生成しpreview accept。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-32|F5|V-DUP-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-33|F5|V-DUP-02 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-34|F5|V-ORDER-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-35|F5|V-NUM-01 / V-NUM-02 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-36|F5|V-UNK-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-37|F5|V-UTF-01 / V-BOM-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-38|F5|V-HASH-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-39|F5|V-HASH-02 checksum一致でもreject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R02-40|F5|V-TRUNC-01 reject。|restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-01|F5|valid dataset→VALID。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-02|F5|metaなし・recordsなし→EMPTY。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-03|F5|meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-04|F5|raw read/比較不能→CORRUPT_UNCOMPARABLE。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-05|F5|一部record存在/metaなしをEMPTY扱いしない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-06|F5|CORRUPT_COMPARABLEで通常backup成功と誤表示しない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-07|F5|corrupt復旧は二段階明示確認なしでcommitしない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-08|F5|preview後別tab normal edit→B1 guard mismatch、clear前abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-09|F5|preview後delete-all→abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-10|F5|preview後別restore→abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-11|F5|corrupt raw-state preview後raw content変化→同期bytes mismatchでabort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-12|F5|EMPTY preview後別tabがdataset作成→empty guard mismatch。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-13|F5|guard mismatchで自動再確認→即commitしない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-14|F5|new generation/meta込み9,999,999 bytes。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-15|F5|exactly10,000,000 bytes accept candidate。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-16|F5|10,000,001 bytesをtransaction開始前にreject。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-17|F5|preflightでFile decode / strict validation / SHA-256 / expectedCanonicalBytes生成が全部完了してからreadwrite transactionをopen。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-18|F5|transaction開始後にcrypto.subtle.digest / File API / Blob.arrayBuffer / network / timerを呼ばない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-19|F5|transaction handlerがasync functionではなく、await / Promise.then / queueMicrotask / setTimeoutを使用しないことを静的検査。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-20|F5|trace順序がGUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-21|F5|各phase最後のsuccess callbackがreturn前に次phase requestをenqueueしている。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-22|F5|readbackVerified=falseのままtransaction.oncompleteが発火した場合、テストをFAILにするsentinel。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-23|F5|fault injectionで次phase request enqueue時にTransactionInactiveError相当を発生。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-24|F5|clear request途中abort→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-25|F5|clear完了後put途中abort→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-26|F5|category put途中failure→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-27|F5|service put途中failure→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-28|F5|final meta write failure→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-29|F5|quota exception→旧正本全件維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-30|F5|request単体success / clear success / put success / meta successでは成功表示しない。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-31|F5|readbackからF2 canonical projectionを同期再構築。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-32|F5|TextEncoderでreadbackCanonicalBytesを同期生成。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-33|F5|readback byteLength == expectedByteLengthかつ全byte一致。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-34|F5|readback byte 1つだけ差し替えるfault injection→callback内abort、旧正本維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-35|F5|readback canonical sizeを10,000,001へするfault injection→abort、旧正本維持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-36|F5|readback generationId mismatch→abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-37|F5|readback globalRevision !=1→abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-38|F5|readback record count / recordRevision mismatch→abort。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-39|F5|transaction内でdigest比較を行わずbytes一致を正否根拠にする。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-40|F5|全readback一致→readbackVerified=true→その後の正常auto-commit→oncompleteで初めて成功。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-41|F5|restore successでnew generationId。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-42|F5|new generation globalRevision=1。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-43|F5|imported record revisionsを保持。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-44|F5|restore後旧tab save→generation mismatch拒否。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-45|F5|BroadcastChannel通知を落としても旧tab save拒否。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-46|F5|recordId collisionはfile strict validation段階でreject。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R03-47|F5|transaction readback bytesがpreflight prospective bytesと一致。|restore, restore-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-01|F5|raw 15,999,999 bytes。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-02|F5|raw 16,000,000 bytes。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-03|F5|raw 16,000,001 bytesを内容read/parse前拒否。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-04|F5|pending 999,999 / 1,000,000 / 1,000,001 bytes。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-05|F5|pending 255 / 256 / 257 operations。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-06|F5|depth16 / depth17。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-07|F5|huge single stringをfield-specific scannerでparse前拒否。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-08|F5|huge key countをschema path count超過でparse前拒否。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-09|F5|categories array >12をreject。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-10|F5|ACTIVE registry理論最大service count超過をparse前reject。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-11|F5|1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-12|F5|1MB/256件が過剰なscenarioでvalidation時間を計測。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-13|F5|raw16MBでduplicate scannerが別巨大ASTを作らない。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-14|F5|parse failure後も既存IDB不変。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R04-15|F5|resource errorをapp 10MB超と誤分類しない。|backup, restore|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-01|F5|emergency snapshot restore後pendingはIDB正本に入らない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-02|F5|restore transaction complete後だけReapplyContextをmemory生成。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-03|F5|restore abort時はReapplyContextを生成しない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-04|F5|sourceFileIdがfileFormatVersion + validated checksum.hexから一意に導出される。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-05|F5|ReapplyContextにsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / receiptMapを保持。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-06|F5|current generationがrestoredGenerationIdと異なる場合context invalid。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-07|F5|別tab editでglobalRevisionがlastKnownから変わった場合context invalid。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-08|F5|APPLIED receiptなしでcurrent==intended-after。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-09|F5|content fingerprint一致だがgenerationが異なる。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-10|F5|異なるsource snapshot generationで内容だけ同一。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-11|F5|operation current==expected-before、ACTIVE context一致。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-12|F5|operation transaction complete後にだけAPPLIED receiptを作成。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-13|F5|receipt sourceFileId + restoredGenerationId + operationId + current globalRevisionが一致。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-14|F5|receiptはあるがglobalRevisionが外部変更で進んだ。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-15|F5|same recordId / same valueだけではalready-appliedにしない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-16|F5|expected-before==intended-afterのpending opをinvalid/no-opとして受け入れない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-17|F5|operation tapでIN_FLIGHT、同operationの二重tapをreject/ignore。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-18|F5|abortしたoperationへAPPLIED receiptを作らない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-19|F5|同一tab ACTIVE context中に同じemergency fileを二回import。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-20|F5|別tabで同じfileをimport。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-21|F5|同じ内容へ利用者が別操作で先に変更。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-22|F5|dependency chain op1 complete/op2 abort。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-23|F5|same session retryでop1を二重commitしない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-24|F5|op1後に別tab edit→globalRevision差でcontext invalid、op2自動適用なし。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-25|F5|10MB超で途中停止。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-26|F5|parent R001 conflictで通常save gate停止。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-27|F5|deleted targetを別recordへmappingしない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-28|F5|completion opでR08 invariant再検証。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-29|F5|R09 fallbackは保存せず再計算。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-30|F5|snapshot restore直後reloadでmemory ReapplyContext消失。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-31|F5|partial apply後reload。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-32|F5|browser完全終了→再起動→同file再import。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-33|F5|restart後current==intended-after。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-34|F5|restart後current==expected-before。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-35|F5|file紛失時、pending復旧可能と誤保証しない。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-36|F5|F2正本にsourceFileId / operationId receipt ledgerを保存していないこと。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-37|F5|current v0.3はrestart跨ぎautomatic exactly-once resumeを保証しないとUI/設計へ明記。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R05-38|F5|persistent exact-onceを要求する将来案はF2変更として別承認が必要と記録。|restore, restore-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-01|F5|export前に「暗号化されていない」を表示。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-02|F5|service名/利用状況/本人意向が読める可能性を説明。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-03|F5|共有PC/共有folderの閲覧リスクを説明。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-04|F5|iCloud Drive等OS設定による同期可能性を説明。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-05|F5|ヤットコがfileを自動uploadしないと説明。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-06|F5|SHA-256が暗号化/作成者証明でないと説明。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-07|F5|暗号化機能を勝手に追加していない。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-08|F5|filenameにサービス名・回答値なし。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-09|F5|analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R06-10|F5|console logにも本文を出さない。|integration-boundaries, file-save-ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-01|F5|categoryKey 12種がF2承認値とexact match。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-02|F5|categories canonical orderがF2と一致。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-03|F5|R07初回intention ruleをimport/restore後も維持。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-04|F5|R08 completed invariantをimport/restoreで維持。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-05|F5|R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-06|F5|inactive conditional fieldをreject。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-07|F5|active conditional unansweredを保持。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-08|F5|normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-09|F5|ACTIVE registryなしではproduction export/importを有効化しない。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-10|F5|unknown schemaVersion reject。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-11|F5|unknown questionSchemaVersion reject。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-12|F5|unregistered pair reject。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-13|F5|invalid recordId grammar reject（ACTIVE registry binding後）。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-14|F5|invalid generationId grammar reject（ACTIVE registry binding後）。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:R07-15|F5|version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。|stage1, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-01|F5|dataset未作成なら空backup成功表示なし。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-02|F5|R001 unanswered/unknownを区別して保持。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-03|F5|R002 partial/completed双方を含む。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-04|F5|pending/UI history/mutationSeq/inheritedIntentionを含めない。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-05|F5|same readonly transactionのsnapshot。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-06|F5|exportでgeneration/revisions不変。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-07|F5|download開始と物理保存完了表示を区別。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-08|F5|normal backup時に未保存画面入力があれば「含まれない」表示。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-09|F5|normal file kind=normal / pending=null。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:N-10|F5|external transmission zero。|backup, file-save-ui, ui|RELATED EVIDENCE ONLY|NOT RUN|
|F3:PC-01|F6|normal backup→Chrome完全終了→restore、R001/R002状態一致。|—|NOT RUN|NOT RUN|
|F3:PC-02|F6|committed partial+completed混在fileを新profileへrestore。|—|NOT RUN|NOT RUN|
|F3:PC-03|F6|R09 fallbackをrestore後再構成。|—|NOT RUN|NOT RUN|
|F3:PC-04|F6|existing VALID dataでpreview/cancel/replace/old-tab reject。|—|NOT RUN|NOT RUN|
|F3:PC-05|F6|CORRUPT_COMPARABLE fixtureで二段階確認→guard一致時だけrestore。|—|NOT RUN|NOT RUN|
|F3:PC-06|F6|CORRUPT_UNCOMPARABLE fixtureでrestore blocked。|—|NOT RUN|NOT RUN|
|F3:PC-07|F6|preview後別tab edit→restore abort。|—|NOT RUN|NOT RUN|
|F3:PC-08|F6|clear後put途中の人工failure→旧正本全件維持。|—|NOT RUN|NOT RUN|
|F3:PC-09|F6|final meta write人工failure→旧正本全件維持。|—|NOT RUN|NOT RUN|
|F3:PC-10|F6|quota exception→旧正本維持。|—|NOT RUN|NOT RUN|
|F3:PC-11|F6|emergency full capture→file→snapshot restore→manual pending reapply。|—|NOT RUN|NOT RUN|
|F3:PC-12|F6|emergency partial captureで未退避件数/範囲を表示。|—|NOT RUN|NOT RUN|
|F3:PC-13|F6|emergency download failureで画面回答保持・成功表示なし。|—|NOT RUN|NOT RUN|
|F3:PC-14|F6|snapshot restore後reload→同file再選択。receipt消失時は自動適用/skipせず再確認。|—|NOT RUN|NOT RUN|
|F3:PC-15|F6|一部pending適用→browser restart→同file再取込。current value一致だけでalready-appliedにしない。|—|NOT RUN|NOT RUN|
|F3:PC-16|F6|invalid duplicate-key/escape-equivalent/key reorder/exponent fileを拒否。|—|NOT RUN|NOT RUN|
|F3:PC-17|F6|plaintext warningを確認。|—|NOT RUN|NOT RUN|
|F3:PC-18|F6|network/DevToolsでsnapshot/pending外部送信0。|—|NOT RUN|NOT RUN|
|F3:PC-19|F6|16MB/1MB/256候補boundaryで安全失敗または計画どおり処理。|—|NOT RUN|NOT RUN|
|F3:PC-20|F6|physical download existenceを人間確認し、UIが完了保証していないことを確認。|—|NOT RUN|NOT RUN|
|F3:PC-21|F6|debug instrumentationでtransaction phase順 GUARD→CLEAR→PUT→READBACK→COMPLETEを確認し、readback前auto-commitなし。|—|NOT RUN|NOT RUN|
|F3:PC-22|F6|transaction callback中にasync Web Crypto待機が発生しないことをinstrumentationで確認。|—|NOT RUN|NOT RUN|
|F3:PC-23|F6|readback 1byte mismatch fault injection→abort、旧正本全件維持。|—|NOT RUN|NOT RUN|
|F3:PC-24|F6|transaction途中abort fault injection→旧正本全件維持。|—|NOT RUN|NOT RUN|
|F3:PC-25|F6|TransactionInactiveError相当fault→成功表示なし、destructive partial commitなし。|—|NOT RUN|NOT RUN|
|F3:PC-26|F6|異なるgenerationだが同一内容のemergency file/contextを同一restoreと誤認しない。|—|NOT RUN|NOT RUN|
|F3:PC-27|F6|未適用operationなのにcurrentがintended-afterと同値→自動skip禁止。|—|NOT RUN|NOT RUN|
|F3:PC-28|F6|同一session二重tap→receiptにより二重commitなし。|—|NOT RUN|NOT RUN|
|F3:PC-29|F6|別tab編集後pending reapply→globalRevision差で停止。|—|NOT RUN|NOT RUN|
|F3:PC-30|F6|partial apply後browser再起動→receipt消失を検知しUNPROVENで再確認。|—|NOT RUN|NOT RUN|
|F3:IOS-01|F6|normal backupをFiles等へ保存し、物理fileを人間確認。|—|NOT RUN|NOT RUN|
|F3:IOS-02|F6|iPhone file pickerからnormal restore。|—|NOT RUN|NOT RUN|
|F3:IOS-03|F6|PC→iPhone / iPhone→PC双方向restore。|—|NOT RUN|NOT RUN|
|F3:IOS-04|F6|Safari終了→再起動後もrestored committed state保持。|—|NOT RUN|NOT RUN|
|F3:IOS-05|F6|R09 derived fallbackを再構成。|—|NOT RUN|NOT RUN|
|F3:IOS-06|F6|preview cancelで既存data不変。|—|NOT RUN|NOT RUN|
|F3:IOS-07|F6|old tab / duplicate tab generation guard。|—|NOT RUN|NOT RUN|
|F3:IOS-08|F6|save failure fixture→emergency full capture→file保存。|—|NOT RUN|NOT RUN|
|F3:IOS-09|F6|partial invalid dependency→partial/none表示と未退避件数。|—|NOT RUN|NOT RUN|
|F3:IOS-10|F6|emergency download cancel/failure→画面回答保持。|—|NOT RUN|NOT RUN|
|F3:IOS-11|F6|emergency snapshot restore後pendingをsilent commitしない。|—|NOT RUN|NOT RUN|
|F3:IOS-12|F6|restore後reload→同file再選択。provenance receipt消失時は自動skip/applyなし。|—|NOT RUN|NOT RUN|
|F3:IOS-13|F6|Safari終了→再起動→同file再選択→UNPROVEN表示と利用者再確認。|—|NOT RUN|NOT RUN|
|F3:IOS-14|F6|二重tapは同一ACTIVE contextのIN_FLIGHT/APPLIED receiptでduplicate commitなし。|—|NOT RUN|NOT RUN|
|F3:IOS-15|F6|partial reapply failure後、同一sessionではreceipt/remainingを維持。|—|NOT RUN|NOT RUN|
|F3:IOS-16|F6|app background→foregroundでmeta revision再確認。差があればcontext invalid。|—|NOT RUN|NOT RUN|
|F3:IOS-17|F6|異なるgenerationだが同内容のcurrent dataを同一restoreと誤認しない。|—|NOT RUN|NOT RUN|
|F3:IOS-18|F6|未適用operationなのにcurrent==intended-after→AMBIGUOUS_SAME_VALUE、auto skipなし。|—|NOT RUN|NOT RUN|
|F3:IOS-19|F6|partial apply後Safari kill→同file再import。適用済みprefixをcontentだけから推測しない。|—|NOT RUN|NOT RUN|
|F3:IOS-20|F6|duplicate tabで別tab edit→globalRevision差によりpending reapply停止。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-01|F6|Safari実機でGUARD→CLEAR→PUT→READBACK→COMPLETEのtraceを取得。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-02|F6|readbackVerified前にoncompleteが発火しない。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-03|F6|transaction callback内にWeb Crypto / async waitなし。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-04|F6|put途中abort fault→旧正本維持。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-05|F6|readback mismatch fault→abort、旧正本維持。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-06|F6|quota fault→abort、旧正本維持。|—|NOT RUN|NOT RUN|
|F3:IOS-TX-07|F6|TransactionInactiveError相当faultで成功表示なし。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-01|F6|raw 16,000,000 bytes candidate preflight 5回。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-02|F6|snapshot 10,000,000 bytes near-limit validation 5回。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-03|F6|pending 1,000,000 bytes / 256 operations emergency validation 5回。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-04|F6|File read時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-05|F6|fatal decode時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-06|F6|lexical scan時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-07|F6|JSON.parse時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-08|F6|canonical serialize時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-09|F6|SHA-256時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-10|F6|semantic validation時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-11|F6|total preflight時間を記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-12|F6|100ms heartbeatの最大foreground gapを記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-13|F6|5/5 crash/OS kill/unexpected reloadなし。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-14|F6|5/5既存IndexedDB mutationなし。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-15|F6|max heartbeat gap <=2,000ms。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-16|F6|total preflight <=15,000ms。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-17|F6|Web Inspector/Instrumentsでpeak memory / resident deltaを記録。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-18|F6|memory測定不能なら16MB安全性をNOT VERIFIABLEとしPASSにしない。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-19|F6|memory warning/white screen/page killが1回でもあればFAIL。|—|NOT RUN|NOT RUN|
|F3:IOS-PERF-20|F6|FAIL時はcap引下げ案を作り、上限引上げはしない。|—|NOT RUN|NOT RUN|
|F3:IOS-21|F6|iCloud Drive等の同期可能性注意文を確認。|—|NOT RUN|NOT RUN|
|F3:IOS-22|F6|file pickerから戻る/キャンセルでdata mutationなし。|—|NOT RUN|NOT RUN|
|F3:IOS-23|F6|画面回転/別app往復後にrestoreが二重実行されない。|—|NOT RUN|NOT RUN|
|F3:IOS-24|F6|private modeはF2注意を維持し専用blockを追加しない。|—|NOT RUN|NOT RUN|
|F3:IOS-25|F6|long-term natural evictionを短期restore成功と混同しない。|—|NOT RUN|NOT RUN|
|F3:PRIV-01|F6|F2既承認のprivate mode注意表示。|—|NOT RUN|NOT RUN|
|F3:PRIV-02|F6|normal backup file作成可否。|—|NOT RUN|NOT RUN|
|F3:PRIV-03|F6|restore file選択可否。|—|NOT RUN|NOT RUN|
|F3:PRIV-04|F6|IndexedDB failure時のemergency導線。|—|NOT RUN|NOT RUN|
|F3:PRIV-05|F6|file保存失敗時に成功表示しない。|—|NOT RUN|NOT RUN|
|F3:PRIV-06|F6|private mode専用detector/blockを追加しない。|—|NOT RUN|NOT RUN|
|F3:PRIV-07|F6|session終了後の保持挙動を観測し、長期保証しない。|—|NOT RUN|NOT RUN|
|F3:MAN-01|F5|JSON parseとmanifestFormatVersion=1。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-02|F5|categoryKeysがcanonical 12種exact order。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-03|F5|R001 category usageStatus enum exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-04|F5|R001 category intention enum exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-05|F5|R001 overview 5 keyと各enum exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-06|F5|R002 serviceCore recordState / usageStatus / intentionOverride exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-07|F5|R002 category=12、question total=33。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-08|F5|R002全33 question keyと全canonical answer enum exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-09|F5|conditional question count=1。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-10|F5|conditional exact：subscription.billingSource active iff billing=="yes"。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-11|F5|unconditional key required + unanswered explicit。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-12|F5|active conditional key required + unanswered explicit。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-13|F5|inactive conditional key forbidden。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-14|F5|parent condition false transitionでchild prune、true transitionでunanswered materialize。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-15|F5|positive usageStatus=using→parent category positive整合＋必要時R07。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-16|F5|billing=yes→overview billing positive整合。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-17|F5|finance.asset=yes→overview finance positive整合。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-18|F5|importantData=yes→overview data positive整合。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-19|F5|familyKnow=no→overview family hidden整合。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-20|F5|F2-R07 exact。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-21|F5|F2-R08 completed+usageStatus=unanswered reject。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-22|F5|F2-R09 derived undecidedを保存せず再計算。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-23|F5|`git hash-object workflow/specs/YTK-F4-canonical-question-manifest-v1.json` 相当でblob SHAを計算しexpected `4a9950b19813e74bc51de2246465096818d375ac` と一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-24|F5|registry questionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-25|F5|manifestのenumを1値変更しversion未更新→FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-26|F5|manifestのquestion keyを1つ削除しversion未更新→FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-27|F5|billingSource conditionをyes以外へ変更しversion未更新→FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-28|F5|manifest bytes不変でquestionSchemaVersionだけ変更→FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-29|F5|runtime/generated manifestからenumを1つ欠落→deep-equal FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-30|F5|runtime/generated manifestへunknown key追加→deep-equal FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-31|F5|validatorがhand-written duplicate tableを参照しmanifestと不一致→static/integration FAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-32|F5|registry未ACTIVEまたはmanifest mismatchでproduction export/import/restore entrypoint disabled。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-33|F5|R001 approved/current source extractionとmanifestのUI回答enumが一致（canonical unansweredはF2 materialize規則として追加）。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-34|F5|R002 approved/current R2Q extractionとmanifest key/回答enumが一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-35|F5|R002 show condition extractionとmanifest condition一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-36|F5|F2承認設計のpresence/R07/R08/R09/positive-direction規範とmanifest validatorBindings一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-37|F5|display label/CSSのみ変更fixtureではsemantic manifestを変更せずquestionSchemaVersion据置。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|F3:MAN-38|F5|canonical key/enum/condition変更fixtureではmanifest blob SHA変化によりversion update必須を検出。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-01|F5|fileFormatVersion exact 1のみaccept。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-02|F5|unknown/0/2/string "1" reject。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-03|F5|schema/question exact accepted pairのみaccept。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-04|F5|schemaだけcurrent、question unknownをreject。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-05|F5|questionだけcurrent、schema unknownをreject。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-06|F5|old/future versionをmigrationしない。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:REG-07|F5|ACTIVE未設定でexport/import/restore entrypoint disabled。|stage1, restore, integration-boundaries|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-01|F5|normative manifest JSON parse/schema validation。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-02|F5|manifest category=12 / R002 questions=33 / conditional=1をassert。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-03|F5|R001全key/enum exact一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-04|F5|R002全key/enum exact一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-05|F5|billingSource condition exact一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-06|F5|F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-07|F5|manifest Git blob SHAとquestionSchemaVersion suffix exact一致。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-08|F5|manifest 1byte変更＋version未更新をFAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-09|F5|versionだけ変更＋manifest不一致をFAIL。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:MAN-10|F5|runtime/generated manifestとnormative JSONのdeep-equal。|stage1, integration-boundaries; generate.mjs --check|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-01|F5|overview exact `ovw_main`。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-02|F5|category 12 exact IDs。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-03|F5|categoryKey/recordId mismatch reject。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-04|F5|valid svc UUIDv4 accept。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-05|F5|uppercase/braces/v1/v7/invalid variant/service prefix typo reject。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-06|F5|duplicate service recordId reject。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-07|F5|generator collision fixtureでretry、3回failureでfail closed。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:RID-08|F5|editでrecordId mutation reject。|stage1, id-retry, restore|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-01|F5|valid gen UUIDv4 accept。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-02|F5|initial datasetでgeneration作成。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-03|F5|normal mutationでgeneration不変。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-04|F5|delete-all complete時だけnew generation。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-05|F5|delete-all abortで旧generation維持。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-06|F5|restore source generationをlocal currentとして再利用しない。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-07|F5|restore abortで旧generation維持。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:GEN-08|F5|old tab writeはgeneration mismatchでreject。|stage1, restore, ui|RELATED EVIDENCE ONLY|NOT RUN|
|REG:IOS-REG-01|F6|iPhone SafariでUUID generator primary/fallback経路を実機確認。|—|NOT RUN|NOT RUN|
