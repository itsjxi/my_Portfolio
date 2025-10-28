import React, { useState, useEffect } from 'react';

const WeatherClock = ({ collapsed }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherThemeEnabled, setWeatherThemeEnabled] = useState(true);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-request location permission on mount
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    setError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Location access denied. Please enter a city manually.');
          setLoading(false);
          setShowLocationInput(true);
        }
      );
    } else {
      setError('Geolocation not supported. Please enter a city manually.');
      setLoading(false);
      setShowLocationInput(true);
    }
  };

  const applyWeatherTheme = (weatherData) => {
    if (!weatherThemeEnabled) return;
    
    const condition = weatherData.weather[0].main.toLowerCase();
    const root = document.documentElement;
    
    // Remove existing weather themes
    root.classList.remove('theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy', 'theme-stormy', 'theme-misty');
    
    // Apply weather-based theme
    if (condition.includes('clear')) {
      root.classList.add('theme-sunny');
    } else if (condition.includes('cloud')) {
      root.classList.add('theme-cloudy');
    } else if (condition.includes('rain')) {
      root.classList.add('theme-rainy');
    } else if (condition.includes('snow')) {
      root.classList.add('theme-snowy');
    } else if (condition.includes('thunder')) {
      root.classList.add('theme-stormy');
    } else if (condition.includes('mist') || condition.includes('fog')) {
      root.classList.add('theme-misty');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
      );
      if (response.ok) {
        const data = await response.json();
        const weatherData = {
          main: { temp: Math.round(data.current_weather.temperature) },
          weather: [{ 
            main: getWeatherCondition(data.current_weather.weathercode),
            description: getWeatherDescription(data.current_weather.weathercode),
            icon: getWeatherIconCode(data.current_weather.weathercode)
          }]
        };
        setWeather(weatherData);
        getCityName(lat, lon);
        applyWeatherTheme(weatherData);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.results && geoData.results.length > 0) {
          const { latitude, longitude, name, country } = geoData.results[0];
          setLocation(`${name}, ${country}`);
          
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
          );
          if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            const processedWeather = {
              main: { temp: Math.round(weatherData.current_weather.temperature) },
              weather: [{ 
                main: getWeatherCondition(weatherData.current_weather.weathercode),
                description: getWeatherDescription(weatherData.current_weather.weathercode),
                icon: getWeatherIconCode(weatherData.current_weather.weathercode)
              }]
            };
            setWeather(processedWeather);
            applyWeatherTheme(processedWeather);
          } else {
            setError('Failed to fetch weather data');
          }
        } else {
          setError('City not found. Please try another city.');
        }
      } else {
        setError('Failed to find city. Please try another city.');
      }
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    }
    setLoading(false);
  };

  const getCityName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      if (response.ok) {
        const data = await response.json();
        setLocation(`${data.city || data.locality || 'Unknown'}, ${data.countryName || 'Unknown'}`);
      }
    } catch (error) {
      setLocation('Current Location');
    }
  };

  const getWeatherCondition = (code) => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Clouds';
    if (code <= 67) return 'Rain';
    if (code <= 77) return 'Snow';
    if (code <= 82) return 'Rain';
    if (code <= 86) return 'Snow';
    if (code <= 99) return 'Thunderstorm';
    return 'Clear';
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
      45: 'fog', 48: 'depositing rime fog', 51: 'light drizzle', 53: 'moderate drizzle',
      55: 'dense drizzle', 61: 'slight rain', 63: 'moderate rain', 65: 'heavy rain',
      71: 'slight snow', 73: 'moderate snow', 75: 'heavy snow', 95: 'thunderstorm',
      96: 'thunderstorm with hail', 99: 'thunderstorm with heavy hail'
    };
    return descriptions[code] || 'unknown';
  };

  const getWeatherIconCode = (code) => {
    if (code === 0) return '01d';
    if (code <= 3) return '02d';
    if (code <= 67) return '10d';
    if (code <= 77) return '13d';
    if (code <= 82) return '09d';
    if (code <= 86) return '13d';
    if (code <= 99) return '11d';
    return '01d';
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locationInput.trim()) {
      fetchWeatherByCity(locationInput.trim());
      setShowLocationInput(false);
      setLocationInput('');
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  if (collapsed) {
    return (
      <div className="weather-clock-collapsed">
        <div className="time-collapsed">{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</div>
        {weather && (
          <div className="weather-collapsed">
            <span className="weather-icon">{getWeatherIcon(weather.weather[0].icon)}</span>
            <span className="temp">{Math.round(weather.main.temp)}°</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="weather-clock">
      <div className="clock-section">
        <div className="time">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        <div className="date">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
      </div>
      
      {loading ? (
        <div className="weather-loading">Loading weather...</div>
      ) : !weather ? (
        <div className="weather-section">
          <div className="no-weather">
            <div className="weather-placeholder">🌤️</div>
            <p>Select a location to see weather</p>
            <div className="weather-controls">
              <button className="location-btn" onClick={getCurrentLocation} disabled={loading}>
                📍 Current Location
              </button>
              <button className="location-btn" onClick={() => setShowLocationInput(!showLocationInput)}>
                🏙️ Select City
              </button>
            </div>
            {showLocationInput && (
              <form onSubmit={handleLocationSubmit} className="location-form">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter city name..."
                  className="location-input"
                  autoFocus
                />
                <button type="submit" className="location-submit" disabled={loading}>
                  ✓
                </button>
              </form>
            )}
            {error && <div className="weather-error">{error}</div>}
          </div>
        </div>
      ) : (
        <div className="weather-section">
          <div className="weather-header">
            <span className="weather-icon">{getWeatherIcon(weather.weather[0].icon)}</span>
            <div className="weather-info">
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-desc">{weather.weather[0].description}</div>
            </div>
          </div>
          <div className="location">📍 {location}</div>
          <div className="weather-controls">
            <button className="location-btn" onClick={getCurrentLocation} disabled={loading}>
              📍 Update Location
            </button>
            <button className="location-btn" onClick={() => setShowLocationInput(!showLocationInput)}>
              🏙️ Change City
            </button>
          </div>
          {showLocationInput && (
            <form onSubmit={handleLocationSubmit} className="location-form">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city name..."
                className="location-input"
                autoFocus
              />
              <button type="submit" className="location-submit" disabled={loading}>
                ✓
              </button>
            </form>
          )}
          {error && <div className="weather-error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default WeatherClock;