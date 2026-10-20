# 検証・再現方法（追加実行は承認待ち）

- この成果物branchをcheckoutし、READMEの固定subject/runner commitを確認する。製品snapshotのarchive/lockは本ディレクトリに同一コピーを収録している。
- `archive/F5-TARGET-1682740.zip` をrepo兄弟フォルダへ同名でcopyし、兄弟 `F5-TARGET-1682740/` へtarで展開する。lock全1,377ファイルのexact Git bytesを検証し、node_modules等を入れない。
- 本ディレクトリfixtures/の原本を、repo兄弟 `F5-FIXTURES-99e566d/` に同名でcopyする。ハッシュはFIXTURE-CALIBRATION.json。全caseの実行入力はinputs/に固定されており、run中には再生成しない。
- Nodeはv24.20.0、binary SHAはPREEXECUTION-R2.json。fake-indexeddb6.2.4はmutable開発checkout側のnode_modulesから読み、snapshot外に置く。全packageファイルのhashはplan.runtime.dependencies。ブラウザー/ネットワーク/追加dependency取得は実行に不要。
- 初回コマンド（runner commit 563a777126bd7fa80e416dc603f57d0f2283478d）:
  `node workflow/testing/YTK-F5-regression-R02-mini1-20261020/runner/run.mjs PREEXECUTION-R2.json`
- R02-05だけのretry（runner commit b15c54d9e19efdbad859d7fe2accc4205e3a9d2a）:
  `node workflow/testing/YTK-F5-regression-R02-mini1-20261020/runner/run.mjs RETEST-R05.json`
- 上記は既存runが存在すると排他作成guard等で停止する。旧runを削除して再実行しない。新規実行には新plan revision/run ID/attemptと必要な承認を用意する。
- 読み取りのみで確認する場合はARTIFACT-MANIFEST.jsonの全file bytes/SHA-256を照合する。各runのEVIDENCE-MANIFESTも同様に検証する。manifest自身のhashはGit commitおよび上位manifestに結び付く。
- runner/audit.mjsは製品を実行せず、Git source binding、全755観測、expected/oracle、digest bytes、ledger、target/旧証拠/依存環境の一致を再検証する。既存AUDIT/判定はwxで上書き不可。再確認はソースのassertionを利用して別の出力名/検証領域へ記録し、既存ファイルは消さない。
- 判定の正本はFORMAL-VERDICTS.json。R02-29のraw runner PASSを無条件に正式PASSへ転記しない。内容不変とdescriptor変更7件を分けた観測と、未解決の適合判断をR29-REVIEW-REQUIRED.jsonに記録している。
- 実ブラウザー/F6、残る55件、他のF5は実行しない。
