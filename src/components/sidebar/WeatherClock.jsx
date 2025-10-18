import React, { useState, useEffect } from 'react';

const WeatherClock = ({ collapsed }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New Delhi');
  const [loading, setLoading] = useState(true);
  const [weatherThemeEnabled, setWeatherThemeEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeatherByCity('New Delhi');
        }
      );
    } else {
      fetchWeatherByCity('New Delhi');
    }
  };

  const themeOptions = [
    { value: 'auto', label: 'Auto (Weather)', icon: '🌤️' },
    { value: 'sunny', label: 'Sunny', icon: '☀️' },
    { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { value: 'rainy', label: 'Rainy', icon: '🌧️' },
    { value: 'snowy', label: 'Snowy', icon: '❄️' },
    { value: 'stormy', label: 'Stormy', icon: '⛈️' },
    { value: 'misty', label: 'Misty', icon: '🌫️' }
  ];

  const applyTheme = (theme) => {
    const body = document.body;
    body.classList.remove('theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy', 'theme-stormy', 'theme-misty');
    
    if (theme !== 'auto') {
      body.classList.add(`theme-${theme}`);
    }
  };

  const applyWeatherTheme = (weatherData) => {
    if (!weatherThemeEnabled || selectedTheme !== 'auto') return;
    
    const condition = weatherData.weather[0].main.toLowerCase();
    
    // Apply weather-based theme
    if (condition.includes('clear')) {
      applyTheme('sunny');
    } else if (condition.includes('cloud')) {
      applyTheme('cloudy');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      applyTheme('rainy');
    } else if (condition.includes('snow')) {
      applyTheme('snowy');
    } else if (condition.includes('thunder')) {
      applyTheme('stormy');
    } else if (condition.includes('mist') || condition.includes('fog')) {
      applyTheme('misty');
    }
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setShowThemeDropdown(false);
    
    if (theme === 'auto' && weather) {
      applyWeatherTheme(weather);
    } else {
      applyTheme(theme);
    }
  };

  const toggleWeatherTheme = () => {
    setWeatherThemeEnabled(!weatherThemeEnabled);
    if (weatherThemeEnabled) {
      // Remove weather themes when disabled
      applyTheme('auto');
    } else if (selectedTheme === 'auto' && weather) {
      // Apply weather theme when enabled
      applyWeatherTheme(weather);
    } else {
      applyTheme(selectedTheme);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=your_api_key&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setLocation(data.name);
        applyWeatherTheme(data);
      } else {
        fetchWeatherByCity('New Delhi');
      }
    } catch (error) {
      fetchWeatherByCity('New Delhi');
    }
    setLoading(false);
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=your_api_key&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setLocation(data.name);
        applyWeatherTheme(data);
      } else {
        // Fallback mock data
        const mockData = {
          main: { temp: 25, feels_like: 27 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          name: city
        };
        setWeather(mockData);
        applyWeatherTheme(mockData);
      }
    } catch (error) {
      // Fallback mock data
      const mockData = {
        main: { temp: 25, feels_like: 27 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        name: city
      };
      setWeather(mockData);
      applyWeatherTheme(mockData);
    }
    setLoading(false);
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
      ) : weather ? (
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
            <button className="location-btn" onClick={getLocation}>
              📍 Location
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherClock;