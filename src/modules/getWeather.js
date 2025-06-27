async function getWeather(location) {
    const location = location;
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/today?key=YOUR_API_KEY', {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    
}