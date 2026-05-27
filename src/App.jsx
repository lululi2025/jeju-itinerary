import React, { useState, useEffect } from 'react';
import { myItinerary, familyItinerary } from './data/itinerary';
import Dashboard from './components/Dashboard';
import Guide from './components/Guide';
import Timeline from './components/Timeline';
import MapExplorer from './components/MapExplorer';
import { Compass, Map, Briefcase, Share2, Download, Calendar, User, Users, Navigation, MapPin } from 'lucide-react';
import './index.css';

function App() {
  const [itineraryMode, setItineraryMode] = useState('mine');
  const [mainView, setMainView] = useState('itinerary'); // 'itinerary' | 'map'
  
  // Choose the dataset based on mode
  const activeItinerary = itineraryMode === 'mine' ? myItinerary : familyItinerary;
  
  const [selectedDay, setSelectedDay] = useState(activeItinerary[0]);
  const [isPrepOpen, setIsPrepOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('prep');

  // Sync selectedDay whenever the itinerary mode changes
  useEffect(() => {
    setSelectedDay(activeItinerary[0]);
  }, [itineraryMode]);

  // Dynamically update HSL theme colors in CSS variables based on selected day
  useEffect(() => {
    if (selectedDay && selectedDay.theme) {
      const root = document.documentElement;
      const { h, s, l, accent } = selectedDay.theme;
      
      root.style.setProperty('--theme-h', h.toString());
      root.style.setProperty('--theme-s', s);
      root.style.setProperty('--theme-l', l);
      root.style.setProperty('--theme-accent', accent);
    }
  }, [selectedDay]);

  const handleDaySelect = (day) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedDay(day);
      });
    } else {
      setSelectedDay(day);
    }
  };

  const handleModeSelect = (mode) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setItineraryMode(mode);
      });
    } else {
      setItineraryMode(mode);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('已複製您的濟州島專屬行程連結！快分享給家人吧 🔗');
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="app-main-wrapper">
      {/* Immersive Cover Hero Header (Wanderlog Style) */}
      <div className="trip-hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Compass size={14} />
            <span>
              {itineraryMode === 'mine' ? '自駕補考旅程 🌴' : '溫馨家族旅程 👨‍👩‍👧‍👦'}
            </span>
          </div>
          <h1 className="hero-title">
            {itineraryMode === 'mine' ? '我的濟州島自駕 5日遊' : '家人濟州島溫馨 6日遊'}
          </h1>
          
          <div className="hero-meta-grid">
            <div className="meta-item">
              <Calendar size={14} />
              <span>
                {itineraryMode === 'mine' ? '2026.07.08 - 2026.07.12' : '2026.07.06 - 2026.07.11'}
              </span>
            </div>
            <div className="meta-item">
              <User size={14} />
              <span>
                {itineraryMode === 'mine' ? '1 人自駕（7/8-10 與家人合流）' : '家族成員旅行團 (KHH直飛)'}
              </span>
            </div>
            <div className="meta-item">
              <Navigation size={14} />
              <span>
                {itineraryMode === 'mine' ? '週末專屬自駕 🚗' : '全程租車自駕 🚗'}
              </span>
            </div>
          </div>

          <div className="hero-action-buttons">
            <button className="hero-btn share-btn" onClick={handleShare}>
              <Share2 size={14} />
              <span>分享行程</span>
            </button>
            <button className="hero-btn export-btn" onClick={handleExportPDF}>
              <Download size={14} />
              <span>列印 / 導出 PDF</span>
            </button>
            <button className="hero-btn prep-toggle-btn" onClick={() => setIsPrepOpen(true)}>
              <Briefcase size={14} />
              <span>行前準備 🎒</span>
            </button>
          </div>
        </div>
      </div>

      <div className="app-wrapper">
        {/* ── Top-level view switcher: 行程 | 地圖 ── */}
        <div className="main-view-tabs">
          <button
            className={`main-view-tab ${mainView === 'itinerary' ? 'active' : ''}`}
            onClick={() => setMainView('itinerary')}
          >
            <Map size={15} />
            <span>📅 每日行程</span>
          </button>
          <button
            className={`main-view-tab ${mainView === 'map' ? 'active' : ''}`}
            onClick={() => setMainView('map')}
          >
            <MapPin size={15} />
            <span>🗺️ 濟州地圖</span>
          </button>
        </div>

        {mainView === 'itinerary' ? (
          <>
            {/* Main Tabs Segmented Control (Switch between Personal and Family plan) */}
            <div className="itinerary-toggle-container">
              <button 
                className={`itinerary-toggle-btn ${itineraryMode === 'mine' ? 'active' : ''}`}
                onClick={() => handleModeSelect('mine')}
              >
                <User size={16} />
                <span>👤 我的行程 (5天版)</span>
              </button>
              <button 
                className={`itinerary-toggle-btn ${itineraryMode === 'family' ? 'active' : ''}`}
                onClick={() => handleModeSelect('family')}
              >
                <Users size={16} />
                <span>👨‍👩‍👧‍👦 家人的行程 (6天原版)</span>
              </button>
            </div>

            {/* Day selection tab pills */}
            <header className="app-header-nav">
              <nav className="day-selector-container">
                {activeItinerary.map((day) => (
                  <button
                    key={day.dayNum}
                    className={`day-tab-btn ${selectedDay && selectedDay.dayNum === day.dayNum ? 'active' : ''}`}
                    onClick={() => handleDaySelect(day)}
                  >
                    <Map size={14} />
                    <span>D{day.dayNum} - {day.date}</span>
                  </button>
                ))}
              </nav>
            </header>

            {/* Main Spacious Timeline Grid */}
            <main className="app-main-grid single-timeline-view">
              <div className="timeline-wrapper full-width">
                {selectedDay && <Timeline dayData={selectedDay} />}
              </div>
            </main>
          </>
        ) : (
          /* ── Map Explorer ── */
          <MapExplorer />
        )}
      </div>

      {/* Collapsible Sliding Cozy Drawer for Pre-trip Preparation */}
      {isPrepOpen && (
        <div className="drawer-overlay" onClick={() => setIsPrepOpen(false)}>
          <div className="drawer-content animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-tabs">
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
                  🗺️ 必買＆景點
                </button>
              </div>
              <button className="drawer-close-btn" onClick={() => setIsPrepOpen(false)}>✕</button>
            </div>
            <div className="drawer-scroll-body">
              {drawerTab === 'prep' ? (
                selectedDay && <Dashboard themeColor={selectedDay.theme.accent} />
              ) : (
                selectedDay && <Guide themeColor={selectedDay.theme.accent} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) for quick drawer access */}
      {!isPrepOpen && (
        <button className="floating-prep-fab" onClick={() => setIsPrepOpen(true)} title="開啟行前準備">
          🎒
        </button>
      )}
    </div>
  );
}

export default App;
