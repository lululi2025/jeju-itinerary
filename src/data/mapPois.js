/* ──────────────────────────────────────────────────────────
   All Jeju POIs — single source of truth for:
   - 地圖探索 (full list with categories)
   - 必去景點 (filter: isMustVisit === true)
   - 行程動線 (matched by location/title)

   Optional fields on each POI:
     isMustVisit  → surfaces in the 必買景點 page
     longDesc     → long rich description for the guide card
     coverImage   → cover photo for guide card / popup
     tag          → small badge label
     duration     → suggested visit duration
     url          → external guide article URL
     source       → blog source label
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

/* All URL sources verified 2026-05-27 (HTTP 200 + 內容對題) */
const SRC_KKDAY = 'https://www.kkday.com/zh-tw/blog/3367/asia-korea-jeju-island-must-visit';
const SRC_BRINGYOU = 'https://bring-you.info/zh-tw/jeju-island-travel-guide';
const SRC_MIMIGO = 'https://mimigo.tw/jeju-travel/';

export const JEJU_POIS = [
  // ─── 景點 ───
  {
    id: 'ilchulbong', cat: 'attraction',
    title: '城山日出峰', sub: 'UNESCO 世界遺產・日出聖地',
    lat: 33.4581, lng: 126.9425,
    isMustVisit: true,
    tag: '世界遺產 🌋', duration: '1.5 - 2 小時',
    longDesc: '世界自然遺產！由海底火山噴發形成的巨碗狀火山丘，頂部是壯觀的翠綠火山口。沿木棧道約 30 分鐘即可登頂，俯瞰蔚藍太平洋與東部海岸線，濟州島公認第一日出聖地。旺季建議清晨 5 點抵達搶好位置！',
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  {
    id: 'manjanggul', cat: 'attraction',
    title: '萬丈窟', sub: '世界最長熔岩隧道・常年涼爽',
    lat: 33.5281, lng: 126.7714,
    isMustVisit: true,
    tag: '地質奇觀 🕳️', duration: '1 - 1.5 小時',
    longDesc: 'UNESCO 世界自然遺產，全長約 7.4 公里的壯觀熔岩洞窟，是全球最長的熔岩隧道之一！開放的 1 公里步道內可以看到奇幻的熔岩鐘乳石、石柱和全世界最高的熔岩石柱（高達 7.6 公尺）。洞內常年維持 11-21°C，夏天避暑超舒適！',
    coverImage: 'https://images.unsplash.com/photo-1504699439244-a8f9c33e2a20?auto=format&fit=crop&w=600&q=80',
    url: SRC_BRINGYOU, source: 'BringYou ‧ 必去 TOP10',
  },
  {
    id: 'jusangjeolli', cat: 'attraction',
    title: '大浦柱狀節理帶', sub: '六角玄武岩石柱・地質奇觀',
    lat: 33.2378, lng: 126.4248,
    isMustVisit: true,
    tag: '地質奇景 🪨', duration: '1 小時',
    longDesc: '大自然的鬼斧神工！數萬根完美六角形玄武岩石柱如同巨型管風琴般整齊排列在海岸邊，是火山熔岩冷卻凝固後形成的壯觀地質奇景。海浪拍打時白色浪花襯著黑色岩柱，形成極具衝擊力的畫面，是攝影師夢寐以求的取景地！',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
    url: SRC_BRINGYOU, source: 'BringYou ‧ 必去 TOP10',
  },
  { id: 'hallasan',     cat: 'attraction', title: '漢拏山',            sub: '韓國第一高峰 1,950m',            lat: 33.3616, lng: 126.5292 },
  { id: 'seopjikoji',   cat: 'attraction', title: '涉地可支',          sub: '韓劇取景地・油菜花海岸',          lat: 33.4243, lng: 126.9304 },
  { id: 'yongduam',     cat: 'attraction', title: '龍頭岩',            sub: '濟州市區經典火山岩地標',          lat: 33.5163, lng: 126.5119 },
  {
    id: 'udo', cat: 'attraction',
    title: '牛島', sub: '夢幻離島・花生冰淇淋',
    lat: 33.5036, lng: 126.9536,
    isMustVisit: true,
    tag: '絕美離島 🚲', duration: '半天至一天',
    longDesc: '離本島僅 15 分鐘船程的寶石小島，因形似臥牛得名。島上有 Tiffany 藍清透海水、純白珊瑚沙灘和黑色玄武岩海岸三種截然不同的海灘景觀！租雙人電動車環島一圈約 2 小時，必吃牛島花生冰淇淋和海螺咖哩飯。',
    coverImage: 'https://images.unsplash.com/photo-1599707367812-042f73e21e65?auto=format&fit=crop&w=600&q=80',
    url: SRC_BRINGYOU, source: 'BringYou ‧ 必去 TOP10',
  },
  {
    id: 'ecoland', cat: 'attraction',
    title: 'ECOLAND 森林小火車', sub: '英式蒸汽火車・原始榿木林',
    lat: 33.4540, lng: 126.6320,
    isMustVisit: true,
    tag: '親子樂園 🚂', duration: '2 - 3 小時',
    longDesc: '搭乘英式復古蒸汽小火車，穿梭在 30 萬坪的原始榿木林和湖泊之間——全程共四站，每站都有不同主題的花園和步道可以下車散步。湖心小島上還有夢幻的風車花園和歐式木屋咖啡座。超適合親子和情侶慢活拍照的療癒系景點！',
    coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  {
    id: 'snoopy', cat: 'attraction',
    title: '史努比庭園', sub: '超大規模 Snoopy 主題花園',
    lat: 33.4440, lng: 126.8280,
    isMustVisit: true,
    tag: '打卡聖地 🐾', duration: '2 - 3 小時',
    longDesc: '近年濟州爆紅打卡聖地！超大規模的史努比主題花園分為室內展區和戶外庭園兩大部分。室內有五個主題展廳重現經典漫畫場景，戶外的花田和森林步道藏著各種 Snoopy 和 Charlie Brown 雕塑。不論大人小孩都會被療癒到融化！',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  {
    id: 'camellia', cat: 'attraction',
    title: '山茶花之丘', sub: '東亞最大山茶花園林・四季花海',
    lat: 33.2890, lng: 126.3680,
    isMustVisit: true,
    tag: '森林花園 🌸', duration: '2 - 3 小時',
    longDesc: '山茶花之丘是東亞最大的山茶花園林，四季各有浪漫花海（冬山茶、春櫻、夏繡球、秋紅葉），如詩如畫。旁邊是 O\'sulloc 雪綠茶博物館，被翠綠茶園環繞，可以品嚐限定的綠茶冰淇淋和購買伴手禮。兩個景點可以順遊！',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  {
    id: 'jeongbang', cat: 'attraction',
    title: '正房瀑布', sub: '亞洲唯一海岸瀑布',
    lat: 33.2438, lng: 126.5725,
    isMustVisit: true,
    tag: '壯觀瀑布 💦', duration: '1 小時',
    longDesc: '亞洲唯一直接落入大海的海岸懸崖瀑布！高 23 公尺的銀白水柱從黑色玄武岩斷崖傾瀉而下，直接墜入碧綠海面，水霧飛濺搭配海浪拍岸的音效，震撼力十足。站在崖底抬頭仰望，感受大自然最原始的壯闊力量。',
    coverImage: 'https://images.unsplash.com/photo-1567639296067-c73e4f449eb7?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  { id: 'cheonjeyeon',  cat: 'attraction', title: '天帝淵瀑布',         sub: '仙女沐浴的神話瀑布',             lat: 33.2470, lng: 126.4157 },
  { id: 'sangumburi',   cat: 'attraction', title: '山君不離火山口',      sub: '低平火山口・秋季紫芒草',          lat: 33.4390, lng: 126.6970 },
  { id: 'iho-horse',    cat: 'attraction', title: '梨湖海灘小馬燈塔',    sub: '紅白木馬造型燈塔・拍照打卡',      lat: 33.4977, lng: 126.4529 },
  {
    /* New: aewol coastal cafe street (was in Guide MUST_VISITS but missing from map) */
    id: 'aewol', cat: 'attraction',
    title: '涯月漢潭海邊咖啡街', sub: '西海岸落日漫步路線・海景咖啡',
    lat: 33.4627, lng: 126.3125,
    isMustVisit: true,
    tag: '海景夕陽 ☕️', duration: '2 - 3 小時',
    longDesc: '濟州西海岸最夢幻的落日漫步路線。蜿蜒的海岸散步道串聯起一整排坐擁無敵海景的落地窗咖啡廳，包括 GD 的 Monsant 和知名 Knotted 甜甜圈店。黃昏時分坐在露天座位看果凍藍海面被夕陽染成金色，浪漫指數爆表！',
    coverImage: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=600&q=80',
    url: SRC_MIMIGO, source: 'Mimi韓の旅遊指南',
  },

  // ─── 海灘 ───
  { id: 'hamdeok',      cat: 'beach', title: '咸德海水浴場',    sub: '濟州馬爾地夫・清澈果凍海',        lat: 33.5435, lng: 126.6694 },
  {
    id: 'hyeopjae', cat: 'beach',
    title: '挾才海水浴場 & 翰林公園', sub: '銀白沙灘・翡翠綠海水',
    lat: 33.3937, lng: 126.2396,
    isMustVisit: true,
    tag: '絕美海灘 🏖️', duration: '2 - 3 小時',
    longDesc: '濟州島公認最美的白沙海灘！細軟的銀白沙灘搭配漸層翡翠綠海水，宛如馬爾地夫般的夢幻色票。對面就是飛揚島的翠綠山影，構成完美的海島明信片。隔壁的翰林公園匯集亞熱帶植物園、洞窟和民俗村，一次滿足三種體驗！',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    url: SRC_BRINGYOU, source: 'BringYou ‧ 必去 TOP10',
  },
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
  {
    id: 'arte-museum', cat: 'museum',
    title: 'Arte Museum', sub: '沉浸式光影藝術館',
    lat: 33.3050, lng: 126.3488,
    isMustVisit: true,
    tag: '藝術體驗 🎨', duration: '1.5 - 2 小時',
    longDesc: '濟州最具話題性的室內景點！利用超大型投影和環繞音效打造十餘個沉浸式藝術空間——海底世界、流星花園、無盡瀑布——光影從牆面延伸到地板讓你彷彿置身畫中。超級出片！也是雨天的完美備案。',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    url: SRC_MIMIGO, source: 'Mimi韓の旅遊指南',
  },
  { id: 'glass-castle', cat: 'museum', title: '濟州玻璃城堡',       sub: '250+ 件世界玻璃藝術品',          lat: 33.4338, lng: 126.7635 },
  { id: 'hallim-park',  cat: 'museum', title: '翰林公園',           sub: '亞熱帶植物園＋熔岩洞窟',          lat: 33.3848, lng: 126.2380 },

  // ─── 購物 ───
  {
    id: 'dongmun', cat: 'shopping',
    title: '東門傳統市場 & 夜市', sub: '濟州最大傳統市場・夜市必逛',
    lat: 33.5128, lng: 126.5287,
    isMustVisit: true,
    tag: '傳統市場 🍢', duration: '2 - 3 小時',
    longDesc: '濟州島最古老、規模最大的市場！白天逛鮮魚區買生魚片和黑豬肉乾，橘子伴手禮在這裡也最齊全；入夜後夜市區大排檔火力全開——招牌烤黑豬肉五花卷、龍蝦起司炸物、柑橘糖葫蘆和現打石頭爺爺瓶裝果汁，是體驗在地煙火氣的覓食天堂！',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    url: SRC_KKDAY, source: 'KKday Blog ‧ 必去 Top30',
  },
  { id: 'lotte-duty',   cat: 'shopping', title: '樂天免稅店濟州店',     sub: '美妝精品退稅購物天堂',           lat: 33.4890, lng: 126.4986 },
  { id: 'olle-market',  cat: 'shopping', title: '西歸浦偶來市場',       sub: '在地庶民美食市場',              lat: 33.2508, lng: 126.5630 },
  { id: 'jungang',      cat: 'shopping', title: '濟州中央地下街',       sub: '服飾美妝・年輕人逛街',           lat: 33.5100, lng: 126.5205 },

  // ─── 住宿 ───
  { id: 'jungane',      cat: 'hotel', title: 'Jungane 泳池別墅',   sub: 'Day1-2 溫水泳池 & 水療別墅',      lat: 33.5222, lng: 126.8616 },
  { id: 'air-city',     cat: 'hotel', title: '艾爾城市飯店',        sub: 'Day3-5 蓮洞市區・近機場',         lat: 33.4905, lng: 126.4935 },
  { id: 'jocheon-villa', cat: 'hotel', title: '小朝天海景泳池別墅',  sub: '家人行程首日海景住宿',            lat: 33.5370, lng: 126.6340 },
];

/* Convenience export — the 12 curated must-visit attractions */
export const MUST_VISITS = JEJU_POIS.filter((p) => p.isMustVisit);
