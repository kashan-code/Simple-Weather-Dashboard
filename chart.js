
let barChart, doughnutChart, line_Chart;



// function for making charts, All 3 type of charts are in this function
function chart_Maker(Temperatures, weatherConditionsCount){
     
    
  
    
    const bar_chart=document.getElementById('temperature-bar-chart');  // id of bar chart
    const Doughnut_chart=document.getElementById('weather-doughnut-c'); // if of doughnut chart
    const lineChart = document.getElementById('temperature-line-c'); // id of line chart

  
    if (barChart) {
        barChart.destroy();
    }
    if (doughnutChart) {
        doughnutChart.destroy();
    }
    if (line_Chart) {
        line_Chart.destroy();
    }

    const Color_conditions = Object.keys(weatherConditionsCount);
    const Color_Store=[];  // array to store temperatures


// this loop is for changing backgroundcolor of the charts according to the weather
    for(let i=0; i<Color_conditions.length; i++){
    
        const condition = Color_conditions[i];
        const color = BackgtroundColor_Updater(condition);
        
        Color_Store.push(color);
    
    }

    

    // Bar chart
    barChart= new Chart(bar_chart,{
    
    type: 'bar',
    data:{
     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
             datasets: [{
                 label: 'Temperature (°C)',
                 data: Temperatures.slice(0, 5), 
                 backgroundColor: Color_Store,
                 borderColor: 'rgba(255, 255, 255, 1)'
             }]
    
    },
    options: {
             animation: { duration: 2000 ,
                 easing: 'easeOutBounce'
             }
         }
    
    }
    );
    
    
    
    
    
    
    // Doughnut_chart
    doughnutChart= new Chart(Doughnut_chart, {
            type: 'doughnut',
            data: {
                labels: Object.keys(weatherConditionsCount),
                datasets: [{
                    data: Object.values(weatherConditionsCount),
                    backgroundColor: Color_Store,
                }]
            },
            options: {
                animation: { animateRotate: true,
                    duration:2000
                 }
            }
        });
    
    
    
    
    //lineChart
    line_Chart= new Chart(lineChart, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'], 
                datasets: [{
                    label: 'Temperature (°C)',
                    data: Temperatures.slice(0, 5), 
                    backgroundColor: Color_Store, 
                    borderColor: 'rgba(255, 255, 255, 1)', 
                    borderWidth: 2,
                    fill: true 
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                },
                animation: { duration: 2000,
                    easing: 'easeOutBounce'
                 }
            }
        });

   
    
     }
    
           
        
     // this function return background color according to the weather
    function BackgtroundColor_Updater(weatherCondition) {
        switch(weatherCondition) {
            case 'light rain':
                return '#0E1A2A';
            case 'scattered clouds':
                return '#0F2A4D';
            case 'clear sky':
                return '#0A1D3B';
            case 'haze':
                return '#1A2B4D';
            case 'overcast clouds':
                return '#0B1A2C';
            case 'few clouds':
                return '#0C2B4D';
            case 'broken clouds':
                return '#1B2C4D';
            case 'mist':
                return '#0B1C3D';
            case 'smoke':
                return '#0C1D4D';
            default:
                return '#0A0A0A';
        }
    }