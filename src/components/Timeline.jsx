import React, { useState } from 'react';
import { MapPin, Phone, Copy, Check, ExternalLink, Calendar, Plane, Info, Car, Footprints, Navigation } from 'lucide-react';

const TAG_MAP = {
  flight: { label: '飛行', color: 'badge-blue' },
  food: { label: '美食', color: 'badge-orange' },
  activity: { label: '景點/體驗', color: 'badge-purple' },
  hotel: { label: '住宿', color: 'badge-green' },
  shopping: { label: '購物', color: 'badge-pink' }
};

const TransitBlock = ({ transit }) => {
  if (!transit) return null;

  const getTransitIcon = (type) => {
    switch (type) {
      case 'drive':
        return <Car size={14} className="transit-icon-symbol" />;
      case 'walk':
        return <Footprints size={14} className="transit-icon-symbol" />;
      case 'ferry':
        return <Navigation size={14} className="transit-icon-symbol rotate-45" />;
      case 'flight':
        return <Plane size={14} className="transit-icon-symbol rotate-90" />;
      default:
        return <Car size={14} className="transit-icon-symbol" />;
    }
  };

  const getTransitLabel = (type) => {
    switch (type) {
      case 'drive': return '自駕 / 計程車';
      case 'walk': return '步行';
      case 'ferry': return '搭乘渡輪';
      case 'flight': return '航班飛行';
      default: return '交通';
    }
  };

  return (
    <div className="transit-block">
      <div className="transit-path-line"></div>
      <div className="transit-info-pill">
        {getTransitIcon(transit.type)}
        <span className="transit-method">{getTransitLabel(transit.type)}</span>
        <span className="transit-meta">{transit.time} ({transit.dist})</span>
        {transit.desc && <span className="transit-desc">• {transit.desc}</span>}
      </div>
    </div>
  );
};

export default function Timeline({ dayData }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="timeline-container">
      {/* Daily Summary */}
      <div className="day-summary-header">
        <h2 className="summary-title">{dayData.summary}</h2>
        <p className="summary-date">
          <Calendar size={16} />
          {dayData.date}
        </p>
      </div>

      {/* Flight banner */}
      {dayData.flights && dayData.flights.length > 0 && (
        <div className="day-flight-banner">
          {dayData.flights.map((flight, idx) => (
            <div key={idx} className="flight-card-mini">
              <div className="flight-route">
                <Plane size={18} className="rotate-90" />
                <span className="airline">{flight.airline}</span>
                <span className="route-details">{flight.from} → {flight.to}</span>
              </div>
              <div className="flight-time-badge">{flight.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* Vertical Timeline */}
      <div className="timeline-flow">
        {dayData.timeline.map((item, index) => {
          const tagInfo = TAG_MAP[item.tag] || { label: '行程', color: 'badge-slate' };
          const copyId = `loc-${index}`;
          const isCopied = copiedId === copyId;

          return (
            <React.Fragment key={index}>
              <div className="timeline-node">
                {/* Timeline Connector Pin */}
                <div className={`timeline-pin pin-${item.tag}`}>
                  <div className="pin-dot"></div>
                </div>

                {/* Node Time */}
                <div className="node-time">{item.time}</div>

                {/* Node Content Card */}
                <div className="node-card">
                  {/* Visual Cover Photo */}
                  {item.coverImage && (
                    <div className="card-cover-container">
                      <img src={item.coverImage} alt={item.title} className="card-cover-img" />
                    </div>
                  )}

                  <div className="node-card-body">
                    <div className="node-card-header">
                      <h4 className="node-title">{item.title}</h4>
                      <span className={`badge ${tagInfo.color}`}>{tagInfo.label}</span>
                    </div>
                    
                    <p className="node-desc">{item.description}</p>

                    {/* Accomodation specifications */}
                    {item.details && item.details.length > 0 && (
                      <div className="card-sub-info">
                        <ul className="details-list">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="details-item">{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Location / Action Bar */}
                    {item.location && (
                      <div className="node-location-bar">
                        <div className="loc-text-group">
                          <MapPin size={14} className="text-secondary" />
                          <span className="loc-text" title={item.location}>
                            {item.location}
                          </span>
                        </div>

                        <div className="node-action-buttons">
                          {/* Copy Address */}
                          <button 
                            className={`action-btn-mini ${isCopied ? 'copied' : ''}`}
                            onClick={() => handleCopy(item.location, copyId)}
                            title="複製韓文地址/名稱"
                          >
                            {isCopied ? <Check size={12} /> : <Copy size={12} />}
                            <span>{isCopied ? '已複製' : '複製'}</span>
                          </button>

                          {/* Intro link */}
                          {item.introUrl && (
                            <a 
                              href={item.introUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="action-btn-mini intro-link-btn"
                              title="查看景點介紹與官方指南"
                            >
                              <Info size={12} />
                              <span>介紹</span>
                            </a>
                          )}

                          {/* Naver Map Link */}
                          {item.mapUrl && (
                            <a 
                              href={item.mapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="action-btn-mini map-link-btn"
                              title="在 Naver Map 開啟 (當地自駕最推！)"
                            >
                              <ExternalLink size={12} />
                              <span>Naver導航</span>
                            </a>
                          )}

                          {/* Google Map Link */}
                          {item.googleMapUrl && (
                            <a 
                              href={item.googleMapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="action-btn-mini google-map-btn"
                              title="在 Google Maps 開啟"
                            >
                              <MapPin size={12} />
                              <span>Google地圖</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Estimated Transit Block between locations */}
              <TransitBlock transit={item.transit} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
