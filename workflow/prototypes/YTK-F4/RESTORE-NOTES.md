# F4 第3段階 取込・復元 実装binding

F3承認設計v0.3（3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641）を参照する。第2段階BACKUP-FORMAT.mdのfield/順序・checksum対象を変更しない。IndexedDB schema/manifest/ACTIVE registryも変更しない。

## 取込

File.size上限 → File.arrayBuffer → BOM拒否/UTF-8 fatal decode → lexical scan → full JSON.parse → exact schema/version/presence → canonical full bytes一致 → SHA-256 → F2/pending semantic検証 → verified file token。

- scannerは各objectのdecoded key集合で重複を拒否。文字列tokenのescapeを検査・解釈してから比較する（全体JSON.parseの前にscalar string tokenだけをparseする）。
- 数値は非負safe integerのdecimal lexical formだけ。-0、指数、小数、leading zero、非数値を拒否。Unicodeはunpaired surrogateを拒否。
- depth16、既知pathのmember数、categories12、operations/dependencies256、pending1MB、raw16MBを先に検査。サービス配列上限はmanifest/catalog由来の最小service projection長から算定した10MB理論上限を保守的に使用する。文字列token4096 chars、omittedScopes配列10,000の補助guardはv1で生成される有効な値を制限しない範囲の早期拒否。
- 余分な空白・field並替・非canonical escapeも拒否。未知fieldを救済・削除して受け入れない。NFC/trim補正を取込で行わない。
- pending summaryはomitted/exported ordinalの完全被覆・非重複・件数一致を区間演算で検証する。巨大ordinal範囲を展開しない。
- pendingのID、base、fingerprint、dependency、context、no-op、条件質問、completed invariantを共通F2 validatorと書出し側semantic helperで検証する。
- verified token/envelopeはimmutable。検証済みtokenの証拠はmodule内WeakSetに保持し、任意のJS objectで検証を省略できない。

## 復元

現在stateを同一readonly transactionで取得。

- VALID: F2正本として検証可能。
- EMPTY: 全canonical storesにrecordが無い。
- CORRUPT_COMPARABLE: raw stateを決定的に表現・比較できるがsemantic不正。別の破棄確認も必須。
- CORRUPT_UNCOMPARABLE: 読取不能、cycle、Date/Blob等の未対応値、store不一致等。全置換禁止。

raw guardはnull/undefined/string/boolean/finite number/plain object/連続arrayをtag付きで表現し、object keyはcode-unit順。-0も区別する。循環・unsupported値は「空」にせず停止する。

preflightでsource/currentと異なるgenerationを生成（最大3回）、globalRevision=1、source record revisionsを保持したcandidateを作成。F2検査・10MB検査・canonical expected bytes作成までtransaction外で完了する。preview tokenもimmutableで、guard/candidate/bytesはprivate WeakMapにfreezeする。

明示確認後だけreadwrite transaction開始:

1. GUARD: 全storeを読取。preview raw bytes一致、VALIDならgeneration/global/record guardも照合。
2. CLEAR: 全store clearのsuccessを待つ。
3. PUT: candidateの全meta/recordsを投入し、全put successを待つ。
4. READBACK: 全storeを再取得しF2 projection/UTF-8 bytesを同期再構成。expected bytes、generation、globalRevision=1を完全一致で照合。
5. readbackVerified=true後の通常auto-commitを許可。oncompleteだけで成功resultを発行。

callback内のawait/Promise継続/timer/File API/Web Cryptoは禁止。同期例外・request error・不一致ではabort。preview tokenはIN_FLIGHT/COMPLETE/FAILEDへ遷移し二重実行を拒否。abort後のretryは新しいpreview・明示確認から行う。

## pending再適用

snapshot restore成功resultのprovenanceをprivate WeakMapに保持。ReapplySessionはこの成功証拠がある場合だけ生成し、取込だけや同内容の現在datasetから推測生成しない。

memory contextはsourceFileId、sourceSnapshotGenerationId、restoredGenerationId、restoredBaselineGlobalRevision=1、lastKnownGlobalRevision、orderedOperationIds、receiptMap、ACTIVE/INVALIDATED状態を保持する。

- 各操作で選択file identity、source/current generation、global/record revisions、expected canonical content、expected-before、dependency prefixを再確認。
- ordinal順で1件ずつ利用者確認が必要。二重tapはIN_FLIGHTで拒否。最初のsnapshot復元と別transaction。
- 通常save pipeline内でもexpected-before canonical textを再確認し、容量/版/親子整合の既存guardを通す。通常saveの既存呼出しは変更なし。
- transaction completeかつglobalRevisionが1増加した後だけAPPLIED receiptを作る。失敗/no-opはreceiptなし。
- 同一source・同一memory context・current guard一致・正規APPLIED receiptがある場合のみALREADY_APPLIED。値/content fingerprint一致だけでは判定しない。
- ページ再起動でcontext/receiptが無ければ自動適用もskipもしない。同一fileの再検証でも生きている同一contextの証拠だけを再利用する。
- visibilitychange/pageshowでもguardを再確認。競合は無効化して停止。
- deleteAll等でgenerationが変わるとrestored generationの証拠条件を満たさなくなるため、残る自動的な進行・既適用判定を停止する。

## 第3段階の画面接続

ファイル検証→preview→全置換確認、破損時追加確認、復元後の「未保存の回答を確認する」→1件の確認→「この回答を適用する」を別操作にする。未収録件数を明示し救済済みと扱わない。利用者文字列はtextContentで表示する。

既存画面のlocal pending/draftを勝手にclearしない。復元成功後、旧画面からの保存を止め、ファイルpendingの確認・適用は復元panelで行う。メイン画面への自動遷移・復元後の通常編集再開統合は第4段階へ持ち越す。明示reloadは可能だがmemory context喪失を伴うため、画面で未保存回答確認後に行うよう案内する。
