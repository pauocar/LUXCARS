import { API_URL } from './config.js';  // Import the global API_URL

// Display product cars

const displayCars = (cars) => {
    const carsContainer = document.getElementById('getCarsResponse');
    carsContainer.innerHTML = '';

    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('card', 'card-prod');

        const firstImage = car.images.length > 0 ? `${car.images[0]}` : 'https://via.placeholder.com/150';

        carCard.innerHTML = `
            <img src="${firstImage}" alt="${car.make} ${car.model}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${car.make} ${car.model} (${car.year})</h5>
                <p class="card-text">$${car.price}</p>
                <a href="detail.html?id=${car._id}" class="btn btn-outline-primary">Ver luxcar</a>
            </div>
        `;

        carsContainer.appendChild(carCard);
    });
};

// Fetch Cars

const fetchCars = async() => {
    const response = await fetch(`${API_URL}/cars`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (Array.isArray(data)) {
    displayCars(data);
    } else {
    document.getElementById('carsResponse').innerHTML = `<p>${data.message}</p>`;
    }
};

// Call function to load index on page load
window.onload = fetchCars;