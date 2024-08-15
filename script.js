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
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data)

    console.log(raw);
    
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    // fetch("https://dolphin-app-3a4jj.ondigitalocean.app/predict", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => {
    //         // Display response in overlay
    //         document.getElementById('responseText').innerText = result.value;
    //         document.getElementById('overlay').style.display = 'flex';
    //     })
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));

    fetch("https://dolphin-app-3a4jj.ondigitalocean.app/predict", requestOptions)
        .then((response) => response.json())  // Parse response as JSON
        .then((result) => {
        // Check the prediction value and set the response text
        if (result.prediction === 0) {
            document.getElementById('responseText').innerText = 'Non Diabetic';
        } else if (result.prediction === 1) {
            document.getElementById('responseText').innerText = 'Potentially Diabetic or Pre Diabetic';
        }
        
        // Display the overlay
        document.getElementById('overlay').style.display = 'flex';
    })
    //   .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

