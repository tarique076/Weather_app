// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 2da8712c74522b83fb219d4fe93f361e

window.addEventListener('load', function(){
    navigator.geolocation.getCurrentPosition(success);

    function success(pos){

        let crd=pos.coords;
        console.log(crd);
        getWeatherbyLoc(crd);
    }
})

async function getWeatherbyLoc(crd){
    try{
        // let city = document.querySelector("#city").value
        let lat=crd.latitude;
        let lon=crd.longitude;
        let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)

        let data= await res.json();
        console.log(data);
        appendData(data)
    }catch(err){
        console.log('err:', err);
    }
}

let key='2da8712c74522b83fb219d4fe93f361e'
let con=document.querySelector("#container");
let map=document.querySelector('#gmap_canvas');

async function getWeather(){
    try{
        let city = document.querySelector("#city").value

        let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)

        let data= await res.json();
        console.log(data);
        appendData(data)
    }catch(err){
        console.log('err:', err);
    }
}

function appendData(data){

    container.innerHTML=null;

    let name=document.createElement('p')
    name.setAttribute('id','name')
    name.innerText=`${data.name}`

    let temp=document.createElement('p');
    temp.setAttribute('id','temp');
    temp.innerText=`☁  ${data.main.temp} °C`

    let temp_feel=document.createElement('p');
    temp_feel.setAttribute('id','feel')
    temp_feel.innerText=`Feels like ${data.main.feels_like}°C`

    let wind=document.createElement('p');
    wind.innerText=`Wind:- ${data.wind.speed} m/s`;

    let humidity=document.createElement('p');
    humidity.innerText=`Humidity:- ${data.main.humidity}%`

    let pressure=document.createElement('p');
    pressure.innerText=`Pressure:- ${data.main.pressure}hPa`

    container.append(name,temp,temp_feel,wind,humidity,pressure);
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}

async function getWeekly(){
    try{
        let city = document.querySelector("#city").value

        let res= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2da8712c74522b83fb219d4fe93f361e&units=metric&`)

        let data= await res.json();
        console.log(data);
        weeklyForecast(data);
        

    }catch(err){
        console.log('err:', err);
    }
}

function weeklyForecast(data){
    let container_div = document.getElementById("weekly");

    for(let i=0; i<data.list.length; i+=8){
        let div1=document.createElement('div');

        let date=document.createElement('h3');
        date.innerText=data.list[i].dt_txt.substr(0,10);

        let cli_sym=document.createElement('h3');
        cli_sym.innerText="⛅"

        let min=document.createElement('h3');
        min.innerText=data.list[i+6].main.temp_min;

        let max=document.createElement('h3');
        max.innerText=data.list[i].main.temp_max;

        let close=document.createElement('div');
        close.innerText='X'
        close.setAttribute('id', 'close');
        close.addEventListener('click',function(){
            let container_div = document.getElementById("weekly");
            container_div.innerHTML=null;
            container_div.style.visibility='hidden';
        })

        // console.log(min,max);
        
        div1.append(date,cli_sym,min,max);
        container_div.append(div1,close);
    }
    container_div.style.visibility='visible';
}
