# マネージャーAI（β）画面設計案 — 公開用ファイル

ビルド済みの静的サイトです。このフォルダの中身をそのまま GitHub に置けば表示できます（ビルド不要）。

## GitHub Pages で公開する
1. 新しいリポジトリを作り、このフォルダの中身（index.html, assets/, images/, .nojekyll など）をリポジトリ直下に push
2. Settings → Pages → Build and deployment → Source を「Deploy from a branch」、Branch を `main` / `/(root)` にして Save
3. 1〜2分後に `https://<ユーザー名>.github.io/<リポジトリ名>/` で表示されます

※ ファイルをダブルクリックで直接開くと表示されません（ブラウザの制限）。確認は GitHub Pages か、`npx serve .` などのローカルサーバーで行ってください。

## 画像について
- `images/` の人物写真はフリー素材のモデル写真です。実在の芸能人ではなく、名前・経歴は架空です
- 素材サイトの規約に従い、人物を公式イメージや本人の推薦に見える形で使わないでください
- 正式公開前に、登録タレント本人の許諾済み宣材写真へ差し替えてください
