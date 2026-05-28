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
  { id: 'hallasan',     cat: 'attraction', title: '漢拏山',            sub: '韓國第一高峰 1,950m',            lat: 33.3616, lng: 126.5292,
    desc: '南韓最高峰，登頂可俯瞰整個濟州島，夏季野花、秋季紅葉、冬季雪景各具特色。城板岳路線最熱門，全程約 8-10 小時，建議清晨出發。' },
  { id: 'seopjikoji',   cat: 'attraction', title: '涉地可支',          sub: '韓劇取景地・油菜花海岸',          lat: 33.4243, lng: 126.9304,
    desc: '《All In 真愛宣言》《灰姑娘的姊姊》取景地，海岸懸崖搭配草原與燈塔，春天油菜花海開遍，是濟州東部最浪漫的散步路線。' },
  { id: 'yongduam',     cat: 'attraction', title: '龍頭岩',            sub: '濟州市區經典火山岩地標',          lat: 33.5163, lng: 126.5119,
    desc: '形似龍頭仰天嘶吼的巨大火山岩，是濟州市區最知名的自然地標。緊鄰機場，適合抵達或出發前順遊，附近還有龍淵雲橋可一併參觀。' },
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
  { id: 'cheonjeyeon',  cat: 'attraction', title: '天帝淵瀑布',         sub: '仙女沐浴的神話瀑布',             lat: 33.2470, lng: 126.4157,
    desc: '相傳七位仙女降臨沐浴的三層瀑布，由翠綠林木與石橋環繞，環境清幽。建議走過五福橋上俯瞰，雨季水量最壯觀。' },
  { id: 'sangumburi',   cat: 'attraction', title: '山君不離火山口',      sub: '低平火山口・秋季紫芒草',          lat: 33.4390, lng: 126.6970,
    desc: '濟州唯一的「平地火山口」，深 100 公尺、周長 2 公里。9-11 月整片紫芒草搖曳如海浪，是濟州最浪漫的秋景代表。' },
  { id: 'iho-horse',    cat: 'attraction', title: '梨湖海灘小馬燈塔',    sub: '紅白木馬造型燈塔・拍照打卡',      lat: 33.4977, lng: 126.4529,
    desc: '一對紅、白配色的木馬造型燈塔站在防波堤上，搭配夕陽海景超夢幻。離濟州市區約 15 分鐘，是傍晚散步打卡的私房景點。' },
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
  { id: 'hamdeok',      cat: 'beach', title: '咸德海水浴場',    sub: '濟州馬爾地夫・清澈果凍海',        lat: 33.5435, lng: 126.6694,
    desc: '被網友稱為「濟州馬爾地夫」的果凍綠海灘，水質透徹見底。沙灘旁的 Delmoondo 海景咖啡可以坐一整個下午，是親子戲水首選。' },
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
  { id: 'jungmun',      cat: 'beach', title: '中文穡達海灘',    sub: '南部最大海灘・衝浪勝地',          lat: 33.2433, lng: 126.4107,
    desc: '南部最大海灘，三面巨石環繞、浪況穩定，是濟州衝浪聖地。周邊有 Hyatt、Lotte 等五星度假村群與 Aqua Planet 水族館，適合度假慢遊。' },
  { id: 'woljeongri',   cat: 'beach', title: '月汀里海邊',      sub: '果凍藍海水・彩色椅子咖啡街',      lat: 33.5568, lng: 126.8068,
    desc: '海岸線一字排開的彩色木椅是 IG 必拍場景，配上 Tiffany 藍的海水和咖啡街，可以拍照、踏浪、泡咖啡一次滿足。' },
  { id: 'gimnyeong',    cat: 'beach', title: '金寧海水浴場',    sub: '純淨沙灘・人少清幽',              lat: 33.5586, lng: 126.7578,
    desc: '比咸德更安靜的隱藏版美灘，雪白細沙搭配藍綠漸層海水，海邊停了一台白色「JEJU」字母擺拍裝置，是拍夕陽剪影的好地方。' },

  // ─── 美食 ───
  { id: 'blackpork',    cat: 'food', title: '黑豬肉一條街',       sub: '正宗濟州黑豬肉燒烤・必吃！',      lat: 33.4876, lng: 126.4921,
    desc: '濟州市區黑豬肉專門店聚集地，整條街都是炭烤香氣。代表名店「豚舍豚」和「乭涸支」，五花肉、頸肉炭烤後沾鹹蝦醬，搭配生菜包著吃最對味。' },
  { id: 'bagel',        cat: 'food', title: 'London Bagel Museum',sub: '超人氣倫敦貝果・現場排隊',        lat: 33.5225, lng: 126.8521,
    desc: '韓國最紅貝果店的濟州分店，每天現烤、口味多樣（鹽花、洋蔥、藍莓奶油等）。建議開店前先到場登記名單，或下午 2 點後較好排。' },
  { id: 'abalone',      cat: 'food', title: '三姓穴鮑魚粥',       sub: '濟州名物鮑魚粥早餐',              lat: 33.5074, lng: 126.5254,
    desc: '在地老店，鮑魚切片連同內臟一起熬煮，粥色金黃濃郁。早餐時段排隊最少，搭配韓式小菜暖胃滿足。' },
  { id: 'hairtail',     cat: 'food', title: '帶魚鍋一條街',       sub: '西歸浦必吃紅燒帶魚鍋',            lat: 33.2488, lng: 126.5605,
    desc: '西歸浦海港旁的特色街區，紅燒帶魚搭配蘿蔔、白菜，辣甜入味。多人聚餐建議點大份組合餐，會附麥飯與韓式小菜。' },
  { id: 'gogi-guksu',   cat: 'food', title: '肉麵 (고기국수)',    sub: '濟州國民美食・豬肉湯拉麵',        lat: 33.5106, lng: 126.5178,
    desc: '濟州島限定的國民料理，乳白色豬骨湯配 Q 彈麵條和厚切五花肉。冬天暖身、夏天配冷麵都很對味，市區到處都有專門店。' },
  { id: 'omegi-food',   cat: 'food', title: '五福年糕 (Omegi 餅)', sub: '東門市場必吃傳統年糕',            lat: 33.5127, lng: 126.5279,
    desc: '東門市場最有名的傳統年糕攤，用小米、艾草、黃豆粉做出 Q 彈不黏牙的口感。內餡有紅豆、芝麻，現包現賣，當伴手禮也很適合。' },
  { id: 'seafood-tower', cat: 'food', title: '海鮮塔 / 活魚料理',  sub: '新鮮現撈海鮮拼盤',               lat: 33.2470, lng: 126.5650,
    desc: '西歸浦港口邊的海鮮塔餐廳，整盤現撈生魚片、龍蝦、螃蟹、章魚層層堆疊。建議 3-4 人共食一份大塔，CP 值最高。' },

  // ─── 咖啡廳 ───
  { id: 'monsant',      cat: 'cafe', title: 'Monsant de Aewol',  sub: 'GD 投資的海景咖啡廳',             lat: 33.4630, lng: 126.3110,
    desc: 'GD（權志龍）投資的網紅咖啡，整面落地窗正對涯月海岸線。建議點招牌貝果套餐，假日人潮多但翻桌快。' },
  { id: 'delmoondo',    cat: 'cafe', title: 'Cafe Delmoondo',    sub: '咸德海灘旁的海景咖啡',             lat: 33.5434, lng: 126.6700,
    desc: '咸德海灘旁的工業風海景咖啡，二樓露台可以直接看果凍綠海。招牌是花生奶油拿鐵與漢拏峰柑橘氣泡水，下午茶來坐很愜意。' },
  { id: 'bomnal',       cat: 'cafe', title: '春日咖啡 (Bomnal)',   sub: '涯月海景・可愛柯基犬',             lat: 33.4628, lng: 126.3125,
    desc: '涯月區的人氣咖啡，店狗是兩隻短腿柯基。窗邊小庭院可以邊喝咖啡邊看海與遠處風車，氣氛悠閒適合放空。' },
  { id: 'osulloc',      cat: 'cafe', title: '雪綠茶博物館 O\'sulloc', sub: '免費參觀・綠茶冰淇淋',          lat: 33.3058, lng: 126.2893,
    desc: '免費參觀的雪綠茶品牌博物館，被綿延茶園圍繞。必吃綠茶冰淇淋與抹茶捲，旁邊有 Innisfree 旗艦店可一起逛。' },
  { id: 'knotted',      cat: 'cafe', title: 'Knotted 甜甜圈',    sub: '首爾名店濟州分店・涯月海景',       lat: 33.4621, lng: 126.3098,
    desc: '首爾必吃甜甜圈品牌的濟州分店，馬卡龍配色超好拍。香草奶油與草莓奶油是經典口味，外帶幾顆當下午茶超滿足。' },

  // ─── 博物館 ───
  { id: 'haenyeo',      cat: 'museum', title: '海女博物館',        sub: '濟州獨特海女文化體驗',            lat: 33.5180, lng: 126.8650,
    desc: '介紹被聯合國列為「人類非物質文化遺產」的濟州海女文化。三層展館重現潛水裝備、漁具與生活面貌，看完會對「不靠氧氣瓶下海採鮑魚」這件事肅然起敬。' },
  { id: 'aquaplanet',   cat: 'museum', title: 'Aqua Planet 水族館', sub: '亞洲最大水族館之一',             lat: 33.4335, lng: 126.9270,
    desc: '亞洲規模前三大的水族館，2000 多種海洋生物，主水槽長 23 公尺的海女表演每天上演。建議搭配涉地可支半日遊。' },
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
  { id: 'glass-castle', cat: 'museum', title: '濟州玻璃城堡',       sub: '250+ 件世界玻璃藝術品',          lat: 33.4338, lng: 126.7635,
    desc: '戶外玻璃藝術主題公園，250+ 件作品散落在草坪間。鏡子迷宮、玻璃花田、彩虹橋都是熱門拍照點，親子同遊都喜歡。' },
  { id: 'hallim-park',  cat: 'museum', title: '翰林公園',           sub: '亞熱帶植物園＋熔岩洞窟',          lat: 33.3848, lng: 126.2380,
    desc: '一張票可逛 9 個主題園區：亞熱帶植物園、仙人掌園、民俗村、洞窟、鳥園⋯⋯。走完全程約 1.5-2 小時，是雨天的好備案。' },

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
  { id: 'lotte-duty',   cat: 'shopping', title: '樂天免稅店濟州店',     sub: '美妝精品退稅購物天堂',           lat: 33.4890, lng: 126.4986,
    desc: '濟州市區最大的免稅店，美妝、精品、巧克力一應俱全。建議離境前 24 小時內取貨，網路下單可先享折扣，現場提機場領取最方便。' },
  { id: 'olle-market',  cat: 'shopping', title: '西歸浦偶來市場',       sub: '在地庶民美食市場',              lat: 33.2508, lng: 126.5630,
    desc: '西歸浦在地人都來逛的傳統市場，比東門更接地氣。必吃黑豬肉串、橘子糖葫蘆、紅燒帶魚便當，現買現吃才道地。' },
  { id: 'jungang',      cat: 'shopping', title: '濟州中央地下街',       sub: '服飾美妝・年輕人逛街',           lat: 33.5100, lng: 126.5205,
    desc: '濟州市區年輕人聚集的地下街，韓系服飾、平價美妝、潮流配件都能逛到。連通東門市場，可以一路逛吃過去。' },

  // ─── 住宿 ───
  { id: 'jungane',      cat: 'hotel', title: 'Jungane 泳池別墅',   sub: 'Day1-2 溫水泳池 & 水療別墅',      lat: 33.5222, lng: 126.8616 },
  { id: 'air-city',     cat: 'hotel', title: '艾爾城市飯店',        sub: 'Day3-5 蓮洞市區・近機場',         lat: 33.4905, lng: 126.4935 },
  { id: 'jocheon-villa', cat: 'hotel', title: '小朝天海景泳池別墅',  sub: '家人行程首日海景住宿',            lat: 33.5370, lng: 126.6340 },
];

/* Convenience export — the 12 curated must-visit attractions */
export const MUST_VISITS = JEJU_POIS.filter((p) => p.isMustVisit);
