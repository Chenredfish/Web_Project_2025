# 菇菇栽培網站開發計劃

## 開發目標
設計一個簡單的菇菇栽培遊戲，專注於元件開發與 `useState` 狀態管理，實現以下功能：
1. 菇菇隨時間成長。
2. 採收菇菇後增加經驗值，提升等級。
3. 單一頁面設計，簡化遊戲介面。

## 開發流程

### 第1週

#### Day 1: 項目初始化與環境設置
- 初始化 React 專案。
- 設定專案結構，規劃資料夾（如 `components/`、`assets/` 等）。
- **技術**：React、npm/yarn、Git。

#### Day 2: UI 設計與基本頁面
- 設計單一頁面結構：
  - 菇菇園：顯示菇菇的成長狀態。
  - 等級與經驗值顯示。
- 使用 CSS 或 Styled Components 設計基本樣式。
- **技術**：React、CSS/Styled Components。

#### Day 3: 菇菇資料結構與狀態管理
- 定義菇菇的資料結構（如名稱、成長值、狀態等）。
- 設置狀態管理（如 `useState`）。
- **技術**：React。

#### Day 4: 菇菇成長邏輯
- 實現菇菇的成長邏輯（如定時器模擬成長）。
- 設計採收邏輯，重置成長值並增加經驗值。
- **技術**：React、`setInterval`。

#### Day 5: 等級系統與解鎖邏輯
- 設計等級系統，根據經驗值提升等級。
- 根據等級解鎖更多菇菇種類。
- **技術**：React。

#### Day 6: 元件開發與整合
- 開發菇菇相關的元件（如菇菇卡片、等級顯示）。
- 整合各元件，確保功能正常運作。
- **技術**：React。

#### Day 7: 測試與調整
- 測試基本功能是否正常運作。
- 調整 UI 和邏輯，確保使用者體驗流暢。
- **技術**：React。

---

## 需要補充的資訊
1. **菇菇種類與屬性**
   - 每種菇菇的名稱、成長時間等。
   - 是否需要特殊菇菇（如稀有菇菇）。

2. **等級與解鎖條件**
   - 每個等級需要的經驗值。
   - 解鎖的菇菇種類。

3. **圖片素材**
   - 使用現有的菇菇圖片（如 `src/assets/imagine/mushroom/` 資料夾）。

4. **部署需求**
   - 是否需要支援進度保存（如 `localStorage`）。
  


# 菇菇栽培網頁專題 — 等級系統設計說明

## 1. 等級與經驗需求資料

可以用陣列或函式表示每一級所需經驗：

```js
// 等級1~30所需經驗
const levelExp = [
  0,    // Lv1
  100,  // Lv2
  250,  // Lv3
  450,  // Lv4
  // ...依序遞增
  10000 // Lv30
];
```

或用一個公式自動計算每級經驗：

```js
function getExpForLevel(level) {
  // 例如每級經驗需求遞增
  return Math.floor(100 * Math.pow(1.15, level - 1));
}
```

---

## 2. 菇菇稀有度與經驗對應

用物件記錄不同稀有度的經驗值：

```js
const mushroomExp = {
  common: 10,
  rare: 30,
  epic: 100,
  legendary: 300
};
```

---

## 3. 玩家資料結構

```js
const player = {
  level: 1,
  exp: 0
};
```

---

## 4. 升級邏輯

每當獲得經驗時，檢查是否升級：

```js
function gainExp(player, amount) {
  player.exp += amount;
  while (player.level < 30 && player.exp >= getExpForLevel(player.level + 1)) {
    player.level += 1;
  }
}
```

---

## 5. 種菇時獲得經驗

根據菇菇稀有度給經驗：

```js
function harvestMushroom(player, rarity) {
  gainExp(player, mushroomExp[rarity]);
}
```
