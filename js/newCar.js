import { logout } from "./auth.js";
import { API_URL } from "./config.js";

function checkToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html'; // Redirect to login if not authenticated
        return;
    }
}

document.getElementById('carDetails').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Error with token, please relog");
        logout();
        window.location.href = '../index.html';
    }

    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    
    const formData = new FormData();
    formData.append('make', document.getElementById('make').value);
    formData.append('model', document.getElementById('model').value);
    formData.append('year', document.getElementById('year').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);
  
    let allValid = true;
    for (let i = 0; i < 5; i++) {
        const input = document.getElementById(`img-${i}`);
        if (!input.files || input.files.length === 0) {
            allValid = false;
            alert(`File ${i + 1} must not be empty.`);
            break;
        }
        formData.append('images',input.files[0]);
    }
    if (!allValid) {
        return;
    }
    

    console.log(formData);
    try {
        const response = await fetch(`${API_URL}/cars/vendors/cars`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`
            },
            body: formData
        });


        const data = await response.json();
        // displayResponse('offerResponse', data);
        if (data.message === "Car added successfully") {
            if (data?.car?._id == null) {
                alert("Coche creado exitosamente");                
                window.location.href = `./dashboard.html`
            } else {
                window.location.href = `./edit.html?id=${data?.car?._id ?? "1"}`
            }
        } else {
            throw "Wrong response";
        }
    } catch(err) {
        alert("Error creando el coche")
    }
});

document.onload = checkToken;

document.getElementById('logoutBtn').addEventListener('click', logout);