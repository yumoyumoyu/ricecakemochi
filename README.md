# みえたわー (Mieta Tower) 公式Webサイト

タワマンARアプリ「みえたわー」および開発者「@ricecakemochi」の紹介ランディングページです。
Cloudflare Pagesへのデプロイに最適化された静的構成（HTML5 / CSS3 / Vanilla JavaScript）になっています。

## 構成
- `index.html`: メインページ（SEO / OGP対応、セマンティックHTML5）
- `style.css`: モダンサイバー＆グラスモーフィズムデザイン、レスポンシブ対応
- `main.js`: インタラクティブARスキャナー体験デモ、HUDレティクル追従、UIスクリプト
- `assets/`: アプリアイコンおよびARスキャナービジュアル
- `_headers`: Cloudflare Pages用のセキュリティ・キャッシュ設定

## Cloudflare Pages へのデプロイ方法
1. GitHub等のリポジトリに本プロジェクトをプッシュします。
2. Cloudflare ダッシュボードから **Workers & Pages** > **作成** > **Pages** > **Gitに接続** を選択します。
3. デプロイ設定:
   - **プロジェクト名**: `mieta-tower` (任意)
   - **本番環境ブランチ**: `main`
   - **フレームワークのプリセット**: `None`
   - **ビルドコマンド**: 空白（ビルド不要）
   - **ビルド出力ディレクトリ**: `/` (または空欄)
4. **保存してデプロイ**をクリックすると、数秒で全世界のCloudflare CDNから高速配信されます。

## 作者
- **X (Twitter)**: [@ricecakemochi](https://x.com/ricecakemochi)
