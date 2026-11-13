# IPアドレス位置情報取得くん

入力されたIPアドレス（またはアクセス元のIPアドレス）から、おおよその位置情報を割り出して地図上に表示するシングルページアプリケーションです。

※取得される位置情報はGPSのような詳細な個人住所ではなく、プロバイダやデータセンターなどが所在する大まかな地域・都市が参照されます。

## 主な機能

- アクセス元（自分自身）および任意のIPアドレスの位置情報検索
- Leaflet（OpenStreetMap）を用いた地図上へのピン表示と詳細ポップアップ
- 国・地域・都市・ISP（プロバイダ）情報の表示

## 使用技術

- **Frontend**: Vue 3 / HTML5 / CSS3
- **Map Library**: Leaflet (OpenStreetMap)
- **API**: ipapi.co
- **Hosting / Runtime**: GitHub Pages (ローカル開発時は Deno)
