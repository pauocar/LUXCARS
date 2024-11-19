import { API_URL } from './config.js';  // Import the global API_URL

// Display car Details

const displayCars = (cars) => {
    const carsImages = document.getElementById('displayImages');
    carsImages.innerHTML = '';

    cars.foreach(car => {

        const carDetailsImg = document.createElement('div');
        carDetailsImg.classList.add('row');

        const firstImage = car.images.length > 0 ? `${API_URL}/${car.images[0]}` : 'https://via.placeholder.com/150';
        const secondImage = car.images.length > 0 ? `${API_URL}/${car.images[1]}` : 'https://via.placeholder.com/150';
        const thirdImage = car.images.length > 0 ? `${API_URL}/${car.images[2]}` : 'https://via.placeholder.com/150';
        const fourthImage = car.images.length > 0 ? `${API_URL}/${car.images[3]}` : 'https://via.placeholder.com/150';
        const fifthImage = car.images.length > 0 ? `${API_URL}/${car.images[4]}` : 'https://via.placeholder.com/150';

        carDetailsImg.innerHTML = `
            
            <!-- Sección Izquierda - Imagen Principal -->
            <div class="col-lg-6 main-image">
            <img
                src="${firstImage}"
                alt="${car.make}"
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
                    alt="${car.make}"
                    class="img-fluid"
                />
                </div>
                <div class="col-6 sub-image">
                <img
                    src="${thirdImage}"
                    alt="${car.make}"
                    class="img-fluid"
                />
                </div>
            </div>
            <div class="row">
                <!-- Sección Inferior - Dos Imágenes -->
                <div class="col-6 sub-image">
                <img
                    src="${fourthImage}"
                    alt="${car.make}"
                    class="img-fluid"
                />
                </div>
                <div class="col-6 sub-image">
                <img
                    src="${fifthImage}"
                    alt="${car.make}"
                    class="img-fluid"
                />
                </div>
            </div>
            </div>
           
        `;

        carsImages.appendChild(carDetailsImg);

    });

};

// Fetch Details

const fetchDetails = async() => {
    const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (Array.isArray(data)) {
    displayCars(data);
    } else {
    document.getElementById('displayImages').innerHTML = `<p>${data.message}</p>`;
    }
};

// Call function to load index on page load
window.onload = fetchDetails;