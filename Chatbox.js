const chatbox_input = document.getElementById('question'); // id of input we enter
const chatbox_output = document.getElementById('Answer'); // id of output that computer displays

// Function for the chatbox where we ask questions and get bot responses
function chatbox() {
    const Entered_Msg = chatbox_input.value;
    let getAnswer;
    const filtering_weather = Entered_Msg.match(/filter (\w+ ?\w*)/i);

    if (Entered_Msg) {
        chatbox_output.innerHTML += `<div class="My_question">You: ${Entered_Msg}</div>`;
        chatbox_input.value = '';

        if (filtering_weather) {
            const weatherCondition = filtering_weather[1].toLowerCase();
            const rainForecasts = total_dataEntries.filter(entry => entry.weather[0].description.includes(weatherCondition));

            if (rainForecasts.length > 0) {
                displayForecast(rainForecasts);
                getAnswer = `Displaying forecast entries with ${weatherCondition}.`;
            } else {
                getAnswer = `No forecast entries with ${weatherCondition} found.`;
            }
        } else if (Entered_Msg.toLowerCase().includes('weather')) {
            if (Entered_Msg.toLowerCase().includes('today')) {
                getAnswer = `The weather today in ${document.getElementById('cityInput').value} is ${currentWeather}.`;
            } else if (Entered_Msg.toLowerCase().includes('highest')) {
                getAnswer = `The highest temperature is ${getHighestTemperature(temperatures)} °C.`;
            } else if (Entered_Msg.toLowerCase().includes('lowest')) {
                getAnswer = `The lowest temperature is ${getlowestTemperature(temperatures)} °C.`;
            } else if (Entered_Msg.toLowerCase().includes('average')) {
                getAnswer = `The average temperature is ${getaverageTemperature(temperatures)} °C.`;
            } else if (Entered_Msg.toLowerCase().includes('asort')) {
                sortTemperaturesAscending();
                getAnswer = 'Temperatures have been sorted in ascending order.';
            } else if (Entered_Msg.toLowerCase().includes('dsort')) {
                sortTemperaturesDecending();
                getAnswer = 'Temperatures have been sorted in decending order.';
            } 
            else {
                getAnswer = 'I can provide weather data like today’s weather, highest, lowest, or average temperatures.';
            }
        } else {
            getAnswer = 'I am currently able to answer weather-related queries only.';
        }

        chatbox_output.innerHTML += `<div class="computer-answer">Computer: ${getAnswer}</div>`;
        chatbox_output.scrollTop = chatbox_output.scrollHeight; 
    }
}



// Event listener call for the enter button in the chatbox
const chat_button = document.getElementById('Sendbutton');
chat_button.addEventListener('click', chatbox);

// Handle Enter key for chat input
chatbox_input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        chatbox();
    }
});

// For deleting the chatbox messages 
document.getElementById("removebutton").addEventListener("click", function() {
    chatbox_output.innerHTML = ""; 
});
