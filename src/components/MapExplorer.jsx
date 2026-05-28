import { useState, useRef, useEffect, useMemo } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Route, Compass, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { JEJU_POIS, CATEGORIES } from '../data/mapPois';

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
const googleMapsUrl = (lat, lng, title) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}&query=${lat},${lng}`;

const naverMapsUrl = (title) =>
  `https://map.naver.com/v5/search/${encodeURIComponent(title)}`;

const JEJU_CENTER = [33.38, 126.55];
const ALL_CATS = ['all', ...Object.keys(CATEGORIES)];

/* Filter route stops to ones actually on / near Jeju
   (excludes TPE / KHH origin-airport pins so the camera
    can frame the island instead of half the East Asia) */
const isOnJeju = (c) =>
  !!c && c.lat >= 32.5 && c.lat <= 34 && c.lng >= 125.5 && c.lng <= 127.5;

/* ──────────────────────────────────────────────
   Numbered + labelled route pin
   ────────────────────────────────────────────── */
const TAG_EMOJI = {
  flight: '✈️', food: '🍴', activity: '⭐', hotel: '🏨', shopping: '🛍️',
};

const makeRoutePin = (idx, label, accent, active = false) => {
  const safeLabel = (label || '').replace(/</g, '&lt;');
  const ringColor = active ? '#facc15' : '#ffffff';
  const scale = active ? 1.08 : 1;
  return L.divIcon({
    html: `
      <div class="route-pin" style="--accent:${accent}; transform: scale(${scale});">
        <span class="route-pin-num" style="background:${accent}; box-shadow: 0 0 0 3px ${ringColor};">${idx}</span>
        <span class="route-pin-label">${safeLabel}</span>
      </div>`,
    className: 'route-pin-wrap',
    iconSize: null, // let CSS handle
    iconAnchor: [10, 30],
    popupAnchor: [60, -28],
  });
};

const makeExplorePin = (cat, active = false) => {
  const { emoji, color } = CATEGORIES[cat];
  const size = active ? 42 : 34;
  const fontSize = active ? 19 : 16;
  return L.divIcon({
    html: `<div class="explore-pin" style="
      width:${size}px; height:${size}px;
      background:#fffdf6;
      border: 3px solid ${color};
      box-shadow: 2px 2px 0 ${color};
      font-size:${fontSize}px;
    ">${emoji}</div>`,
    className: 'explore-pin-wrap',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 4],
  });
};

/* ──────────────────────────────────────────────
   Auto-fit camera to a list of coords
   ────────────────────────────────────────────── */
function AutoFit({ coords, padding = 60 }) {
  const map = useMap();
  useEffect(() => {
    if (!coords?.length) return;
    if (coords.length === 1) {
      map.flyTo(coords[0], 13, { duration: 0.7 });
      return;
    }
    const bounds = L.latLngBounds(coords);
    map.flyToBounds(bounds, { padding: [padding, padding], duration: 0.8, maxZoom: 13 });
  }, [JSON.stringify(coords)]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

/* ──────────────────────────────────────────────
   Fly to single point on demand
   ────────────────────────────────────────────── */
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.0 });
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

/* ──────────────────────────────────────────────
   MapExplorer component
   ────────────────────────────────────────────── */
export default function MapExplorer({
  dayData,
  accent = '#0284c7',
  itinerary = [],
  selectedDayNum,
  onDaySelect,
}) {
  const [mode, setMode] = useState('route'); // 'route' | 'explore'
  const [activeCat, setActiveCat] = useState('all');
  const [flyTarget, setFlyTarget] = useState(null);
  const [activeStopIdx, setActiveStopIdx] = useState(null);
  const [activePoi, setActivePoi] = useState(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const markerRefs = useRef({});
  const dayRailRef = useRef(null);

  // Auto-scroll active day chip into view
  useEffect(() => {
    const rail = dayRailRef.current;
    if (!rail) return;
    const chip = rail.querySelector(`[data-day="${selectedDayNum}"]`);
    chip?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedDayNum]);

  // Route stops (must have coords AND be on Jeju)
  const routeStops = useMemo(
    () => (dayData?.timeline ?? []).filter((t) => isOnJeju(t.coords)),
    [dayData]
  );

  // Non-Jeju stops (airports outside Korea) — surfaced as a tiny note
  const offIslandStops = useMemo(
    () => (dayData?.timeline ?? []).filter((t) => t.coords && !isOnJeju(t.coords)),
    [dayData]
  );

  // Route polyline path
  const routePath = useMemo(
    () => routeStops.map((s) => [s.coords.lat, s.coords.lng]),
    [routeStops]
  );

  // Explore POIs filtered
  const filteredPois = useMemo(
    () => (activeCat === 'all' ? JEJU_POIS : JEJU_POIS.filter((p) => p.cat === activeCat)),
    [activeCat]
  );

  // Reset states when switching mode / day
  useEffect(() => {
    setFlyTarget(null);
    setActiveStopIdx(null);
    setActivePoi(null);
    setSheetExpanded(false);
  }, [mode, dayData?.dayNum]);

  const handleStopClick = (stop, idx) => {
    setActiveStopIdx(idx);
    setFlyTarget(stop.coords);
    // Try to open popup
    setTimeout(() => {
      const ref = markerRefs.current[`stop-${idx}`];
      if (ref) ref.openPopup();
    }, 800);
  };

  const handlePoiClick = (poi) => {
    setActivePoi(poi.id);
    setFlyTarget({ lat: poi.lat, lng: poi.lng });
    setTimeout(() => {
      const ref = markerRefs.current[`poi-${poi.id}`];
      if (ref) ref.openPopup();
    }, 800);
  };

  const activeCfg = activeCat !== 'all' ? CATEGORIES[activeCat] : null;

  return (
    <div className="map-explorer-v2">
      {/* ───── Map fills the entire container ───── */}
      <div className="map-canvas-v2">
        <MapContainer
          center={JEJU_CENTER}
          zoom={10}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />

          {mode === 'route' ? (
            <>
              {routePath.length >= 2 && (
                <Polyline
                  positions={routePath}
                  pathOptions={{
                    color: accent,
                    weight: 4,
                    opacity: 0.85,
                    dashArray: '8 6',
                    lineCap: 'round',
                  }}
                />
              )}
              <AutoFit coords={routePath} />
              {routeStops.map((stop, idx) => {
                const isActive = activeStopIdx === idx;
                const labelText = stop.title.replace(/^[^\s]+\s*/, '').slice(0, 14); // strip leading emoji
                return (
                  <Marker
                    key={`stop-${idx}`}
                    position={[stop.coords.lat, stop.coords.lng]}
                    icon={makeRoutePin(idx + 1, labelText, accent, isActive)}
                    ref={(el) => { if (el) markerRefs.current[`stop-${idx}`] = el; }}
                    eventHandlers={{ click: () => setActiveStopIdx(idx) }}
                  >
                    <Popup className="cozy-popup" maxWidth={240} minWidth={210}>
                      <div className="popup-inner">
                        <div className="popup-body">
                          <span className="popup-tag" style={{ borderColor: accent, color: accent, background: accent + '18' }}>
                            {TAG_EMOJI[stop.tag] ?? '📍'} 第 {idx + 1} 站 · {stop.time}
                          </span>
                          <h4 className="popup-title">{stop.title}</h4>
                          <p className="popup-duration">{stop.location}</p>
                          <div className="popup-actions">
                            <a
                              href={stop.googleMapUrl ?? googleMapsUrl(stop.coords.lat, stop.coords.lng, stop.location)}
                              target="_blank" rel="noopener noreferrer"
                              className="popup-link"
                              style={{ color: accent }}
                            >
                              Google <ExternalLink size={11} />
                            </a>
                            <a
                              href={stop.mapUrl ?? naverMapsUrl(stop.location)}
                              target="_blank" rel="noopener noreferrer"
                              className="popup-link"
                              style={{ color: accent }}
                            >
                              Naver <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </>
          ) : (
            <>
              <FlyTo target={flyTarget} />
              {filteredPois.map((poi) => {
                const cfg = CATEGORIES[poi.cat];
                const isActive = activePoi === poi.id;
                return (
                  <Marker
                    key={poi.id}
                    position={[poi.lat, poi.lng]}
                    icon={makeExplorePin(poi.cat, isActive)}
                    ref={(el) => { if (el) markerRefs.current[`poi-${poi.id}`] = el; }}
                    eventHandlers={{ click: () => setActivePoi(poi.id) }}
                  >
                    <Popup className="cozy-popup" maxWidth={240} minWidth={210}>
                      <div className="popup-inner">
                        {poi.coverImage && (
                          <img src={poi.coverImage} alt={poi.title} className="popup-img" />
                        )}
                        <div className="popup-body">
                          <span className="popup-tag" style={{ borderColor: cfg.color, color: cfg.color, background: cfg.color + '18' }}>
                            {poi.isMustVisit ? '⭐ 必去' : `${cfg.emoji} ${cfg.label}`}
                          </span>
                          <h4 className="popup-title">{poi.title}</h4>
                          <p className="popup-duration">{poi.sub}</p>
                          {poi.url && (
                            <a
                              href={poi.url}
                              target="_blank" rel="noopener noreferrer"
                              className="popup-link"
                              style={{ color: cfg.color, marginBottom: 4 }}
                            >
                              📖 查看攻略 <ExternalLink size={11} />
                            </a>
                          )}
                          <a
                            href={googleMapsUrl(poi.lat, poi.lng, poi.title)}
                            target="_blank" rel="noopener noreferrer"
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
            </>
          )}
        </MapContainer>
      </div>

      {/* ───── Floating overlay (top of map) ───── */}
      <div className="map-overlay-top">
        {/* Row 1: mode toggle + (in explore mode) filter trigger */}
        <div className="map-overlay-row">
          <div className="map-overlay-card map-mode-pill" role="tablist" aria-label="地圖模式">
            <button
              className={`map-mode-pill-btn ${mode === 'route' ? 'active' : ''}`}
              style={mode === 'route' ? { background: accent, color: '#fff' } : {}}
              onClick={() => { setMode('route'); setFilterOpen(false); }}
              role="tab"
              aria-selected={mode === 'route'}
            >
              <Route size={13} />
              <span>動線</span>
            </button>
            <button
              className={`map-mode-pill-btn ${mode === 'explore' ? 'active' : ''}`}
              style={mode === 'explore' ? { background: accent, color: '#fff' } : {}}
              onClick={() => setMode('explore')}
              role="tab"
              aria-selected={mode === 'explore'}
            >
              <Compass size={13} />
              <span>探索</span>
            </button>
          </div>

          {mode === 'explore' && (
            <button
              className="map-overlay-card map-filter-trigger"
              onClick={() => setFilterOpen((v) => !v)}
              aria-expanded={filterOpen}
            >
              {activeCfg ? (
                <>
                  <span style={{ color: activeCfg.color }}>{activeCfg.emoji}</span>
                  <span>{activeCfg.label}</span>
                </>
              ) : (
                <>
                  <Filter size={13} />
                  <span>全部 {filteredPois.length}</span>
                </>
              )}
              <ChevronDown size={13} className={`filter-chevron ${filterOpen ? 'open' : ''}`} />
            </button>
          )}
        </div>

        {/* Row 2: day chips (only in route mode — explore is day-agnostic) */}
        {mode === 'route' && itinerary.length > 0 && (
          <div className="map-overlay-card map-day-rail">
            <nav className="map-day-rail-inner" ref={dayRailRef} aria-label="切換日期">
              {itinerary.map((day) => {
                const isActive = day.dayNum === selectedDayNum;
                return (
                  <button
                    key={day.dayNum}
                    data-day={day.dayNum}
                    className={`map-day-chip ${isActive ? 'active' : ''}`}
                    style={isActive ? { background: day.theme.accent, color: '#fff', borderColor: day.theme.accent } : {}}
                    onClick={() => onDaySelect?.(day)}
                  >
                    D{day.dayNum}
                    <span className="map-day-chip-date">{day.date.replace(/[()（）]/g, '').slice(0, 4)}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Row 3: filter chip strip (only when explore + filter open) */}
        {mode === 'explore' && filterOpen && (
          <div className="map-overlay-card map-filter-strip">
            <div className="map-filter-strip-inner">
              {ALL_CATS.map((cat) => {
                const isAll = cat === 'all';
                const cfg = isAll ? null : CATEGORIES[cat];
                const isActive = activeCat === cat;
                const count = isAll ? JEJU_POIS.length : JEJU_POIS.filter((p) => p.cat === cat).length;
                return (
                  <button
                    key={cat}
                    className={`map-chip ${isActive ? 'map-chip-active' : ''}`}
                    style={isActive && cfg ? { borderColor: cfg.color, background: cfg.color + '22', color: cfg.color } : {}}
                    onClick={() => {
                      setActiveCat(cat);
                      setFlyTarget(null);
                      setActivePoi(null);
                      setFilterOpen(false);
                    }}
                  >
                    {isAll ? '🗺️ 全部' : `${cfg.emoji} ${cfg.label}`}
                    <span className="map-chip-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom sheet: list of stops (route) or POIs (explore) */}
      <div className={`map-sheet ${sheetExpanded ? 'expanded' : ''}`}>
        <button
          className="map-sheet-handle"
          onClick={() => setSheetExpanded((v) => !v)}
          aria-label={sheetExpanded ? '收起清單' : '展開清單'}
        >
          <span className="map-sheet-grip" />
          <span className="map-sheet-title">
            {mode === 'route' ? (
              <>📍 {dayData?.summary ?? '當日動線'} · {routeStops.length} 站</>
            ) : (
              <>🔍 景點清單 · {filteredPois.length} 個</>
            )}
          </span>
          {sheetExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>

        <div className="map-sheet-body">
          {mode === 'route' ? (
            <ol className="route-list">
              {offIslandStops.length > 0 && mode === 'route' && (
                <li className="route-list-flight-note">
                  ✈️ 含 {offIslandStops.map((s) => s.location.replace(/\s.*$/, '')).join(' / ')} 機場（不顯示於地圖）
                </li>
              )}
              {routeStops.length === 0 && (
                <li className="route-list-empty">這天沒有外出行程，主要在民宿放鬆 🏡</li>
              )}
              {routeStops.map((stop, idx) => {
                const isActive = activeStopIdx === idx;
                return (
                  <li key={idx}>
                    <button
                      className={`route-list-item ${isActive ? 'active' : ''}`}
                      style={isActive ? { borderColor: accent, background: accent + '10' } : {}}
                      onClick={() => handleStopClick(stop, idx)}
                    >
                      <span className="route-list-num" style={{ background: accent }}>{idx + 1}</span>
                      <span className="route-list-text">
                        <span className="route-list-title">{stop.title}</span>
                        <span className="route-list-meta">
                          <span className="route-list-time">{stop.time}</span>
                          <span className="route-list-loc">{stop.location}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <ul className="explore-list">
              {filteredPois.map((poi) => {
                const cfg = CATEGORIES[poi.cat];
                const isActive = activePoi === poi.id;
                return (
                  <li key={poi.id}>
                    <button
                      className={`explore-list-item ${isActive ? 'active' : ''}`}
                      style={isActive ? { borderColor: cfg.color, boxShadow: `3px 3px 0 ${cfg.color}` } : {}}
                      onClick={() => handlePoiClick(poi)}
                    >
                      <span
                        className="explore-list-emoji"
                        style={{ background: cfg.color + '22', border: `2px solid ${cfg.color}` }}
                      >
                        {cfg.emoji}
                      </span>
                      <span className="explore-list-text">
                        <span className="explore-list-title">{poi.title}</span>
                        <span className="explore-list-sub">{poi.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
