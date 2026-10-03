const photos = document.querySelectorAll(".photo");

photos.forEach(function (photo) {

    photo.addEventListener("click", function () {

        // Ako slikata e otvorena -> zatvori ja
        if (photo.classList.contains("opened")) {

            photo.classList.add("closing");

            setTimeout(function () {
                photo.classList.remove("opened");
                photo.classList.remove("closing");
            }, 1000);

            return;
        }

        // Ako ne e otvorena -> zavrti ja
        photo.classList.add("spinning");

        setTimeout(function () {

            photo.classList.remove("spinning");
            photo.classList.add("opened");

        }, 1000);

    });

});

/* ENTER -> NAZAD NA MENITO */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        window.location.href = "rade.html?menu=open";
    }

});