// var track = document.getElementByID("track");
// var video = document.getElementByID("video");

track.addEventListener("load", function () {
  var c = video.textTracks[0].cues;

  for (var i = 0; i < c.length; i++) {
    var s = document.createElement("span");
    s.innerHTML = c[i].text;
    s.setAttribute("data-start", c[i].startTime);
    s.addEventListener("click", seek);
    controllbar.appendChild(s);
  }
});

function seek() {
  video.currentTime = this.getAttribute('data-start');
  if (video.paused) {
    video.play();
  }
}