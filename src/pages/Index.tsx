
const Index = () => {
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            animation: fadeInDown 1s ease-out;
        }

        .header h1 {
            color: white;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .header p {
            color: rgba(255,255,255,0.8);
            font-size: 1.2rem;
            font-weight: 300;
        }

        .search-section {
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            animation: fadeInUp 1s ease-out;
        }

        .search-container {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .search-input {
            flex: 1;
            min-width: 250px;
            padding: 15px 20px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            transform: translateY(-2px);
        }

        .search-btn, .location-btn {
            padding: 15px 25px;
            border: none;
            border-radius: 50px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .search-btn:hover, .location-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .favorites {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .favorite-city {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .favorite-city:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }

        .remove-favorite {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.7;
        }

        .remove-favorite:hover {
            opacity: 1;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .current-weather {
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            animation: fadeInLeft 1s ease-out;
        }

        .weather-icon {
            font-size: 5rem;
            margin-bottom: 20px;
        }

        .temperature {
            font-size: 4rem;
            font-weight: 700;
            color: white;
            margin-bottom: 10px;
        }

        .city-name {
            font-size: 1.8rem;
            color: white;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .favorite-btn {
            background: none;
            border: none;
            color: gold;
            font-size: 1.5rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .favorite-btn:hover {
            transform: scale(1.2);
        }

        .weather-description {
            font-size: 1.2rem;
            color: rgba(255,255,255,0.8);
            text-transform: capitalize;
            margin-bottom: 20px;
        }

        .weather-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .detail-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 15px;
            text-align: center;
        }

        .detail-label {
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .detail-value {
            color: white;
            font-size: 1.3rem;
            font-weight: 600;
        }

        .forecast {
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            animation: fadeInRight 1s ease-out;
        }

        .forecast h3 {
            color: white;
            font-size: 1.5rem;
            margin-bottom: 20px;
            text-align: center;
        }

        .forecast-container {
            display: grid;
            gap: 15px;
        }

        .forecast-item {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: transform 0.3s ease;
        }

        .forecast-item:hover {
            transform: translateX(10px);
            background: rgba(255,255,255,0.2);
        }

        .forecast-date {
            color: white;
            font-weight: 600;
        }

        .forecast-weather {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .forecast-icon {
            font-size: 1.5rem;
        }

        .forecast-temp {
            color: white;
            font-weight: 600;
        }

        .loading {
            display: none;
            text-align: center;
            color: white;
            font-size: 1.2rem;
            margin: 20px 0;
        }

        .loading.show {
            display: block;
        }

        .error {
            background: rgba(255,0,0,0.1);
            color: #ff6b6b;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            display: none;
        }

        .error.show {
            display: block;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        .loading-pulse {
            animation: pulse 1.5s infinite;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .search-container {
                flex-direction: column;
            }
            
            .search-input {
                min-width: 100%;
            }
            
            .temperature {
                font-size: 3rem;
            }
            
            .weather-details {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-cloud-sun"></i> Weather Dashboard</h1>
            <p>Get real-time weather information for any city worldwide</p>
        </div>

        <div class="search-section">
            <div class="search-container">
                <input type="text" class="search-input" id="cityInput" placeholder="Enter city name...">
                <button class="search-btn" id="searchBtn">
                    <i class="fas fa-search"></i> Search
                </button>
                <button class="location-btn" id="locationBtn">
                    <i class="fas fa-map-marker-alt"></i> My Location
                </button>
            </div>
            
            <div class="favorites" id="favoritesContainer">
                <!-- Favorite cities will be added here -->
            </div>
        </div>

        <div class="loading" id="loading">
            <i class="fas fa-spinner fa-spin"></i> Loading weather data...
        </div>

        <div class="error" id="error">
            <!-- Error messages will be displayed here -->
        </div>

        <div class="main-content" id="mainContent" style="display: none;">
            <div class="current-weather">
                <div class="weather-icon" id="weatherIcon">
                    <i class="fas fa-sun"></i>
                </div>
                <div class="temperature" id="temperature">--°C</div>
                <div class="city-name">
                    <span id="cityName">City Name</span>
                    <button class="favorite-btn" id="favoriteBtn">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="weather-description" id="weatherDescription">Clear Sky</div>
                
                <div class="weather-details">
                    <div class="detail-item">
                        <div class="detail-label">Feels Like</div>
                        <div class="detail-value" id="feelsLike">--°C</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Humidity</div>
                        <div class="detail-value" id="humidity">--%</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Wind Speed</div>
                        <div class="detail-value" id="windSpeed">-- km/h</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Pressure</div>
                        <div class="detail-value" id="pressure">-- hPa</div>
                    </div>
                </div>
            </div>

            <div class="forecast">
                <h3><i class="fas fa-calendar-alt"></i> 5-Day Forecast</h3>
                <div class="forecast-container" id="forecastContainer">
                    <!-- Forecast items will be added here -->
                </div>
            </div>
        </div>
    </div>

    <script>
        class WeatherDashboard {
            constructor() {
                this.apiKey = '4a9635fdef5f85de61cd29e7de2c9ad3'; // Free tier API key
                this.baseUrl = 'https://api.openweathermap.org/data/2.5';
                this.currentCity = '';
                this.favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
                this.init();
            }

            init() {
                this.bindEvents();
                this.loadFavorites();
                this.loadDefaultCity();
            }

            bindEvents() {
                document.getElementById('searchBtn').addEventListener('click', () => this.searchWeather());
                document.getElementById('cityInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.searchWeather();
                });
                document.getElementById('locationBtn').addEventListener('click', () => this.getCurrentLocation());
                document.getElementById('favoriteBtn').addEventListener('click', () => this.toggleFavorite());
            }

            async searchWeather() {
                const city = document.getElementById('cityInput').value.trim();
                if (!city) return;
                
                await this.getWeatherData(city);
            }

            async getCurrentLocation() {
                if (!navigator.geolocation) {
                    this.showError('Geolocation is not supported by this browser.');
                    return;
                }

                this.showLoading(true);
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        await this.getWeatherByCoords(latitude, longitude);
                    },
                    (error) => {
                        this.showLoading(false);
                        this.showError('Unable to retrieve your location.');
                    }
                );
            }

            async getWeatherByCoords(lat, lon) {
                try {
                    const response = await fetch(
                        \`\${this.baseUrl}/weather?lat=\${lat}&lon=\${lon}&appid=\${this.apiKey}&units=metric\`
                    );
                    
                    if (!response.ok) throw new Error('Weather data not found');
                    
                    const data = await response.json();
                    this.currentCity = data.name;
                    await this.displayWeather(data);
                    await this.getForecast(data.name);
                } catch (error) {
                    this.showError('Unable to fetch weather data for your location.');
                } finally {
                    this.showLoading(false);
                }
            }

            async getWeatherData(city) {
                this.showLoading(true);
                this.hideError();

                try {
                    const response = await fetch(
                        \`\${this.baseUrl}/weather?q=\${encodeURIComponent(city)}&appid=\${this.apiKey}&units=metric\`
                    );
                    
                    if (!response.ok) {
                        throw new Error('City not found');
                    }

                    const data = await response.json();
                    this.currentCity = data.name;
                    await this.displayWeather(data);
                    await this.getForecast(city);
                    
                } catch (error) {
                    this.showError('City not found. Please check the spelling and try again.');
                } finally {
                    this.showLoading(false);
                }
            }

            async getForecast(city) {
                try {
                    const response = await fetch(
                        \`\${this.baseUrl}/forecast?q=\${encodeURIComponent(city)}&appid=\${this.apiKey}&units=metric\`
                    );
                    
                    if (!response.ok) throw new Error('Forecast data not found');
                    
                    const data = await response.json();
                    this.displayForecast(data);
                } catch (error) {
                    console.error('Error fetching forecast:', error);
                }
            }

            displayWeather(data) {
                document.getElementById('temperature').textContent = \`\${Math.round(data.main.temp)}°C\`;
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('weatherDescription').textContent = data.weather[0].description;
                document.getElementById('feelsLike').textContent = \`\${Math.round(data.main.feels_like)}°C\`;
                document.getElementById('humidity').textContent = \`\${data.main.humidity}%\`;
                document.getElementById('windSpeed').textContent = \`\${Math.round(data.wind.speed * 3.6)} km/h\`;
                document.getElementById('pressure').textContent = \`\${data.main.pressure} hPa\`;

                // Update weather icon
                const iconElement = document.getElementById('weatherIcon');
                const weatherMain = data.weather[0].main.toLowerCase();
                const iconClass = this.getWeatherIcon(weatherMain);
                iconElement.innerHTML = \`<i class="\${iconClass}"></i>\`;

                // Update favorite button
                this.updateFavoriteButton();

                // Show main content
                document.getElementById('mainContent').style.display = 'grid';
                
                // Clear search input
                document.getElementById('cityInput').value = '';
            }

            displayForecast(data) {
                const forecastContainer = document.getElementById('forecastContainer');
                forecastContainer.innerHTML = '';

                // Get daily forecasts (one per day for next 5 days)
                const dailyForecasts = this.processForecastData(data.list);

                dailyForecasts.forEach(forecast => {
                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'forecast-item';
                    
                    const date = new Date(forecast.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    
                    const iconClass = this.getWeatherIcon(forecast.weather[0].main.toLowerCase());
                    
                    forecastItem.innerHTML = \`
                        <div class="forecast-date">
                            <div>\${dayName}</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">\${monthDay}</div>
                        </div>
                        <div class="forecast-weather">
                            <div class="forecast-icon"><i class="\${iconClass}"></i></div>
                            <div class="forecast-temp">\${Math.round(forecast.main.temp_max)}°/\${Math.round(forecast.main.temp_min)}°</div>
                        </div>
                    \`;
                    
                    forecastContainer.appendChild(forecastItem);
                });
            }

            processForecastData(forecastList) {
                const dailyData = {};
                
                forecastList.forEach(item => {
                    const date = new Date(item.dt * 1000).toDateString();
                    
                    if (!dailyData[date]) {
                        dailyData[date] = {
                            ...item,
                            main: {
                                ...item.main,
                                temp_min: item.main.temp,
                                temp_max: item.main.temp
                            }
                        };
                    } else {
                        dailyData[date].main.temp_min = Math.min(dailyData[date].main.temp_min, item.main.temp);
                        dailyData[date].main.temp_max = Math.max(dailyData[date].main.temp_max, item.main.temp);
                    }
                });

                return Object.values(dailyData).slice(0, 5);
            }

            getWeatherIcon(weatherMain) {
                const iconMap = {
                    'clear': 'fas fa-sun',
                    'clouds': 'fas fa-cloud',
                    'rain': 'fas fa-cloud-rain',
                    'drizzle': 'fas fa-cloud-drizzle',
                    'thunderstorm': 'fas fa-bolt',
                    'snow': 'fas fa-snowflake',
                    'mist': 'fas fa-smog',
                    'fog': 'fas fa-smog',
                    'haze': 'fas fa-smog'
                };
                
                return iconMap[weatherMain] || 'fas fa-cloud';
            }

            toggleFavorite() {
                if (!this.currentCity) return;

                const index = this.favorites.indexOf(this.currentCity);
                if (index > -1) {
                    this.favorites.splice(index, 1);
                } else {
                    this.favorites.push(this.currentCity);
                }

                this.saveFavorites();
                this.loadFavorites();
                this.updateFavoriteButton();
            }

            updateFavoriteButton() {
                const favoriteBtn = document.getElementById('favoriteBtn');
                const isFavorite = this.favorites.includes(this.currentCity);
                favoriteBtn.innerHTML = isFavorite ? 
                    '<i class="fas fa-heart"></i>' : 
                    '<i class="far fa-heart"></i>';
            }

            loadFavorites() {
                const container = document.getElementById('favoritesContainer');
                container.innerHTML = '';

                if (this.favorites.length === 0) {
                    container.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center;">No favorite cities yet. Add some by clicking the heart icon!</p>';
                    return;
                }

                this.favorites.forEach(city => {
                    const cityElement = document.createElement('div');
                    cityElement.className = 'favorite-city';
                    cityElement.innerHTML = \`
                        <span onclick="weatherApp.getWeatherData('\${city}')">\${city}</span>
                        <button class="remove-favorite" onclick="weatherApp.removeFavorite('\${city}')">
                            <i class="fas fa-times"></i>
                        </button>
                    \`;
                    container.appendChild(cityElement);
                });
            }

            removeFavorite(city) {
                const index = this.favorites.indexOf(city);
                if (index > -1) {
                    this.favorites.splice(index, 1);
                    this.saveFavorites();
                    this.loadFavorites();
                    if (this.currentCity === city) {
                        this.updateFavoriteButton();
                    }
                }
            }

            saveFavorites() {
                localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
            }

            loadDefaultCity() {
                // Try to load weather for user's last searched city or default to London
                const lastCity = localStorage.getItem('lastSearchedCity') || 'London';
                this.getWeatherData(lastCity);
            }

            showLoading(show) {
                const loading = document.getElementById('loading');
                if (show) {
                    loading.classList.add('show');
                    document.getElementById('mainContent').style.display = 'none';
                } else {
                    loading.classList.remove('show');
                }
            }

            showError(message) {
                const error = document.getElementById('error');
                error.textContent = message;
                error.classList.add('show');
                setTimeout(() => {
                    error.classList.remove('show');
                }, 5000);
            }

            hideError() {
                document.getElementById('error').classList.remove('show');
            }
        }

        // Initialize the weather app
        const weatherApp = new WeatherDashboard();

        // Save last searched city
        const originalGetWeatherData = weatherApp.getWeatherData;
        weatherApp.getWeatherData = async function(city) {
            const result = await originalGetWeatherData.call(this, city);
            if (this.currentCity) {
                localStorage.setItem('lastSearchedCity', this.currentCity);
            }
            return result;
        };
    </script>
</body>
</html>
        `
      }}
    />
  );
};

export default Index;
