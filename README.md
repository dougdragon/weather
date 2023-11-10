# Weather
A simple page that displays the current weather

# Technology used
I have an API that returns the user's IP address using PHP (see [browser-info](https://github.com/dougdragon/browser-info)). I use that then pass the IP to the ipgeolocation API ([IPGeolocation API](https://ipgeolocation.io/)) to get the user's city & state. After all that, I send a request to the weather API ([WeatherAPI](https://www.weatherapi.com/)).

# APIs used
- [IPGeolocation API](https://ipgeolocation.io/)
- [WeatherAPI](https://www.weatherapi.com/)