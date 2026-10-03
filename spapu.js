const secretButton = document.getElementById("secretButton");
const finalMessage = document.getElementById("finalMessage");

const cards = document.querySelectorAll(".card");
const spapuPhoto = document.querySelector(".spapu-photo");
const title = document.querySelector(".title");
const spapuPage = document.querySelector(".spapu-page");

let secretOpened = false;


secretButton.addEventListener("click", function () {

    if (secretOpened) {
        return;
    }

    secretOpened = true;


    /* KARTICKITE ISCEZNUVAAT EDNA PO EDNA */

    cards.forEach(function (card, index) {

        setTimeout(function () {
            card.classList.add("fly-away");
        }, index * 150);

    });


    /* NASLOVOT ISCEZNUVA */

    setTimeout(function () {
        title.classList.add("hide-title");
    }, 500);


    /* KOPCETO ISCEZNUVA */

    setTimeout(function () {
        secretButton.classList.add("hide-button");
    }, 700);


    /* SLIKATA ODI VO SREDINA */

    setTimeout(function () {
        spapuPhoto.classList.add("final-photo");
        spapuPage.classList.add("final-mode");
    }, 1100);


    /* PORAKATA SE POJAVUVA */

    setTimeout(function () {
        finalMessage.classList.add("show-message");
    }, 1900);

});

/* ENTER -> NAZAD NA TRETATA STRANA */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        window.location.href = "rade.html?menu=open";
    }

});