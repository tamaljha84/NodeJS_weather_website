const request = require('request')

const weatherToken = '05a6da815ccec296b217b943f0c5a748'


function getWeather(lat, long, callback) {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + weatherToken + '&query=' + lat + ',' + long
    request({ url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to reach Weather API', undefined)
        } else if (!response.body.current) {
            callback('Weather data was not found', undefined)
        } else {
            callback(undefined, response.body.current)
        }
    })
}

module.exports = getWeather