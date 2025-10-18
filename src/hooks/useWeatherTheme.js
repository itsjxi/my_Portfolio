import { useState, useEffect } from 'react';

export const useWeatherTheme = () => {
  const [weatherTheme, setWeatherTheme] = useState('default');

  const getWeatherTheme = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase() || '';
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return 'sunny';
    } else if (condition.includes('cloud')) {
      return 'cloudy';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'rainy';
    } else if (condition.includes('snow')) {
      return 'snowy';
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return 'stormy';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      return 'misty';
    }
    return 'default';
  };

  const applyWeatherTheme = (theme) => {
    const root = document.documentElement;
    
    // Remove existing weather classes
    root.classList.remove('theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy', 'theme-stormy', 'theme-misty');
    
    // Apply new theme
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
    
    setWeatherTheme(theme);
  };

  return { weatherTheme, getWeatherTheme, applyWeatherTheme };
};