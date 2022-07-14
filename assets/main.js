// Parámetros para la API de clima
const city = "Valledupar";
const apiWeatherKey = "b9768a7184d6110faf494c9914efc6e6";
const optionWeather = {
   method: 'GET',
}

// Opciones para la API de Youtube
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c210e9cde9msh742de6061f18da8p18b319jsndf7349a203b9',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// Iconos de clima
const weatherIcons = {
   '01d': `<img class="w-16 h-16" src="https://i.postimg.cc/rsfSTMYj/clear-sky-day.png"
               alt="Clear sky">`,
   '01n': `<img class="w-16 h-16" src="https://i.postimg.cc/66cVnf5Z/clear-sky-night.png"
               alt="Clear sky">`,
   '02d': `<img class="w-16 h-16" src="https://i.postimg.cc/4N365HmS/few-clouds-day.png"
               alt="Few clouds">`,
   '02n': `<img class="w-16 h-16" src="https://i.postimg.cc/KvsnscTv/few-clouds-night.png"
               alt="Few clouds">`,
   '03d': `<img class="w-16 h-16" src="https://i.postimg.cc/3JrBcbb9/001-nube.png"
               alt="Cloudy">`,
   '03n': `<img class="w-16 h-16" src="https://i.postimg.cc/3JrBcbb9/001-nube.png"
               alt="Cloudy">`,
   '04d': `<img class="w-16 h-16" src="https://i.postimg.cc/y8kTV3KZ/007-nublado-2.png"
               alt="Very cloudy">`,
   '04n': `<img class="w-16 h-16" src="https://i.postimg.cc/y8kTV3KZ/007-nublado-2.png"
               alt="Very cloudy">`,
   '09d': `<img class="w-16 h-16" src="https://i.postimg.cc/y8kTV3KZ/007-nublado-2.png"
               alt="Shower rain">`,
   '09n': `<img class="w-16 h-16" src="https://i.postimg.cc/y8kTV3KZ/007-nublado-2.png"
               alt="Shower rain">`,
   '10d': `<img class="w-16 h-16" src="https://i.postimg.cc/TYk9Mqzx/003-nublado-1.png"
               alt="Rain">`,
   '10n': `<img class="w-16 h-16" src="https://i.postimg.cc/90mGsr1z/012-noche-1.png"
               alt="Rain">`,
   '11d': `<img class="w-16 h-16" src="https://i.postimg.cc/tTHdtrx3/008-tormenta.png"
               alt="Thunderstorm">`,
   '11n': `<img class="w-16 h-16" src="https://i.postimg.cc/tTHdtrx3/008-tormenta.png"
               alt="Thunderstorm">`,
   '13d': `<img class="w-16 h-16" src="https://i.postimg.cc/0NSdSgb5/009-nevado.png"
               alt="Snow">`,
   '13n': `<img class="w-16 h-16" src="https://i.postimg.cc/0NSdSgb5/009-nevado.png"
               alt="Snow">`,
   '50d': `<img class="w-16 h-16" src="https://i.postimg.cc/3RCXLgXP/011-foog.png"
               alt="Mist">`,
   '50n': `<img class="w-16 h-16" src="https://i.postimg.cc/3RCXLgXP/011-foog.png"
               alt="Mist">`,
};

// URL de las API's usadas
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC1emV4A8liRs9p80CY8ElUQ&part=snippet%2Cid&order=viewCount&maxResults=4';

const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}`;

// Elementos de la página que recibirán los datos requeridos en las API
requestedVideos = document.getElementById("requestedVideos");
temp = document.getElementById("temp");
weather = document.getElementById("weather");
nameCity = document.getElementById("nameCity");
icon = document.getElementById("requestedIcon");

// Función para devolver primera letra de un string a mayúscula
function capitalize(word) {
   const lower = word.toLowerCase();
   return word.charAt(0).toUpperCase() + lower.slice(1);
} 

// Función asincrónica que obtiene los datos de la API que se le pase
async function fetchData(urlApi, options) {
   const response =  await fetch(urlApi, options);
   const data = await response.json();
   return data;
}

// Función que se invoca a sí misma para llamar a la función fetchData y obtener
// los datos de las API
(async () => {
   try {
      // Llamo a la función y obtengo los datos de la API de videos de Youtube
      const dataVideos = await fetchData(API, options);
      // Extraigo el array de los datos de videos devueltos y los transformo con map
      // a la estructura HTML que permitirá mostrarlos en la página
      const viewVideos = dataVideos.items.map(video => {
         return `
            <div class="group relative">
               <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden
                  group-hover:opacity-75 lg:aspect-none">
                  <img src="${video.snippet.thumbnails.high.url}"
                     alt="${video.snippet.description}"
                     class="w-full"
                  >
               </div>
               <div class="mt-4 flex justify-between">
                  <h3 class="text-sm text-gray-700">
                     <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                  </h3>
               </div>
            </div>
         `;
      });
      // Uno los array de cada video que devolvió map y obtengo toda la lista de
      // videos listos para mostrar
      const viewFinal = viewVideos.join("");      
      //Ahora solo cargo los datos en el div de la página
      requestedVideos.innerHTML = viewFinal;

      // Api de clima
      const dataWeather = await fetchData(API_WEATHER, optionWeather);
      const iconWeather = dataWeather.weather[0].icon;
      temp.innerHTML = parseFloat(dataWeather.main.temp).toFixed(1) + "&deg;C";
      weather.innerHTML = capitalize(dataWeather.weather[0].description);
      nameCity.innerHTML = `${dataWeather.name}, ${dataWeather.sys.country}`;
      // Revisamos el icono devuleto para cargar su imagen respectiva en el objeto que creé al inicio
      const myIcon = dataWeather.weather[0].icon;
      console.log("Icon = " + myIcon);
      console.log(weatherIcons);
      console.log(weatherIcons[myIcon]);
      icon.innerHTML = weatherIcons[myIcon];
   } catch (error) {
      console.error("Error: " + error);
   }
})();
