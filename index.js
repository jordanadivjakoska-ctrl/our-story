const devojce = document.querySelector(".devojce");
const vtoraStrana = document.querySelector(".vtora-strana");

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        !albumStrana.classList.contains("prikazi")
    ) {

        devojce.classList.add("aktivna");
        vtoraStrana.classList.add("aktivna");

    }

});

const otvoriMenu = document.getElementById("otvoriMenu");
const menuStrana = document.getElementById("menuStrana");

otvoriMenu.addEventListener("click", function() {

    menuStrana.classList.add("otvoreno");

});

/* =====================================
   OUR MEMORIES ALBUM
===================================== */

const slikiKopce = document.getElementById("slikiKopce");
const albumStrana = document.getElementById("albumStrana");

const albumKniga = document.getElementById("albumKniga");
const albumSlika = document.getElementById("albumSlika");
const fotoStrana = document.getElementById("fotoStrana");
const brojSlika = document.getElementById("brojSlika");


const memories = [
    "images/memory1.jpeg",
    "images/memory2.jpeg",
    "images/memory3.jpeg",
    "images/memory4.jpeg",
    "images/memory5.png",
    "images/memory6.jpeg",
    "images/memory7.jpeg",
    "images/memory8.jpeg",
    "images/memory9.jpeg",
    "images/memory10.jpeg",
    "images/memory11.jpeg",
    "images/memory12.jpeg",
    "images/memory13.jpeg",
    "images/memory14.jpeg",
    "images/memory15.jpeg",
    "images/memory16.jpeg",
    "images/memory17.jpeg",
    "images/memory18.jpeg",
    "images/memory19.jpeg",
    "images/memory20.jpeg",
    "images/memory21.jpeg",
    "images/memory22.jpeg",
    "images/memory23.jpeg",
    "images/memory24.jpeg",
    "images/memory25.jpeg",
    "images/memory26.jpeg",
    "images/memory27.jpeg",
    "images/memory28.jpeg",
    "images/memory29.jpeg",
    "images/memory30.jpeg"
];


let albumOtvoren = false;
let momentalnaSlika = 0;


/* KLIK NA SLIKI */

slikiKopce.addEventListener("click", function () {

    menuStrana.classList.remove("otvoreno");

    albumStrana.classList.add("prikazi");

    albumKniga.classList.remove("otvorena");

    albumOtvoren = false;

    momentalnaSlika = 0;

    albumSlika.src = memories[0];

    brojSlika.textContent =
        "01 / " + memories.length;

});


/* ENTER */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {
        return;
    }


    /* AKO ALBUMOT NE E OTVOREN */

    if (
        albumStrana.classList.contains("prikazi")
        && !albumOtvoren
    ) {

        albumKniga.classList.add("otvorena");

        albumOtvoren = true;

        return;
    }


    /* AKO SME VO ALBUMOT */

    if (
        albumStrana.classList.contains("prikazi")
        && albumOtvoren
    ) {

        /* IMA USTE SLIKI */

        if (momentalnaSlika < memories.length - 1) {

            fotoStrana.classList.add("vrti");


            setTimeout(function () {

                momentalnaSlika++;

                albumSlika.src =
                    memories[momentalnaSlika];


                brojSlika.textContent =
                    String(momentalnaSlika + 1)
                        .padStart(2, "0")
                    + " / "
                    + memories.length;

            }, 350);


            setTimeout(function () {

                fotoStrana.classList.remove("vrti");

            }, 750);

        }


        /* POSLEDNA SLIKA */

        else {

            albumStrana.classList.remove("prikazi");

            albumKniga.classList.remove("otvorena");

            menuStrana.classList.add("otvoreno");

            albumOtvoren = false;

            momentalnaSlika = 0;

        }

    }

});

/* =====================================
   VRATI SE NA GLAVNOTO MENI
===================================== */

const params = new URLSearchParams(window.location.search);

if (params.get("menu") === "open") {

    menuStrana.classList.add("otvoreno");

}

/* =========================================
   OUR TIMELINE - SCROLL ANIMATIONS
========================================= */

const timelineSection =
    document.querySelector(".timeline-strana");

const timelineLine =
    document.querySelector(".timeline-line");

const timelineElements =
    document.querySelectorAll(
        ".timeline-moment, " +
        ".years-section, " +
        ".broken-part, " +
        ".continue-part, " +
        ".future-photo, " +
        ".timeline-ending"
    );


/* =========================================
   POJAVUVANJE NA ELEMENTITE
========================================= */

const timelineObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.22
        }

    );


timelineElements.forEach(function(element) {

    timelineObserver.observe(element);

});


/* =========================================
   CRTANJE NA LINIJATA
========================================= */

window.addEventListener("scroll", function() {

    if (!timelineSection || !timelineLine) {
        return;
    }


    const sectionRect =
        timelineSection.getBoundingClientRect();


    const sectionHeight =
        timelineSection.offsetHeight;


    /*
       Kolku sme navlegle
       vo timeline stranata
    */

    let scrolled =
        window.innerHeight - sectionRect.top;


    if (scrolled < 0) {
        scrolled = 0;
    }


    let progress =
        scrolled / sectionHeight;


    if (progress > 1) {
        progress = 1;
    }


    /*
       Linijata raste
       so scrollot
    */

    const lineHeight =
        progress * sectionHeight;


    timelineLine.style.height =
        lineHeight + "px";

});

/* =========================================
   ENTER OD MENITO -> TRETATA STRANA
========================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        menuStrana.classList.contains("otvoreno")
    ) {

        event.preventDefault();

        /* go zatvorame menito */
        menuStrana.classList.remove("otvoreno");

        /* odime do slikata na tretata strana */
        const tretaStrana =
            document.querySelector(".treta-strana");

        tretaStrana.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

});