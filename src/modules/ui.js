
import { getWeather, cleanData } from './getWeather.js';

// Create base application layout
export function createBaseLayout() {
  // Create header with search form
  const header = document.createElement('header');
  
  const searchForm = document.createElement('form');
  searchForm.id = 'search-form';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'location-input';
  input.placeholder = "Get Today's Weather, Enter city,state, country...";
  input.required = true;
  
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Search';
  
  searchForm.append(input, button);
  header.appendChild(searchForm);
  
  // Create main display area
  const weatherDisplay = document.createElement('main');
  weatherDisplay.id = 'weather-display';
  weatherDisplay.innerHTML = '<p class="placeholder">Enter a location to get weather data</p>';
  
  return { searchForm, weatherDisplay };
}

// Handle search functionality
export async function handleSearch(location, displayElement) {
  try {
    // Show loading state
    displayElement.innerHTML = '<div class="loading">Loading weather data...</div>';
    
    // Get and process data
    const rawData = await getWeather(location);
    const cleanWeather = cleanData(rawData);
    console.log('Date from cleaned response:',cleanWeather)
    
    // Display results
    renderWeather(cleanWeather, displayElement);
  } catch (error) {
    displayElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

// Render weather data to DOM
export function renderWeather(data, container) {
  container.innerHTML = `
    <div class="weather-card">
      <h2>${data.location}</h2>
      <div class="current">
        <img src="${getIconUrl(data.icon)}" alt="${data.conditions}">
        <div>${Math.round(data.temperature)}°C</div>
        <div>${data.conditions}</div>
      </div>
      <div class="details">
        <div>Humidity: ${data.humidity}%</div>
        <div>Wind: ${data.windSpeed} km/h</div>
        <div>High: ${Math.round(data.high)}° Low: ${Math.round(data.low)}°</div>
        <div>Timezone: ${data.timeZone}</div>
      </div>
    </div>
  `;
}

// Helper function for weather icons 
// get weather icons form virtualcrossing's git hub.
function getIconUrl(iconCode) {
  return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${iconCode}.svg`;
}