const heart = document.getElementById("heart");
const track = document.querySelector(".heart-track");
const envelope = document.querySelector(".envelope");

let dragging = false;
let startMouseX = 0;
let startHeartX = 0;
let currentX = 0;

heart.addEventListener("mousedown", function (event) {
    dragging = true;

    startMouseX = event.clientX;
    startHeartX = currentX;

    heart.style.cursor = "grabbing";

    event.preventDefault();
});

document.addEventListener("mousemove", function (event) {

    if (!dragging) {
        return;
    }

    const difference = event.clientX - startMouseX;

    let newX = startHeartX + difference;

    const maxX = track.clientWidth - heart.clientWidth + 10;

    if (newX < 0) {
        newX = 0;
    }

    if (newX > maxX) {
        newX = maxX;
    }

    currentX = newX;

    heart.style.left = currentX + "px";

    // Ako srceto e skoro do krajot
    if (currentX >= maxX * 0.9) {
        openEnvelope();
    }
});

document.addEventListener("mouseup", function () {

    if (!dragging) {
        return;
    }

    dragging = false;
    heart.style.cursor = "grab";
});


function openEnvelope() {

    dragging = false;

    // srceto odi tocno do kraj
    const maxX = track.clientWidth - heart.clientWidth + 10;

    currentX = maxX;
    heart.style.left = maxX + "px";

    // go oznacuvame plikoto kako otvoren
    envelope.classList.add("opened");

    // poveke ne moze da se vlece
    heart.style.pointerEvents = "none";
}
document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        window.location.href = "rade.html?menu=open";
    }

});