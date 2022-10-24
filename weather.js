// Створюємо HTML елементи для сторінки та масив з містами
const select = document.createElement('select');
const listCity = ['Kyiv','Dnipro', 'Lviv'];
const listSelects = [];
  

select.id = `select_${listSelects.length}`;
select.name = `selectName`;
document.querySelector('.container').append(select);

for (let i = 0; i < listCity.length; i++) {
    const option = document.createElement("option");
    option.value = listCity[i];
    option.text = listCity[i];
    select.add(option);
}

select.classList.add('selectCity');
let sel = document.querySelector('.selectCity').value;

getWeather(sel);


function changeSel(){
    sel = document.querySelector('.selectCity').value;
    getWeather(sel);
}

document.querySelector('.selectCity').onchange = changeSel;


const p1 = document.createElement('p');
p1.classList.add('temperature');
document.querySelector('.container').append(p1);

document.querySelector('.container').append(document.createElement('hr'));

const p2 = document.createElement('p');
p2.classList.add('clouds');
document.querySelector('.container').append(p2);

document.querySelector('.container').append(document.createElement('hr'));

const p3 = document.createElement('p');
p3.classList.add('air');
document.querySelector('.container').append(p3);

// Отримуємо інформацію про погоду через API
function getWeather(resCity){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${resCity}&appid=70e1ed322b02acbc57d443dd91065f3e`)
    .then(function (resp) { 
        return resp.json() })
    .then(function (data) {
        showWeather(data);
        
    })
    .catch(function () {
        // catch any errors
    });
   
}


// Виводимо інформацію про погоду на сторінку
function showWeather(weatherInfo){
    document.querySelector('.temperature').innerHTML = Math.round(weatherInfo.main.temp - 273) + '&deg;';
    document.querySelector('.clouds').innerHTML = weatherInfo.weather[0]['description'];
    document.querySelector('.clouds').innerHTML += `<img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0]['icon']}@2x.png">`;
    document.querySelector('.air').innerHTML ='<br>Напрям вітру в градусах:' + weatherInfo.wind['deg'] + '<br>' +'Швидкість вітру м/с:' + weatherInfo.wind.speed + '<br>';
    document.querySelector('.air').innerHTML += 'Тиск повітря в гПа:' + weatherInfo.main.pressure;
}
