import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, MapPin, Flag, ArrowRight } from 'lucide-react';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker for Activities
const createActivityIcon = (index) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">${index + 1}</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

function MapController({ points, selectedDay }) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => { map.invalidateSize(); }, 100);
  }, [map]);

  useEffect(() => {
    if (!points || points.length === 0) return;
    const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
    map.flyToBounds(bounds, { padding: [100, 100], duration: 1.5 });
  }, [points, selectedDay, map]);

  return null;
}

export default function MapComponent({ stops = [], selectedDay: externalSelectedDay = null }) {
  const [selectedDay, setSelectedDay] = useState(externalSelectedDay);
  
  useEffect(() => {
    setSelectedDay(externalSelectedDay);
  }, [externalSelectedDay]);

  const days = useMemo(() => {
    const d = [...new Set(stops.map(s => s.day_number))];
    return d.sort((a, b) => a - b);
  }, [stops]);

  // Points to display
  const mapData = useMemo(() => {
    if (selectedDay) {
      // Show detailed activity route for the selected day
      const dayStop = stops.find(s => s.day_number === selectedDay);
      if (!dayStop) return { points: [], route: [] };

      // Activities for this day
      const activityPoints = (dayStop.activities || [])
        .filter(a => a.act_lat && a.act_lng)
        .map(a => ({
          lat: parseFloat(a.act_lat),
          lng: parseFloat(a.act_lng),
          title: a.title,
          time: a.time,
          type: 'activity'
        }));

      // If no activities have coords, fallback to city coord
      if (activityPoints.length === 0 && dayStop.lat && dayStop.lng) {
        return { 
          points: [{ lat: dayStop.lat, lng: dayStop.lng, title: dayStop.city_name, type: 'city' }],
          route: []
        };
      }

      return { points: activityPoints, route: activityPoints };
    } else {
      // Show city-to-city route for the full trip
      const cityPoints = stops
        .filter(s => s.lat && s.lng)
        .map(s => ({
          lat: parseFloat(s.lat),
          lng: parseFloat(s.lng),
          title: s.city_name,
          day: s.day_number,
          type: 'city'
        }));
      
      return { points: cityPoints, route: cityPoints };
    }
  }, [selectedDay, stops]);

  const center = mapData.points.length > 0 
    ? [mapData.points[0].lat, mapData.points[0].lng] 
    : [20.5937, 78.9629];

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative bg-[#0A0F1C] group">
      
      {/* Day Selector Overlay */}
      <div className="absolute top-6 left-6 z-[1000] space-y-3 max-w-[calc(100%-48px)]">
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 shadow-2xl overflow-hidden">
          <button 
            onClick={() => setSelectedDay(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${!selectedDay ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Whole Trip
          </button>
          <div className="w-px h-5 bg-white/10 shrink-0" />
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 pr-2">
            {days.map(day => (
              <button 
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${selectedDay === day ? 'bg-white/20 text-white border border-white/10' : 'text-white/30 hover:text-white/50 border border-transparent'}`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <div className="bg-[#111827]/90 backdrop-blur-2xl border border-white/10 px-6 py-5 rounded-[2rem] shadow-2xl min-w-[240px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Navigation size={24} className={selectedDay ? 'animate-pulse' : ''} />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Route View</p>
              <h4 className="text-white font-bold text-lg">{selectedDay ? `Day ${selectedDay} Sequence` : 'Inter-City Route'}</h4>
            </div>
          </div>
          
          <div className="space-y-3 border-t border-white/5 pt-4">
             {mapData.points.slice(0, 3).map((p, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                 <span className="text-xs text-white/70 truncate">{p.title}</span>
                 {p.time && <span className="text-[10px] text-white/30 ml-auto">{p.time}</span>}
               </div>
             ))}
             {mapData.points.length > 3 && (
               <div className="text-[10px] text-white/30 pl-4">+ {mapData.points.length - 3} more stops</div>
             )}
          </div>
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%', background: '#0A0F1C' }}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {mapData.points.map((point, idx) => (
          <Marker 
            key={idx} 
            position={[point.lat, point.lng]}
            icon={point.type === 'activity' ? createActivityIcon(idx) : DefaultIcon}
          >
            <Popup className="custom-popup">
              <div className="p-4 min-w-[200px] bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      {point.type === 'activity' ? <Flag size={14} /> : <MapPin size={14} />}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">
                     {point.type === 'activity' ? `Stop #${idx + 1}` : `Day ${point.day}`}
                   </span>
                </div>
                <h4 className="font-black text-slate-900 text-base leading-tight mb-1">{point.title}</h4>
                {point.time && (
                  <p className="text-xs text-slate-500 font-medium">Scheduled for {point.time}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {mapData.route.length > 1 && (
          <Polyline 
            positions={mapData.route.map(p => [p.lat, p.lng])} 
            pathOptions={{ 
              color: '#6366f1', 
              weight: 4, 
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round',
              dashArray: selectedDay ? 'none' : '10, 10'
            }} 
          />
        )}

        <MapController points={mapData.points} selectedDay={selectedDay} />
      </MapContainer>

      <style jsx global>{`
        .leaflet-container { background: #0A0F1C !important; }
        .custom-div-icon { background: none; border: none; }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 1.5rem;
          padding: 0;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        .custom-popup .leaflet-popup-tip { background: white; }
      `}</style>
    </div>
  );
}
