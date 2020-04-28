const app = require('./app')
const getGeoCode = require('./utils/geoCodeUtil')
const getWeather = require('./utils/weatherUtil')

app.get('', (req, res) => {
    res.render('home', {
        title: 'Weather',
        creatorName: 'Tamal Jha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        creatorName: 'Tamal Jha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text',
        creatorName: 'Tamal Jha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({ error: 'Please provide a location' })
    }

    const getWeatherUsingGeoCode = getGeoCode(req.query.location, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            console.log(error)
            return res.send({ error })
        }
        const weather = getWeather(latitude, longitude, (error, { temperature, feelslike, weather_descriptions, weather_icons, precip } = {}) => {
            if (!error) {
                const weatherText = 'The weather right now in ' + place_name + ' is ' + weather_descriptions[0] + '. The temperature is ' + temperature + ' and it feels like ' + feelslike + '. There is ' + precip + ' millimeters of precipitation.'
                // console.log(weatherText)

                return res.send({
                    place: place_name,
                    weather_description: weather_descriptions[0],
                    temperature,
                    feelslike,
                    imgSrc: weather_icons[0],
                    precip,
                    weatherText
                })
            }
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: 'Help',
        helpPageError: 'This help article does not exist',
        creatorName: 'Tamal Jha'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: 'Error',
        genericError: 'This page does not exist',
        creatorName: 'Tamal Jha'
    })
})