const page = document.getElementById("chancePage");

const personMe = document.getElementById("personMe");
const personHim = document.getElementById("personHim");

const heartFill = document.getElementById("heartFill");

const spaceArea = document.getElementById("spaceArea");

const finalChance = document.getElementById("finalChance");

const finalHearts =
    document.querySelector(".final-hearts");

const promises =
    document.querySelectorAll(".promise");

const roads =
    document.querySelectorAll(".road");

const brokenHeart =
    document.querySelector(".broken-heart");


let holdingSpace = false;

let progress = 0;

let completed = false;


/* =====================================
   SPACE DOWN
===================================== */

document.addEventListener("keydown", function(event) {

    if (event.code === "Space" && !completed) {

        event.preventDefault();

        holdingSpace = true;

    }


    /* ENTER -> NAZAD */

    if (event.key === "Enter") {

        window.location.href =
            "rade.html?menu=open";

    }

});


/* =====================================
   SPACE UP
===================================== */

document.addEventListener("keyup", function(event) {

    if (event.code === "Space") {

        holdingSpace = false;

    }

});


/* =====================================
   ANIMACIJA
===================================== */

function animationLoop() {

    if (!completed) {

        /*
           AKO GO DRZI SPACE
        */

        if (holdingSpace) {

            progress += 0.6;

        }

        /*
           AKO GO PUSTI SPACE
           SE VRAKJA NAZAD
        */

        else {

            progress -= 0.35;

        }


        if (progress < 0) {
            progress = 0;
        }

        if (progress > 100) {
            progress = 100;
        }


        updateScene();


        if (progress >= 100) {

            finishChance();

        }

    }


    requestAnimationFrame(animationLoop);

}


animationLoop();



/* =====================================
   UPDATE
===================================== */

function updateScene() {

    const value =
        progress / 100;


    /* SRCE */

    heartFill.style.opacity =
        value;

    heartFill.style.transform =
        "translate(-50%, -50%) scale(" +
        (0.2 + value * 0.8) +
        ")";


    /* COVECINJATA SE PRIBLIZUVAAT */

    const mePosition =
        10 + value * 31;

    const himPosition =
        10 + value * 31;


    personMe.style.left =
        mePosition + "%";

    personHim.style.right =
        himPosition + "%";


    /* PATOT SE SPOJUVA */

    const roadWidth =
        43 + value * 7;

    roads.forEach(function(road) {

        road.style.width =
            roadWidth + "%";

    });


    /* SKRSENOTO SRCE OZIVUVA */

    brokenHeart.style.opacity =
        0.55 + value * 0.45;

    brokenHeart.style.transform =
        "scale(" +
        (1 + value * 0.5) +
        ")";

    brokenHeart.style.color =
        progress > 70
            ? "#d46f83"
            : "#9d646e";


    /* =================================
       RECENICI
    ================================= */

    if (progress > 18) {

        promises[0].classList.add("show");

    } else {

        promises[0].classList.remove("show");

    }


    if (progress > 38) {

        promises[1].classList.add("show");

    } else {

        promises[1].classList.remove("show");

    }


    if (progress > 58) {

        promises[2].classList.add("show");

    } else {

        promises[2].classList.remove("show");

    }


    if (progress > 78) {

        promises[3].classList.add("show");

    } else {

        promises[3].classList.remove("show");

    }

}



/* =====================================
   KRAJ
===================================== */

function finishChance() {

    completed = true;

    page.classList.add("completed");


    /*
       GI SPOJUVAME
    */

    personMe.style.left = "44%";

    personHim.style.right = "44%";


    personMe.classList.add("hugging");

    personHim.classList.add("hugging");


    brokenHeart.innerHTML = "♥";

    brokenHeart.style.color = "#d86f83";


    /*
       SRCA
    */

    setTimeout(function() {

        finalHearts.classList.add("show");

    }, 400);


    /*
       FINALNA PORAKA
    */

    setTimeout(function() {

        finalChance.classList.add("show");

    }, 1300);

}