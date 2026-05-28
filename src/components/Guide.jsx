import React, { useState } from 'react';
import { ShoppingBag, MapPin, ExternalLink, Star, Clock, Map as MapIcon, List } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MUST_VISITS, CATEGORIES } from '../data/mapPois';

/* ── Custom Marker Icon (emoji-based, no external image needed) ── */
const createEmojiIcon = (emoji) =>
  L.divIcon({
    html: `<div style="
      font-size: 22px;
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: #fffdf6;
      border: 3px solid #5d4636;
      border-radius: 50%;
      box-shadow: 2px 2px 0px #5d4636;
    ">${emoji}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38]
  });

/* ─────────────────────────────────────────────────────────────
   🛍️  MUST-BUY  — 12 curated items
   All URLs re-verified 2026-05-27 (HTTP 200 + 文章主題對得上)
   ───────────────────────────────────────────────────────────── */
const MUST_BUYS = [
  {
    id: 'mind-sand',
    title: '巴黎貝甜 濟州限定心沙布列 (Jeju Mind Sand)',
    desc: '濟州機場最難搶的夢幻伴手禮！酥脆焦糖牛油餅乾印有漢拏山火山印紋，內餡包裹牛島花生或漢拏峰柑橘焦糖奶油，鹹甜交融。10 入禮盒約 ₩16,000，建議在機場預留 60 分鐘排隊採買！',
    tag: '機場限定 ✈️',
    url: 'https://tenten15413.pixnet.net/blog/post/406987521',
    source: '飽鳩。嗨起來 ‧ Pixnet',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tangerine-choco',
    title: '濟州火山柑橘巧克力 & 天然果乾',
    desc: '濟州島盛產的漢拏峰柑橘，做成裹上白巧克力的低溫乾燥果乾切片、可愛石頭爺爺瓶裝鮮榨柑橘汁、柑橘米花糖等各式變化款。東門市場一次買齊最方便！辨識度高且大人小孩都愛。',
    tag: '在地特產 🍊',
    url: 'https://www.klook.com/zh-TW/blog/what-to-buy-in-jeju/',
    source: 'Klook 客路部落格',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'osulloc',
    title: '雪綠茶博物館 O\'sulloc 綠茶牛奶抹醬',
    desc: '來自濟州純淨火山茶園，台灣部落客最推崇的是「綠茶牛奶抹醬」——極其香濃甜而不膩，抹吐司、淋鬆餅簡直是人間美味！冷泡茶包和綠茶巧克力禮盒送禮也超體面。博物館本身也是免費景點！',
    tag: '質感抹醬 🍵',
    url: 'https://www.klook.com/zh-TW/blog/what-to-buy-in-jeju/',
    source: 'Klook 客路部落格',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'innisfree',
    title: 'Innisfree 濟州限定火山泥系列',
    desc: '濟州島是 Innisfree 的故鄉！當地門市有許多本島買不到的濟州限定包裝，主打商品「火山泥毛孔清潔面膜」和「綠茶籽精華」價格比台灣便宜近四成，加上退稅更划算。必逛涯月邑的獨棟旗艦店！',
    tag: '美妝保養 💄',
    url: 'https://www.beauty321.com/post/67888',
    source: 'Beauty321 ‧ 必買 TOP30',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'olive-young',
    title: 'Olive Young 必買美妝神物',
    desc: '韓國最大藥妝店！必搶：Torriden 低分子玻尿酸精華（韓妞人手一瓶）、Biodance 膠原蛋白深層面膜、Rom&nd 水亮果汁唇釉、ilso 粉刺導出液、Medicube PDRN 粉紅膠原蛋白安瓶。消費滿 ₩15,000 出示護照可現場免稅！',
    tag: 'K-Beauty 💎',
    url: 'https://www.beauty321.com/post/70074',
    source: 'Beauty321 ‧ Olive Young Top10',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hallasan-soju',
    title: '漢拏山火山水燒酒 & 濟州限定啤酒',
    desc: '用漢拏山火山岩過濾水釀製的在地燒酒，比本島燒酒更清甜順口。另外「濟州啤酒 JEJU BEER」的柑橘白啤也是限定好味道！瓶身畫有濟州印花，搭配烤黑豬肉乾杯最對味。記得買限量版燒酒杯回家！',
    tag: '微醺名產 🍾',
    url: 'https://www.klook.com/zh-TW/blog/what-to-buy-in-jeju/',
    source: 'Klook 客路部落格',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mongle',
    title: 'Mongle 雲朵餅乾 & JEJU BALSALT 蕎麥餅乾',
    desc: 'Mongle 雲朵餅乾口感介於蛋糕與曲奇之間，造型療癒到讓人捨不得吃！JEJU BALSALT 蕎麥餅乾則以濟州黑礁石玄武岩為靈感，黑色系包裝質感滿分，送文青朋友的首選。兩款都是近年社群爆紅的濟州限定零食。',
    tag: '網美零食 🍪',
    url: 'https://tenten15413.pixnet.net/blog/post/406987521',
    source: '飽鳩。嗨起來 ‧ Pixnet',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'omegi',
    title: '五梅汽（Omegi）年糕 — 東門市場必吃',
    desc: '濟州傳統年糕由小黃米和艾草糯米製成，沾滿黃豆粉，內餡有紅豆和黑芝麻兩種，QQ 彈彈帶有天然穀物香甜！東門市場的「五福年糕」和「JinA 年糕」攤位最有名，現場吃熱呼呼的最美味。',
    tag: '傳統美食 🍡',
    url: 'https://tw.trip.com/blog/%E6%BF%9F%E5%B7%9E%E5%B3%B6%E5%BF%85%E8%B2%B7/',
    source: 'Trip.com 旅遊攻略',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kawaii-goods',
    title: '療癒文創：柑橘周邊 & 石頭爺爺香氛蠟燭',
    desc: '濟州島遍佈可愛的手作雜貨選物店。Mumu Jeju 的柑橘 / 玄武岩吊飾、Jeju Nyangi 的貓咪島民文具、WiMi 的海洋火山手工蠟燭，還有到處都有的石頭爺爺造型鑰匙圈、磁鐵和柑橘帽——全都是有溫度的濟州限定文青小物！',
    tag: '文創小物 🎨',
    url: 'https://tw.trip.com/blog/%E6%BF%9F%E5%B7%9E%E5%B3%B6%E5%BF%85%E8%B2%B7/',
    source: 'Trip.com 旅遊攻略',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'korean-snacks',
    title: '韓國超市必掃零食大補帖',
    desc: '必帶清單：農心可頌牛角餅乾、CW 麻糬巧克力餅乾、Delight Project 低卡貝果餅乾（Olive Young 神物）、黑松露芥末洋芋片、HBAF 蜂蜜奶油杏仁果。去樂天超市或 E-Mart 大箱搬回台灣準沒錯！',
    tag: '超市零食 🛒',
    url: 'https://www.beauty321.com/post/67888',
    source: 'Beauty321 ‧ 必買 TOP30',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kakao-limited',
    title: 'Kakao Friends 濟州限定周邊',
    desc: '濟州機場免稅店和市區都買得到！超可愛的「海女春植」和「漢拏峰萊恩」是濟州島限定造型，從玩偶、手機殼到文具套組通通有。另外星巴克濟州店也有季節限定杯款和周邊，粉絲必收！',
    tag: '限定卡通 🧸',
    url: 'https://tw.trip.com/blog/%E6%BF%9F%E5%B7%9E%E5%B3%B6%E5%BF%85%E8%B2%B7/',
    source: 'Trip.com 旅遊攻略',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hallabong-paste',
    title: '漢拏峰柑橘牙膏 & 生活小物',
    desc: '曾創下上架秒被搶購紀錄的「漢拏峰牙膏」——融合柑橘清香與薄荷爽感，獲得濟州旅遊紀念品大賽銀牌！搭配造型可愛的濟州行李牌、柑橘造型襪子，組成超有心的伴手禮組合。',
    tag: '生活雜貨 🪥',
    url: 'https://www.klook.com/zh-TW/blog/what-to-buy-in-jeju/',
    source: 'Klook 客路部落格',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80'
  }
];


/* ── Jeju Island center for map default view ── */
const JEJU_CENTER = [33.38, 126.55];

export default function Guide({ themeColor }) {
  const [activeSubTab, setActiveSubTab] = useState('buys');
  const [mapView, setMapView] = useState(false);  // toggle list ↔ map
  const [focusedSpot, setFocusedSpot] = useState(null);

  return (
    <div className="guide-container animate-fade-in">
      {/* Internal Sub-Tab Selection */}
      <div className="guide-subtabs">
        <button
          className={`guide-subtab-btn ${activeSubTab === 'buys' ? 'active' : ''}`}
          onClick={() => { setActiveSubTab('buys'); setMapView(false); }}
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

      {/* Map / List toggle — only for visits tab */}
      {activeSubTab === 'visits' && (
        <div className="guide-view-toggle">
          <button
            className={`view-toggle-btn ${!mapView ? 'active' : ''}`}
            onClick={() => setMapView(false)}
          >
            <List size={14} />
            <span>清單</span>
          </button>
          <button
            className={`view-toggle-btn ${mapView ? 'active' : ''}`}
            onClick={() => setMapView(true)}
          >
            <MapIcon size={14} />
            <span>地圖</span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="guide-content-list">
        {activeSubTab === 'buys' ? (
          /* ──── 必買清單 ──── */
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🍊</span>
              <p>精選 2026 濟州島與韓國 12 大必買名產！涵蓋機場限定、柑橘特產、K-Beauty 美妝、文創與超市零食。點擊標題可閱讀台灣旅遊達人的詳細圖文攻略。</p>
            </div>
            {MUST_BUYS.map((item) => (
              <div key={item.id} className="guide-card">
                <div className="guide-card-cover">
                  <img src={item.image} alt={item.title} className="guide-card-img" loading="lazy" />
                  <span className="guide-card-cover-badge">{item.tag}</span>
                </div>
                <div className="guide-card-body">
                  <div className="guide-card-header">
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(item.rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                      ))}
                      <span className="rating-num">{item.rating}</span>
                    </div>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="guide-card-title-link">
                    <h4 className="guide-card-title">
                      {item.title}
                      <ExternalLink size={13} className="link-icon" />
                    </h4>
                  </a>
                  {item.source && (
                    <p className="guide-card-source">📖 攻略來源：{item.source}</p>
                  )}
                  <p className="guide-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </>
        ) : mapView ? (
          /* ──── 景點地圖 ──── */
          <div className="guide-map-wrapper">
            <MapContainer
              center={JEJU_CENTER}
              zoom={10}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {MUST_VISITS.map((spot) => (
                <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={createEmojiIcon(CATEGORIES[spot.cat]?.emoji ?? '📍')}>
                  <Popup className="cozy-popup" maxWidth={260} minWidth={220}>
                    <div className="popup-inner">
                      <img src={spot.coverImage} alt={spot.title} className="popup-img" />
                      <div className="popup-body">
                        <span className="popup-tag">{spot.tag}</span>
                        <h4 className="popup-title">{spot.title}</h4>
                        <p className="popup-duration">⏱️ 建議停留 {spot.duration}</p>
                        <a href={spot.url} target="_blank" rel="noopener noreferrer" className="popup-link">
                          查看攻略 →
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
          /* ──── 景點清單 ──── */
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🌋</span>
              <p>精選 12 大此生必訪濟州島地標！涵蓋 UNESCO 世界遺產、夢幻離島、海景咖啡街、沉浸式美術館和傳統夜市。點擊標題可直接查看繁體中文攻略文。</p>
            </div>
            {MUST_VISITS.map((item) => (
              <div key={item.id} className="guide-card">
                <div className="guide-card-cover">
                  <img src={item.coverImage} alt={item.title} className="guide-card-img" loading="lazy" />
                  <span className="guide-card-cover-badge">{item.tag}</span>
                </div>
                <div className="guide-card-body">
                  <div className="guide-card-header">
                    <span className="duration-badge">
                      <Clock size={11} />
                      建議停留 {item.duration}
                    </span>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="guide-card-title-link">
                    <h4 className="guide-card-title">
                      {item.title}
                      <ExternalLink size={13} className="link-icon" />
                    </h4>
                  </a>
                  {item.source && (
                    <p className="guide-card-source">📖 攻略來源：{item.source}</p>
                  )}
                  <p className="guide-card-desc">{item.longDesc}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
