// async function getWeather(location) {
//     const location = location;
//     const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/today?key=YOUR_API_KEY', {mode: 'cors'});
//     const weatherData = await response.json();
//     console.log(weatherData);
    
// }

async function getWeather(location) {
    // Validate input
    if (!location || typeof location !== 'string') {
      throw new Error('Invalid location input');
    }
  
    // Get API key form the environment
  
    // Encode location and construct URL
    const encodedLocation = encodeURIComponent(location);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}/today?key=${apiKey}`;
  
    try {
      const response = await fetch(url, { mode: 'cors' });
      const weatherData = await response.json();
      console.log(weatherData);
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Weather fetch failed:', error);
      throw new Error('Failed to retrieve weather data');
    }
  }

// function that processes JSON and returns an object with only data needed for app
    // async function cleanData(params) {}