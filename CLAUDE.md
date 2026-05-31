# CLAUDE.md — 濟州島行程 Web App

> Last updated: 2026-05-28

## 專案概覽

Lulu 家族濟州島自由行的「行動行程 app」，部署在 Vercel：https://jeju-itinerary.vercel.app/
手機優先（mobile-first），目標是旅行當下能快速查行程、開地圖、複製地址貼到 Naver 導航。

家族 6 天（7/6-7/11）+ Lulu 自己 5 天（7/8-7/12 跟家人錯開出發/回程）。

## Tech Stack

- **React 19 + Vite 8** — SPA
- **React-Leaflet 5 + Leaflet 1.9** — 互動地圖
- **lucide-react** — icons
- **無 TypeScript、無 router**（mainView state 直接切 tab）
- **localStorage** 存打包清單勾選狀態
- 部署：**Vercel**（main 自動 deploy）

## 目錄結構

```
src/
  App.jsx                  # 主結構：topbar + 4 tabs + bottom nav
  components/
    Timeline.jsx           # 「行程」tab — 每日 timeline
    MapExplorer.jsx        # 「地圖」tab — 全屏地圖 + floating overlay 控制
    Guide.jsx              # 「必買」tab — 12 個伴手禮卡片
    Dashboard.jsx          # 「行前」tab — 倒數/匯率/天氣/打包/工具 widgets
  data/
    itinerary.js           # myItinerary + familyItinerary + LOC 座標表
    mapPois.js             # 44 個 Jeju POI（唯一資料源）+ MUST_VISITS export
  index.css                # 全部樣式（~3200 行 mobile-first CSS）
build_poster.py            # 家族旅遊圖海報（PIL 生成 A4 PNG）
family-itinerary-poster-v1-pil.png  # 海報產出（v1 PIL 版本）
```

## 核心架構

### 4 個 Bottom Nav Tab（平行分頁，無彈窗）
1. **行程** — 每日 timeline，可切「我的 / 家人」+ D1-D5 chip rail
2. **地圖** — 全屏地圖，控制全部變成 floating overlay。模式：「動線」/「探索」
3. **必買** — Guide 元件，只放 12 個伴手禮（**景點完全交給地圖**）
4. **行前** — Dashboard，5 個 widget（倒數 → 匯率 → 天氣 → 27 項打包清單 → 工具）

### 單一資料源原則
- **POI 資料**只在 `mapPois.js`。必去 12 個景點靠 `isMustVisit: true` 標記，`MUST_VISITS = JEJU_POIS.filter(p => p.isMustVisit)`
- **行程 timeline** 在 `itinerary.js`，座標走頂部 `LOC` 常數表
- 不要在元件裡硬寫 POI 清單

## 慣例

- **繁體中文 + 半形空格**：「我有 3 台 iPhone」這種空格規則
- **檔案內中英混用**：CSS class name 用英文，內容文字用繁中
- **顏色系統**：每天有自己的 `theme.accent`，App.jsx 動態寫進 CSS variable `--theme-accent`
- **連結驗證**：寫進 Guide.jsx 的外部部落格 URL 都要 WebFetch 驗證過（之前一次掃出 8/9 個錯，包括連到韓劇評論的）

## 部署

```bash
npm run dev          # 本機開發 http://localhost:5174
npm run build        # 產 dist/（Vercel 自動跑）
git push origin main # Vercel 自動 deploy
```

## ⚠️ 常見坑

### 1. Chromium transition bug
`.map-sheet` 用 `height: 44px ↔ 55vh` 切換時，Chromium 在 transition 中會卡住計算 `calc(0% + 44px)`。當前對策：**直接 height swap，不放 transition**。body 內容用 fade-in 動畫補償視覺。

### 2. AI 生圖額度
- **Codex CLI** 用 ChatGPT Plus token，**會跑空**（額度用完要等月初 reset）
- **nano-banana** (Gemini) 需要 `NANOBANANA_API_KEY` 環境變數
- 旅遊海報 v1 用 PIL 生（資訊精準但藝術感弱），v2 hybrid 還沒做（生圖額度卡住）

### 3. dvh 在 calc 內失效
某些 Chromium 解析 `calc(100dvh - X)` 整條 rule 會 drop，fallback 到 base 規則。**改用 `vh` 或 flex 處理 height**。

### 4. Route pin label 過長
Leaflet `divIcon` 的 label 如果超過 11 字會破版。已加 `max-width: 11ch; text-overflow: ellipsis`。

### 5. POI 共用 mapPois，欄位命名
- `sub` = 1 行 tagline（必填）
- `desc` = 2-3 句中等說明（非必去也有）
- `longDesc` = 必去景點專屬，4-5 句完整介紹
- popup 顯示順序：`longDesc || desc` fallback chain

### 6. e-Arrival Card 是新制
2026/1/1 起台灣旅客入境韓國要事先填 [e-Arrival Card](https://e-arrivalcard.go.kr)（K-ETA 仍免簽延長到 2026/12/31）。已寫進行前打包清單。

### 7. EVE 止痛藥不能帶
韓國 2025/3 起列管制品。**普拿疼/加倍佳可帶**，EVE 系列違規會被海關扣留。已寫進 ⚠️ 海關地雷 分類。

## 已完成里程碑

- ✅ 4 tabs 主結構 + bottom nav（不再有 drawer）
- ✅ 地圖頁全屏化 + floating overlay 控制
- ✅ POI 資料合併為單一來源（mapPois.js）
- ✅ 必買/必去分流（必買 tab + 地圖探索 ⭐ 必去）
- ✅ 行前打包清單 27 項（含 ⚠️ 海關地雷）
- ✅ Dashboard 匯率上移到 widget #2
- ✅ 點地圖清單後 sheet 自動收合
- ✅ Guide 連結全掃換新（8/9 之前是 404 或文不對題）
- ✅ 家族旅遊圖海報 v1（PIL 版本）

## ⏳ 待辦

- [ ] 旅遊海報 v2 hybrid（AI 生底圖 + PIL 疊文字）— 等生圖額度恢復
- [ ] favicon 更新（目前是 v=10 cache buster）
- [ ] 萬一旅程中 e-Arrival URL 變化要追蹤
