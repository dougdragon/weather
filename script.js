const spinnerElement = document.getElementById('spinner');
const weatherSpinnerElement = document.getElementById('tempSpinner');
fetch("https://api.dougdragon.com/ip/")
    .then(response => response.json())
    .then(data => {
        const ipAddress = data['ipAddress'];

        const geoUrl = `https://api.dougdragon.com/geolocation/?ip=${ipAddress}`;
        fetch(geoUrl)
            .then(resp => resp.json())
            .then(geoData => {
                if (geoData.message) {
                    console.log('geoData error: ', geoData.message);
                    const errorMessage = `Geolocation API error: ${geoData.message}`;
                    document.getElementById('apiError').textContent = errorMessage;
                    spinnerElement.style.display = 'none'
                    document.getElementById('error').style.display = "";
                } else {
                    const {city, state_prov} = geoData;
                    document.getElementById('location').innerText = `${city}, ${state_prov}`;
                    spinnerElement.style.display = 'none'
                    weatherSpinnerElement.style.display = '';

                    const zipCode = geoData['zipcode'];

                    const getWeatherUrl = `https://api.dougdragon.com/weatherapi/?zipCode=${zipCode}`;
                    fetch(getWeatherUrl)
                        .then(resp => resp.json())
                        .then(weatherData => {
                            const { temp_f, feelslike_f, condition } = weatherData['current'];
                            const htmlWeatherElement = `${temp_f} F (<span class="uk-text-italic uk-text-light">Feels like: ${feelslike_f}</span>)`;
                            document.getElementById('temp').innerHTML = htmlWeatherElement;
                            const { icon, text } = condition;
                            document.getElementById('conditionIcon').innerHTML = `<img src="https:${condition.icon}" title="${text}">`;
                            document.getElementById('condition').textContent = text;
                            weatherSpinnerElement.style.display = 'none';
                        })
                        .catch(error => {
                            console.log('weatherApi error: ', error);
                            const errorMessage = `Weather API error: ${error}`;
                            document.getElementById('apiError').textContent = errorMessage;
                            spinnerElement.style.display = 'none'
                            weatherSpinnerElement.style.display = 'none';
                            document.getElementById('error').style.display = "";
                        })
                }
            })
            .catch(error => console.log('There was an error getting geoData: ', error));
    })
    .catch(error => console.log('There was an error getting IP: ', error));
