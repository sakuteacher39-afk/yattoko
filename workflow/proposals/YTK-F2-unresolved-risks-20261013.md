# YTK-F2 未解決リスク一覧

- 更新日: 2026-10-13
- 状態: **OPEN RISKS / 再レビュー待ち**
- F2-R01〜R06差戻し対応後の残存リスク
- 設計是正を試験PASS扱いしない

| Risk ID | 残存リスク | 今回の制御 | 次工程 |
|---|---|---|---|
| R-F2-01 | Safari等の長期保存消失 | 開始時の消失注意+適宜backup推奨を維持 | F6/F7。自然消失を短期試験でPASSにしない |
| R-F2-02 | 10MB未満でもbrowser quota不足 | app上限とbrowser quotaを分離 | F5/F6 |
| R-F2-03 | 10MB近傍の全量serializationがiPhoneで重い | canonical full projectionを安全性優先で維持 | F5性能/F6 |
| R-F2-04 | transaction inactive/auto-commit差 | transaction中に無関係asyncを挟まない、completeのみ成功 | F5/F6 |
| R-F2-05 | multi-tab通知欠落 | BroadcastChannel等に正否を依存しない | F5/F6 |
| R-F2-06 | first mutationとdataset baseline初期化の実装ミス | baseline+最初のmutationを1transaction、globalRevision=1 | F5-PART |
| R-F2-07 | unansweredとunknownの取り違え | explicit enumを分離 | F5-PART/F6 |
| R-F2-08 | partial serviceをcompletedと誤認 | recordStateを明示 | F5-R2INT/F6 |
| R-F2-09 | completed service編集途中が旧completedのまま残る | 最初の実データ変更と同時にpartialへ戻す | F5-R2INT |
| R-F2-10 | 同名serviceの誤統合 | recordId正本。service名/category表示名でmergeしない | F5-ID |
| R-F2-11 | category displayCodeとcategoryKeyの混同 | canonical keyを内部ID固定、displayCode非正本 | F5-CAT |
| R-F2-12 | service detail positiveとR001 negativeが部分commit | 同一transactionでpositive方向整合 | F5-DIR |
| R-F2-13 | R001 negative操作が既存positive detailを破壊 | commit停止・再確認、child自動変更禁止 | F5-DIR/F6 |
| R-F2-14 | service delete/negative化でsummaryが誤ってnegativeへ落ちる | negative方向自動整合禁止 | F5-DIR |
| R-F2-15 | category moveの誤実装 | 現行UIではmove非提供、ordinary editのcategoryKey変更拒否 | F5-CAT/DIR |
| R-F2-16 | otherServiceName正規化で利用者文字列を過剰変換 | NFKC不採用、NFCのみ | F5-TXT/F6 |
| R-F2-17 | control/bidiを利用した表示攪乱 | C0/C1/DEL+bidi controlをreject | F5-TXT |
| R-F2-18 | secret-like文字列をregexだけで完全判定できない | regexは補助。free text最小化/D区分fieldなし | F5/F7 |
| R-F2-19 | XSS | textContent相当、import unknown structure拒否 | F5 |
| R-F2-20 | compromised same-origin/extensionによるIndexedDB閲覧 | third-party最小化/CSP/origin審査。端末保存=機密保証ではない | F4/F7 |
| R-F2-21 | analytics/error monitoring流出 | content payload外部送信禁止 | F4/F5/F7 |
| R-F2-22 | canonical projection実装差で同じdatasetのbyte数が変わる | property/order/unanswered/inactive rule固定 | F5-CAP |
| R-F2-23 | partial serviceを容量から除外して上限回避 | partial/completed両方をcapacityへ含める | F5-CAP |
| R-F2-24 | emergency pendingでfileが10MB超 | IndexedDB 10MBとは別。F3でfile上限を決める | F3 |
| R-F2-25 | emergency pendingをrestoreで自動commit | pendingは別領域、silent apply禁止 | F3/F5-RST |
| R-F2-26 | normal backupがcompletedだけになり途中確定回答を失う | committed partialもnormal backupへ含める | F5-BKP/F6 |
| R-F2-27 | backup/export開始を成功と誤認 | file存在/完了確認の限界を表示し成功断定しない | F3/F6 |
| R-F2-28 | unknown/破損/巨大file | strict validation/atomic restore | F3/F5 |
| R-F2-29 | restore/delete-all後に古いtabが復活 | generation切替 | F5/F6 |
| R-F2-30 | schema/question version migration誤解釈 | unknown version拒否/別migration経路 | F3/F5 |

## 制作管理室レビュー後も残る可能性が高いもの

以下は設計だけでは解消できない。

- iPhone Safariでの10MB近傍性能
- Safari privateの実挙動
- browser quota例外mapping
- long-term natural eviction
- file download/restoreの実機挙動
- CSP/origin/第三者scriptの公開構成
- F3 file size境界

これらを「設計済み」を理由にPASSへ変更しない。

## 人間追加判断

現時点では要求しない。

次の場合だけ人間へ差戻す:
- 10MB方式変更
- 中断UX自体の変更
- private mode detector/block追加
- backup催促追加
- persistent storage等のpermission/behavior追加
- analytics/third-party送信
- 外部resource/課金
- R005再開
