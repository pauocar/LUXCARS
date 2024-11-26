import { logout } from './auth.js';
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

const url = window.location.search;
const urlParams = new URLSearchParams(url);
const carId = urlParams.get('id');

const images=[]

// Fetch Details
const fetchDetails = async() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html'; // Redirect to login if not authenticated
        return;
    }

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

        for (let i=0; i < 5; i++) {
            const img = (data.images.length > i ? `${API_URL}/${data.images[i]}` : 'https://via.placeholder.com/150');
            document.getElementById(`img-${i}`).setAttribute("src",img);
            images.push(data.images[i])
        }
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


document.getElementById("delete-car").addEventListener("click", async ()=> {const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Error with authorization")
        return;
    }
    const response = await fetch(`${API_URL}/cars/vendors/cars/${carId}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (response && data.message && data.message === "Car deleted") {        
        window.location.href = './dashboard.html'; // Redirect after deleting car
    } else {        
        alert("Error deleting car" + JSON.stringify(data))
    }
})

document.getElementById("update-btn").addEventListener("click", async ()=> {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Error with authorization")
        return;
    }
    const formData = new FormData();
    formData.append('make', document.getElementById('make').value);
    formData.append('model', document.getElementById('model').value);
    formData.append('year', document.getElementById('year').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);
    for (let i=0; i < 5; i++) {
        const imgInput = document.getElementById(`input-${i}`);
        if (!imgInput.files || imgInput.files.length === 0) {
            formData.append('images', images[i]);
            continue;
        }
        formData.append('images', '<change>')
        formData.append('uploads', imgInput.files[0]);
    }

    const response = await fetch(`${API_URL}/cars/vendors/cars/${carId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    const data = response.json();
    console.log(data);

})


document.getElementById('imgModal').addEventListener('hide.bs.modal', ()=> {
    for (let i = 0; i < 5; i++) {
        const imgInput = document.getElementById(`input-${i}`);
        const imgElement = document.getElementById(`img-${i}`); // Get the corresponding img element
        if (!imgInput.files || imgInput.files.length === 0) {
            imgElement.src = `${API_URL}/${images[i]}`;
            continue; // If no file is selected, exit the loop
        }
        
        const file = imgInput.files[0]; // Get the first file
        
        if (imgElement) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgElement.src = e.target.result; // Set the image src to the file data
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    }
})

document.getElementById('logoutBtn').addEventListener('click', logout);

// Call function to load index on page load
window.onload = fetchDetails;
