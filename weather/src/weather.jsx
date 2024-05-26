import React, { useState } from 'react';
import axios from 'axios';

const nytApiKey = 'ffae6b24459a9752e3d4a94e200fa8dd';

function getTopNews() {
    fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytApiKey}`)
        .then(response => response.json())
        .then(data => displayNews(data.results))
        .catch(error => console.error('Error fetching news data:', error));
}

function displayNews(articles) {
    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container';
    articles.slice(0, 5).forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.byline}</p>
            <p>${article.abstract}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
    document.body.appendChild(newsContainer);
}

getTopNews();

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city"
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;