import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Copy, Check, ExternalLink, Plane, Info,
  Car, Footprints, Navigation, MoreHorizontal, ChevronRight,
} from 'lucide-react';

const TAG_MAP = {
  flight:   { label: '飛行',     color: 'badge-blue' },
  food:     { label: '美食',     color: 'badge-orange' },
  activity: { label: '景點/體驗', color: 'badge-purple' },
  hotel:    { label: '住宿',     color: 'badge-green' },
  shopping: { label: '購物',     color: 'badge-pink' },
};

const TransitBlock = ({ transit }) => {
  if (!transit) return null;
  const getTransitIcon = (type) => {
    switch (type) {
      case 'drive':  return <Car size={13} className="transit-icon-symbol" />;
      case 'walk':   return <Footprints size={13} className="transit-icon-symbol" />;
      case 'ferry':  return <Navigation size={13} className="transit-icon-symbol rotate-45" />;
      case 'flight': return <Plane size={13} className="transit-icon-symbol rotate-90" />;
      default:       return <Car size={13} className="transit-icon-symbol" />;
    }
  };
  const getTransitLabel = (type) => {
    switch (type) {
      case 'drive':  return '自駕 / 計程車';
      case 'walk':   return '步行';
      case 'ferry':  return '搭乘渡輪';
      case 'flight': return '航班飛行';
      default:       return '交通';
    }
  };
  return (
    <div className="transit-block">
      <div className="transit-path-line"></div>
      <div className="transit-info-pill">
        {getTransitIcon(transit.type)}
        <span className="transit-method">{getTransitLabel(transit.type)}</span>
        <span className="transit-meta">{transit.time} · {transit.dist}</span>
        {transit.desc && <span className="transit-desc">{transit.desc}</span>}
      </div>
    </div>
  );
};

/* Per-node action bar with overflow menu */
function ActionBar({ item, copyId, isCopied, onCopy, accent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const hasOverflow = !!(item.googleMapUrl || item.introUrl);

  return (
    <div className="node-action-row">
      <button
        className={`act-btn act-copy ${isCopied ? 'copied' : ''}`}
        onClick={() => onCopy(item.location, copyId)}
        title="複製地址 / 名稱"
      >
        {isCopied ? <Check size={13} /> : <Copy size={13} />}
        <span>{isCopied ? '已複製' : '複製'}</span>
      </button>

      {item.mapUrl && (
        <a
          href={item.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="act-btn act-naver"
          style={{ background: accent, borderColor: accent }}
          title="在 Naver Map 開啟（韓國當地導航首選）"
        >
          <Navigation size={13} />
          <span>Naver 導航</span>
        </a>
      )}

      {hasOverflow && (
        <div className="act-menu-wrap" ref={menuRef}>
          <button
            className="act-btn act-more"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            aria-label="更多動作"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="act-menu">
              {item.googleMapUrl && (
                <a
                  href={item.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="act-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <MapPin size={14} />
                  <span>Google 地圖</span>
                  <ExternalLink size={11} className="act-menu-ext" />
                </a>
              )}
              {item.introUrl && (
                <a
                  href={item.introUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="act-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <Info size={14} />
                  <span>景點介紹</span>
                  <ExternalLink size={11} className="act-menu-ext" />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Timeline({ dayData, accent }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="timeline-container">
      {/* Day summary */}
      <div className="day-summary-header">
        <span className="day-summary-eyebrow" style={{ color: accent }}>
          Day {dayData.dayNum} · {dayData.date}
        </span>
        <h2 className="summary-title">{dayData.summary}</h2>
      </div>

      {/* Flight banner */}
      {dayData.flights && dayData.flights.length > 0 && (
        <div className="day-flight-banner">
          {dayData.flights.map((flight, idx) => (
            <div key={idx} className="flight-card-mini">
              <div className="flight-route">
                <Plane size={16} className="rotate-90" />
                <span className="airline">{flight.airline}</span>
              </div>
              <div className="flight-detail-row">
                <span className="route-details">{flight.from} → {flight.to}</span>
                <span className="flight-time-badge">{flight.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vertical timeline */}
      <div className="timeline-flow">
        {dayData.timeline.map((item, index) => {
          const tagInfo = TAG_MAP[item.tag] || { label: '行程', color: 'badge-slate' };
          const copyId = `loc-${index}`;
          const isCopied = copiedId === copyId;
          const isLast = index === dayData.timeline.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="timeline-node">
                {/* Pin column */}
                <div className={`timeline-pin pin-${item.tag}`}>
                  <div className="pin-dot"></div>
                </div>

                {/* Time */}
                <div className="node-time">{item.time}</div>

                {/* Card */}
                <div className="node-card">
                  {item.coverImage && (
                    <div className="card-cover-container">
                      <img src={item.coverImage} alt={item.title} className="card-cover-img" loading="lazy" />
                    </div>
                  )}

                  <div className="node-card-body">
                    <div className="node-card-header">
                      <h4 className="node-title">{item.title}</h4>
                      <span className={`badge ${tagInfo.color}`}>{tagInfo.label}</span>
                    </div>

                    <p className="node-desc">{item.description}</p>

                    {item.details && item.details.length > 0 && (
                      <ul className="details-list">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="details-item">{detail}</li>
                        ))}
                      </ul>
                    )}

                    {item.location && (
                      <div className="node-location-block">
                        <div className="loc-text-group">
                          <MapPin size={13} className="text-secondary" />
                          <span className="loc-text" title={item.location}>{item.location}</span>
                        </div>
                        <ActionBar
                          item={item}
                          copyId={copyId}
                          isCopied={isCopied}
                          onCopy={handleCopy}
                          accent={accent}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Transit between stops */}
              <TransitBlock transit={item.transit} />

              {/* End-of-day marker */}
              {isLast && (
                <div className="day-end-marker" style={{ color: accent }}>
                  <ChevronRight size={14} />
                  <span>Day {dayData.dayNum} 結束 · {item.tag === 'hotel' ? '今晚住宿' : '今日完成'}</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
