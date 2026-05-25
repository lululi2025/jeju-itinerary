import React, { useState, useEffect } from 'react';
import { myItinerary, familyItinerary } from './data/itinerary';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import { Compass, Map, Briefcase, Share2, Download, Calendar, User, Users, Navigation } from 'lucide-react';
import './index.css';

function App() {
  const [itineraryMode, setItineraryMode] = useState('mine');
  
  // Choose the dataset based on mode
  const activeItinerary = itineraryMode === 'mine' ? myItinerary : familyItinerary;
  
  const [selectedDay, setSelectedDay] = useState(activeItinerary[0]);
  const [mobileTab, setMobileTab] = useState('timeline');

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

  const handleMobileTabSelect = (tab) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setMobileTab(tab);
      });
    } else {
      setMobileTab(tab);
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
          </div>
        </div>
      </div>

      <div className="app-wrapper">
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

        {/* Main Split Grid */}
        <main className="app-main-grid">
          {/* Left Widget Sidebar Container */}
          <div className={`sidebar-container ${mobileTab === 'dashboard' ? 'mobile-active' : 'mobile-hidden'}`}>
            {selectedDay && <Dashboard themeColor={selectedDay.theme.accent} />}
          </div>

          {/* Right Dynamic Timeline View Container */}
          <div className={`timeline-wrapper ${mobileTab === 'timeline' ? 'mobile-active' : 'mobile-hidden'}`}>
            {selectedDay && <Timeline dayData={selectedDay} />}
          </div>
        </main>

        {/* Mobile Bottom Floating Navigation Bar */}
        <div className="mobile-nav-bar">
          <button 
            className={`mobile-nav-btn ${mobileTab === 'timeline' ? 'active' : ''}`}
            onClick={() => handleMobileTabSelect('timeline')}
          >
            <Map size={18} />
            <span>每日行程</span>
          </button>
          <button 
            className={`mobile-nav-btn ${mobileTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleMobileTabSelect('dashboard')}
          >
            <Briefcase size={18} />
            <span>行前準備</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
