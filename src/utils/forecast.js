const request = require('request')

const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7da43bf16a8fe38b0b0e98dabe4c1249&query=' + latitude + ',' + longitude +'&units=f'

    request({url ,json : true}, (error, response) => {
        if(error) {
            callback("unable to connect to location services!", undefined)
        } else if(response.body.error) {
            callback("Unable to find location",undefined)            
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast