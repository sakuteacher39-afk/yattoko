# F5 カテゴリー受理審査・再適用3件追跡
製品 15a146a9b2c4f80c63798eb31d64b6774a4c2e99。入力台帳は第7バッチ d18db02241566cb230ac9fe7aa8e798e60bf51d0。先行実測 f595259d58d56c217f828f54bc8057f92d6a446b。対象は F2:CAT-01〜17・19 と F3:R05-08・26・28。CAT-18は仕様判断対象。
カテゴリーの正式判定根拠は原計画のケース固有条件、CASEBOOKのDS-BASE/DS-MIXとNONE、画面記号・正本・カタログ・質問キーの照合、通常保存・署名済み取込・復元・通常編集拒否の実測。元fixtureを既存登録値とSHA-256・バイト長で照合する。欠落や実測差はPASSにしない。
再適用は通常経路の前段拒否と、テスト限定でデコード済み操作の対象を差し替えた再適用時の業務規則を別々に記録。正常対照、書込トランザクション・receipt数、旧正本ハッシュを測定する。この注入は実利用者が入力したファイルで同じ箇所に到達できることの証明には用いない。
再現にはテスト用の空ディレクトリで固定製品のF4/src内の対象mjsを直下に置き、F4/package*.jsonからnpm ci --ignore-scriptsする。承認済みprototypeをr001.html／r002.html、manifestをmanifest.jsonとして置き、F5-preparationのprepare-fixtures.mjsとFIXTURES.jsonを取得。setup.mjs・review.mjs・reapply-review.mjsを同じ場所に置き node review.mjs と node --experimental-test-module-mocks reapply-review.mjs を実行する。各実行は新規の模擬IndexedDBを使う。
