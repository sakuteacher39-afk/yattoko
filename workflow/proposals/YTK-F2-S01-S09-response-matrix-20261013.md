# YTK-F2 S01〜S09 指摘対応表

- 作成日: 2026-10-13
- 状態: **PROPOSED / REVIEW REQUIRED**
- 根拠: 2026-10-13 F2安全性審査「CHANGES_REQUIRED」
- 安全性試験PASSを意味しない

| ID | 審査指摘 | 修正設計 | 既存仕様との整合 | 残存確認 |
|---|---|---|---|---|
| S01 | 旧R002の配列位置 / editIndex / inheritedIntentionを永続化すると誤更新・古い継承値の危険 | 保存層はstable recordIdで管理。配列indexを保存しない。serviceにはintentionOverrideのみ保存し、effective intentionは現在のcategory intentionから算出 | R002 UXは変更せず、APPROVED prototypeをUI参考として維持。R003のカテゴリ意向とservice overrideの分離を維持 | recordId生成・重複・移植adapterをF5で試験 |
| S02 | R001/R002が部分確定して矛盾する危険 | categories / overview / services / metaを分離。依存する変更は共通readwrite transactionで版照合・整合審査・commit。一意な肯定方向のみ自動整合、否定方向は自動変更しない | R003の正本役割分離・明白矛盾ルールをそのまま採用 | 親変更・カテゴリ削除・片側abort・未解決再確認をF5 |
| S03 | 複数タブ競合、削除済みデータ復活 | record revisionに加えglobalRevision + generationId。保存時は3種のexpected版を照合。全削除・全置換復元でgeneration切替。auto merge / force overwriteなし | 人間承認済みB案を具体化。record revision自体は維持 | Chrome/Safari複数タブ、復元・全削除競合をF5/F6 |
| S04 | request successを保存成功と誤認、非同期順序逆流 | transaction `complete`だけを保存成功。abort/errorは未保存保持。同一タブsave coordinatorで直列化しmutationSeqで古いcompleteの表示逆流を防止 | 既承認の保存成功/失敗明示を強化 | 連打、遅延、abort、inactive、ページ遷移をF5/F6 |
| S05 | 復元・破損・削除が不安全 | F3へallowlist検証、unknown version拒否、duplicate ID検出、全置換atomic transaction、失敗時旧データ維持、restore/delete-allでgeneration切替を必須引継ぎ | F3未承認境界を維持。ファイル形式自体は確定しない | raw file上限・展開後上限・10MB超緊急退避再取込はF3未決 |
| S06 | 秘密情報/XSS/外部送信 | free memoなし。その他名60字・構造/型/禁止field検証。user textをHTML実行しない。JSON unknown key/nest拒否。analytics/APM/replay/logへ整理内容を出さない。origin/CSPはF4前審査 | R003 D区分、ログ本文禁止、R002その他入力限定を維持 | browser extension、origin compromise、CSP/第三者scriptはF4/F7でも確認 |
| S07 | 10MB境界・物理quota・iPhone負荷 | 固定順canonical projectionをJSON.stringify + TextEncoderで計測。meta/ID/revision込み。10,000,000可、10,000,001拒否。browser quota errorは別分類 | 人間承認済み10MB/UTF-8方式を維持 | 10MB近傍のiPhone性能、transaction寿命、QuotaExceededErrorをF5/F6 |
| S08 | IndexedDB長期消失 | 利用開始時の消失注意 + 適宜ファイルbackup推奨を維持。「保存済み」はcommit済みであって長期保持保証ではない | 2026-10-13人間決定の表示タイミングを変更しない | Safari長期自然消失は短期試験でPASS扱いしない |
| S09 | 緊急退避で未保存入力と保存済みデータが混在 | committed snapshotとpending overlayを意味上分離。pendingも同じ入力validatorを通す。restore時に黙ってmerge/commitしない。file生成失敗を成功表示しない | 保存失敗時の未保存回答込み退避を維持。F3共通形式の詳細承認はしない | pending再適用UX、file format、max file sizeはF3審査 |

## 横断条件

すべてのS01〜S09で共通して以下を維持する。

- R001/R002/R003の人間承認範囲を拡大しない
- F4実装へ進まない
- F5/F6未試験をPASS扱いしない
- R005凍結を解除しない
- サーバー保存・認証・クラウド同期を再開しない
