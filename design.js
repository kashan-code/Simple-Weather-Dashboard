
let temperatures = []; // the global array to store temperatures



async function WeatherData(){

const city = document.getElementById('cityInput').value;   // get the city name
const API_KEY='f5a1c66a213e1b66da8e4a1cfa2b4d8d';          // my api key 
document.getElementById('spinner').style.display = 'flex'; // calling loader spinner

try{
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

            if(weatherResponse.ok){
                const weather_Data = await weatherResponse.json();

                if (weather_Data.cod === 200) {  // 200 is the code for successfull getting  data in json
                    
                    displayWeather(weather_Data);
                    await fetchForecast(city);
                   
                }else{
                    throw new Error(weather_Data.message); // error message display
                }
            }
            else{
        const errorData = await weatherResponse.json();  // if weather_Data.cod !== 200
        throw new Error(errorData.message); 
            }
}
catch (error){
    alert(error.message);
    console.error('Error fetching weather data:', error);
}
finally {
    
    document.getElementById('spinner').style.display = 'none'; // disappear spinner
}

}




//function to fetch data 
let total_dataEntries=[];
async function fetchForecast(city) {

    const API_KEY = 'f5a1c66a213e1b66da8e4a1cfa2b4d8d'; 
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  
    if(forecastResponse.ok){
        const forecastData = await forecastResponse.json();
        total_dataEntries=forecastData.list;
        displayForecast(total_dataEntries);
    }else{
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message); 
    }
}






// This function displays weather data 
function displayWeather(data){

    const weatherWidget = document.getElementById('weather-widget');
        weatherWidget.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>${data.weather[0].description}</p>
        `;

        // function that based on the weather the background picture changes
        BackgroundImage(data.weather[0].description);
       
        
};



//This function displays forcase data
function displayForecast(data) {
    const forecastTable = document.getElementById('forecast-table');
    forecastTable.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Temperature (°C)</th>
            <th>Weather Condition</th>
        </tr>
    `;


    let Temperatures = []; 

    const weatherConditionsCount = {};

    data.forEach(data =>{
        const date = new Date(data.dt * 1000).toLocaleDateString();
        const temperature = data.main.temp;
        const weatherCondition = data.weather[0].description;
        forecastTable.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${temperature} °C</td>
                <td>${weatherCondition}</td>
            </tr>
        `;

        temperatures.push(temperature); // putting temperature in a global array
        Temperatures.push(temperature); // this is local array for charts

        // counting of temperature 
        if(weatherConditionsCount[weatherCondition]){
            weatherConditionsCount[weatherCondition] +=1;
        }else{
            weatherConditionsCount[weatherCondition]=1;
        }

  

    });

    chart_Maker(Temperatures, weatherConditionsCount);
    
}




    // function to get highest temperature in the table
        function getHighestTemperature(temperatures) {
        let highest = temperatures[0];
        for (let i = 1; i < temperatures.length; i++) {
            if (temperatures[i] > highest) {
                highest = temperatures[i];
            }
        }
        return highest;
    }
    
    
    // function to get lowest temperature in the table
    function getlowestTemperature(temperatures) {
        let lowest = temperatures[0];
        for (let i = 1; i < temperatures.length; i++) {
            if (temperatures[i] < lowest) {
                lowest = temperatures[i];
            }
        }
        return lowest;
    }
    
    
    // function to get average temperature in the table
    function getaverageTemperature(temperatures) {
        let total = 0;
        for (let i = 0; i < temperatures.length; i++) {
            total += temperatures[i];
        }
        return total / temperatures.length;
    }


    
// function to get data in ascending order
    function sortTemperaturesAscending() {
      
        total_dataEntries.sort((a, b) => a.main.temp - b.main.temp); 
        displayForecast(total_dataEntries); 
    }



 
 // function to get data in decending order
    function sortTemperaturesDecending() {
      
        total_dataEntries.sort((b, a) => b.main.temp - a.main.temp); 
        displayForecast(total_dataEntries); 
    }
    



// event listner call for weather  Button 
const weatherButton=  document.getElementById('getWeatherBtn');
weatherButton.addEventListener('click',WeatherData);



    function Table_details(){
        document.getElementById('weather-details').style.display = 'none';
        document.getElementById('forecast-container').style.display = 'block';
        document.getElementById('chatbox-container').style.display = 'block';
        document.getElementById('search').style.display = 'block';

        
        
    }

    //event listener call for the table button in the sidebar
    const Table_Action= document.getElementById('table');
    Table_Action.addEventListener('click',Table_details);




    function Dashboard_details(){
     document.getElementById('weather-details').style.display = 'block';
    document.getElementById('forecast-container').style.display = 'none'
    document.getElementById('chatbox-container').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    }


    //event listener call for the dashboard button in the chatbox
    const Dashboard_Action= document.getElementById('dashboard');
    Dashboard_Action.addEventListener('click',Dashboard_details);




    function BackgroundImage(weatherDescription) {
        const weatherWidget = document.getElementById('weather-widget');
        
        switch(weatherDescription){
            case 'light rain':
            weatherWidget.style.backgroundImage = "url('Images/light rain.jpeg')";
            break;
            case 'scattered clouds':
            weatherWidget.style.backgroundImage = "url('Images/scattered clouds.jpeg')";
            break;
            case 'clear sky':
            weatherWidget.style.backgroundImage = "url('Images/clear sky.jpeg')";
            break;
            case 'haze':
            weatherWidget.style.backgroundImage = "url('Images/haze.jpeg')";
            break;
            case 'overcast clouds':
            weatherWidget.style.backgroundImage ="url('Images/overcast clouds.jpeg')";
            break;
            case 'few clouds':
            weatherWidget.style.backgroundImage = "url('Images/clouds.jpeg')";
            break;
            case 'broken clouds':
            weatherWidget.style.backgroundImage = "url('Images/broken clouds.jpeg')";
            break;
            case 'mist':
            weatherWidget.style.backgroundImage = "url('Images/mist.jpeg')";
            break;
            case 'smoke':
            weatherWidget.style.backgroundImage = "url('Images/smoke.jpeg')";
            break;
            default:
            weatherWidget.style.backgroundImage = "url('Images/sunny.jpg')";

        }
        
    }
    









