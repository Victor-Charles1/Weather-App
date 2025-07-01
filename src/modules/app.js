import { createBaseLayout } from './ui.js';

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
      // Import handler dynamically to avoid circular dependencies
      const { handleSearch } = await import('./ui.js');
      handleSearch(location, form.nextElementSibling); // Pass weather display element
    }
  });
}