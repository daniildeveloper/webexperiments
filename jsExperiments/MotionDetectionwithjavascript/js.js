var constrains = {
    audio: false,
    video: {
        width: 640,
        height: 480
    }
};

function success(stream) {
    var video = document.getElementById("video");
    video.srcObject = stream;
}

function error() {
    
    console.log(error);
}

navigator.mediaDevices.getUsetMedia(constrains)
    .then(success)
    .catch(error);

