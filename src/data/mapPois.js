/* ──────────────────────────────────────────────────────────
   All Jeju POIs — categorised for the full-page map explorer
   Coordinates sourced from Google / Naver Maps.
   ────────────────────────────────────────────────────────── */

export const CATEGORIES = {
  attraction: { label: '景點', emoji: '🏔️', color: '#16a34a' },
  food:       { label: '美食', emoji: '🍽️', color: '#ea580c' },
  cafe:       { label: '咖啡廳', emoji: '☕️', color: '#a16207' },
  shopping:   { label: '購物', emoji: '🛍️', color: '#9333ea' },
  beach:      { label: '海灘', emoji: '🏖️', color: '#0284c7' },
  museum:     { label: '博物館', emoji: '🎨', color: '#be185d' },
  hotel:      { label: '住宿', emoji: '🏨', color: '#475569' },
};

export const JEJU_POIS = [
  // ─── 景點 ───
  { id: 'ilchulbong',   cat: 'attraction', title: '城山日出峰',        sub: 'UNESCO 世界遺產・日出聖地',      lat: 33.4581, lng: 126.9425 },
  { id: 'manjanggul',   cat: 'attraction', title: '萬丈窟',            sub: '世界最長熔岩隧道・常年涼爽',      lat: 33.5281, lng: 126.7714 },
  { id: 'jusangjeolli', cat: 'attraction', title: '大浦柱狀節理帶',     sub: '六角玄武岩石柱・地質奇觀',        lat: 33.2378, lng: 126.4248 },
  { id: 'hallasan',     cat: 'attraction', title: '漢拏山',            sub: '韓國第一高峰 1,950m',            lat: 33.3616, lng: 126.5292 },
  { id: 'seopjikoji',   cat: 'attraction', title: '涉地可支',          sub: '韓劇取景地・油菜花海岸',          lat: 33.4243, lng: 126.9304 },
  { id: 'yongduam',     cat: 'attraction', title: '龍頭岩',            sub: '濟州市區經典火山岩地標',          lat: 33.5163, lng: 126.5119 },
  { id: 'udo',          cat: 'attraction', title: '牛島',              sub: '夢幻離島・花生冰淇淋',            lat: 33.5036, lng: 126.9536 },
  { id: 'ecoland',      cat: 'attraction', title: 'ECOLAND 森林小火車', sub: '英式蒸汽火車・原始榿木林',        lat: 33.4540, lng: 126.6320 },
  { id: 'snoopy',       cat: 'attraction', title: '史努比庭園',         sub: '超大規模 Snoopy 主題花園',        lat: 33.4440, lng: 126.8280 },
  { id: 'camellia',     cat: 'attraction', title: '山茶花之丘',         sub: '東亞最大山茶花園林',              lat: 33.2890, lng: 126.3680 },
  { id: 'jeongbang',    cat: 'attraction', title: '正房瀑布',           sub: '亞洲唯一海岸瀑布',              lat: 33.2438, lng: 126.5725 },
  { id: 'cheonjeyeon',  cat: 'attraction', title: '天帝淵瀑布',         sub: '仙女沐浴的神話瀑布',             lat: 33.2470, lng: 126.4157 },
  { id: 'sangumburi',   cat: 'attraction', title: '山君不離火山口',      sub: '低平火山口・秋季紫芒草',          lat: 33.4390, lng: 126.6970 },
  { id: 'iho-horse',    cat: 'attraction', title: '梨湖海灘小馬燈塔',    sub: '紅白木馬造型燈塔・拍照打卡',      lat: 33.4977, lng: 126.4529 },

  // ─── 海灘 ───
  { id: 'hamdeok',      cat: 'beach', title: '咸德海水浴場',    sub: '濟州馬爾地夫・清澈果凍海',        lat: 33.5435, lng: 126.6694 },
  { id: 'hyeopjae',     cat: 'beach', title: '挾才海水浴場',    sub: '銀白沙灘・翡翠綠海水',            lat: 33.3937, lng: 126.2396 },
  { id: 'jungmun',      cat: 'beach', title: '中文穡達海灘',    sub: '南部最大海灘・衝浪勝地',          lat: 33.2433, lng: 126.4107 },
  { id: 'woljeongri',   cat: 'beach', title: '月汀里海邊',      sub: '果凍藍海水・彩色椅子咖啡街',      lat: 33.5568, lng: 126.8068 },
  { id: 'gimnyeong',    cat: 'beach', title: '金寧海水浴場',    sub: '純淨沙灘・人少清幽',              lat: 33.5586, lng: 126.7578 },

  // ─── 美食 ───
  { id: 'blackpork',    cat: 'food', title: '黑豬肉一條街',       sub: '正宗濟州黑豬肉燒烤・必吃！',      lat: 33.4876, lng: 126.4921 },
  { id: 'bagel',        cat: 'food', title: 'London Bagel Museum',sub: '超人氣倫敦貝果・現場排隊',        lat: 33.5225, lng: 126.8521 },
  { id: 'abalone',      cat: 'food', title: '三姓穴鮑魚粥',       sub: '濟州名物鮑魚粥早餐',              lat: 33.5074, lng: 126.5254 },
  { id: 'hairtail',     cat: 'food', title: '帶魚鍋一條街',       sub: '西歸浦必吃紅燒帶魚鍋',            lat: 33.2488, lng: 126.5605 },
  { id: 'gogi-guksu',   cat: 'food', title: '肉麵 (고기국수)',    sub: '濟州國民美食・豬肉湯拉麵',        lat: 33.5106, lng: 126.5178 },
  { id: 'omegi-food',   cat: 'food', title: '五福年糕 (Omegi 餅)', sub: '東門市場必吃傳統年糕',            lat: 33.5127, lng: 126.5279 },
  { id: 'seafood-tower', cat: 'food', title: '海鮮塔 / 活魚料理',  sub: '新鮮現撈海鮮拼盤',               lat: 33.2470, lng: 126.5650 },

  // ─── 咖啡廳 ───
  { id: 'monsant',      cat: 'cafe', title: 'Monsant de Aewol',  sub: 'GD 投資的海景咖啡廳',             lat: 33.4630, lng: 126.3110 },
  { id: 'delmoondo',    cat: 'cafe', title: 'Cafe Delmoondo',    sub: '咸德海灘旁的海景咖啡',             lat: 33.5434, lng: 126.6700 },
  { id: 'bomnal',       cat: 'cafe', title: '春日咖啡 (Bomnal)',   sub: '涯月海景・可愛柯基犬',             lat: 33.4628, lng: 126.3125 },
  { id: 'osulloc',      cat: 'cafe', title: '雪綠茶博物館 O\'sulloc', sub: '免費參觀・綠茶冰淇淋',          lat: 33.3058, lng: 126.2893 },
  { id: 'knotted',      cat: 'cafe', title: 'Knotted 甜甜圈',    sub: '首爾名店濟州分店・涯月海景',       lat: 33.4621, lng: 126.3098 },

  // ─── 博物館 ───
  { id: 'haenyeo',      cat: 'museum', title: '海女博物館',        sub: '濟州獨特海女文化體驗',            lat: 33.5180, lng: 126.8650 },
  { id: 'aquaplanet',   cat: 'museum', title: 'Aqua Planet 水族館', sub: '亞洲最大水族館之一',             lat: 33.4335, lng: 126.9270 },
  { id: 'arte-museum',  cat: 'museum', title: 'Arte Museum',       sub: '沉浸式光影藝術館',              lat: 33.3050, lng: 126.3488 },
  { id: 'glass-castle', cat: 'museum', title: '濟州玻璃城堡',       sub: '250+ 件世界玻璃藝術品',          lat: 33.4338, lng: 126.7635 },
  { id: 'hallim-park',  cat: 'museum', title: '翰林公園',           sub: '亞熱帶植物園＋熔岩洞窟',          lat: 33.3848, lng: 126.2380 },

  // ─── 購物 ───
  { id: 'dongmun',      cat: 'shopping', title: '東門傳統市場 & 夜市', sub: '濟州最大傳統市場・夜市必逛',     lat: 33.5128, lng: 126.5287 },
  { id: 'lotte-duty',   cat: 'shopping', title: '樂天免稅店濟州店',     sub: '美妝精品退稅購物天堂',           lat: 33.4890, lng: 126.4986 },
  { id: 'olle-market',  cat: 'shopping', title: '西歸浦偶來市場',       sub: '在地庶民美食市場',              lat: 33.2508, lng: 126.5630 },
  { id: 'jungang',      cat: 'shopping', title: '濟州中央地下街',       sub: '服飾美妝・年輕人逛街',           lat: 33.5100, lng: 126.5205 },

  // ─── 住宿 ───
  { id: 'jungane',      cat: 'hotel', title: 'Jungane 泳池別墅',   sub: 'Day1-2 溫水泳池 & 水療別墅',      lat: 33.5222, lng: 126.8616 },
  { id: 'air-city',     cat: 'hotel', title: '艾爾城市飯店',        sub: 'Day3-5 蓮洞市區・近機場',         lat: 33.4905, lng: 126.4935 },
  { id: 'jocheon-villa', cat: 'hotel', title: '小朝天海景泳池別墅',  sub: '家人行程首日海景住宿',            lat: 33.5370, lng: 126.6340 },
];
