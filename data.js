"use strict";


const key1 = 'dc69d4f926fb32'
const key2 = "341ed476fac64aaed40503597c4f361b"

async function apiRequestLocation(){

        const city = "Kraków"
        let url = `https://eu1.locationiq.com/v1/search.php?key=${key1}&q=${city}&format=json`

        const response = await fetch(url)
        const data = await response.json()

        return data 
    }
    // Response Formatter
async function getPlaceData(){

        const cityList = await apiRequestLocation()
        
        const cityData = cityList[0]
        console.log(cityData)
        return cityData
    }
    // WHEATHER REQUEST
async function weatherRequest(){

        const cords = await getPlaceData()
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = `${proxy}https://api.darksky.net/forecast/${key2}/${cords.lat},${cords.lon}?units=ca`
        
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    }
weatherRequest()
