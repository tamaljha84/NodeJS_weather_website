const express = require('express')
const path = require('path')
const hbs = require('hbs')
//const getWeatherForPlaceName = require('../../weather-app/app')

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// path to public directory where static resources are kept
app.use(express.static(publicDir))
// use handlebars - hbs template engine
app.set('view engine', 'hbs')
// path to templates folder (customizing from default folder name of views)
app.set('views', viewsPath)
// register partial views path with hbs
hbs.registerPartials(partialsPath)


app.listen('3000')

module.exports = app