const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "f933bfcfd4msh9ae1730f4d6d150p1bd1afjsn16ecc17d8149",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
};

const getWeather = (city)=>{

    cityName.innerHTML = city
    fetch(
        "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
        options
        )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            
            // cloud_pct.innerHTML = response.cloud_pct
            temp.innerHTML = response.temp
            temp2.innerHTML = response.temp
            feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            humidity2.innerHTML = response.humidity
            min_temp.innerHTML = response.min_temp
            max_temp.innerHTML = response.max_temp
            wind_speed.innerHTML = response.wind_speed 
            wind_speed2.innerHTML = response.wind_speed 
            wind_degrees.innerHTML = response.wind_degrees 
            sunrise.innerHTML = response.sunrise
            sunset.innerHTML = response.sunset

        })
    .catch((err) => console.error(err));
    
}

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log(city.value)
    getWeather(city.value)
})
getWeather("Delhi")

const getWeatherTable = ()=>{
    const cities = ["Boston", "New York", "London", "Maldives", "Santorini", "Paris"]
    let codes = [[b_cloud_pct, b_temp, b_feels_like, b_humidity, b_min_temp, b_max_temp, b_wind_speed, b_wind_degrees, b_sunrise, b_sunset],[n_cloud_pct, n_temp, n_feels_like, n_humidity, n_min_temp, n_max_temp, n_wind_speed, n_wind_degrees, n_sunrise, n_sunset], [l_cloud_pct, l_temp, l_feels_like, l_humidity, l_min_temp, l_max_temp, l_wind_speed, l_wind_degrees, l_sunrise, l_sunset],[m_cloud_pct, m_temp, m_feels_like, m_humidity, m_min_temp, m_max_temp, m_wind_speed, m_wind_degrees, m_sunrise, m_sunset], [s_cloud_pct, s_temp, s_feels_like, s_humidity, s_min_temp, s_max_temp, s_wind_speed, s_wind_degrees, s_sunrise, s_sunset],[p_cloud_pct, p_temp, p_feels_like, p_humidity, p_min_temp, p_max_temp, p_wind_speed, p_wind_degrees, p_sunrise, p_sunset]]

    for(let i=0;i<cities.length;i++){
        let j=0;
        console.log(cities[i])
        fetch(
            "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + cities[i],
            options
            )
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                codes[i][j++].innerHTML = response.cloud_pct
                codes[i][j++].innerHTML = response.temp
                codes[i][j++].innerHTML = response.feels_like
                codes[i][j++].innerHTML = response.humidity
                codes[i][j++].innerHTML = response.min_temp
                codes[i][j++].innerHTML = response.max_temp
                codes[i][j++].innerHTML = response.wind_speed 
                codes[i][j++].innerHTML = response.wind_degrees 
                codes[i][j++].innerHTML = response.sunrise
                codes[i][j++].innerHTML = response.sunset
                
            })
            .catch((err) => console.error(err));
            
    }
}
getWeatherTable()