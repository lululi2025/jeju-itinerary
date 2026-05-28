import React, { useState, useEffect } from 'react';
import { Clock, Briefcase, ExternalLink, ShieldAlert, Award, ArrowLeftRight, Sun, Cloud, CloudRain } from 'lucide-react';

const PACKING_ITEMS = [
  { id: 'passport', text: '護照 ＆ 登機憑證', category: '必備' },
  { id: 'intl_driver', text: '國際駕照 ＆ 台灣駕照 (週六自駕必備！)', category: '必備' },
  { id: 'toothbrush', text: '自備牙刷牙膏 ＆ 刮鬍刀 (前二日民宿無提供！)', category: '盥洗' },
  { id: 'capsules', text: '星巴克咖啡膠囊 (別墅配備咖啡機)', category: '休閒' },
  { id: 'krw_cash', text: '韓元現金 ＆ T-money 交通卡', category: '必備' },
  { id: 'esim', text: '韓國上網卡 / eSIM 啟用', category: '必備' },
  { id: 'charger', text: '轉接頭 (韓國是 220V 雙圓頭) ＆ 行動電源', category: '必備' }
];

const WEATHER_FORECAST = [
  { day: '7/8 (三)', temp: '26°C / 21°C', icon: Sun, desc: '晴朗' },
  { day: '7/9 (四)', temp: '25°C / 20°C', icon: Cloud, desc: '多雲' },
  { day: '7/10 (五)', temp: '23°C / 19°C', icon: CloudRain, desc: '陣雨 (適合室內)' },
  { day: '7/11 (六)', temp: '27°C / 22°C', icon: Sun, desc: '晴朗 (適合自駕)' },
  { day: '7/12 (日)', temp: '26°C / 21°C', icon: Sun, desc: '晴朗' }
];

export default function Dashboard({ themeColor }) {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasStarted, setHasStarted] = useState(false);

  // Currency Converter state
  const [twd, setTwd] = useState('100');
  const [krw, setKrw] = useState('4200');

  // Packing list state from localStorage
  const [packedItems, setPackedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jeju_packed_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('jeju_packed_items', JSON.stringify(packedItems));
  }, [packedItems]);

  // Target trip start: 2026-07-08T06:40:00
  useEffect(() => {
    const targetDate = new Date('2026-07-08T06:40:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setHasStarted(true);
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Packing list particle animation state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
            angle: p.angle + p.spin,
            opacity: p.opacity - 0.02
          }))
          .filter(p => p.opacity > 0 && p.y < 900)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles]);

  const togglePacked = (id, event) => {
    const isNowPacked = !packedItems.includes(id);
    setPackedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );

    if (isNowPacked && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const container = document.querySelector('.dashboard-sidebar');
      const containerRect = container.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      const newParticles = Array.from({ length: 8 }).map((_, idx) => ({
        id: Math.random() + idx,
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 4 - 3,
        emoji: ['🍊', '🍃', '✨', '🍊', '🍃', '⭐️'][Math.floor(Math.random() * 6)],
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 16,
        opacity: 1
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
    }
  };

  // Handle live currency typing
  const handleTwdChange = (e) => {
    const val = e.target.value;
    setTwd(val);
    if (!isNaN(val) && val !== '') {
      setKrw(Math.round(parseFloat(val) * 42.15).toString());
    } else {
      setKrw('');
    }
  };

  const handleKrwChange = (e) => {
    const val = e.target.value;
    setKrw(val);
    if (!isNaN(val) && val !== '') {
      setTwd((parseFloat(val) / 42.15).toFixed(1).toString());
    } else {
      setTwd('');
    }
  };

  return (
    <div className="dashboard-sidebar">
      {/* Flight Countdown */}
      <div className="widget countdown-widget animate-fade-in">
        <h3 className="widget-title">
          <Clock size={18} />
          {hasStarted ? '✈️ 旅程熱烈進行中！' : '✈️ 濟州島出發倒數'}
        </h3>
        {!hasStarted && (
          <div className="countdown-grid">
            <div className="countdown-cell">
              <span className="number">{timeLeft.days}</span>
              <span className="unit">天</span>
            </div>
            <div className="countdown-cell">
              <span className="number">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="unit">時</span>
            </div>
            <div className="countdown-cell">
              <span className="number">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="unit">分</span>
            </div>
            <div className="countdown-cell">
              <span className="number">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="unit">秒</span>
            </div>
          </div>
        )}
        <div className="flight-quick-info">
          <strong>去程班機：</strong>7/8 (三) 06:40 虎航 IT654 T1
        </div>
      </div>

      {/* Currency Converter — moved up for quick everyday access */}
      <div className="widget currency-widget">
        <h3 className="widget-title">
          <ArrowLeftRight size={18} />
          即時匯率換算助理
        </h3>
        <div className="currency-inputs">
          <div className="currency-input-group">
            <span className="currency-label">TWD 台幣</span>
            <input
              type="text"
              value={twd}
              onChange={handleTwdChange}
              className="currency-field"
              placeholder="輸入台幣"
              inputMode="decimal"
            />
          </div>
          <div className="currency-divider">
            <span>⇄</span>
          </div>
          <div className="currency-input-group">
            <span className="currency-label">KRW 韓元</span>
            <input
              type="text"
              value={krw}
              onChange={handleKrwChange}
              className="currency-field"
              placeholder="輸入韓元"
              inputMode="decimal"
            />
          </div>
        </div>
        <span className="exchange-rate-disclaimer">參考匯率：1 TWD ≈ 42.15 KRW</span>
      </div>

      {/* Weather Widget */}
      <div className="widget weather-widget">
        <h3 className="widget-title">
          <Sun size={18} />
          濟州島 5日天氣預報
        </h3>
        <div className="weather-forecast-list">
          {WEATHER_FORECAST.map((w, idx) => {
            const WeatherIcon = w.icon;
            return (
              <div key={idx} className="weather-day-row">
                <span className="weather-date">{w.day}</span>
                <div className="weather-info-group">
                  <WeatherIcon size={16} className="weather-icon-symbol" />
                  <span className="weather-desc">{w.desc}</span>
                </div>
                <span className="weather-temp">{w.temp}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Packing Checklist */}
      <div className="widget checklist-widget">
        <h3 className="widget-title">
          <Briefcase size={18} />
          行前智能行李清單
        </h3>
        <ul className="checklist">
          {PACKING_ITEMS.map(item => {
            const isPacked = packedItems.includes(item.id);
            return (
              <li 
                key={item.id} 
                className={`checklist-item ${isPacked ? 'checked' : ''}`}
                onClick={(e) => togglePacked(item.id, e)}
              >
                <div className={`checkbox ${isPacked ? 'active' : ''}`}>
                  {isPacked && '✓'}
                </div>
                <div className="checklist-text-group">
                  <span className="checklist-text">{item.text}</span>
                  <span className="badge category-badge">{item.category}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="checklist-progress">
          <div className="progress-track-wrapper">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${(packedItems.length / PACKING_ITEMS.length) * 100}%`,
                backgroundColor: themeColor
              }}
            >
              {/* Cute slider handle: shows crown when 100% complete, orange 🍊 otherwise */}
              <div className="progress-bar-handle">
                {packedItems.length === PACKING_ITEMS.length ? '👑' : '🍊'}
              </div>
            </div>
          </div>
          <span className="progress-text">
            🎒 已收妥 {packedItems.length} / {PACKING_ITEMS.length} 件行李 ({Math.round((packedItems.length / PACKING_ITEMS.length) * 100)}%)
          </span>
        </div>
      </div>

      {/* Travel Tools */}
      <div className="widget tools-widget">
        <h3 className="widget-title">
          <ShieldAlert size={18} />
          自駕重要提示
        </h3>
        <div className="useful-info">
          <h4>💡 自駕貼心備忘：</h4>
          <ul>
            <li>韓國是左駕，與台灣相同。</li>
            <li>在 Naver Map 輸入<strong>「電話號碼」</strong>進行定位最方便。</li>
            <li>注意高速和市區速限，測速照相機極多！</li>
          </ul>
        </div>
      </div>

      {/* Particle Emitter */}
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            fontSize: '1.4rem',
            pointerEvents: 'none',
            opacity: p.opacity,
            zIndex: 999,
            userSelect: 'none',
            transition: 'opacity 0.05s linear'
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
