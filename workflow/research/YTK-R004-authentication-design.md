# ヤットコ 調査報告

調査ID: YTK-R004
状態: APPROVED
調査日: 2026-10-04

承認記録:
- 最終判定: APPROVED
- 承認範囲: YTK-R004「認証設計」の調査・設計方針
- 未承認:
  - 認証実装
  - auth provider契約 / 設定
  - Passkey実装
  - OAuth設定
  - DB実装
  - サーバー接続
  - 本番保存
  - 本番公開
- 次工程: 人間による開始指示待ち。YTK-R005を自動開始しない

## 調査目的

YTK-R003でAPPROVEDとなった保存データ仕様を前提に、
将来サーバー保存されたヤットコ整理データを

「誰に、どの条件で返すか」

を決めるための認証設計候補を整理する。

今回の調査対象は以下。

- 本人認証
- 認証方式
- MFA
- 高リスク操作時の再認証
- アカウント復旧
- セッション管理
- アカウント乗っ取り対策
- 認証データと整理データの分離
- 運営者・管理者権限
- 退会 / 全削除時の本人確認
- 長期未利用アカウント
- 将来の家族共有 / 代理 / 死後 / 緊急アクセスとの整合

本調査では認証実装、ログイン画面制作、DB作成、認証サービス契約、OAuth設定、Apple / Google Developer設定、APIキー発行、秘密鍵作成、MFA実装、Passkey実装、本番公開、GitHub Pages公開、YTK-R005開始は行わない。

## 前提資料

- `workflow/research/YTK-R003-storage-data.md`
  - 状態: APPROVED
- `workflow/reviews/YTK-R002-prototype-review.md`
  - 状態: APPROVED
- `workflow/proposals/YTK-R002-detailed-organization-proposal.md`

R003の以下を固定前提とする。

- 必要最小限の構造化整理データだけをサーバー保存候補とする
- 外部サービス識別情報の実値は標準サーバー保存対象外
- 自由メモは現段階では実装しない
- 外部サービスのパスワード等は入力・保存しない
- 整理内容を通常サポート・通常管理者へ表示しない
- 分析 / 監視基盤へ整理内容を流さない
- DB / インフラ権限とbreak-glassを通常管理権限から分離する
- 削除・バックアップ要件を維持する

## 最重要原則

### ヤットコ認証と外部サービス認証を分離する

ヤットコ自身へのログイン認証と、
利用者が整理対象として登録するApple、Google、銀行、証券、SNS、メール等の認証情報を混同しない。

ヤットコの認証方式を決めても、
外部サービスについて以下を入力させない。

- パスワード
- PIN / 暗証番号
- 端末パスコード
- OTP
- OTPシード
- 復旧コード
- 秘密鍵
- シードフレーズ
- カード完全番号
- CVV / CVC
- パスキー秘密情報
- APIキー
- アクセストークン
- SSH秘密鍵
- その他、直接ログイン・本人確認突破・資産操作に使える秘密情報

R004はR003のD区分を整理データ保存対象へ昇格させない。

### 内部ユーザーIDを正本にする

認証メールアドレスやApple / Googleのメールアドレスを
整理データのユーザー主キーにしない。

ヤットコ内部の不透明な `userId` を正本とし、
認証側のメール、Passkey credential、Apple / Google subject等は
認証IDとして内部ユーザーIDへ紐付ける。

認証方法を変更しても整理データの所有者IDが変わらない構造を優先する。

## ヤットコの認証リスク評価

YTK-R003で保存候補となった情報には、

- 利用中サービス
- 金融系サービスの存在
- 資産 / 残高等の存在有無
- 本人意向
- 家族が存在を把握しているか
- 復旧 / 引継ぎ設定
- 継続課金
- 事業上の重要度

等が含まれる。

正確な金融残高や外部サービス認証秘密は保存しないため、
銀行サービスそのものと同水準の認証を必須とする必要はない。

一方、
複数項目が集合すると利用者の生活・資産・家族・認証構造を推測できるため、
一般的な低重要度サイトより高い保護が必要。

### 主な被害

アカウント乗っ取り時に想定される主な被害:

- 利用サービス一覧の閲覧
- 金融・資産存在の推測
- 本人意向の閲覧・改変
- 全整理データ削除
- 認証情報変更による本人締め出し
- データエクスポートによる持ち出し
- 将来の家族アクセス設定の悪用

### 認証設計上の目標

- 普段のログインは一般利用者が使える程度に簡単
- フィッシング耐性のある方式を必ず用意する
- 高リスク操作では通常閲覧より強い再認証を要求する
- 一つのメールアカウント喪失だけで全復旧経路が失われない
- 一つのログイン済みセッションだけで認証方法を乗っ取れない
- 運営者サポートが整理内容を見て「本人らしさ」を判定する復旧方式にしない

## 確認した主要公式資料

### NIST

- NIST SP 800-63B-4 Digital Identity Guidelines: Authentication and Authenticator Management
  https://pages.nist.gov/800-63-4/sp800-63b.html

確認した主な点:

- AAL2では二要素の証明が必要
- AAL2ではフィッシング耐性のある認証方式を提供することを要求
- Passkey等の同期可能な暗号認証器は、条件を満たせばAAL2用途に利用可能
- 複数の認証手段をアカウントへ紐付けることを推奨
- 新しい認証器を追加する際は既存の強い認証と通知が重要
- アカウント復旧は通常認証と別の高リスク工程
- 復旧イベントでは通知が重要
- AAL2の参考値として再認証のoverall timeoutは24時間以内、inactivity timeoutは1時間以内
- CookieはSecure、HttpOnly、SameSite等の安全属性を使う
- セッション秘密をlocalStorage等の安全でない場所へ置かない
- メールは高保証のout-of-band認証として扱わない

### OWASP

- Authentication Cheat Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- Multifactor Authentication Cheat Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html
- Session Management Cheat Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- Forgot Password Cheat Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html

確認した主な点:

- パスワード攻撃に対してMFAが有効
- 認証失敗にはレート制限・試行制御が必要
- 高リスク操作や認証方式変更では再認証が必要
- MFA要素変更はログイン済みセッションだけを信用しない
- セッションIDは認証・権限変更時に更新する
- CookieはSecure / HttpOnly / SameSite等を使用する
- CSRF対策を別途実装する
- パスワード再設定・復旧はアカウント列挙防止、短寿命・単回使用トークン、レート制限等が必要
- MFA復旧は通常のMFAを簡単に迂回する弱い裏口にしない

### FIDO Alliance

- Passkeys
  https://fidoalliance.org/passkeys/

確認した主な点:

- FIDO Passkeyは公開鍵暗号を使用
- パスワードを共有秘密としてサーバーへ送らない
- フィッシング耐性を持つ
- credential stuffing等のパスワード由来攻撃を大きく減らせる

### Apple

- About the security of passkeys
  https://support.apple.com/en-us/102195
- Configure Sign in with Apple for the web
  https://developer.apple.com/help/account/capabilities/configure-sign-in-with-apple-for-the-web/

確認した主な点:

- PasskeyはWebAuthnベースで、サーバーは公開鍵を保持し秘密鍵は保持しない
- Apple端末ではFace ID / Touch ID等でPasskeyを利用できる
- iCloud KeychainでPasskeyを同期・復旧できる
- Sign in with AppleはApple Accountへの外部依存を伴う
- Web導入にはDeveloper側設定が必要

### Google

- Passkeys
  https://developers.google.com/identity/passkeys
- OpenID Connect
  https://developers.google.com/identity/openid-connect/openid-connect
- Verify the Google ID token on your server side
  https://developers.google.com/identity/gsi/web/guides/verify-google-id-token

確認した主な点:

- Passkeyはサイト / アプリのIDへ束縛され、フィッシング耐性を持つ
- GoogleログインはOpenID Connectを利用できる
- ID tokenはサーバー側で署名、aud、iss、exp等を検証する必要がある
- Google連携ではメールアドレスよりproviderのsubjectを識別子として使う方が適切
- OAuth / OIDCではstate等のCSRF対策が必要

### Microsoft

- Passkeys (FIDO2) authentication method in Microsoft Entra ID
  https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2

確認した主な点:

- Passkeyはフィッシング耐性を持つ
- 端末の生体認証 / PINと組み合わせてMFAとして利用できる
- 一般利用者には同期Passkeyが実用的な選択肢となる
- 高権限利用者ではより強いデバイス束縛 / セキュリティキー等を検討できる

## 認証方式比較

評価はヤットコの一般利用者向けWebサービスを前提とした相対評価。

| 方式 | 安全性 | 乗っ取り耐性 | スマホUX | 高齢者含む一般UX | 復旧 | メール喪失時 | 実装複雑度 | 運用負荷 | 外部依存 | 将来性 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| メール + パスワード | 中 | 中以下 | 中 | 中 | 比較的容易 | 別復旧手段が必要 | 中 | 中 | 低 | 中 |
| メールマジックリンク | 中以下 | メール安全性に依存 | 高 | 高 | メールがあれば容易 | 非常に弱い | 低〜中 | 低〜中 | メール | 中 |
| メール + ワンタイムコード | 中以下 | メール安全性に依存 | 高 | 高 | メールがあれば容易 | 非常に弱い | 低〜中 | 中 | メール | 中 |
| Passkey | 高 | 高 | 高 | 初回説明が必要だが利用時は高 | 複数Passkey / 同期基盤次第 | メール非依存経路を持てる | 中〜高 | 中 | OS / browser / sync基盤 | 高 |
| Sign in with Apple | 中〜高 | Apple Accountの強度に依存 | iPhoneでは高 | Apple利用者には高 | Apple側に依存 | Apple Account次第 | 中 | 中 | Apple | 高 |
| Googleログイン | 中〜高 | Google Accountの強度に依存 | 高 | Google利用者には高 | Google側に依存 | Google Account次第 | 中 | 中 | Google | 高 |
| 複数方式併用 | 高 | 単一障害点を減らせる | 高 | 選択肢を整理しないと複雑 | 高 | 代替経路を作れる | 高 | 中〜高 | 複数 | 高 |

## 各認証方式の評価

### メールアドレス + パスワード

利点:

- 広く理解されている
- OSや特定IdPへ強く依存しない
- メールアドレス変更にも対応しやすい
- 実装パターンが成熟している

欠点:

- credential stuffing
- パスワード再利用
- フィッシング
- パスワード忘れ
- サポート / 復旧負荷

採用する場合:

- 平文パスワードは保存しない
- 認証ドメインで強いpassword verifierを保持する
- 単独認証に使うパスワードは長いものを許可・推奨する
- 漏えい済み / 一般的なパスワードのblocklist確認を行う
- 不要な文字種組合せルールや定期変更強制は避ける
- レート制限を行う

ヤットコではPasskeyが使えない利用者向け互換手段として候補。

### メールマジックリンク

利点:

- パスワードを覚えなくてよい
- スマホで理解しやすい
- サポート負荷を下げやすい

欠点:

- メールアカウント乗っ取りがヤットコ乗っ取りへ直結しやすい
- メール配信遅延 / 迷惑メール
- 別端末でリンクを開く混乱
- フィッシングとの見分けが難しい
- メールを失うと復旧経路も同時に失う

結論:

ヤットコの保存データを守る通常ログインの唯一方式には推奨しない。

アドレス確認や限定的な復旧工程では使用候補。

### メール + ワンタイムコード

利点:

- パスワード不要
- リンクより端末間移動がしやすい
- 一般利用者へ説明しやすい

欠点:

- メールアカウント安全性へ依存
- フィッシングで転送させられる
- コード総当たり対策が必要
- メール喪失で利用不能

結論:

マジックリンク同様、
高保証の唯一認証方式にはしない。

使う場合は短寿命・単回使用・試行回数制限を必須とする。

### Passkey

利点:

- フィッシング耐性
- credential stuffing耐性
- サーバーへ秘密鍵を保存しない
- iPhone等ではFace ID / Touch ID / 端末PINで利用可能
- 再認証も比較的低負荷

欠点:

- 「Passkey」という概念自体が一部利用者に馴染みがない
- 端末・OS・同期基盤の違いで復旧UXが変わる
- 全端末喪失時の復旧経路が必要
- 複数Passkey管理画面が必要

結論:

**ヤットコの推奨第一認証方式。**

UIでは「Passkey」という専門語だけでなく、

「Face ID・指紋・端末のロック解除でログイン」

のような説明を併記する候補。

### Sign in with Apple

利点:

- iPhone利用者の摩擦が小さい
- ヤットコ側でパスワードを扱わなくてよい
- Apple Account側の認証保護を利用できる

欠点:

- Apple Account喪失・停止の影響を受ける
- Apple側仕様 / Developer設定へ依存
- 外部IdPの認証強度をヤットコが完全には制御できない
- Appleだけでは非Apple利用者の主方式にできない

結論:

iPhone利用者向けの**任意ログイン方式**として有力。
単独の唯一復旧手段にはしない。

### Googleログイン

利点:

- 多くの一般利用者がGoogle Accountを保有
- パスワードをヤットコ側で扱わない
- OpenID Connectの標準方式を利用できる

欠点:

- Google Account喪失・停止の影響を受ける
- provider側乗っ取りを継承する
- トークン検証・CSRF対策・アカウントリンク処理を正しく実装する必要がある

結論:

任意ログイン方式として有力。
ユーザー識別にはメールアドレスではなく安定したprovider subjectを使用する。

### 複数方式併用

利点:

- Passkey喪失時に別経路を持てる
- Apple / Google Account喪失の単一障害点を減らせる
- 利用者の端末環境に合わせられる

欠点:

- アカウントリンクが複雑
- 同じ人物が複数アカウントを誤作成するリスク
- 認証方式追加 / 削除が新しい攻撃面になる

結論:

**最終推奨。**

ただし「好きな方式を無制限に増やす」のではなく、
明確な優先順位とアカウントリンク規則を設ける。

## 推奨認証方式

### 推奨構成

**Passkey-first + 複数方式併用**

第一候補:

- Passkey

追加候補:

- Sign in with Apple
- Googleログイン
- メール + パスワード（互換 / fallback）

メールマジックリンク / メールOTP:

- メールアドレス確認
- アカウント復旧の一部
- 一時的な追加確認

には利用可能だが、
整理データが保存される本アカウントの唯一の通常認証方式にはしない。

### 初回登録候補

1. 内部ユーザーIDを作成
2. 認証方式を1つ登録
3. 認証メールアドレスを検証
4. Passkey未登録なら登録を強く推奨
5. 二つ目の独立した認証 / 復旧経路を設定するよう促す

### サーバー保存開始前の推奨条件

将来R005でクラウド保存を有効にする場合、
少なくとも以下のどちらかを満たす案を推奨する。

- Passkeyを1つ以上登録済み
- Passkey非対応 / 利用困難な場合は、別の強い認証 + 独立した復旧経路を登録済み

Passkeyを使えない人を完全排除しないが、
「メールだけで全データへ入れる」状態を標準にしない。

## 最弱認証経路と最低認証強度

### 基本原則

アカウント全体の安全性は、
登録されている最も強い認証方式ではなく、
**実際に利用可能な最も弱いログイン / 復旧経路にも制約される。**

したがって、
「Passkeyを1つ登録しているから、このアカウント全体がフィッシング耐性を持つ」
とは扱わない。

Passkey、password、Apple / Google等の各identityには
個別の認証保証レベルを持たせ、
そのセッションがどの認証経路で成立したかをサーバー側で判定する。

### 認証保証レベル候補

#### A0: メール所有確認のみ

例:

- メールmagic link
- メールOTP
- password reset link

許可候補:

- 復旧要求の開始
- 認証メール所有確認
- セキュリティ通知確認

禁止:

- P2〜P3相当の整理データ閲覧
- 整理データ編集
- エクスポート
- 削除
- 認証方式追加 / 削除
- Passkey追加
- メール変更
- 退会

メールだけでは本アカウントへの完全アクセスを復旧しない。

#### A1: 単一の低〜中保証ログイン

例:

- password単独
- Apple / GoogleのOIDCログイン単独で、ヤットコ側が十分なMFA / assuranceを確認できない場合

許可候補:

- アカウント識別
- セキュリティ設定画面への限定導線
- step-up要求
- 認証器一覧の限定表示
- 復旧手続き継続

原則禁止:

- P2〜P3相当の整理データ本文の閲覧
- 整理データ変更
- 高リスク操作

#### A2: 強い認証済みセッション

候補:

- user verification済みPasskey
- 将来、ヤットコが承認した同等以上のフィッシング耐性方式
- Passkey非対応者向けに別途承認される強い複合認証

許可:

- 通常の整理データ閲覧
- 通常の整理データ編集

高リスク操作はA2であってもfresh authenticationを別途要求する。

### 通常データ閲覧時の最低認証強度

**R003でP2〜P3相当とした保存整理データの閲覧にはA2を原則必須とする。**

つまり、
ログインセッションが存在するだけでは足りず、
そのセッションがA2へ到達している必要がある。

### Passkey登録後のpassword単独ログイン

Passkeyを登録済みのアカウントでは、
password単独でA2へ昇格させない。

passwordで本人候補を識別できても、
整理データを開く前にPasskey等によるstep-upを要求する。

passwordは以下の用途候補へ縮小する。

- fallback認証の一部
- 復旧要求の開始
- Passkey利用不能時の限定セッション

Passkey登録後もpasswordを残すか自体は未確定だが、
残す場合も「passwordだけで全データへ入れる弱い横口」にしない。

### Apple / Googleログイン単独

Apple / GoogleのOIDCログインは、
provider側で強い認証が行われている可能性があっても、
ヤットコが常にその保証強度を確認できるとは限らない。

したがって初期標準では、

- Apple / Google login単独 = A1
- ヤットコPasskeyでstep-up後 = A2

とする候補を優先する。

将来、認証providerから信頼できる `acr` / `amr` 等を取得し、
ヤットコ側の保証ポリシーで同等性を検証できる場合のみ、
OIDC単独をA2として扱う余地を残す。

メールアドレスの一致やproviderのブランドだけを根拠にA2へ昇格させない。

### Passkeyを持たない利用者

Passkey非対応 / 利用困難な利用者向けA2 fallbackは、
R005開始前に別途正式決定する。

決まるまでは、

- password単独
- メールOTP単独
- Apple / Google単独

をA2とはみなさない。

つまり、
クラウド保存を利用できる条件とA2到達条件を整合させてから実装する。

## MFA方針

### 一般ユーザー

**毎回一律にTOTP等を要求する方式は推奨しない。**

理由:

- 高齢者を含む一般ユーザーの負荷
- TOTPアプリ喪失時の復旧負荷
- R003でOTPシード等の秘密情報を整理データとして扱わない方針
- Passkey自体が端末所持 + 生体認証 / PINによる強い認証になり得る

### 推奨

- Passkeyログイン: 追加のMFA入力を通常は要求しない
- パスワードログイン: 新端末・異常リスク・高リスク操作では追加認証を要求
- Apple / Googleログイン: providerログインだけを「必ずMFA済み」と仮定しない
- 管理者: フィッシング耐性MFA必須

### TOTP

比較対象として有効だが、
初期推奨方式にはしない。

理由:

- seedの安全管理
- 端末移行
- バックアップ
- 紛失時復旧
- 一般利用者UX

将来採用する場合は、
認証基盤側で秘密を適切に管理する方式を別途レビューする。

### SMS

通常MFA / 復旧の主方式には推奨しない。

理由:

- SIMスワップ
- 番号移行
- 圏外
- NISTでもPSTN out-of-bandは制限付き

通知先としてのSMSは別途検討可能。

## 高リスク操作の再認証方針

「ログイン済みだから実行可能」にはしない。

### 再認証必須

| 操作 | 再認証 | 推奨強度 |
| --- | --- | --- |
| 全整理データ削除 | 必須 | Passkey等の強いfresh authentication |
| カテゴリ一括削除 | 必須 | fresh authentication |
| 退会 | 必須 | Passkey等 + 明示確認 |
| 認証メールアドレス変更 | 必須 | 既存強認証 + 新メール確認 |
| 認証方式追加 / 削除 | 必須 | 既存の強い認証 |
| Passkey追加 / 削除 | 必須 | 既存Passkey等の再認証 |
| MFA設定変更 | 必須 | 既存の強い認証 |
| データエクスポート | 必須 | strong fresh authentication |
| 新端末ログイン | 条件付き必須 | 使用方式 / リスクに応じstep-up |
| 将来の家族アクセス設定 | 必須 | 最強レベルのfresh authentication |
| 将来の死後 / 緊急アクセス設定 | 必須 | 最強レベル + 通知 / 再確認 |

### fresh authentication

候補:

**直近10分以内の強い再認証**

10分は法定値ではなく初期設計候補。
R005でUX検証と合わせて最終決定する。

高リスク操作画面を開いた時点ではなく、
確定直前に再認証する。

## Identity link / unlink規則

Apple / Google等の外部identity追加・削除は、
通常ログイン以上の高リスク操作として扱う。

### provider識別子

外部identityの一意識別には、
メールアドレスではなく

**issuer + subject**

を基準とする。

例:

- `iss`: provider issuer
- `sub`: provider内での安定したsubject

メールアドレスは連絡先・表示補助には使えても、
アカウント同一性の自動判定キーにしない。

AppleのPrivate Relay等で、
同一人物でも通常メールとは異なるアドレスが返る場合があるため、
メール一致 / 不一致を本人同一性の決定根拠にしない。

### 既存アカウントへのlink条件

既存ヤットコアカウントへApple / Google等を追加する場合、
最低限以下をすべて要求する。

1. 既存ヤットコアカウントへログイン済み
2. 既存のA2強度でfresh authentication済み
3. 追加するprovider側でも正常認証
4. OIDC tokenのissuer / subject / audience / expiry等をサーバー側で検証
5. 対象 `issuer + subject` が別ヤットコアカウントへ既に紐付いていない
6. link結果を監査ログへ記録
7. link完了を既存通知先へ通知

メールアドレスが一致しても、
未ログイン状態から既存アカウントへ自動linkしない。

### unlink条件

provider identityを削除する場合:

1. A2でfresh authentication
2. 削除対象identityを明示
3. unlink後も有効なA2認証経路 / 承認済み復旧経路が残ることを確認
4. 最後の有効認証経路を削除させない
5. unlinkを監査ログへ記録
6. unlink完了を通知

最後のPasskeyや最後の強い認証経路を消す場合は、
先に代替A2経路を登録させる。

### 新規ログイン時のメール一致

未ログイン状態でApple / Googleログインを行い、
既存ヤットコアカウントと同じメールアドレスが返っても、

**自動マージ / 自動linkしない。**

候補処理:

- 新規アカウント作成を保留
- 「既存アカウントへログインして連携してください」と案内
- 既存A2認証後にlink

### 重複アカウント

同一人物が誤って複数ヤットコアカウントを作成した場合でも、
整理データを自動マージしない。

理由:

- メール一致だけでは同一人物を保証できない
- 別用途・別人物の可能性
- P2〜P3データの誤結合リスク
- 本人意向や削除状態の衝突

将来アカウント統合機能を作る場合は、
両アカウントのA2 fresh authenticationと、
明示的な移行確認を必要とする別設計とする。

## アカウント復旧方針

復旧はR004で最重要の攻撃面として扱う。

### 基本原則

- 復旧は通常ログインより弱い「裏口」にしない
- サポート担当が整理内容を読んで本人認定しない
- 複数の認証手段を事前に登録できるようにする
- 復旧成功時は通知する
- 復旧後は既存セッション / 不明な認証器を見直す
- すべての手段を失った場合に、運営者が安易にアカウントを手渡さない

NISTも複数の認証手段を維持することを推奨している。

### 推奨復旧優先順位

#### レベル1: 既存の別認証器

最優先。

例:

- 2個目のPasskey
- 別端末のPasskey
- 既にリンク済みのApple / Googleログイン
- 既存パスワード + 追加確認

本人確認強度:
高

サポート介入:
不要

#### レベル2: ログイン済み信頼セッション + 強い再認証

端末を1台失っても、
別端末で有効セッションと別認証器があれば新しいPasskeyを登録できる。

新しい認証器追加時には通知する。

#### レベル3: 認証メールを使った復旧

メールによるリンク / コードだけで即座に全権限を戻す方式は避ける。

利用する場合:

- 短寿命・単回使用
- 試行回数制限
- アカウント存在を推測させない応答
- 復旧成功通知
- 新認証器登録後の既存セッション見直し
- 高リスク操作を一定時間制限するcooling-off候補

本人確認強度:
中以下

攻撃リスク:
メール乗っ取り / フィッシング

#### レベル4: サポート介入

通常サポート担当が
「登録していた銀行名を答えてください」
「本人意向を答えてください」
等の整理内容を本人確認材料に使うことは禁止候補。

R004時点では、
公的本人確認書類を使ったidentity proofingをヤットコ標準機能には含めない。

よって、
事前登録した信頼できる認証 / 復旧手段をすべて失った場合、
安全に復旧できないケースが存在し得ることを認める。

この場合:

1. アカウントを保護状態 / 凍結状態にする候補
2. 既知の通知先へ通知
3. サポートが認証を直接上書きしない
4. 将来、厳格な本人確認復旧を導入する場合は別プロジェクトで設計
5. 本人確認不能のままデータを第三者へ返さない

「永久ロックアウトを絶対ゼロにする」ために弱い復旧経路を作るより、
事前に二つ以上の認証経路を登録させる方を優先する。

### 個別ケース

#### パスワード忘れ

- メールで短寿命・単回使用の再設定リンク / コード
- 成功後に自動ログインさせず再ログイン
- 必要に応じ既存セッションを全失効
- Passkey登録を促す

#### メールアドレスへアクセスできない

- 別Passkey / Apple / Google等があればログインして変更
- 旧メールが使えない状態で、メールだけを根拠に変更しない
- 他の登録認証器がなければ通常変更ではなく復旧扱い

#### 端末紛失

- 別Passkey / 同期Passkey / 他認証方式を利用
- アクティブセッション一覧から紛失端末を失効
- 新Passkey登録後通知

#### Passkey利用端末紛失

- 同期Passkeyまたは2個目Passkey
- federated login / password fallback
- 新しいPasskeyを登録後、紛失credentialを削除

#### MFA手段紛失

- 既存の別認証器を優先
- MFA再設定は高リスク操作として再認証・通知
- サポートによる即時解除を避ける

#### Apple / Googleログイン元アカウント喪失

- 別に登録済みのPasskey / password / もう一方のIdPで復旧
- IdPだけを唯一の認証・復旧経路にしない

#### 登録メールアドレス変更

通常変更:

1. 既存強認証
2. 新メール検証
3. 旧メールへ変更通知
4. 必要に応じ一定時間の高リスク操作制限

旧メールにアクセスできない場合:
復旧フローへ移行。

#### 乗っ取り疑い

- 全端末ログアウト
- セッション失効
- 不明Passkey / IdPリンクの確認
- 認証メール変更履歴の確認
- 通知
- 高リスク操作一時制限候補

## メール復旧後の権限制御

### 基本原則

メール所有確認だけでは、
P2〜P3相当の整理データへの完全アクセスを復旧しない。

「メールでpasswordを再設定できる」ことと、
「メールだけでアカウント全権限を取り戻せる」ことを分離する。

### メールだけで可能な範囲

A0として以下までを許可候補とする。

- 復旧要求の開始
- 認証メール所有確認
- password再設定要求
- セキュリティ通知受信
- recovery-pending状態への移行

メール確認だけでは以下を許可しない。

- 整理データ本文閲覧
- 整理データ編集
- データエクスポート
- 全削除
- 退会
- 認証メール変更
- identity link / unlink
- 既存Passkey削除

### password忘れ時

メールでpasswordを再設定できる場合でも、
再設定成功だけでA2へ昇格させない。

Passkey登録済みアカウントでは:

1. メールでpassword再設定
2. password認証はA1
3. 保存整理データ閲覧前に既存Passkeyでstep-up
4. Passkeyを使えない場合は通常復旧フローへ

これにより、
メールアカウント乗っ取りだけでPasskey保護済みデータへ到達できない。

### メール確認後の新認証器登録

メール確認だけで新Passkeyを即登録し、
既存Passkeyと同等権限を与える方式は禁止候補。

新しいA2認証器を登録するには原則として、

- 既存A2認証器
または
- 将来正式承認される別の強い本人確認復旧

を必要とする。

メールしか残っていない場合は、
新Passkey登録を許可せずrecovery-pending / protected状態へ移行する候補を優先する。

### 既存Passkey等がある場合

既存A2認証器が一つでも残っている場合、
それを復旧の第一経路とする。

メールは補助確認・通知に留め、
強認証を飛ばす理由にしない。

### 全強認証手段を失った場合

以下をすべて失った場合:

- Passkey
- 承認済みの別A2認証器
- 信頼できる強い復旧経路

メール所有確認だけでは完全復旧させない。

標準処理候補:

1. recovery-pending
2. P2〜P3整理データを非表示
3. 編集・削除・export・identity変更を禁止
4. 既存通知先へ復旧要求通知
5. 安全な追加本人確認方式が存在しなければprotected / frozen状態
6. サポート担当が整理内容を本人確認材料にして解除しない

安全な本人確認ができない場合は、
無理に復旧させない現在方針を維持する。

### 復旧後cooling-off

メールが関与した低保証復旧から強い認証経路を再構築できた場合でも、
一定時間のcooling-offを設ける候補。

初期候補:

**24時間**

法定値ではなく設計候補。

cooling-off中に禁止する候補:

- 全整理データ削除
- 退会
- データエクスポート
- 認証メール再変更
- identity link / unlink
- 既存Passkey全削除
- 家族 / 死後 / 緊急アクセス設定
- break-glass相当の権限変更

通常の整理データ閲覧まで禁止するかは、
復旧時に到達した本人確認強度に応じR005前に最終決定する。

### 復旧成功後のセッション / 認証器

強い復旧が成功した場合:

- password reset前の全セッションを失効
- 不明なセッションを失効
- 認証器一覧をユーザーへ提示
- 不明なPasskey / provider identityを確認させる
- 必要に応じ既存認証器を失効
- 新認証器追加を通知
- 復旧イベントを監査ログへ記録

## セッション管理要件

### セッション保持期間候補

ヤットコは高頻度利用サービスではない一方、
保存内容はP2〜P3相当の非公開情報を含む。

初期候補:

- overall reauthentication: 24時間
- inactivity timeout: 1時間
- 高リスク操作fresh auth: 10分

これはNIST AAL2の再認証時間を設計参考にした候補であり、
ヤットコがNIST AAL2認証サービスであると宣言するものではない。

Passkeyを使えば再認証負荷を下げやすいため、
長期間ログインしっぱなしにするより、
再認証自体を軽くする設計を優先する。

### 複数端末

複数端末ログインは許可候補。

ユーザーが確認できるもの:

- ログイン中端末 / セッション
- 最終利用時刻
- ブラウザ / OSの粗い表示
- 個別ログアウト
- 全端末ログアウト

正確な位置情報を本人画面へ常時保存する必要はない。

### 新端末ログイン

- 通知
- リスク評価
- 必要時step-up
- パスワードのみの場合は追加認証を強く要求
- Passkeyによる本人確認済みでも通知候補

### 認証方式変更後

以下は既存セッション全失効を基本候補とする。

- パスワード変更
- 認証メール変更
- 主要認証方式の削除
- 乗っ取り対応
- 退会

Passkeyの追加のみで既存全セッション失効が必要かは、
リスクに応じR005で最終決定する。

### トークン漏えい対策

- セッションIDは不透明・高エントロピー
- 認証時 / 権限変更時にsession IDをrotate
- ログアウト時にserver-sideで失効
- localStorageへ長期session tokenを保存しない
- refresh token等を導入する場合もローテーション / 失効可能にする
- 全端末失効機能を持つ

### Cookie要件

候補:

- HTTPS only
- `Secure`
- `HttpOnly`
- `SameSite=Strict`を第一候補、必要なOAuth導線等でLaxを検討
- `__Host-` prefix
- `Path=/`
- 不要な `Domain` 指定をしない
- Cookie値にメールアドレス・ユーザー情報を入れない

### CSRF

Cookieベース認証ではSameSiteだけへ依存しない。

- state-changing requestへCSRF対策
- OAuth / OIDCではstate / nonceを適切に検証
- Origin / Referer等を補助的に利用する候補

### セッション固定

- ログイン成功時
- 権限昇格時
- 管理者切替時
- 認証方式の重要変更時

にsession IDを再生成する。

## アカウント乗っ取り対策

### credential stuffing / パスワード再利用

- Passkey優先
- パスワードfallbackでは漏えい済みpassword blocklist
- login throttling
- rate limiting
- MFA / step-up
- 異常試行通知

### 総当たり

- アカウント単位の試行回数制御
- 段階的backoff
- IPだけに依存しない
- 必要時CAPTCHA等
- アカウント存在を判別しにくい応答

### フィッシング

- Passkeyを第一候補
- メールOTP / TOTP等の手入力コードを「フィッシング耐性あり」と扱わない
- 公式ドメインを明確化
- 認証変更通知

### セッション窃取

- HttpOnly / Secure Cookie
- XSS対策
- CSRF対策
- session rotation
- 短いinactivity timeout
- 全端末ログアウト
- 高リスク操作再認証

### メールアカウント乗っ取り

- メールだけで高リスク操作を確定しない
- Passkey等の独立した認証器を推奨
- メール変更時に旧アドレスへ通知
- 復旧後のcooling-off候補

### OAuth連携元アカウント乗っ取り

- Apple / Googleログインだけを唯一経路にしない
- 高リスク操作でYattoko-bound Passkey等を要求する案
- provider subjectでリンクし、メール変更をアカウント乗っ取りと誤認しない
- tokenのaud / iss / exp / state等をサーバー側で検証

### SIMスワップ

- SMSを主要認証 / 復旧経路にしない
- 電話番号変更だけでアカウントを復旧させない

### 端末盗難

- Passkey使用時も端末ロックが前提
- 既存セッション一覧
- 個別失効
- 全端末失効
- high-risk再認証

### 復旧フロー悪用

- 復旧要求rate limit
- アカウント列挙防止
- 復旧成功通知
- 認証器追加通知
- 復旧直後の高リスク操作制限候補

### 管理者アカウント乗っ取り

- 管理者Passkey / FIDO2必須
- password-only禁止候補
- 管理権限アカウントと一般ユーザーアカウントを分離
- break-glass分離
- 操作監査
- 権限最小化

## 認証データと整理データの分離

### 認証ドメイン候補

保持候補:

- 内部userId
- 認証メールアドレス
- メール検証状態
- 認証方式一覧
- Passkey credential ID
- Passkey公開鍵
- Passkey metadataの必要最小限
- Apple provider subject
- Google provider subject
- password verifier（password方式を採用する場合）
- アカウント状態
- 認証器登録 / 失効時刻
- セッション / 失効情報
- セキュリティ通知先
- 認証監査イベント

### 整理データドメイン

R003でAPPROVEDされたものだけ。

例:

- カテゴリ
- 利用状態
- R001 5問
- 本人意向
- サービスレコード
- 条件付き回答
- 最終確認日
- dataModelVersion / schemaVersion

### 分離要件

- 整理データ側は内部userIdだけで所有者を参照
- 認証メールアドレスを整理レコードへ複製しない
- Apple / Google emailを整理データへ複製しない
- provider access tokenを整理DBへ保存しない
- authログへ整理内容を含めない
- 整理データ削除と認証アカウント削除を別処理として明示する

## 管理者権限設計

YTK-R003の4層を維持する。

### 1. 通常サポート担当

認証強度:

- MFA必須
- Passkey等のフィッシング耐性方式を推奨
- 将来的には必須候補

アクセス可能範囲:

- アカウント状態
- 内部userId
- エラーコード
- 同期状態
- 削除処理状態

整理内容閲覧:

**不可**

本番環境直接アクセス:

**不可**

権限付与:

- 個人アカウント
- 役割ベース
- 共有ID禁止

権限失効:

- 退職 / 役割変更時即時
- 定期棚卸し

操作ログ:

必須

### 2. 通常管理者

認証強度:

- フィッシング耐性MFA必須候補
- Passkey / security key優先

アクセス:

- システム運用
- アカウント状態
- ジョブ状態
- 集計
- 権限管理の限定範囲

整理内容閲覧:

**通常不可**

「管理者だから全データ閲覧」を許可しない。

本番DB直接アクセス:

原則不可

操作ログ:

必須

### 3. DB / インフラ管理者

認証強度:

- フィッシング耐性MFA必須
- 強い管理者認証
- 通常ユーザーIDと分離

アクセス:

- インフラ維持に必要な範囲
- DB / backup / deployment等

整理内容閲覧:

業務目的としては不可。

技術的アクセス可能性が残る場合は、

- 人数限定
- 本番直接アクセス常用禁止
- 個人識別可能な操作ログ
- ローカル持ち出し禁止
- 承認制候補

### 4. break-glass

用途:

- 重大障害
- セキュリティ事故
- 通常権限で復旧不能

認証:

- フィッシング耐性MFA必須
- 通常管理者認証と分離
- 可能なら二者承認

条件:

- 理由入力
- 対象範囲限定
- 時間制限
- 自動失効
- 全操作監査
- 事後レビュー

日常サポート用途で使わない。

## 退会 / 全削除時の本人確認

R003の削除仕様と整合させる。

### 全整理データ削除

1. ログイン済み
2. fresh authentication
3. 削除対象を明示
4. 明示確認
5. 削除要求確定
6. 主データをR003要件に従い削除
7. 削除完了画面
8. バックアップは保持期限で失効
9. セッション自体はアカウントが残るため継続可。ただし削除操作用fresh認証状態は破棄

### 退会

1. ログイン済み
2. 最強の利用可能な認証方式でfresh authentication
3. 退会と整理データ削除を明示
4. 誤操作防止確認
5. 整理データ削除要求
6. 認証アカウントの無効化 / 削除
7. 全セッション即時失効
8. 再ログイン不能
9. R003の削除 / backup失効処理を継続
10. 最小限の削除監査イベントだけを必要期間保持

### 認証アカウント削除と整理データ削除の順序

途中失敗で「認証だけ消えて整理データが孤児化」しないよう、
R005でトランザクション / 削除ジョブ状態管理を設計する。

推奨候補:

1. 退会要求を認証済みで受理
2. accountをclosing状態へ
3. 全セッション失効
4. 整理データ削除
5. 削除整合確認
6. 認証主体を削除 / 最終失効
7. 最小削除ジャーナルだけ残す

具体実装はR005へ持ち越す。

## 長期未利用アカウント方針

### 基本

「長期間使っていない = 不要」と扱わない。

ヤットコは長期保存そのものが目的となり得る。

### セッション

アカウント保存期間とログインセッション期間を分離する。

- アカウントは長期存続可能
- セッションは短期間で失効
- 数年ぶりでも再認証できればデータへ戻れる

### 再確認通知

候補:

- 長期間ログインがない場合に、認証メール / 復旧手段の確認通知
- 内容そのものはメールへ記載しない
- 「ヤットコの認証手段が現在も使えるか確認してください」程度に留める

具体周期はR004では確定しない。

### 認証メールが無効

配信bounce等を検知できる場合:

- 整理データを自動削除しない
- アカウントを即無効化しない
- 次回Passkey等でログインした際に更新を促す
- メールが唯一の復旧経路である場合はリスク表示候補

### 将来自動削除する場合

現段階では採用決定しない。

採用するなら最低限:

- 十分な事前通知
- 複数回通知
- 利用者が簡単に保持継続を選択可能
- 失効したメールだけへ一回通知して削除しない
- バックアップ削除まで含む明確な期限
- 利用規約 / プライバシー説明

## 将来の家族 / 代理 / 死後 / 緊急アクセスとの整合

R004では機能を実装・確定しない。

ただし現在の認証モデルは、
将来「本人の認証情報を家族へ共有する」方式に依存しないこと。

### 将来要件

家族・代理人は本人アカウントのPasskey / passwordを共有してログインするのではなく、
**別の主体（別user / delegate identity）**として認証する方向を前提とする。

将来必要になる候補:

- delegate側本人認証
- 本人による事前指定
- 権限範囲
- 有効化条件
- 取消
- 監査
- 死後 / 緊急状態の確認
- 本人意向との整合

現在の内部userId + 複数identity方式であれば、
将来のdelegate identityを別主体として追加できる。

Passkey-first方式は将来機能を妨げない。

## 認証基盤の実装方針

### 初期推奨

**実績あるmanaged authentication基盤を原則優先する。**

評価理由:

ヤットコが必要とする認証機能は、

- Passkey / WebAuthn
- OIDC / OAuth
- 複数authenticator
- identity link / unlink
- session revoke
- password fallback
- recovery
- rate limiting
- 管理者MFA
- 監査
- セキュリティ更新

を含み、
認証自体が独立した高リスクシステムになる。

R005の目的はヤットコの保存・認証要件を検証することであり、
認証基盤そのものをゼロから発明することではない。

したがって、
要件を満たす実績あるmanaged authが利用可能なら、
初期実装ではそちらを優先する。

### managed auth選定条件

R005開始前に候補ごとに最低限以下を比較する。

- WebAuthn / Passkey対応
- user verification制御
- 複数Passkey / authenticator対応
- 安全なsession revoke
- 全端末session失効
- OIDC / OAuth対応
- 複数identityのlink / unlink
- issuer + subject管理
- fresh authentication / step-up表現
- password fallbackの安全な実装
- recovery flowの制御可能性
- rate limit / bot対策
- 管理者向けフィッシング耐性MFA
- 管理者 / supportのRBAC
- 監査ログ
- API / webhook等のセキュリティイベント連携
- データ所在
- データ保持 / 削除
- バックアップ
- 障害時の可用性 / SLA候補
- provider停止 / 障害時の運用
- vendor lock-in
- サービス終了時のauthデータexport
- 別providerへ移行可能か
- Passkey credential / identity mappingを移行できるか
- 日本向け利用条件 / 法務条件

### managed auth採用時も委譲できない責任

managed authを使っても、
ヤットコ側で以下を設計・実装する必要がある。

- A0 / A1 / A2の認証保証判定
- P2〜P3データ閲覧の最低強度
- 高リスク操作のstep-up
- R003整理データとの権限分離
- identity link / unlinkルール
- 退会 / 全削除フロー
- 通知
- 管理者権限
- ログ最小化
- provider障害時のUX
- アプリ側CSRF / XSS等の対策

「managedだから安全」と自動的に扱わない。

### 自前認証を採用する場合

自前認証は原則第二候補とし、
**別途セキュリティレビューなしに採用しない。**

自前で責任を負う範囲:

- password verifier保存
- password reset
- Passkey / WebAuthn challenge管理
- credential管理
- OAuth / OIDC token検証
- identity link / unlink
- session発行 / rotation / revoke
- CSRF
- recovery
- rate limiting
- credential stuffing対策
- bot対策
- 管理者認証
- MFA
- audit log
- security notification
- 脆弱性対応
- ライブラリ / 仕様更新追従
- インシデント対応

採用条件候補:

- managed authで満たせない明確な要件がある
- セキュリティレビュー済み
- 継続保守担当が存在する
- penetration test等の検証計画がある
- 障害 / 侵害時の運用計画がある

### provider障害時

managed auth障害時に、
安全性を下げて迂回ログインを開放しない。

禁止候補:

- 「障害中だけメールOTPで全データへ入れる」
- 管理者が手動でsessionを発行
- 本人確認なしでPasskeyを解除

可用性と安全性が衝突する場合、
整理データへのアクセスを一時停止する方を優先する。

## R005へ引き継ぐ実装要件

### 認証基盤

- 実績あるmanaged authentication基盤を原則優先
- 自前認証は別途セキュリティレビューなしに採用しない
- auth provider選定時にPasskey、session revoke、複数identity、管理者MFA、監査、データ所在、backup、export、provider障害対応を評価
- A0 / A1 / A2の認証保証レベルをサーバー側で保持・判定
- P2〜P3整理データ閲覧にはA2を原則必須
- password単独 / email-only / assurance未確認OIDC単独をA2として扱わない
- 内部userIdを正本とする
- 認証identityと整理データを論理分離
- Passkey / WebAuthn対応
- 複数authenticator登録
- authenticator一覧表示 / 個別失効
- provider identityの安全なlink / unlink
- email一致だけでidentityを自動linkしない
- provider identityはissuer + subjectで識別
- link / unlink時に既存A2 fresh authentication必須
- link / unlink完了通知
- 最後のA2認証 / 復旧経路を削除禁止
- link / unlink監査ログ
- 重複ヤットコアカウントの整理データを自動マージしない
- Apple / Googleではprovider subjectを識別子に使用
- password fallback採用時は平文保存禁止
- email verification
- generic authentication error

### Passkey

- WebAuthn標準利用
- user verification要求
- challengeの単回性 / 有効期限
- RP ID / origin検証
- credential ID / 公開鍵管理
- private keyをサーバーへ要求しない
- 複数Passkey登録
- 新Passkey登録時通知

### OAuth / OIDC

- server-side token validation
- issuer / audience / expiry検証
- state / nonce
- CSRF防止
- redirect URI固定
- provider access tokenを整理DBへ保存しない
- 必要最小scope
- federated identity link時のaccount takeover防止

### Password fallback

- password verifierのみ保存
- 長いpassword許可
- compromised / common password blocklist
- 不要なcomposition ruleなし
- rate limiting
- credential stuffing対策
- password reset token短寿命 / 単回使用
- password変更時session失効

### セッション

- server-side revoke可能
- Secure / HttpOnly / SameSite cookie
- __Host- prefix候補
- localStorageにsession secretを置かない
- login / privilege change時session rotate
- logoutで失効
- overall / inactivity timeout
- 全端末ログアウト
- 個別セッション失効
- auth変更 / 退会時全失効
- CSRF protection

### 高リスク操作

- fresh auth状態の管理
- 全削除
- カテゴリ一括削除
- 退会
- 認証メール変更
- auth method変更
- export
- 将来delegate設定

でstep-upをサーバー側でも強制。

クライアント画面の有無だけに依存しない。

### 復旧

- email-only recoveryはA0とし、P2〜P3整理データ閲覧を許可しない
- emailによるpassword resetだけではA2へ昇格させない
- emailだけで新A2 authenticatorを登録させない
- 既存A2 authenticatorがある場合は必ず優先
- 全A2手段喪失時はprotected / frozen状態候補
- recovery後cooling-off候補を実装可能にする
- recovery後の既存session / authenticator見直し
- 複数authenticator
- recovery request rate limit
- account enumeration防止
- short-lived single-use recovery token
- recovery成功通知
- authenticator追加通知
- 復旧後の既存セッション失効 / 見直し
- サポートが整理内容を本人確認材料に使わない
- サポートによる無条件authenticator解除禁止

### 通知

最低限候補:

- 新端末 / 新セッション
- 新Passkey追加
- Passkey削除
- password変更
- 認証メール変更
- provider link / unlink
- 復旧実行
- 全セッションlogout
- 退会要求

通知本文へ整理内容を載せない。

### ログ

R003の方針を維持。

認証イベントには以下の最小情報だけを候補とする。

- event type
- success / failure
- opaque userId
- opaque sessionId / correlation ID
- timestamp
- coarse client情報
- error code

記録禁止:

- password
- OTP
- magic link token
- session token生値
- Passkey秘密情報
- OAuth token
- 整理内容
- request body全文

### 管理者

- admin identity分離
- phishing-resistant MFA必須
- RBAC
- 最小権限
- support / admin / infra / break-glass分離
- 本番DB直接アクセス常用禁止
- 権限棚卸し
- 全操作監査
- break-glass時間制限

## 推奨仕様案

### 一般ユーザー認証

**Passkey-first。ただし最弱経路も含めた保証レベル制御を必須とする。**

標準候補:

1. Passkey = A2の第一候補
2. Sign in with Apple / Google = 原則A1。A2データ閲覧前にPasskey等でstep-up
3. メール + パスワード = fallback候補だがpassword単独はA1
4. メールmagic link / OTP = A0の検証・復旧補助

P2〜P3相当の整理データ閲覧にはA2を原則必須とする。
Passkeyを登録しただけで、passwordやOIDC単独の弱い経路まで自動的に安全になったとは扱わない。

### MFA

- Passkey利用者: 通常ログインで追加MFA入力を要求しない
- password利用者: 新端末 / 異常時 / 高リスク操作でstep-up
- 一般ユーザーTOTP強制: 初期案では採用しない
- 管理者: Passkey / security key等のフィッシング耐性MFA必須
- 高リスク操作: 全ユーザーfresh reauthentication必須

### 復旧

- 最低2つの独立した認証経路を推奨
- email-onlyでは整理データへ完全復旧しない
- password resetだけではA2へ昇格しない
- 既存Passkey等がある場合は必ず優先
- 全強認証手段喪失時はprotected / frozen状態を許容
- 強い復旧後もcooling-off候補を設ける
- Passkey複数登録を優先
- Apple / Google等は補助経路
- verified emailは復旧補助
- メールだけで即全権限復旧させない
- 全手段喪失時にサポートが安易に本人へ成り代わらない

### セッション

初期候補:

- overall: 24時間
- inactivity: 1時間
- high-risk fresh auth: 10分
- 新端末通知
- 複数端末可
- 全端末logout
- auth変更 / 退会時session全失効

### SMS

主認証 / 主復旧には使わない。

### 管理者

一般ユーザーより強い認証を必須とし、
フィッシング耐性MFA、個人別管理者ID、最小権限、監査を要求する。

## 重要な未確定事項

- Passkey登録をクラウド保存開始の必須条件にするか
- Passkey非対応ユーザーの正式fallback
- password fallbackを本番で本当に提供するか
- Sign in with Apple / Googleを初期リリースから両方提供するか
- managed authの具体的採用ベンダー
- managed authでA0 / A1 / A2を十分表現できるか
- managed authからの将来移行可能性
- 自前認証を採用するだけの明確な必要性が存在するか
- auth provider候補とデータ所在
- auth provider障害時の可用性
- email magic link / OTPを復旧でどこまで許可するか
- 復旧後cooling-off時間
- session overall 24時間 / inactivity 1時間が一般ユーザーUXに適切か
- fresh auth 10分の最終値
- 新端末判定方式
- 異常ログイン判定で使うIP / User-Agent等の保持範囲
- device fingerprintを導入するか
- Passkey同期基盤喪失時の具体的復旧UX
- 管理者security keyを必須にするか
- break-glassで二者承認を必須にできる運用体制か
- 全認証手段喪失時に厳格な本人確認復旧を将来導入するか
- データエクスポート機能自体を提供するか
- 長期未利用アカウントへの確認通知周期
- 自動削除を将来採用するか
- 家族 / 死後アクセス導入時の本人確認方式

## 次工程への指示

YTK-R004の調査成果物としてはここで停止する。

人間が本成果物を承認するまで、

- proposal作成
- 認証実装
- ログイン画面制作
- DB設計
- サーバー接続
- auth provider契約 / 設定
- Apple / Google OAuth設定
- Passkey実装
- MFA実装
- 本番公開
- GitHub Pages公開
- YTK-R005開始

には進まない。

人間による次工程開始指示待ちとする。
