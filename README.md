# QT SSW Academy

**QT Drive Innovations® × TECH READS®-NECH**
**SSW技能者育成アカデミー / SSW Skills Training Academy**

---

## このアプリについて / About This App

このアプリは、**特定技能1号（自動車整備）**の候補者向けに作られた学習プラットフォームのプロトタイプです。

This is a prototype learning platform for candidates of the **Specified Skilled Worker Type 1 (Automotive Maintenance)** qualification.

---

## 機能 / Features

| タブ / Tab | 内容 / Content |
|---|---|
| ダッシュボード / Dashboard | コース進捗・レーダーチャート・バーチャート |
| N4 語彙 / N4 Vocab | JLPT N4 自動車整備語彙フラッシュカード（20語） |
| クイズ / Quiz | 自動車整備 試験対策クイズ（10問） |
| InspectTag™ | QT InspectTag™ NFCスキャンシミュレーション |
| 証明書 / Certificate | TECH READS®-NECH 修了証明書の生成 |

---

## 使い方 / How to Use

### ローカルで起動する / Run Locally

```bash
# 1. リポジトリをクローン / Clone the repository
git clone https://github.com/YOUR_USERNAME/qt-ssw-academy.git
cd qt-ssw-academy

# 2. パッケージをインストール / Install packages
npm install

# 3. 開発サーバーを起動 / Start development server
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。
Open `http://localhost:5173` in your browser.

### ビルド / Build for Production

```bash
npm run build
npm run preview
```

---

## 技術スタック / Tech Stack

| 項目 / Item | 内容 / Details |
|---|---|
| フロント / Frontend | React 18 + TypeScript |
| ビルドツール / Build | Vite |
| スタイル / Style | Tailwind CSS v4 + CSS Variables |
| チャート / Charts | Recharts |
| フォント / Fonts | Noto Sans JP + Rajdhani (Google Fonts) |
| 言語切り替え / i18n | Custom hook (ja / en) |

### 将来の拡張 / Future Extensions (MVP → Production)

```
フロント:    React / Next.js + Tailwind CSS
バックエンド: Supabase（認証・進捗保存）
PDF生成:    jsPDF（証明書・点検レポート）
決済:       Stripe（有料コース化）
ホスティング: Vercel（無料枠で十分）
```

---

## プロジェクト構造 / Project Structure

```
qt-ssw-academy/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # ヘッダー・言語切り替え
│   │   ├── Dashboard.tsx       # 進捗ダッシュボード
│   │   ├── FlashCards.tsx      # JLPT N4 フラッシュカード
│   │   ├── Quiz.tsx            # クイズエンジン
│   │   ├── InspectTag.tsx      # QT InspectTag™ デモ
│   │   ├── Certificate.tsx     # 証明書発行
│   │   └── Footer.tsx          # フッター・法的表記
│   ├── data/
│   │   ├── courses.ts          # コースデータ
│   │   ├── flashcards.ts       # N4語彙データ（20語）
│   │   ├── quizzes.ts          # クイズ問題（10問）
│   │   └── inspectData.ts      # 点検デモデータ
│   ├── hooks/
│   │   └── useLanguage.ts      # 言語切り替えフック
│   ├── types/
│   │   └── index.ts            # TypeScript型定義
│   ├── App.tsx                 # メインアプリ
│   ├── main.tsx                # エントリーポイント
│   └── index.css               # グローバルスタイル
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── LEGAL.md                    # 法的免責事項
└── README.md                   # このファイル
```

---

## GitHub へのアップロード / Upload to GitHub

```bash
# 初回のみ / First time only
git init
git add .
git commit -m "feat: initial prototype - QT SSW Academy v0.1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/qt-ssw-academy.git
git push -u origin main
```

---

## ブランドについて / About the Brands

**QT Drive Innovations®** は自動車整備・技術革新・SSW人材育成を専門とするブランドです。
**TECH READS®-NECH** は教育・トレーニングブランドとして、コース・クイズ・証明書発行を担当します。
**QT InspectTag™** はNFCベースの車両点検デジタルシステムです。

**QT Drive Innovations®** is a brand specializing in automotive maintenance, technical innovation, and SSW talent development.
**TECH READS®-NECH** is the education and training brand handling courses, quizzes, and certificate issuance.
**QT InspectTag™** is an NFC-based digital vehicle inspection system.

---

## 法的表記 / Legal Notices

詳細は [LEGAL.md](./LEGAL.md) をご覧ください。
See [LEGAL.md](./LEGAL.md) for full legal notices.

- **QT DRIVE INNOVATIONS®** — USPTO登録商標 / USPTO Registered Trademark
- **TECH READS®** — USPTO登録商標 / USPTO Registered Trademark
- **QT InspectTag™** — QT Drive Innovations®の商標 / Trademark of QT Drive Innovations®

---

## バージョン / Version

`v0.1.0` — プロトタイプ / Prototype (2025)

> **注意 / Notice:** このアプリはプロトタイプです。商業目的での使用はできません。
> This app is a prototype. Not for commercial use.

---

© 2025 QT Drive Innovations® × TECH READS®-NECH. All rights reserved.
