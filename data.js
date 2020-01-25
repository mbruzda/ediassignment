"use strict";


const key1 = 'dc69d4f926fb32'
const key2 = "341ed476fac64aaed40503597c4f361b"

document.querySelector("button").addEventListener("click", onclickAPI)
document.querySelector("input").addEventListener("keydown", function (event) {
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
function onclickAPI() {
    async function apiRequestLocation() {

        const city = document.querySelector("input").value
        let url = `https://eu1.locationiq.com/v1/search.php?key=${key1}&q=${city}&format=json`

        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    }
    // Response Formatter
    async function getPlaceData() {

        const cityList = await apiRequestLocation()
        console.log(cityList)
        const cityData = cityList[0]
        return cityData
    }
    // WHEATHER REQUEST
    async function weatherRequest() {

        const cords = await getPlaceData()
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = `${proxy}https://api.darksky.net/forecast/${key2}/${cords.lat},${cords.lon}?units=ca`

        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    async function HTMLmanipulation() {
        const data = await weatherRequest()
        const cords = await getPlaceData()
        console.log(cords)
        console.log(data)

        const container = document.createElement("div")
        container.setAttribute("class", "response")

        let output = `
        <h1 class="header">Weather in ${cords.display_name}</h1>
        <div class="response">
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[0].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[0].temperatureMax} &#x2103</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[0].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[1].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[1].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[1].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[2].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[2].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[2].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[3].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[3].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[3].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[4].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[4].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[4].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[5].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[5].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[5].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
                <div class= "box">
                <p>${timeConverter(Number(data.daily.data[6].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[6].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[6].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
            <div class= "box">
                <p>${timeConverter(Number(data.daily.data[7].time))}</p>
                <div class= "innerBox">
                    <ul>
                    <li><i class="fas fa-arrow-up"></i>${data.daily.data[7].temperatureMax}</li>
                    <li><i class="fas fa-arrow-down"></i>${data.daily.data[7].temperatureMin}</li>
                    </ul>
                    <canvas class="icon" width="64" height="64"></canvas>
                </div>
            </div>
        </div>
        `
        const responseContainer = document.querySelector(".responseContainer")
        responseContainer.innerHTML = output
        document.querySelector("input").value = ''
        return data
    }
    async function insertIcon() {
        const data = await HTMLmanipulation()
        console.log(data)
        for (let i = 0; i < 8; i++) {
            const iconList = document.querySelectorAll(".icon")
            setIcons(data.daily.data[i].icon, iconList[i])
        }
    }
    insertIcon()

}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var time = date + ' ' + month + ' ' + year
    return time
}
function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "black" })
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
}
