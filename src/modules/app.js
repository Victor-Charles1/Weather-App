import { createBaseLayout,renderWeather } from './ui.js';
import { getWeather, cleanData } from './getWeather.js';

export function initApp() {
  const appContainer = document.getElementById('app');
  
  // Create basic UI structure
  const { searchForm, weatherDisplay } = createBaseLayout();
  appContainer.append(searchForm, weatherDisplay);
  
  // Set up event listeners
  setupEventListeners(searchForm);
}

function setupEventListeners(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = form.querySelector('#location-input');
    const location = input.value.trim();
    input.value = '';
    
    if (location) {
      handleSearch(location, form.nextElementSibling); // Pass weather display element
    }
  });
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