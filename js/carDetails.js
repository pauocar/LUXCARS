import { API_URL } from './config.js';  // Import the global API_URL

// Display car Details



// Show Images
function displayImage (data){

    const mostrarImagenes = (data) => {
        const imageContent= document.getElementById('displayImages');
        imageContent.innerHTML = '';

        data.forEach(element => {
            const firstImage = element.images.length > 0 ? `${element.images[0]}` : 'https://via.placeholder.com/150';
    
            imagenes.innerHTML = `<img
                src="${firstImage}"
                alt="${car.make}"
                class="img-fluid"
            />`;
            
            return imageContent.appendChild(imagenes);
        });
    };

};


// Fetch Details
const fetchDetails = async() => {

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const carId = urlParams.get('id');
    // console.log(carId);

    const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log(data);
    if (response) {

        const firstImage = data.images.length > 0 ? `${API_URL}/${data.images[0]}` : 'https://via.placeholder.com/150';
        const secondImage = data.images.length > 0 ? `${API_URL}/${data.images[1]}` : 'https://via.placeholder.com/150';
        const thirdImage = data.images.length > 0 ? `${API_URL}/${data.images[2]}` : 'https://via.placeholder.com/150';
        const fourthImage = data.images.length > 0 ? `${API_URL}/${data.images[3]}` : 'https://via.placeholder.com/150';
        const fifthImage = data.images.length > 0 ? `${API_URL}/${data.images[4]}` : 'https://via.placeholder.com/150';

        document.getElementById('displayImages').innerHTML = `
        
        <div class="row">
        <!-- Sección Izquierda - Imagen Principal -->
        <div class="col-lg-6 main-image">
          <img
            src="${firstImage}"
            alt="${data.make}"
            class="img-fluid"
          />
        </div>
        <!-- Sección Derecha - Galería de Imágenes -->
        <div class="col-lg-6">
          <div class="row">
            <!-- Sección Superior - Dos Imágenes -->
            <div class="col-6 sub-image">
              <img
                src="${secondImage}"
                alt="${data.make}"
                class="img-fluid"
              />
            </div>
            <div class="col-6 sub-image">
              <img
                src="${thirdImage}"
                alt="${data.make}"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="row">
            <!-- Sección Inferior - Dos Imágenes -->
            <div class="col-6 sub-image">
              <img
                src="${fourthImage}"
                alt="${data.make}"
                class="img-fluid"
              />
            </div>
            <div class="col-6 sub-image">
              <img
                src="${fifthImage}"
                alt="${data.make}"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
            `;

        document.getElementById('datosAuto').innerHTML = `
        <!-- Primera Sección: Modelo y Precio -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="h6">2024${data.make} ${data.model}</h3>
            <!-- Cambia esto al modelo real -->
            <h3 class="h5">$${data.price}</h3>
            <!-- Cambia esto al precio real -->
          </div>
          <hr />
          <!-- Segunda Sección: Año, Kilometraje, Motor, Tipo de Combustible -->
          <div class="row mb-4">
            <div class="col">
              <h6>${data.make}</h6>
              <p>Marca</p>
            </div>
            <div class="col">
              <h6>${data.year}</h6>
              <p>Año</p>
            </div>
            <!--<div class="col">
              <h6>1213 km</h6>
              <p>Kilometraje</p>
            </div>
            <div class="col">
              <h6>Plano, TX, United States</h6>
              <p>Ubicación</p>
            </div>-->
          </div>
          <hr />
          <!-- Tercera Sección: Descripción -->
          <div class="mb-4">
            <h6>Sobre el auto</h6>
            <p>
                ${data.description}
            </p>
          </div>
        `;
    } else {
        document.getElementById('displayImages').innerHTML = `<p>${data.message}</p>`;
    }
};

// Call function to load index on page load
window.onload = fetchDetails;