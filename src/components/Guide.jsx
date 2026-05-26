import React, { useState } from 'react';
import { ShoppingBag, MapPin, ExternalLink, Star, Clock } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   🛍️  MUST-BUY  — 12 curated items with Unsplash cover photos
   ───────────────────────────────────────────────────────────── */
const MUST_BUYS = [
  {
    id: 'mind-sand',
    title: '巴黎貝甜 濟州限定心沙布列 (Jeju Mind Sand)',
    desc: '濟州機場最難搶的夢幻伴手禮！酥脆焦糖牛油餅乾印有漢拏山火山印紋，內餡包裹牛島花生或漢拏峰柑橘焦糖奶油，鹹甜交融。10 入禮盒約 ₩16,000，建議在機場預留 60 分鐘排隊採買！',
    tag: '機場限定 ✈️',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tangerine-choco',
    title: '濟州火山柑橘巧克力 & 天然果乾',
    desc: '濟州島盛產的漢拏峰柑橘，做成裹上白巧克力的低溫乾燥果乾切片、可愛石頭爺爺瓶裝鮮榨柑橘汁、柑橘米花糖等各式變化款。東門市場一次買齊最方便！辨識度高且大人小孩都愛。',
    tag: '在地特產 🍊',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'osulloc',
    title: '雪綠茶博物館 O\'sulloc 綠茶牛奶抹醬',
    desc: '來自濟州純淨火山茶園，台灣部落客最推崇的是「綠茶牛奶抹醬」——極其香濃甜而不膩，抹吐司、淋鬆餅簡直是人間美味！冷泡茶包和綠茶巧克力禮盒送禮也超體面。博物館本身也是免費景點！',
    tag: '質感抹醬 🍵',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'innisfree',
    title: 'Innisfree 濟州限定火山泥系列',
    desc: '濟州島是 Innisfree 的故鄉！當地門市有許多本島買不到的濟州限定包裝，主打商品「火山泥毛孔清潔面膜」和「綠茶籽精華」價格比台灣便宜近四成，加上退稅更划算。必逛涯月邑的獨棟旗艦店！',
    tag: '美妝保養 💄',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'olive-young',
    title: 'Olive Young 必買美妝神物',
    desc: '韓國最大藥妝店！必搶：Torriden 低分子玻尿酸精華（韓妞人手一瓶）、Biodance 膠原蛋白深層面膜、Rom&nd 水亮果汁唇釉、ilso 粉刺導出液、Medicube PDRN 粉紅膠原蛋白安瓶。消費滿 ₩15,000 出示護照可現場免稅！',
    tag: 'K-Beauty 💎',
    url: 'https://www.creatrip.com/blog/11498',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hallasan-soju',
    title: '漢拏山火山水燒酒 & 濟州限定啤酒',
    desc: '用漢拏山火山岩過濾水釀製的在地燒酒，比本島燒酒更清甜順口。另外「濟州啤酒 JEJU BEER」的柑橘白啤也是限定好味道！瓶身畫有濟州印花，搭配烤黑豬肉乾杯最對味。記得買限量版燒酒杯回家！',
    tag: '微醺名產 🍾',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mongle',
    title: 'Mongle 雲朵餅乾 & JEJU BALSALT 蕎麥餅乾',
    desc: 'Mongle 雲朵餅乾口感介於蛋糕與曲奇之間，造型療癒到讓人捨不得吃！JEJU BALSALT 蕎麥餅乾則以濟州黑礁石玄武岩為靈感，黑色系包裝質感滿分，送文青朋友的首選。兩款都是近年社群爆紅的濟州限定零食。',
    tag: '網美零食 🍪',
    url: 'https://www.beauty321.com/post/56710',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'omegi',
    title: '五梅汽（Omegi）年糕 — 東門市場必吃',
    desc: '濟州傳統年糕由小黃米和艾草糯米製成，沾滿黃豆粉，內餡有紅豆和黑芝麻兩種，QQ 彈彈帶有天然穀物香甜！東門市場的「五福年糕」和「JinA 年糕」攤位最有名，現場吃熱呼呼的最美味。',
    tag: '傳統美食 🍡',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kawaii-goods',
    title: '療癒文創：柑橘周邊 & 石頭爺爺香氛蠟燭',
    desc: '濟州島遍佈可愛的手作雜貨選物店。Mumu Jeju 的柑橘 / 玄武岩吊飾、Jeju Nyangi 的貓咪島民文具、WiMi 的海洋火山手工蠟燭，還有到處都有的石頭爺爺造型鑰匙圈、磁鐵和柑橘帽——全都是有溫度的濟州限定文青小物！',
    tag: '文創小物 🎨',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'korean-snacks',
    title: '韓國超市必掃零食大補帖',
    desc: '必帶清單：農心可頌牛角餅乾、CW 麻糬巧克力餅乾、Delight Project 低卡貝果餅乾（Olive Young 神物）、黑松露芥末洋芋片、HBAF 蜂蜜奶油杏仁果。去樂天超市或 E-Mart 大箱搬回台灣準沒錯！',
    tag: '超市零食 🛒',
    url: 'https://www.creatrip.com/blog/13600',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kakao-limited',
    title: 'Kakao Friends 濟州限定周邊',
    desc: '濟州機場免稅店和市區都買得到！超可愛的「海女春植」和「漢拏峰萊恩」是濟州島限定造型，從玩偶、手機殼到文具套組通通有。另外星巴克濟州店也有季節限定杯款和周邊，粉絲必收！',
    tag: '限定卡通 🧸',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hallabong-paste',
    title: '漢拏峰柑橘牙膏 & 生活小物',
    desc: '曾創下上架秒被搶購紀錄的「漢拏峰牙膏」——融合柑橘清香與薄荷爽感，獲得濟州旅遊紀念品大賽銀牌！搭配造型可愛的濟州行李牌、柑橘造型襪子，組成超有心的伴手禮組合。',
    tag: '生活雜貨 🪥',
    url: 'https://www.creatrip.com/blog/14740',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80'
  }
];

/* ─────────────────────────────────────────────────────────────
   🏔️  MUST-VISIT  — 12 curated attractions with cover photos
   ───────────────────────────────────────────────────────────── */
const MUST_VISITS = [
  {
    id: 'ilchulbong',
    title: '城山日出峰 (Seongsan Ilchulbong)',
    desc: '世界自然遺產！由海底火山噴發形成的巨碗狀火山丘，頂部是壯觀的翠綠火山口。沿木棧道約 30 分鐘即可登頂，俯瞰蔚藍太平洋與東部海岸線，濟州島公認第一日出聖地。旺季建議清晨 5 點抵達搶好位置！',
    tag: '世界遺產 🌋',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '1.5 - 2 小時',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'udo',
    title: '夢幻離島 - 牛島 (Udo Island)',
    desc: '離本島僅 15 分鐘船程的寶石小島，因形似臥牛得名。島上有 Tiffany 藍清透海水、純白珊瑚沙灘和黑色玄武岩海岸三種截然不同的海灘景觀！租雙人電動車環島一圈約 2 小時，必吃牛島花生冰淇淋和海螺咖哩飯。',
    tag: '絕美離島 🚲',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '半天至一天',
    image: 'https://images.unsplash.com/photo-1599707367812-042f73e21e65?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'aewol',
    title: '涯月漢潭海邊咖啡街 (Aewol Handam)',
    desc: '濟州西海岸最夢幻的落日漫步路線。蜿蜒的海岸散步道串聯起一整排坐擁無敵海景的落地窗咖啡廳，包括 GD 的 Monsant 和知名 Knotted 甜甜圈店。黃昏時分坐在露天座位看果凍藍海面被夕陽染成金色，浪漫指數爆表！',
    tag: '海景夕陽 ☕️',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'manjanggul',
    title: '萬丈窟 (Manjanggul Lava Tube)',
    desc: 'UNESCO 世界自然遺產，全長約 7.4 公里的壯觀熔岩洞窟，是全球最長的熔岩隧道之一！開放的 1 公里步道內可以看到奇幻的熔岩鐘乳石、石柱和全世界最高的熔岩石柱（高達 7.6 公尺）。洞內常年維持 11-21°C，夏天避暑超舒適！',
    tag: '地質奇觀 🕳️',
    url: 'https://bring-you.info/zh-tw/jeju-island-travel-guide',
    duration: '1 - 1.5 小時',
    image: 'https://images.unsplash.com/photo-1504699439244-a8f9c33e2a20?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'jeongbang',
    title: '正房瀑布 (Jeongbang Waterfall)',
    desc: '亞洲唯一直接落入大海的海岸懸崖瀑布！高 23 公尺的銀白水柱從黑色玄武岩斷崖傾瀉而下，直接墜入碧綠海面，水霧飛濺搭配海浪拍岸的音效，震撼力十足。站在崖底抬頭仰望，感受大自然最原始的壯闊力量。',
    tag: '壯觀瀑布 💦',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '1 小時',
    image: 'https://images.unsplash.com/photo-1567639296067-c73e4f449eb7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'snoopy',
    title: '史努比庭園 (Snoopy Garden)',
    desc: '近年濟州爆紅打卡聖地！超大規模的史努比主題花園分為室內展區和戶外庭園兩大部分。室內有五個主題展廳重現經典漫畫場景，戶外的花田和森林步道藏著各種 Snoopy 和 Charlie Brown 雕塑。不論大人小孩都會被療癒到融化！',
    tag: '打卡聖地 🐾',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'arte-museum',
    title: 'Arte Museum 沉浸式光影藝術館',
    desc: '濟州最具話題性的室內景點！利用超大型投影和環繞音效打造十餘個沉浸式藝術空間——海底世界、流星花園、無盡瀑布——光影從牆面延伸到地板讓你彷彿置身畫中。超級出片！也是雨天的完美備案。',
    tag: '藝術體驗 🎨',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '1.5 - 2 小時',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'camellia',
    title: '山茶花之丘 & 雪綠茶博物館',
    desc: '山茶花之丘是東亞最大的山茶花園林，四季各有浪漫花海（冬山茶、春櫻、夏繡球、秋紅葉），如詩如畫。旁邊是 O\'sulloc 雪綠茶博物館，被翠綠茶園環繞，可以品嚐限定的綠茶冰淇淋和購買伴手禮。兩個景點可以順遊！',
    tag: '森林花園 🌸',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dongmun',
    title: '東門傳統市場 & 夜市 (Dongmun Market)',
    desc: '濟州島最古老、規模最大的市場！白天逛鮮魚區買生魚片和黑豬肉乾，橘子伴手禮在這裡也最齊全；入夜後夜市區大排檔火力全開——招牌烤黑豬肉五花卷、龍蝦起司炸物、柑橘糖葫蘆和現打石頭爺爺瓶裝果汁，是體驗在地煙火氣的覓食天堂！',
    tag: '傳統市場 🍢',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'jusangjeolli',
    title: '大浦海岸柱狀節理帶 (Jusangjeolli Cliff)',
    desc: '大自然的鬼斧神工！數萬根完美六角形玄武岩石柱如同巨型管風琴般整齊排列在海岸邊，是火山熔岩冷卻凝固後形成的壯觀地質奇景。海浪拍打時白色浪花襯著黑色岩柱，形成極具衝擊力的畫面，是攝影師夢寐以求的取景地！',
    tag: '地質奇景 🪨',
    url: 'https://bring-you.info/zh-tw/jeju-island-travel-guide',
    duration: '1 小時',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hyeopjae',
    title: '挾才海水浴場 & 翰林公園 (Hyeopjae Beach)',
    desc: '濟州島公認最美的白沙海灘！細軟的銀白沙灘搭配漸層翡翠綠海水，宛如馬爾地夫般的夢幻色票。對面就是飛揚島的翠綠山影，構成完美的海島明信片。隔壁的翰林公園匯集亞熱帶植物園、洞窟和民俗村，一次滿足三種體驗！',
    tag: '絕美海灘 🏖️',
    url: 'https://bring-you.info/zh-tw/jeju-island-travel-guide',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ecoland',
    title: 'ECOLAND 森林小火車主題樂園',
    desc: '搭乘英式復古蒸汽小火車，穿梭在 30 萬坪的原始榿木林和湖泊之間——全程共四站，每站都有不同主題的花園和步道可以下車散步。湖心小島上還有夢幻的風車花園和歐式木屋咖啡座。超適合親子和情侶慢活拍照的療癒系景點！',
    tag: '親子樂園 🚂',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Guide({ themeColor }) {
  const [activeSubTab, setActiveSubTab] = useState('buys');

  return (
    <div className="guide-container animate-fade-in">
      {/* Internal Sub-Tab Selection */}
      <div className="guide-subtabs">
        <button
          className={`guide-subtab-btn ${activeSubTab === 'buys' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('buys')}
          style={activeSubTab === 'buys' ? { '--active-accent': themeColor } : {}}
        >
          <ShoppingBag size={15} />
          <span>🛍️ 必買清單</span>
        </button>
        <button
          className={`guide-subtab-btn ${activeSubTab === 'visits' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('visits')}
          style={activeSubTab === 'visits' ? { '--active-accent': themeColor } : {}}
        >
          <MapPin size={15} />
          <span>🏔️ 必去景點</span>
        </button>
      </div>

      {/* Content List */}
      <div className="guide-content-list">
        {activeSubTab === 'buys' ? (
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🍊</span>
              <p>精選 2026 濟州島與韓國 12 大必買名產！涵蓋機場限定、柑橘特產、K-Beauty 美妝、文創與超市零食。點擊標題可閱讀台灣旅遊達人的詳細圖文攻略。</p>
            </div>
            {MUST_BUYS.map((item) => (
              <div key={item.id} className="guide-card">
                {/* Cover Image */}
                <div className="guide-card-cover">
                  <img src={item.image} alt={item.title} className="guide-card-img" loading="lazy" />
                  <span className="guide-card-cover-badge">{item.tag}</span>
                </div>
                <div className="guide-card-body">
                  <div className="guide-card-header">
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < Math.floor(item.rating) ? '#f59e0b' : 'none'}
                          stroke="#f59e0b"
                        />
                      ))}
                      <span className="rating-num">{item.rating}</span>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guide-card-title-link"
                  >
                    <h4 className="guide-card-title">
                      {item.title}
                      <ExternalLink size={13} className="link-icon" />
                    </h4>
                  </a>
                  <p className="guide-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🌋</span>
              <p>精選 12 大此生必訪濟州島地標！涵蓋 UNESCO 世界遺產、夢幻離島、海景咖啡街、沉浸式美術館和傳統夜市。點擊標題可直接查看繁體中文攻略文。</p>
            </div>
            {MUST_VISITS.map((item) => (
              <div key={item.id} className="guide-card">
                {/* Cover Image */}
                <div className="guide-card-cover">
                  <img src={item.image} alt={item.title} className="guide-card-img" loading="lazy" />
                  <span className="guide-card-cover-badge">{item.tag}</span>
                </div>
                <div className="guide-card-body">
                  <div className="guide-card-header">
                    <span className="duration-badge">
                      <Clock size={11} />
                      建議停留 {item.duration}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guide-card-title-link"
                  >
                    <h4 className="guide-card-title">
                      {item.title}
                      <ExternalLink size={13} className="link-icon" />
                    </h4>
                  </a>
                  <p className="guide-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
