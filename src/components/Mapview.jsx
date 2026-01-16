import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapView() {
  const mapRef = useRef(null);   
  const divRef = useRef(null);     

  useEffect(() => {
    if (!divRef.current) return;
    if (mapRef.current) return;

    const chennai = [13.0827, 80.2707];
    const iit = [13.0194, 80.2624];

    const map = L.map(divRef.current).setView(chennai, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker(iit)
      .addTo(map)
      .bindPopup("<b>IIT Madras</b>")
      .openPopup();

    mapRef.current = map;

    return () => {
      map.remove();          
      mapRef.current = null;
    };
  }, []);

  return <div ref={divRef} className="map" />;
}
