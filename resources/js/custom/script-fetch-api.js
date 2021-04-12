const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);

function fetchImage() {
    fetch('resources/image/progressive-web-app.jpg')
        .then(validateResponse)
        .then(readResponseAsBlob)
        .then(showImage)
        .catch(logError);
}

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function readResponseAsBlob(response) {
    return response.blob();
}

function showImage(responseAsBlob) {
    const container = document.getElementById('img-container');
    const imgElem = document.createElement('img');
    container.appendChild(imgElem);
    const imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
}

function logError(error) {
    console.log('Looks like there was an issue:', error);
}