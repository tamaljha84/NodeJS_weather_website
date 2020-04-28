console.log('Client side JS is loaded')



const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchText.value
    console.log(location)

    document.querySelector('#weatherMessage').textContent = 'Loading...'

    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                // console.log(data.error)
                document.querySelector('#error').textContent = data.error
                document.querySelector('#weatherMessage').textContent = ''
            } else {
                // console.log(data.weather_description)
                document.querySelector('#error').textContent = ''
                document.querySelector('#weatherMessage').textContent = data.weatherText
                document.querySelector("#weatherIcon").src = data.imgSrc;
            }
        })
    })
})

