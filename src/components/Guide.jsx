import React, { useState } from 'react';
import { ShoppingBag, MapPin, ExternalLink, Heart, Star, Compass, Coffee } from 'lucide-react';

const MUST_BUYS = [
  {
    id: 'mind-sand',
    title: '巴黎貝甜 濟州島限定心沙布列夾心餅乾 (Jeju Mind Sand)',
    desc: '濟州島最難搶的機場限定伴手禮！外皮是極為酥脆的焦糖牛油餅乾，印有漢拏山等火山印紋，內餡包著濟州在地特產「牛島花生」或是「漢拏峰柑橘」焦糖奶油，鹹甜交融，是回台前必帶的第一名夢幻甜點。',
    tag: '機場限定 ✈️',
    url: 'https://verity2003.pixnet.net/blog/post/234057864',
    rating: 5
  },
  {
    id: 'tangerine-choco',
    title: '濟州火山柑橘巧克力 & 天然乾燥果乾',
    desc: '濟州島因為氣候溫和，盛產香甜的柑橘。當地的火山柑橘巧克力、裹上白巧克力的低溫烘乾橘子切片、以及用石頭爺爺瓶子裝著的 100% 鮮榨柑橘果汁，都是傳統東門市場熱銷、辨識度極高且大人小孩都愛的療癒伴手禮！',
    tag: '在地特產 🍊',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.8
  },
  {
    id: 'osulloc',
    title: '雪綠茶博物館 O\'sulloc 綠茶牛奶抹醬 & 特色茶包',
    desc: '來自濟州島純淨火山茶園 O\'sulloc 的經典綠茶系列。最被台灣部落客推崇的是極其香濃、甜而不膩的「綠茶牛奶抹醬」，拿來抹吐司、淋鬆餅簡直是人間美味！另外包裝文青精緻的冷泡茶包也是送禮首選。',
    tag: '質感抹醬 🍵',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.9
  },
  {
    id: 'hallasan-soju',
    title: '漢拏山火山水燒酒 (Hallasan Soju)',
    desc: '利用濟州島地標——漢拏山的純淨火山岩過濾水所釀製的在地燒酒。瓶身畫有美麗的雪白火山印花，比起韓國本島的一般燒酒更少化學雜味、口感更加清甜順口，最適合用來搭配烤黑豬肉！',
    tag: '微醺名產 🍾',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.7
  },
  {
    id: 'kawaii-goods',
    title: '療癒柑橘 / 石頭爺爺手作香氛蠟燭與文創周邊',
    desc: '濟州島近年興起極多可愛的手作雜貨選物店（如 Mumu Jeju 等）。店內販售各種戴著小橘帽的石頭爺爺鑰匙圈、療癒柑橘針織小包，以及散發濟州海洋火山芳香的海凍果凍蠟燭，充滿海島渡假風的精緻手感！',
    tag: '療癒文創 🎨',
    url: 'https://www.klook.com/zh-TW/blog/jeju-souvenirs/',
    rating: 4.9
  }
];

const MUST_VISITS = [
  {
    id: 'ilchulbong',
    title: '城山日出峰 (Seongsan Ilchulbong)',
    desc: '世界自然遺產，是由海底火山噴發形成的大型碗狀火山丘，頂部有著壯觀的巨型火山口綠草盆地。沿著木棧道輕鬆步行約 30 分鐘即可登頂，居高臨下俯瞰蔚藍太平洋與東部海岸，是濟州島名列第一的絕美日出地！',
    tag: '世界遺產 🌋',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '1.5 - 2 小時'
  },
  {
    id: 'udo',
    title: '夢幻離島 - 牛島 (Udo Island)',
    desc: '離本島僅 15-20 分鐘船程的絕美小島，因形似一頭臥牛而得名。島上擁有夢幻 Tiffany 藍的白沙灘與玄武岩海岸，最推薦租一輛可愛的雙人小電動車或腳踏車慢活環島，一邊吹海風，一邊品嚐牛島特產的花生冰淇淋！',
    tag: '絕美離島 🚲',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '半天至一天'
  },
  {
    id: 'aewol',
    title: '涯月漢潭海邊咖啡街 (Aewol Handam)',
    desc: '濟州西部最迷人的落日海景聖地！沿著蜿蜒浪漫的海岸散步道，錯落著一整排坐擁無敵海景的落地窗咖啡廳（如知名的春日咖啡館 BOMNAL）。在黃昏時分坐在露天陽台，靜靜看著橘黃夕陽落入果凍海，極具海島度假的浪漫情調。',
    tag: '海景夕陽 ☕️',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時'
  },
  {
    id: 'camellia',
    title: '山茶花之丘 (Camellia Hill) & 雪綠茶博物館',
    desc: '山茶花之丘是東亞規模最大的山茶花園林，四季皆有不同的浪漫花海，如冬山茶、春櫻、夏繡球，非常適合拍照打卡。一旁則是悅詩風吟（Innisfree）和雪綠茶博物館，被大片翠綠茶園包圍，能品嚐極濃郁的綠茶冰淇淋。',
    tag: '森林秘境 🌸',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時'
  },
  {
    id: 'dongmun',
    title: '東門傳統市場與夜市 (Dongmun Market)',
    desc: '濟州島歷史最悠久、規模最大的傳統代表性市場。白天可以大啖新鮮生魚片、買黑豬肉乾與橘子伴手禮；晚上則有精彩的噴火秀夜市，招牌小吃有熔岩黑豬肉五花肉捲、龍蝦起司燒、柑橘糖葫蘆，是體驗濟州夜生活不容錯過的覓食天堂！',
    tag: '傳統夜市 🍢',
    url: 'https://blog.kkday.com/112613/asia-korea-jeju-must-visit-attractions',
    duration: '2 - 3 小時'
  }
];

export default function Guide({ themeColor }) {
  const [activeSubTab, setActiveSubTab] = useState('buys'); // 'buys' or 'visits'

  return (
    <div className="guide-container animate-fade-in">
      {/* Tab Segmented Control inside Guide */}
      <div className="guide-subtabs">
        <button
          className={`guide-subtab-btn ${activeSubTab === 'buys' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('buys')}
          style={{ '--active-border': themeColor }}
        >
          <ShoppingBag size={15} />
          <span>🛍️ 必買清單</span>
        </button>
        <button
          className={`guide-subtab-btn ${activeSubTab === 'visits' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('visits')}
          style={{ '--active-border': themeColor }}
        >
          <MapPin size={15} />
          <span>🏔️ 必去景點</span>
        </button>
      </div>

      <div className="guide-content-list">
        {activeSubTab === 'buys' ? (
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🍊</span>
              <p>精選 2026 濟州島與韓國最熱門的限定名產，送禮自用最體面！點擊卡片標題可閱讀台灣旅遊達人的詳細圖文介紹。</p>
            </div>
            {MUST_BUYS.map((item) => (
              <div key={item.id} className="guide-card">
                <div className="guide-card-header">
                  <span className="badge guide-badge">{item.tag}</span>
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
                    <ExternalLink size={14} className="link-icon" />
                  </h4>
                </a>
                <p className="guide-card-desc">{item.desc}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="guide-intro-banner">
              <span className="emoji">🌋</span>
              <p>為你挑選此生必訪的濟州島五大代表地標！包含世界遺產、看海咖啡街與離島體驗，點擊標題即可看詳細繁體中文攻略。</p>
            </div>
            {MUST_VISITS.map((item) => (
              <div key={item.id} className="guide-card">
                <div className="guide-card-header">
                  <span className="badge guide-badge">{item.tag}</span>
                  <span className="duration-badge">⏱️ 建議停留 {item.duration}</span>
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="guide-card-title-link"
                >
                  <h4 className="guide-card-title">
                    {item.title}
                    <ExternalLink size={14} className="link-icon" />
                  </h4>
                </a>
                <p className="guide-card-desc">{item.desc}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
