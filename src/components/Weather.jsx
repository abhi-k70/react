import { useEffect, useState } from "react";

export default function Weather({ city }) {
  const apiKey = "1b24da646ac949cd8e545018250312"; 

  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });
  useEffect(() => {
    const load = async () => {
      try {
        setState({ status: "loading", data: null, error: null });
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setState({ status: "success", data: json, error: null });
      } catch (e) {
        setState({ status: "error", data: null, error: e.message });
      }
    };
    load();
    const id = setInterval(load, 30 * 60 * 1000);
    return () => clearInterval(id);
  }, [city]);
  if (state.status === "loading") return <section className="card">Loading weather…</section>;
  if (state.status === "error") return <section className="card err">Weather error: {state.error}</section>;
  const w = state.data;
  return (
    <section className="card">
      <h2>Weather in {city}</h2>
      <p>Temp: {w.current.temp_c}°C</p>
      <p>Condition: {w.current.condition.text}</p>
      <p>Humidity: {w.current.humidity}%</p>
      <p>Wind: {w.current.wind_kph} km/h</p>
    </section>
  );
}
