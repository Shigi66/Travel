function buscar() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // limpia resultados previos
  
    fetch("travel_recommendation_api.json")
      .then(response => response.json())
      .then(data => {
       let resultados = [];
  
      
      data.countries.forEach(country => { // busca paises y ciudades
        if (country.name.toLowerCase().includes(input)) {
           resultados.push({
           name: country.name,
           description: `Descubre las ciudades de ${country.name}.`,
             
            });
          }
          country.cities.forEach(city => {
           if (city.name.toLowerCase().includes(input)|| input === "ciudades") {
           resultados.push(city);
            }
          });
        });
  
       // busca en templos
        if (input === "templo" || input === "templos") {
        data.temples.forEach(temple => resultados.push(temple));
        } else {
        // busca por nombre
        data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input)) {
         resultados.push(temple);
         }
       }); 
       }

       // busca en playas
      if (input === "playa" || input === "playas") {
      // muestra todas las playas
      data.beaches.forEach(beach => resultados.push(beach));
       } else {
      // busca por nombre
      data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(input)) {
       resultados.push(beach);
      }
    });
   }

     // resultados
      if (resultados.length > 0) {
      resultados.forEach(item => {
      const resultItem = document.createElement("div"); 
      resultItem.innerHTML = `
      <strong>${item.name}</strong><br>
       <p>${item.description}</p>
       <img src="img/${item.imageUrl}" alt="${item.name}" class="result-image">
      `;
 
        resultsContainer.appendChild(resultItem);
    });
        } else {
        resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
     }
    })
       .catch(error => console.error("Error cargando JSON:", error));
     }
  
     // Restablecer busqueda
     function limpiar() {
      document.getElementById("searchInput").value = "";
      document.getElementById("results").innerHTML = "";
  }
  