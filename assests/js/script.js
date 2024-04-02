

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apikey = "ed0ffba1418b5336cc870b5088f7eee2";
const weatherImg = document.querySelector(".weatherImg");
const searchBox = document.querySelector(".search").value;
const searchBtn = document.querySelector(".sbtn");

async function weather_api() {
    try {
        const city = document.getElementById("city_data").value.trim();
        const response = await fetch(`${apiurl}&q=${city}&appid=${apikey}`);

        if(response.status == 404 || city == ""){
            document.querySelector(".weather").style="display:none";
            swal({
                title: "City is not valid",
                text: "Enter the valid city name!!",
                icon: "error",
                button: "Try again !"
              });
            document.querySelector(".error").style="display:block";
        }
        else if(response.status == 200){
            document.querySelector(".weather").style="display:block";
            document.querySelector(".error").style="display:none";
        }
        const data = await response.json();
        console.log(data);
        const city_name = data.name;
        // Array of object methord
        // data is gathered by converting the object into array of keys and store into an array
        const weather_info = Object.keys(data).map((x => data[x]));
        console.log(weather_info);
        const temperature = weather_info[3].temp;
        const humidity = weather_info[3].humidity
        const weather_type = weather_info[1][0].main;
        const wind_speed = weather_info[5].speed;
        console.log("Temperature: " + Math.round(temperature) + " °c");
        console.log("Humidity: " + humidity);
        console.log("Weather: " + weather_type);
       console.log(wind_speed);
       
        document.querySelector(".city").innerHTML = city_name;
        document.querySelector(".temperature").innerHTML = + Math.round(temperature) + " °c";
        document.querySelector(".wind").innerHTML = wind_speed + " Km/hr";
        document.querySelector(".humid").innerHTML = humidity + " %";
        if(weather_type == "Clouds"){
         weatherImg.src="./assests/images/clouds.png";
        }
        else if(weather_type == "Clear"){
         weatherImg.src="./assests/images/clear.png";
        }
        else if(weather_type == "Drizzle"){
            weatherImg.src="./assests/images/drizzle.png";
        }
        else if(weather_type == "Rain"){
            weatherImg.src = "./assests/images/rain.png";
        }
        else if(weather_type  == "Snow"){
            weatherImg.src = "./assests/images/snow.png";
        }
        else if(weather_type  == "Mist"){
            weatherImg.src = "./assests/images/mist.png";
        }
        else if(weather_type == "Haze"){
            weatherImg.src = "./assests/images/haze.jpeg";
        }
    }
    catch (err) {
        console.log(err);
    }

}


searchBox.addEventListener('click',()=>{
    weather_api();
})



