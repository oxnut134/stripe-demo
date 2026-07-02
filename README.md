# Stripe Subscription Demo (Next.js)
# Pull Request test2

Next.js (App Router) + Stripe Checkout を使ったサブスクリプション決済のデモアプリです。
ログイン不要で、Free / Pro / Enterprise の3プランを表示し、Pro・EnterpriseはStripe Checkoutでテスト決済できます。

## 構成

- **Free**: $0/month (購入操作なし)
- **Pro**: $19/month (Stripe Checkoutでサブスクリプション購入)
- **Enterprise**: $49/month (Stripe Checkoutでサブスクリプション購入)

価格はAPI側で動的に生成 (`price_data`) しているため、Stripeダッシュボードで事前に商品/価格を作成する必要はありません。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Stripeのテストキーを設定

[Stripeダッシュボード](https://dashboard.stripe.com/test/apikeys)からテスト用のシークレットキーを取得し、
`.env.local.example` を `.env.local` にコピーして値を設定します。

```bash
cp .env.local.example .env.local
```

```
STRIPE_SECRET_KEY=your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

`STRIPE_WEBHOOK_SECRET` はWebhookの動作確認をしない場合は未設定でも構いません（`/api/webhook` は呼ばれない限り影響しません）。

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くとプラン一覧が表示されます。

## テスト決済の確認方法

Pro または Enterprise プランの「購入」ボタンを押すとStripe Checkoutページに遷移します。
以下のテストカード情報を入力すると決済が完了します。

| 項目 | 値 |
| --- | --- |
| カード番号 | `4242 4242 4242 4242` |
| 有効期限 | 任意の未来の日付 (例: `12/34`) |
| CVC | 任意の3桁 (例: `123`) |
| 名前・郵便番号 | 任意の値 |

決済が完了すると `/success` ページにリダイレクトされ、キャンセルした場合は `/cancel` ページに遷移します。

その他のテストカード（3Dセキュア認証あり、決済失敗など）は
[Stripe公式ドキュメント](https://stripe.com/docs/testing)を参照してください。

## Webhookのローカル確認 (任意)

[Stripe CLI](https://stripe.com/docs/stripe-cli) を使うとローカルでWebhookイベントを受信できます。

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

表示された `whsec_...` を `.env.local` の `STRIPE_WEBHOOK_SECRET` に設定してください。

## Vercelへのデプロイ

1. このリポジトリをGitHubにpushし、Vercelでプロジェクトをインポートします。
2. Vercelのプロジェクト設定 → Environment Variables に以下を設定します。
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (Webhookを使う場合)
3. Stripeダッシュボードの Webhooks 設定で、エンドポイントURLを
   `https://<your-vercel-domain>/api/webhook` として追加します。
4. デプロイ後、本番運用する場合はテストキー (`sk_test_...`) を本番キー (`sk_live_...`) に切り替えてください。

## ディレクトリ構成

```
app/
  page.tsx              # プラン一覧ページ
  success/page.tsx      # 決済成功ページ
  cancel/page.tsx       # 決済キャンセルページ
  api/checkout/route.ts # Stripe Checkout Session作成API
  api/webhook/route.ts  # Stripe Webhook受信API
components/
  PricingCard.tsx        # プランカードUI
lib/
  plans.ts               # プラン定義
  stripe.ts              # Stripeクライアント初期化
```
