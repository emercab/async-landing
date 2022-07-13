const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC1emV4A8liRs9p80CY8ElUQ&part=snippet%2Cid&order=viewCount&maxResults=4';
requestedVideos = document.getElementById("requestedVideos");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c210e9cde9msh742de6061f18da8p18b319jsndf7349a203b9',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// Función que obtiene los datos de la API de YouTube desde rapidapi.com
async function fetchData(urlApi) {
   const response =  await fetch(urlApi, options);
   const data = await response.json();
   return data;
}

// Función que se invoca a sí misma para llamar a la función fetchData y obtener
// los datos de la API
(async () => {
   try {
      // Llamo a la función y obtengo los datos de la API
      const dataVideos = await fetchData(API);
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
      // Uno los array de cada video que devovlió map y obtengo toda la lista de
      // videos listos para mostrar
      const viewFinal = viewVideos.join("");
      
      //Ahora solo cargo los datos en el div de la página
      requestedVideos.innerHTML = viewFinal;
   } catch (error) {
      console.error("Error: " + error);
   }
})();