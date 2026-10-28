# マネージャーAI（β）画面プロトタイプ

Figma Make で作成した画面設計デザイン案（React + Vite + Tailwind CSS）。データはすべてダミーです。

## ローカルで動かす

```bash
pnpm install
pnpm dev     # http://localhost:8443
pnpm build   # dist/ に出力
```

## GitHub Pages で公開する

1. このフォルダを GitHub リポジトリの `main` ブランチに push する
2. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にする
3. push するたびに `.github/workflows/deploy.yml` が自動でビルド・公開する
4. 公開URL: `https://<ユーザー名>.github.io/<リポジトリ名>/`

URLのパス（`/<リポジトリ名>/`）は環境変数 `BASE_PATH` で自動設定されます。
Vercel / Netlify など独自ドメインのルートで公開する場合は `BASE_PATH` 不要です（Build: `pnpm build` / Output: `dist`）。

## 画像について

- 人物・撮影現場の写真は Unsplash のフリー素材（商用可・クレジット不要）を外部URLで表示しています。設定は `src/photos.ts`
- 写っているのは実在の芸能人ではなく一般のモデルです。名前・経歴は架空です
- 正式公開前に、登録タレント本人の許諾済み宣材写真へ差し替えてください
- 検索エンジンには載らない設定（noindex）です。`.figma/make/site.json` の `robots.index` で変更できます
