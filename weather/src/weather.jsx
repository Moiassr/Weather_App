import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);

  const fetchWeatherData = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchNewsData = async () => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setNewsData(response.data.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    fetchNewsData();
  };

  return (
    <div className="weather-container">
      <Typography variant="h4" gutterBottom>Weather App</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter a city"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>
      {weatherData && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5">{weatherData.name}, {weatherData.sys.country}</Typography>
            <Typography variant="body1">Temperature: {weatherData.main.temp}°C</Typography>
            <Typography variant="body1">Weather: {weatherData.weather[0].description}</Typography>
            <CardMedia
              component="img"
              image={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather icon"
              sx={{ width: 50, height: 50 }}
            />
          </CardContent>
        </Card>
      )}
      {newsData.length > 0 && (
        <div className="news-container" style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>Top News</Typography>
          {newsData.map((article, index) => (
            <Card key={index} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2">{article.byline}</Typography>
                <Typography variant="body2">{article.abstract}</Typography>
                <Button href={article.url} target="_blank" variant="outlined" color="primary">Read more</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;