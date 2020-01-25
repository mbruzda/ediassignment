"use strict";


const key1 = 'dc69d4f926fb32'
const key2 = "341ed476fac64aaed40503597c4f361b"
var current

document.querySelector("#look").addEventListener("click", onclickAPI)
document.querySelector("input").addEventListener("keydown", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
    //   document.querySelector("button").click();
    onclickAPI()
    }
    })
// Lat/Lon API
function onclickAPI(){
    async function apiRequestLocation(){

        const city = document.querySelector("input").value
        let url = `https://eu1.locationiq.com/v1/search.php?key=${key1}&q=${city}&format=json`
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        return data 
    
        
    }
    // Response Formatter
    async function getPlaceData(){

        const cityList = await apiRequestLocation()
        //console.log(cityList)
        const cityData = cityList[0]
        return cityData
    }
    // WHEATHER REQUEST
    async function weatherRequest(){
        try {
            const cords = await getPlaceData()
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const url = `${proxy}https://api.darksky.net/forecast/${key2}/${cords.lat},${cords.lon}?units=ca`
        
            const response = await fetch(url)
            const data = await response.json()
            locGood()
        return data
        } catch (err) {
            //console.error(err)
            locErr()       
        }
        
    }
    async function HTMLmanipulation(){
        const data =  await weatherRequest()
        const cords = await getPlaceData()
        current = data 
        //console.log(cords)
        //console.log(data)

        const container = document.createElement("div")
        container.setAttribute("class", "response")
        
        let output = `
        <h1 class="header">Weather in ${cords.display_name}</h1>
        <div class="response">
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[0].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[0].temperatureMax} &#x2103</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[0].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[1].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[1].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[1].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[2].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[2].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[2].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[3].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[3].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[3].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[4].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[4].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[4].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[5].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[5].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[5].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[6].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[6].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[6].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[7].time)) + ' 2020'}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[7].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[7].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <canvas id="chart"></canvas>
            <canvas id="chartbar"></canvas>
        </div>
        `
        console.log(data.hourly.data)
        document.querySelector('#one').className = 'choiceafter'
        document.querySelector('#two').className = 'choiceafter'
        
        const responseContainer = document.querySelector(".responseContainer")
        responseContainer.innerHTML = output
        document.querySelector("input").value = ''
        return data
     }

        function addChart() {
            var ctx = document.getElementById('chart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [
                            hourConverter(Number(current.hourly.data[0].time)),
                            hourConverter(Number(current.hourly.data[1].time)),
                            hourConverter(Number(current.hourly.data[2].time)),
                            hourConverter(Number(current.hourly.data[3].time)),
                            hourConverter(Number(current.hourly.data[4].time)),
                            hourConverter(Number(current.hourly.data[5].time)),
                            hourConverter(Number(current.hourly.data[6].time)),
                            hourConverter(Number(current.hourly.data[7].time)),
                            hourConverter(Number(current.hourly.data[8].time)),
                            hourConverter(Number(current.hourly.data[9].time)),
                            hourConverter(Number(current.hourly.data[10].time)),
                            hourConverter(Number(current.hourly.data[11].time)),
                            hourConverter(Number(current.hourly.data[12].time)),
                            hourConverter(Number(current.hourly.data[13].time)),
                            hourConverter(Number(current.hourly.data[14].time)),
                            hourConverter(Number(current.hourly.data[15].time)),
                            hourConverter(Number(current.hourly.data[16].time)),
                            hourConverter(Number(current.hourly.data[17].time)),
                            hourConverter(Number(current.hourly.data[18].time)),
                            hourConverter(Number(current.hourly.data[19].time)),
                            hourConverter(Number(current.hourly.data[20].time)),
                            hourConverter(Number(current.hourly.data[21].time)),
                            hourConverter(Number(current.hourly.data[22].time)),
                            hourConverter(Number(current.hourly.data[23].time))
                        ],
                        datasets: [{
                            label: '24 Hour Temperature Prognosis',
                            data: [
                                current.hourly.data[0].temperature,
                                current.hourly.data[1].temperature,
                                current.hourly.data[2].temperature,
                                current.hourly.data[3].temperature,
                                current.hourly.data[4].temperature,
                                current.hourly.data[5].temperature,
                                current.hourly.data[6].temperature,
                                current.hourly.data[7].temperature,
                                current.hourly.data[8].temperature,
                                current.hourly.data[9].temperature,
                                current.hourly.data[10].temperature,
                                current.hourly.data[11].temperature,
                                current.hourly.data[12].temperature,
                                current.hourly.data[13].temperature,
                                current.hourly.data[14].temperature,
                                current.hourly.data[15].temperature,
                                current.hourly.data[16].temperature,
                                current.hourly.data[17].temperature,
                                current.hourly.data[18].temperature,
                                current.hourly.data[19].temperature,
                                current.hourly.data[20].temperature,
                                current.hourly.data[21].temperature,
                                current.hourly.data[22].temperature,
                                current.hourly.data[23].temperature,
                            ],
                            backgroundColor: 'yellow',
                            borderColor: 'red',
                            fill:false,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        fontColor: 'white',
                        scales: {
                            yAxes: [{
                                gridLines:{
                                    color:"black"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                gridLines:{
                                    color:"black",
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                var ctx = document.getElementById('chartbar').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [
                            timeConverter(Number(current.daily.data[0].time))+" High",
                            timeConverter(Number(current.daily.data[0].time))+" Low",
                            timeConverter(Number(current.daily.data[1].time))+" High",
                            timeConverter(Number(current.daily.data[1].time))+" Low",
                            timeConverter(Number(current.daily.data[2].time))+" High",
                            timeConverter(Number(current.daily.data[2].time))+" Low",
                            timeConverter(Number(current.daily.data[3].time))+" High",
                            timeConverter(Number(current.daily.data[3].time))+" Low",
                            timeConverter(Number(current.daily.data[4].time))+" High",
                            timeConverter(Number(current.daily.data[4].time))+" Low",
                            timeConverter(Number(current.daily.data[5].time))+" High",
                            timeConverter(Number(current.daily.data[5].time))+" Low",
                            timeConverter(Number(current.daily.data[6].time))+" High",
                            timeConverter(Number(current.daily.data[6].time))+" Low"
                        ],
                        datasets: [{
                            label: '7 day High/Low Temperature Prognosis',
                            data: [
                                current.daily.data[0].temperatureHigh,
                                current.daily.data[0].temperatureLow,
                                current.daily.data[1].temperatureHigh,
                                current.daily.data[1].temperatureLow,
                                current.daily.data[2].temperatureHigh,
                                current.daily.data[2].temperatureLow,
                                current.daily.data[3].temperatureHigh,
                                current.daily.data[3].temperatureLow,
                                current.daily.data[4].temperatureHigh,
                                current.daily.data[4].temperatureLow,
                                current.daily.data[5].temperatureHigh,
                                current.daily.data[5].temperatureLow,
                                current.daily.data[6].temperatureHigh,
                                current.daily.data[6].temperatureLow
                            ],
                            backgroundColor: ['white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
                            borderColor: ['white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        fontColor: 'white',
                        scales: {
                            yAxes: [{
                                gridLines:{
                                    color:"black"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                gridLines:{
                                    color:"black",
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                for(var i=0;i<14;i++){
                    if(myChart.config.data.datasets[0].data[i] < 0){
                        myChart.config.data.datasets[0].backgroundColor[i] = 'rgba(75, 192, 192, 0.5)';
                        myChart.config.data.datasets[0].borderColor[i] = 'rgba(75, 192, 192)';
                    }
                    else{
                        myChart.config.data.datasets[0].backgroundColor[i] = 'rgba(255, 99, 132, 0.5)';
                        myChart.config.data.datasets[0].borderColor[i] = 'rgba(255, 99, 132)';
                    }
                }
                myChart.update()
    }
    async function insertIcon() {
        const data = await HTMLmanipulation()
        console.log(data)
        for(let i = 0; i < 8; i++){
            const iconList = document.querySelectorAll(".icon")
            setIcons(data.daily.data[i].icon, iconList[i])
        }
        addChart()
    }
    insertIcon()
}

document.querySelector("#one").addEventListener("click", function(){
    var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    hourConverter(Number(current.hourly.data[0].time)),
                    hourConverter(Number(current.hourly.data[1].time)),
                    hourConverter(Number(current.hourly.data[2].time)),
                    hourConverter(Number(current.hourly.data[3].time)),
                    hourConverter(Number(current.hourly.data[4].time)),
                    hourConverter(Number(current.hourly.data[5].time)),
                    hourConverter(Number(current.hourly.data[6].time)),
                    hourConverter(Number(current.hourly.data[7].time)),
                    hourConverter(Number(current.hourly.data[8].time)),
                    hourConverter(Number(current.hourly.data[9].time)),
                    hourConverter(Number(current.hourly.data[10].time)),
                    hourConverter(Number(current.hourly.data[11].time)),
                    hourConverter(Number(current.hourly.data[12].time)),
                    hourConverter(Number(current.hourly.data[13].time)),
                    hourConverter(Number(current.hourly.data[14].time)),
                    hourConverter(Number(current.hourly.data[15].time)),
                    hourConverter(Number(current.hourly.data[16].time)),
                    hourConverter(Number(current.hourly.data[17].time)),
                    hourConverter(Number(current.hourly.data[18].time)),
                    hourConverter(Number(current.hourly.data[19].time)),
                    hourConverter(Number(current.hourly.data[20].time)),
                    hourConverter(Number(current.hourly.data[21].time)),
                    hourConverter(Number(current.hourly.data[22].time)),
                    hourConverter(Number(current.hourly.data[23].time))
                ],
                datasets: [{
                    label: '24 Hour Temperature Prognosis',
                    data: [
                        current.hourly.data[0].temperature,
                        current.hourly.data[1].temperature,
                        current.hourly.data[2].temperature,
                        current.hourly.data[3].temperature,
                        current.hourly.data[4].temperature,
                        current.hourly.data[5].temperature,
                        current.hourly.data[6].temperature,
                        current.hourly.data[7].temperature,
                        current.hourly.data[8].temperature,
                        current.hourly.data[9].temperature,
                        current.hourly.data[10].temperature,
                        current.hourly.data[11].temperature,
                        current.hourly.data[12].temperature,
                        current.hourly.data[13].temperature,
                        current.hourly.data[14].temperature,
                        current.hourly.data[15].temperature,
                        current.hourly.data[16].temperature,
                        current.hourly.data[17].temperature,
                        current.hourly.data[18].temperature,
                        current.hourly.data[19].temperature,
                        current.hourly.data[20].temperature,
                        current.hourly.data[21].temperature,
                        current.hourly.data[22].temperature,
                        current.hourly.data[23].temperature,
                    ],
                    backgroundColor: 'yellow',
                    borderColor: 'red',
                    fill:false,
                    borderWidth: 1
                }]
            },
            options: {
                fontColor: 'white',
                scales: {
                    yAxes: [{
                        gridLines:{
                            color:"black"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        gridLines:{
                            color:"black",
                            display: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
})

document.querySelector("#two").addEventListener("click", function(){
    var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    hourConverter(Number(current.hourly.data[0].time)),
                    hourConverter(Number(current.hourly.data[1].time)),
                    hourConverter(Number(current.hourly.data[2].time)),
                    hourConverter(Number(current.hourly.data[3].time)),
                    hourConverter(Number(current.hourly.data[4].time)),
                    hourConverter(Number(current.hourly.data[5].time)),
                    hourConverter(Number(current.hourly.data[6].time)),
                    hourConverter(Number(current.hourly.data[7].time)),
                    hourConverter(Number(current.hourly.data[8].time)),
                    hourConverter(Number(current.hourly.data[9].time)),
                    hourConverter(Number(current.hourly.data[10].time)),
                    hourConverter(Number(current.hourly.data[11].time)),
                    hourConverter(Number(current.hourly.data[12].time)),
                    hourConverter(Number(current.hourly.data[13].time)),
                    hourConverter(Number(current.hourly.data[14].time)),
                    hourConverter(Number(current.hourly.data[15].time)),
                    hourConverter(Number(current.hourly.data[16].time)),
                    hourConverter(Number(current.hourly.data[17].time)),
                    hourConverter(Number(current.hourly.data[18].time)),
                    hourConverter(Number(current.hourly.data[19].time)),
                    hourConverter(Number(current.hourly.data[20].time)),
                    hourConverter(Number(current.hourly.data[21].time)),
                    hourConverter(Number(current.hourly.data[22].time)),
                    hourConverter(Number(current.hourly.data[23].time)),
                    hourConverter(Number(current.hourly.data[24].time)),
                    hourConverter(Number(current.hourly.data[25].time)),
                    hourConverter(Number(current.hourly.data[26].time)),
                    hourConverter(Number(current.hourly.data[27].time)),
                    hourConverter(Number(current.hourly.data[28].time)),
                    hourConverter(Number(current.hourly.data[29].time)),
                    hourConverter(Number(current.hourly.data[30].time)),
                    hourConverter(Number(current.hourly.data[31].time)),
                    hourConverter(Number(current.hourly.data[32].time)),
                    hourConverter(Number(current.hourly.data[33].time)),
                    hourConverter(Number(current.hourly.data[34].time)),
                    hourConverter(Number(current.hourly.data[35].time)),
                    hourConverter(Number(current.hourly.data[36].time)),
                    hourConverter(Number(current.hourly.data[37].time)),
                    hourConverter(Number(current.hourly.data[38].time)),
                    hourConverter(Number(current.hourly.data[39].time)),
                    hourConverter(Number(current.hourly.data[40].time)),
                    hourConverter(Number(current.hourly.data[41].time)),
                    hourConverter(Number(current.hourly.data[42].time)),
                    hourConverter(Number(current.hourly.data[43].time)),
                    hourConverter(Number(current.hourly.data[44].time)),
                    hourConverter(Number(current.hourly.data[45].time)),
                    hourConverter(Number(current.hourly.data[46].time)),
                    hourConverter(Number(current.hourly.data[47].time))
                ],
                datasets: [{
                    label: '48 Hour Temperature Prognosis',
                    data: [
                        current.hourly.data[0].temperature,
                        current.hourly.data[1].temperature,
                        current.hourly.data[2].temperature,
                        current.hourly.data[3].temperature,
                        current.hourly.data[4].temperature,
                        current.hourly.data[5].temperature,
                        current.hourly.data[6].temperature,
                        current.hourly.data[7].temperature,
                        current.hourly.data[8].temperature,
                        current.hourly.data[9].temperature,
                        current.hourly.data[10].temperature,
                        current.hourly.data[11].temperature,
                        current.hourly.data[12].temperature,
                        current.hourly.data[13].temperature,
                        current.hourly.data[14].temperature,
                        current.hourly.data[15].temperature,
                        current.hourly.data[16].temperature,
                        current.hourly.data[17].temperature,
                        current.hourly.data[18].temperature,
                        current.hourly.data[19].temperature,
                        current.hourly.data[20].temperature,
                        current.hourly.data[21].temperature,
                        current.hourly.data[22].temperature,
                        current.hourly.data[23].temperature,
                        current.hourly.data[24].temperature,
                        current.hourly.data[25].temperature,
                        current.hourly.data[26].temperature,
                        current.hourly.data[27].temperature,
                        current.hourly.data[28].temperature,
                        current.hourly.data[29].temperature,
                        current.hourly.data[30].temperature,
                        current.hourly.data[31].temperature,
                        current.hourly.data[32].temperature,
                        current.hourly.data[33].temperature,
                        current.hourly.data[34].temperature,
                        current.hourly.data[35].temperature,
                        current.hourly.data[36].temperature,
                        current.hourly.data[37].temperature,
                        current.hourly.data[38].temperature,
                        current.hourly.data[39].temperature,
                        current.hourly.data[40].temperature,
                        current.hourly.data[41].temperature,
                        current.hourly.data[42].temperature,
                        current.hourly.data[43].temperature,
                        current.hourly.data[44].temperature,
                        current.hourly.data[45].temperature,
                        current.hourly.data[46].temperature,
                        current.hourly.data[47].temperature,
                    ],
                    backgroundColor: 'yellow',
                    borderColor: 'red',
                    fill:false,
                    borderWidth: 1
                }]
            },
            options: {
                fontColor: 'white',
                scales: {
                    yAxes: [{
                        gridLines:{
                            color:"black"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        gridLines:{
                            color:"black",
                            display: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
})

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getUTCHours() 
    var time = date + ' ' + month
    return time
  }
  function hourConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000)
    var hour = a.getUTCHours() 
    var hours = hour + ":00"
    return hours
  }
function setIcons(icon, iconID){
    const skycons = new Skycons({color:"black"})
    const currentIcon = icon.replace(/-/g,"_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon]) 
}

function locErr() {
    var x = document.getElementById("locErr");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }
  function locGood() {
    var x = document.getElementById("locErr");
    if (x.style.display === "block") {
      x.style.display = "none";
    }
  }