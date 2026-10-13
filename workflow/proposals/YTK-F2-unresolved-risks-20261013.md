# YTK-F2 未解決リスク一覧

- 作成日: 2026-10-13
- 状態: **OPEN RISKS / 制作管理室レビュー待ち**
- 本文は残存リスクの明示であり、承認・解消済み判定ではない

| Risk ID | 残存リスク | 現在の扱い | 解消/評価工程 |
|---|---|---|---|
| R-F2-01 | Safari等でブラウザー保存が長期に消失する | 利用開始時に注意し、ファイルbackupを推奨。保存成功と長期保持を区別 | F6実測 + 公開説明審査。自然長期消失は観測できなければ未検証 |
| R-F2-02 | device/browser quota不足で10MB未満でも保存失敗 | app 10MB審査とは別。transaction失敗として扱い未保存を保持 | F5例外試験 / F6実機 |
| R-F2-03 | 10MB近傍のJSON/UTF-8全量計測がiPhone Safariで重い | 安全性優先で現時点は全量canonical計測案。最適化は勝手に導入しない | F5性能測定 / F6 iPhone |
| R-F2-04 | IndexedDB transactionのinactive/auto-commit差異 | transaction内で無関係asyncを挟まない設計。complete判定 | F5 artificial delay / browser自動試験、F6 |
| R-F2-05 | BroadcastChannel等の更新通知が環境差で届かない | 通知は補助。正否はDB transaction内revision比較のみ | F5/F6 |
| R-F2-06 | 「その他」名に秘密情報を利用者が誤入力する | free textをサービス名だけに限定、警告、length/shape validator。regex検知を保証扱いしない | F5 malicious input / F6 UX |
| R-F2-07 | Browser extension / compromised same-origin scriptがIndexedDBを読める | 端末保存だけで機密性を保証しない。third-party script最小化、CSP/originをF4前審査 | F4設計審査 / F7公開審査 |
| R-F2-08 | 共用端末の同一browser profileから他者が閲覧できる | 利用開始説明でリスク明示。認証はR005凍結のため追加しない | F7文言審査 |
| R-F2-09 | 復元ファイルが改変・破損・巨大・悪意ある | F3でstrict allowlist、size、version、duplicate、XSS、transactional restoreを確定 | F3レビュー / F5 |
| R-F2-10 | 緊急退避fileが10MBを超える、またはfile保存自体が失敗 | 成功保証しない。F3でraw/parsed sizeと再取込境界を決定 | F3 |
| R-F2-11 | file download開始と実際の端末保存完了をアプリが完全には確認できない | 「退避できた」と断定しない。必要なら利用者にファイル存在確認を促す | F3 UX / F6 |
| R-F2-12 | pending overlayを復元時に誤ってcommittedへ混ぜる | committed/pendingを分離しsilent merge禁止 | F3 / F5 |
| R-F2-13 | schema/question意味変更で旧回答を誤解釈 | schemaVersion、必要ならquestionSchemaVersion。unknownは拒否/移行へ | F3/F4/F5 |
| R-F2-14 | dataset generation/revision overflowや破損 | revisionはsafe integer範囲を検証し不正値はfail closed。generationはUUID候補 | F4具体仕様 / F5境界 |
| R-F2-15 | 同名サービスが複数存在し誤統合 | service名をidentityに使わずrecordIdで管理。自動dedupeしない | F5 |
| R-F2-16 | category削除と「使っていない」変更を利用者が混同 | 別操作として維持。削除は明示確認 | F4 UX / F6 |
| R-F2-17 | 保存エラー6分類のブラウザー例外へのmapping精度 | 根拠不足は「原因不明」。断定しない | F5 browser error mapping / F6 |
| R-F2-18 | 保存データをanalytics/error monitoringへ誤送信 | 整理画面はcontent payload送信禁止。SDK採用時はfield allowlist | F4/F5/F7 |
| R-F2-19 | static hosting/provider access log自体は存在し得る | 整理内容をrequest URL/bodyへ載せない。「運営は一切取得しない」と表現しない | F7 |
| R-F2-20 | persistent storage API採用可否 | 本修正では自動採用しない。既承認UXを変更しない | 必要性が出た場合のみ人間判断 |

## 人間判断が必要になる可能性がある事項

現時点で追加承認を要求せず、制作管理室レビューへ回す。

制作管理室が以下を「既存UXを変える必要がある」と判断した場合だけ人間へ差戻す。

1. 復元時pending overlayを利用者へどう確認させるか
2. category削除時の確認文言・段階
3. persistent storage API等、追加browser permission/挙動を導入するか
4. 10MB近傍性能が実機で許容不能だった場合の上限/方式見直し
5. third-party analytics等を無料版へ導入するか

追加費用、外部resource、R005再開は本F2修正の対象外。
