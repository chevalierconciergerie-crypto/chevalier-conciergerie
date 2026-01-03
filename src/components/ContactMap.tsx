import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface ContactMapProps {
  accessToken?: string;
}

const ContactMap = ({ accessToken }: ContactMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(accessToken || '');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Avignon coordinates
  const avignonCenter: [number, number] = [4.8055, 43.9493];
  
  useEffect(() => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: avignonCenter,
        zoom: 12,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add markers for Avignon and Villeneuve-lès-Avignon
      const locations = [
        { coords: [4.8055, 43.9493] as [number, number], name: 'Avignon' },
        { coords: [4.7955, 43.9663] as [number, number], name: 'Villeneuve-lès-Avignon' },
      ];

      locations.forEach(location => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `
          <div style="
            background: linear-gradient(135deg, #D4AF37, #C4A030);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
            border: 3px solid white;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `;

        new mapboxgl.Marker(el)
          .setLngLat(location.coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="font-family: 'Inter', sans-serif; padding: 8px;">
                  <strong style="color: #1A2238;">${location.name}</strong>
                  <p style="color: #666; margin: 4px 0 0; font-size: 12px;">Zone d'intervention</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Fit bounds to show both markers
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(loc => bounds.extend(loc.coords));
      map.current.fitBounds(bounds, { padding: 80 });

      map.current.on('load', () => {
        setIsMapLoaded(true);
        
        // Add 3D buildings layer
        map.current?.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 12,
          'paint': {
            'fill-extrusion-color': '#D4AF37',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.3
          }
        });
      });

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [token]);

  if (!token) {
    return (
      <div className="bg-card rounded-2xl shadow-soft p-8 min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6">
          <MapPin className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 text-center">
          Notre Zone d'Intervention
        </h3>
        <p className="font-sans text-muted-foreground text-center mb-6">
          Avignon et Villeneuve-lès-Avignon
        </p>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Entrez votre token Mapbox public"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
          <p className="text-xs text-muted-foreground/60 text-center">
            Obtenez votre token sur{' '}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-soft overflow-hidden min-h-[400px] relative">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-soft">
        <p className="font-serif text-lg font-semibold text-foreground">Zone d'intervention</p>
        <p className="font-sans text-sm text-muted-foreground">Avignon & Villeneuve-lès-Avignon</p>
      </div>
    </div>
  );
};

export default ContactMap;
