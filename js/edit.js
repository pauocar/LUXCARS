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
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html'; // Redirect to login if not authenticated
        return;
    }

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const carId = urlParams.get('id');
    if (carId==null) {
        console.log("NO ID");
        return;
    }
    document.getElementById("id-tag").innerText = carId;
    // console.log(carId);

    const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();
    const table = document.getElementById("table-body");

    if (response) {

        const firstImage = data.images.length > 0 ? `${API_URL}/${data.images[0]}` : 'https://via.placeholder.com/150';
        const secondImage = data.images.length > 0 ? `${API_URL}/${data.images[1]}` : 'https://via.placeholder.com/150';
        const thirdImage = data.images.length > 0 ? `${API_URL}/${data.images[2]}` : 'https://via.placeholder.com/150';
        const fourthImage = data.images.length > 0 ? `${API_URL}/${data.images[3]}` : 'https://via.placeholder.com/150';
        const fifthImage = data.images.length > 0 ? `${API_URL}/${data.images[4]}` : 'https://via.placeholder.com/150';
        document.getElementById('img-0').setAttribute("src",firstImage);
        document.getElementById('img-1').setAttribute("src",secondImage);
        document.getElementById('img-2').setAttribute("src",thirdImage);
        document.getElementById('img-3').setAttribute("src",fourthImage);
        document.getElementById('img-4').setAttribute("src",fifthImage);
        document.getElementById('make').value = data.make;
        document.getElementById('model').value = data.model;
        document.getElementById('year').value = data.year;
        document.getElementById('price').value = data.price;
        document.getElementById('description').value = data.description;
        
        
    } else {
        document.getElementById('displayImages').innerHTML = `<p>${data.message}</p>`;
        return;
    }
    
    table.innerHTML = ""
    const offerResponse = await fetch(`${API_URL}/cars/vendors/cars/${carId}/offers`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
    });
    
    const offers = await offerResponse.json();
    if (offerResponse) {
        console.log(offers)
        for (const offer of offers) {
            const offerRow = document.createElement('tr');
            offerRow.innerHTML = `
                <td>${offer.email}</td>
                <td>${offer.message}</td>
            `;

            table.appendChild(offerRow)

        }
    } else {
        document.getElementById('displayImages').innerHTML = `<p>${data.message}</p>`;
        return;
    }
};


// Call function to load index on page load
window.onload = fetchDetails;
