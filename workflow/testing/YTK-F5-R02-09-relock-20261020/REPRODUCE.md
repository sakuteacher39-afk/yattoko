# 実行・証拠の再現手順（追加正式実行は承認待ち）

1. この成果物commitをcheckoutする。製品固定commitは168274010a1aa45794de98dc71ac5735cb9d0ae1、成功runの実行runner commitはa969aa9c3d45aeb0cd2297c2e269ae155059b19e。
2. `archive/F5-TARGET-1682740.zip` をrepoの兄弟ディレクトリへ同名でcopyし、兄弟ディレクトリ `F5-TARGET-1682740/` へtarで展開する。archiveは `git -c core.autocrlf=false archive --format=zip 168274010a1aa45794de98dc71ac5735cb9d0ae1` から作成したexact blob snapshot。TARGET-LOCK.jsonに全1,377ファイルを固定している。runtime依存をsnapshotへ注入しない。
3. `fixtures/V-VALID-01.json` を兄弟ディレクトリ `F5-FIXTURES-99e566d/` に同名でcopyする。旧FIXTURES.jsonのbytes/hashと照合する。他のfixture、npm install、browser、IndexedDBは今回不要。
4. Node v24.20.0 / node binary SHA-256 / Windows x64はPREEXECUTION-R4.json参照。今回のNode-only実行には外部dependencyはない。環境差異は新revisionへ記録し無断代替しない。
5. 読み取りのみの検証例（repo rootから）:
   `node --input-type=module -e "import('./workflow/testing/YTK-F5-R02-09-relock-20261020/runner/common.mjs').then(m=>process.stdout.write(String(m.verify().length)))"`
   期待: 1377。target bytes/blob/hash・archiveを照合する。これは正式ケース実行ではない。
6. 成功runは `runs/F5-R02-09-R2-20261020-002/`。EVIDENCE-MANIFEST.jsonの全entryのbytes/hashを検証する。各input.binとobservation.jsonに期待値・実測値・独立oracle結果・時刻・attemptを記録し、ledger.jsonlは追記形式。
7. 実行時のcommand: `node workflow/testing/YTK-F5-R02-09-relock-20261020/runner/run.mjs PREEXECUTION-R4.json`。既存runがあるcheckoutでは排他作成guardが停止させる。再実行には別途承認、新run ID/attempt、新PREEXECUTION revisionとcommitが必要。既存runは削除しない。
8. runner/audit.mjsは製品を実行せず、全evidence・oracle・target・旧証拠・state countsを再検証する。AUDIT.jsonが既に存在する場合に上書きはできない。既存AUDITを消す必要はない。audit sourceを読むか、コピーした検証領域で新名へ出力する。

初回run001は終了処理のReferenceErrorでNOT VERIFIABLE。SUMMARY.jsonのPASSは終了前に書かれた暫定値であり、FINAL-VERDICT.jsonが正式な扱いを示す。全87観測、元SUMMARY、ledgerは削除・修正せず保持。RUN_STOPを追記しincident manifestを別途生成した。修正はrunnerにprep importを追加し、plan filenameとattemptのrevisionを引数から利用するもの。製品コードへ変更を加えていない。

実ブラウザーのFile picker、UI、IndexedDB transaction、F6実機は今回の検証範囲に含めない。
