// app.js

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission to server

    const driverName = document.getElementById('driverName').value;
    const recordDetails = document.getElementById('recordDetails').value;

    // For the sake of this example, we'll just log the input. In a real app, you might send this data to a server.
    console.log("Driver's Name:", driverName);
    console.log("Record Details:", recordDetails);

    alert("Record submitted successfully!");
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve({ latitude: lat, longitude: lon });
                },
                () => {
                    reject('Unable to retrieve your location');
                }
            );
        }
    });
}

module.exports = { handleSubmit, getLocation };
