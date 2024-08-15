document.getElementById('diabetesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('overlay').style.display = 'flex';

    logSelectedValues();
});

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

function logSelectedValues() {
    let form = document.getElementById('diabetesForm');
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
        if (isNumeric(value)) {
            data[key] = parseInt(value, 10);
        } else {
            data[key] = value;
        }
    });

    console.log(data)   
    // console.log("Selected values:");
    // for (let key in data) {
    //     console.log(`${key}: ${data[key]}`);
    // }
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

// function logSelectedValues() {
//     let form = document.getElementById('diabetesForm');
//     let formData = new FormData(form);
//     let data = {};
//     formData.forEach((value, key) => data[key] = value);

//     console.log(data);
//     // for (let key in data) {
//     //     console.log(`${key}: ${data[key]}`);
//     // }
// }

// document.getElementById('diabetesForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Collecting form data
//     let formData = new FormData(event.target);
//     let data = {};
//     formData.forEach((value, key) => data[key] = value);

//     // Call API (assuming a POST request)
//     fetch('YOUR_API_ENDPOINT', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Display response in overlay
//         document.getElementById('responseText').innerText = data.message;
//         document.getElementById('overlay').style.display = 'flex';
//     })
//     .catch(error => console.error('Error:', error));
// });

// function closeOverlay() {
//     document.getElementById('overlay').style.display = 'none';
// }
