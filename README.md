# 🐧 Penguin Pomodoro - ペンギンポモドーロ

かわいいペンギンのポモドーロタイマーアプリです。50分の勉強と10分の休憩をサイクルで行います。

## ✨ 機能

- ✅ 50分勉強 + 10分休憩のポモドーロサイクル
- ✅ 透明な背景（Animal Crossing風パステルデザイン）
- ✅ 深緑色の大きなタイマー表示
- ✅ 日本語メッセージ（「がんばろう！」「がんばり中」「ちょっと休憩」）
- ✅ タイマー終了時のかわいい効果音
- ✅ 完了カウンター（ペンギンアイコン表示）
- ✅ リセット・スキップボタン

## 🚀 ローカルで実行する方法

### 前提条件
- Node.js 22+
- pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/takumi79797575-sketch/penguin-pomodoro-web.git
cd penguin-pomodoro-web

# 依存関係をインストール
pnpm install
```

### 開発サーバーを起動

```bash
pnpm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### 本番ビルド

```bash
pnpm run build
pnpm run preview
```

## 🌐 オンライン

- **GitHub Pages**: https://takumi79797575-sketch.github.io/penguin-pomodoro-web/
- **Manus**: https://penguinpom-jpdkuqep.manus.space

## 🛠️ 技術スタック

- **フレームワーク**: React 19
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS 4
- **UI コンポーネント**: shadcn/ui
- **音声**: Web Audio API

## 📁 プロジェクト構造

```
penguin-pomodoro-web/
├── client/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── pages/
│       │   └── Home.tsx          # メインアプリケーション
│       ├── components/           # 再利用可能なコンポーネント
│       ├── App.tsx               # ルーティング
│       └── index.css             # グローバルスタイル
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions デプロイワークフロー
├── package.json
├── vite.config.ts
└── README.md
```

## 🔄 自動デプロイ

このプロジェクトは GitHub Actions で自動的にビルドしてデプロイされます。

`main` ブランチに push すると、以下の処理が自動的に実行されます：

1. 依存関係をインストール
2. プロジェクトをビルド
3. GitHub Pages にデプロイ

## 📝 ライセンス

MIT

## 👨‍💻 作者

Created with ❤️
