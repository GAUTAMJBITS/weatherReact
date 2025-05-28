import { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

const iconMap = {
  Thunderstorm: "RAIN",
  Drizzle: "SLEET",
  Rain: "RAIN",
  Snow: "SNOW",
  Clear: "CLEAR_DAY",
  Clouds: "CLOUDY",
  Mist: "FOG",
  Smoke: "FOG",
  Haze: "FOG",
  Dust: "FOG",
  Fog: "FOG",
  Sand: "FOG",
  Ash: "FOG",
  Squall: "WIND",
  Tornado: "WIND",
};

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  async function fetchWeather() {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      alert(e.message);
      setWeather(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  return (
    
    <div className="app-container">
      
      <div className="card">
        
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            placeholder="Search city"
            className="input"
          />
          <button onClick={fetchWeather} disabled={loading} className="button">
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {weather ? (
          <>
            <h2 className="location">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="date">{formatDate(new Date())}</p>

            <div className="weather-main">
              <ReactAnimatedWeather
                icon={iconMap[weather.weather[0].main] || "CLEAR_DAY"}
                color="gold"
                size={80}
                animate={true}
              />
              <p className="temp">{Math.round(weather.main.temp)}°C</p>
            </div>

            <p className="description">{weather.weather[0].description}</p>

            <div className="details">
              <div>
                <p>Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
              
            </div>
           <div class="trademark-card">
  <img src="https://avatars.githubusercontent.com/u/583231?v=4" alt="Developer Avatar" />
  <div class="text">
    <div class="name">Suman Kumar</div>
    <div class="role">Full Stack Developer</div>
  </div>
</div>
          </>
        ) : (
          !loading && <p className="no-data">No data. Search for a city!</p>
        )}
      </div>
    </div>
  );
}
