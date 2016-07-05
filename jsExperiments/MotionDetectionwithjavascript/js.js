///TODO: adapter.js


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

var video = document.getElementById("video");

var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
var context = canvas.getContext("2d");

function capture() {
    "use strict";
    context.drawImage(video, 0, 0, 640, 480);
}

setInterval(capture, 100);

function capture() {
    context.drawImage(video, 0, 0, 640, 480);
}

var dataUrl = canvas.toDataURL();

context.globalCompositeOperation = "diffirence";

