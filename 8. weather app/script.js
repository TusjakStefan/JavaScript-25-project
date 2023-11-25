async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
  
      displayWeather(temperature, description, iconCode);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  const cityForm = document.getElementById('city-form');
  
  cityForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const cityInput = document.getElementById('city');
    const userCity = cityInput.value;
  
    if (userCity) {
      getWeather(userCity);
    } else {
      alert('City not entered. Weather update not possible.');
    }
  });
  
  function displayWeather(temperature, description, iconCode) {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('weather-icon');
  
    temperatureElement.textContent = `Temperature: ${temperature} °C`;
    descriptionElement.textContent = `Description: ${description}`;
    iconElement.src = `http://openweathermap.org/img/w/${iconCode}.png`;
  }
  