const request = require('request')

const mapboxtoken = 'pk.eyJ1IjoidGFtYWxqaGEiLCJhIjoiY2s5ZTMwMWpiMDFnZzNmbXppYm82MDV5diJ9.eQ5ERpEhwbXrvY_GHq46bg'


function getGeoCode(address, callback) {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + mapboxtoken + '&limit=1'
    request({ url: mapUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to reach geoCode API', undefined)
        } else if (response.body.features.length === 0) {
            callback('Location not found. Please try a different location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoCode