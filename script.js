
// API Configuration
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherDisplay = document.getElementById('weatherDisplay');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesContainer = document.getElementById('favoritesContainer');

// Current weather elements
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const currentTemp = document.getElementById('currentTemp');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDesc = document.getElementById('weatherDesc');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const forecastContainer = document.getElementById('forecastContainer');

// State
let currentCity = '';
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesDisplay();
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    locationBtn.addEventListener('click', getCurrentLocation);
    favoriteBtn.addEventListener('click', toggleFavorite);
});

// Search functionality
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    await fetchWeatherData(city);
}

// Get current location
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser.');
        return;
    }
    
    showLoading();
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            showError('Unable to retrieve your location.');
        }
    );
}

// Fetch weather data by city name
async function fetchWeatherData(city) {
    showLoading();
    
    try {
        const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const currentResponse = await fetch(currentWeatherUrl);
        
        if (!currentResponse.ok) {
            throw new Error('City not found');
        }
        
        const currentData = await currentResponse.json();
        
        const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        displayWeatherData(currentData, forecastData);
        currentCity = city;
        updateFavoriteButton();
        
    } catch (err) {
        showError(err.message || 'Failed to fetch weather data');
    }
}

// Fetch weather data by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();
        
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        displayWeatherData(currentData, forecastData);
        currentCity = currentData.name;
        updateFavoriteButton();
        
    } catch (err) {
        showError('Failed to fetch weather data for your location');
    }
}

// Display weather data
function displayWeatherData(current, forecast) {
    hideLoading();
    hideError();
    
    // Update current weather
    cityName.textContent = `${current.name}, ${current.sys.country}`;
    currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    currentTemp.textContent = Math.round(current.main.temp);
    weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    weatherIcon.alt = current.weather[0].description;
    weatherDesc.textContent = current.weather[0].description;
    feelsLike.textContent = `Feels like ${Math.round(current.main.feels_like)}°C`;
    
    humidity.textContent = `${current.main.humidity}%`;
    windSpeed.textContent = `${current.wind.speed} m/s`;
    pressure.textContent = `${current.main.pressure} hPa`;
    visibility.textContent = `${(current.visibility / 1000).toFixed(1)} km`;
    
    // Update forecast
    displayForecast(forecast);
    
    weatherDisplay.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(forecastData) {
    forecastContainer.innerHTML = '';
    
    // Get one forecast per day (every 8th item since API returns 3-hour intervals)
    const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);
    
    dailyForecasts.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        forecastItem.innerHTML = `
            <div class="date">${date}</div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}" />
            </div>
            <div class="temp">${Math.round(item.main.temp)}°C</div>
            <div class="desc">${item.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Favorites functionality
function toggleFavorite() {
    if (!currentCity) return;
    
    const cityIndex = favorites.indexOf(currentCity);
    
    if (cityIndex === -1) {
        favorites.push(currentCity);
    } else {
        favorites.splice(cityIndex, 1);
    }
    
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
    updateFavoritesDisplay();
}

function updateFavoriteButton() {
    const isFavorite = favorites.includes(currentCity);
    favoriteBtn.classList.toggle('active', isFavorite);
    favoriteBtn.textContent = isFavorite ? '❤️' : '🤍';
}

function updateFavoritesDisplay() {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="no-favorites">No favorite cities yet</p>';
        return;
    }
    
    favoritesContainer.innerHTML = '';
    
    favorites.forEach(city => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-city';
        favoriteItem.innerHTML = `
            <span>${city}</span>
            <button class="remove-favorite" onclick="removeFavorite('${city}')">×</button>
        `;
        
        favoriteItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-favorite')) return;
            cityInput.value = city;
            handleSearch();
        });
        
        favoritesContainer.appendChild(favoriteItem);
    });
}

function removeFavorite(city) {
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
    updateFavoriteButton();
}

// UI state management
function showLoading() {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    error.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

// Make removeFavorite globally accessible
window.removeFavorite = removeFavorite;
