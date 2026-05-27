import { useState, useEffect, useMemo } from 'react';
import { myItinerary, familyItinerary } from './data/itinerary';
import Dashboard from './components/Dashboard';
import Guide from './components/Guide';
import Timeline from './components/Timeline';
import MapExplorer from './components/MapExplorer';
import {
  Compass, MapPin, Calendar, Briefcase, Share2, Download,
  User, Users, MoreHorizontal, X,
} from 'lucide-react';
import './index.css';

function App() {
  const [itineraryMode, setItineraryMode] = useState('mine');
  const [mainView, setMainView] = useState('itinerary'); // 'itinerary' | 'map'
  const [isPrepOpen, setIsPrepOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('prep');
  const [menuOpen, setMenuOpen] = useState(false);

  const activeItinerary = itineraryMode === 'mine' ? myItinerary : familyItinerary;

  // Use dayNum as the source of truth so switching mode keeps day index sensible
  const [selectedDayNum, setSelectedDayNum] = useState(activeItinerary[0].dayNum);

  // Resolve the day object
  const selectedDay = useMemo(
    () => activeItinerary.find((d) => d.dayNum === selectedDayNum) ?? activeItinerary[0],
    [activeItinerary, selectedDayNum]
  );

  // Reset day when switching me/family
  useEffect(() => {
    setSelectedDayNum(activeItinerary[0].dayNum);
  }, [itineraryMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dynamic theme color from day
  useEffect(() => {
    if (selectedDay?.theme) {
      const root = document.documentElement;
      const { h, s, l, accent } = selectedDay.theme;
      root.style.setProperty('--theme-h', h.toString());
      root.style.setProperty('--theme-s', s);
      root.style.setProperty('--theme-l', l);
      root.style.setProperty('--theme-accent', accent);
    }
  }, [selectedDay]);

  // Close menu when clicking outside (simple effect)
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const safeTransition = (cb) => {
    try {
      if (document.startViewTransition) {
        document.startViewTransition(cb);
        return;
      }
    } catch (_) { /* fall through */ }
    cb();
  };

  const handleDaySelect = (day) => safeTransition(() => setSelectedDayNum(day.dayNum));
  const handleModeSelect = (mode) => safeTransition(() => setItineraryMode(mode));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('已複製濟州島行程連結！');
  };

  const handleExportPDF = () => window.print();

  const tripMeta = itineraryMode === 'mine'
    ? { title: '我的濟州 5 日', range: '7/8 – 7/12', tag: '自駕補考 🌴' }
    : { title: '家人濟州 6 日', range: '7/6 – 7/11', tag: '溫馨家族 👨‍👩‍👧‍👦' };

  return (
    <div className="app-shell">
      {/* ─────────────────────────────────────────
          Compact sticky top header
          ───────────────────────────────────────── */}
      <header className="topbar">
        <div className="topbar-main">
          <div className="topbar-headline">
            <div className="topbar-tag">
              <Compass size={11} />
              <span>{tripMeta.tag}</span>
            </div>
            <h1 className="topbar-title">{tripMeta.title}</h1>
            <div className="topbar-date">
              <Calendar size={11} />
              <span>{tripMeta.range}</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Me / Family switch */}
            <div className="mode-pill" role="tablist" aria-label="行程版本">
              <button
                className={`mode-pill-btn ${itineraryMode === 'mine' ? 'active' : ''}`}
                onClick={() => handleModeSelect('mine')}
                role="tab"
                aria-selected={itineraryMode === 'mine'}
              >
                <User size={13} />
                <span>我</span>
              </button>
              <button
                className={`mode-pill-btn ${itineraryMode === 'family' ? 'active' : ''}`}
                onClick={() => handleModeSelect('family')}
                role="tab"
                aria-selected={itineraryMode === 'family'}
              >
                <Users size={13} />
                <span>家人</span>
              </button>
            </div>

            {/* Overflow menu */}
            <div className="topbar-menu-wrapper" onClick={(e) => e.stopPropagation()}>
              <button
                className="topbar-icon-btn"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="更多選項"
                aria-expanded={menuOpen}
              >
                <MoreHorizontal size={18} />
              </button>
              {menuOpen && (
                <div className="topbar-menu" role="menu">
                  <button className="topbar-menu-item" onClick={() => { handleShare(); setMenuOpen(false); }}>
                    <Share2 size={14} />
                    <span>分享連結</span>
                  </button>
                  <button className="topbar-menu-item" onClick={() => { handleExportPDF(); setMenuOpen(false); }}>
                    <Download size={14} />
                    <span>列印 / PDF</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky day pills */}
        <nav className="day-rail" aria-label="日期選擇">
          {activeItinerary.map((day) => {
            const isActive = day.dayNum === selectedDayNum;
            return (
              <button
                key={day.dayNum}
                className={`day-chip ${isActive ? 'active' : ''}`}
                style={isActive ? { borderColor: day.theme.accent, color: day.theme.accent, background: day.theme.accent + '15' } : {}}
                onClick={() => handleDaySelect(day)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="day-chip-num">D{day.dayNum}</span>
                <span className="day-chip-date">{day.date}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ─────────────────────────────────────────
          Main content area
          ───────────────────────────────────────── */}
      <main className="app-body">
        {mainView === 'itinerary' ? (
          <Timeline dayData={selectedDay} accent={selectedDay.theme.accent} />
        ) : (
          <MapExplorer
            dayData={selectedDay}
            accent={selectedDay.theme.accent}
          />
        )}
      </main>

      {/* ─────────────────────────────────────────
          Bottom Nav (mobile-first)
          ───────────────────────────────────────── */}
      <nav className="bottom-nav" aria-label="主功能">
        <button
          className={`bottom-nav-btn ${mainView === 'itinerary' ? 'active' : ''}`}
          onClick={() => setMainView('itinerary')}
        >
          <Calendar size={20} />
          <span>行程</span>
        </button>
        <button
          className={`bottom-nav-btn ${mainView === 'map' ? 'active' : ''}`}
          onClick={() => setMainView('map')}
        >
          <MapPin size={20} />
          <span>地圖</span>
        </button>
        <button
          className={`bottom-nav-btn ${isPrepOpen ? 'active' : ''}`}
          onClick={() => setIsPrepOpen(true)}
        >
          <Briefcase size={20} />
          <span>行前</span>
        </button>
      </nav>

      {/* ─────────────────────────────────────────
          Pre-trip drawer
          ───────────────────────────────────────── */}
      {isPrepOpen && (
        <div className="drawer-overlay" onClick={() => setIsPrepOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-grip" />
            <div className="drawer-header">
              <div className="drawer-tabs" role="tablist">
                <button
                  className={`drawer-tab-btn ${drawerTab === 'prep' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('prep')}
                  style={drawerTab === 'prep' && selectedDay ? { borderColor: selectedDay.theme.accent, color: selectedDay.theme.accent } : {}}
                >
                  🎒 行前準備
                </button>
                <button
                  className={`drawer-tab-btn ${drawerTab === 'guide' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('guide')}
                  style={drawerTab === 'guide' && selectedDay ? { borderColor: selectedDay.theme.accent, color: selectedDay.theme.accent } : {}}
                >
                  🗺️ 必買 & 景點
                </button>
              </div>
              <button className="drawer-close-btn" onClick={() => setIsPrepOpen(false)} aria-label="關閉">
                <X size={18} />
              </button>
            </div>
            <div className="drawer-scroll-body">
              {drawerTab === 'prep'
                ? selectedDay && <Dashboard themeColor={selectedDay.theme.accent} />
                : selectedDay && <Guide themeColor={selectedDay.theme.accent} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
