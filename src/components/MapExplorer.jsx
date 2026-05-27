import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink } from 'lucide-react';
import { JEJU_POIS, CATEGORIES } from '../data/mapPois';

/* ── Google Maps deep link ── */
const googleMapsUrl = (lat, lng, title) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}&query=${lat},${lng}`;

/* ── Create custom emoji+category marker ── */
const makeIcon = (cat, active = false) => {
  const { emoji, color } = CATEGORIES[cat];
  const size = active ? 44 : 36;
  const fontSize = active ? 20 : 16;
  return L.divIcon({
    html: `<div style="
      width:${size}px; height:${size}px;
      display:flex; align-items:center; justify-content:center;
      background:#fffdf6;
      border: 3px solid ${color};
      border-radius: 50%;
      box-shadow: 2px 2px 0 ${color};
      font-size:${fontSize}px;
      transition: all .2s;
    ">${emoji}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 4],
  });
};

/* ── Fly-to helper ── */
function FlyTo({ target }) {
  const map = useMap();
  if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
  return null;
}

const JEJU_CENTER = [33.38, 126.55];
const ALL_CATS = ['all', ...Object.keys(CATEGORIES)];

export default function MapExplorer() {
  const [activeCat, setActiveCat] = useState('all');
  const [flyTarget, setFlyTarget] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const markerRefs = useRef({});

  const filtered = activeCat === 'all'
    ? JEJU_POIS
    : JEJU_POIS.filter(p => p.cat === activeCat);

  const handleChipClick = (cat) => {
    setActiveCat(cat);
    setFlyTarget(null);
    setActivePopup(null);
  };

  const handleListClick = (poi) => {
    setFlyTarget(poi);
    setActivePopup(poi.id);
    // open the leaflet popup after fly animation
    setTimeout(() => {
      const ref = markerRefs.current[poi.id];
      if (ref) ref.openPopup();
    }, 1300);
  };

  return (
    <div className="map-explorer">
      {/* ── Category filter chips ── */}
      <div className="map-filter-bar">
        {ALL_CATS.map(cat => {
          const isAll = cat === 'all';
          const cfg = isAll ? null : CATEGORIES[cat];
          const active = activeCat === cat;
          return (
            <button
              key={cat}
              className={`map-chip ${active ? 'map-chip-active' : ''}`}
              style={active && cfg ? { borderColor: cfg.color, background: cfg.color + '22', color: cfg.color } : {}}
              onClick={() => handleChipClick(cat)}
            >
              {isAll ? '🗺️ 全部' : `${cfg.emoji} ${cfg.label}`}
              <span className="map-chip-count">
                {isAll ? JEJU_POIS.length : JEJU_POIS.filter(p => p.cat === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="map-body">
        {/* ── Scrollable side list ── */}
        <div className="map-side-list">
          {filtered.map(poi => {
            const cfg = CATEGORIES[poi.cat];
            const isActive = activePopup === poi.id;
            return (
              <button
                key={poi.id}
                className={`map-list-item ${isActive ? 'map-list-item-active' : ''}`}
                style={isActive ? { borderColor: cfg.color, boxShadow: `3px 3px 0 ${cfg.color}` } : {}}
                onClick={() => handleListClick(poi)}
              >
                <span
                  className="map-list-emoji"
                  style={{ background: cfg.color + '22', border: `2px solid ${cfg.color}` }}
                >
                  {cfg.emoji}
                </span>
                <span className="map-list-text">
                  <span className="map-list-title">{poi.title}</span>
                  <span className="map-list-sub">{poi.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Leaflet Map ── */}
        <div className="map-canvas">
          <MapContainer
            center={JEJU_CENTER}
            zoom={10}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyTo target={flyTarget} />

            {filtered.map(poi => {
              const cfg = CATEGORIES[poi.cat];
              const isActive = activePopup === poi.id;
              return (
                <Marker
                  key={poi.id}
                  position={[poi.lat, poi.lng]}
                  icon={makeIcon(poi.cat, isActive)}
                  ref={el => { if (el) markerRefs.current[poi.id] = el; }}
                  eventHandlers={{ click: () => setActivePopup(poi.id) }}
                >
                  <Popup className="cozy-popup" maxWidth={230} minWidth={200}>
                    <div className="popup-inner">
                      <div className="popup-body" style={{ paddingTop: '0.6rem' }}>
                        <span className="popup-tag" style={{ borderColor: cfg.color, color: cfg.color, background: cfg.color + '18' }}>
                          {cfg.emoji} {cfg.label}
                        </span>
                        <h4 className="popup-title">{poi.title}</h4>
                        <p className="popup-duration">{poi.sub}</p>
                        <a
                          href={googleMapsUrl(poi.lat, poi.lng, poi.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="popup-link"
                          style={{ color: cfg.color }}
                        >
                          Google Maps 導航 <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
