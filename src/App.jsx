import "./App.css";
import About from "./components/About.jsx";
import Weather from "./components/Weather.jsx";
import MapView from "./components/MapView.jsx";
export default function App() {
  return (
    <div className="page">
      <h1 className="title">Profile</h1>
      <About />
      <div className="grid">
        <Weather city="Chennai" />
        <MapView />
      </div>
    </div>
  );
}
