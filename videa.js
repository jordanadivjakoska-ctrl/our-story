const player = document.getElementById("player");
const ratko = document.getElementById("ratko");

const obstacles = document.querySelectorAll(".obstacle");

const hearts = document.getElementById("hearts");
const winMessage = document.getElementById("winMessage");


let playerX = window.innerWidth * 0.04;

let playerY = 0;

let velocityY = 0;

let jumping = false;

let gameFinished = false;


/* ==============================
   DVIZENJE
============================== */

document.addEventListener("keydown", function (event) {

    if (gameFinished) {
        return;
    }


    /* DESNO */

    if (event.key === "ArrowRight") {

        event.preventDefault();

        playerX += 12;

        checkObstacle();

        player.style.left = playerX + "px";
    }


    /* SKOK */

    if (event.key === "ArrowUp" && !jumping) {

        event.preventDefault();

        velocityY = 18;

        jumping = true;
    }

});


/* ==============================
   GRAVITACIJA + STOENJE NA PRECKI
============================== */

function gameLoop() {

    if (!gameFinished) {

        if (jumping) {

            playerY += velocityY;
            velocityY -= 1;

            let landedOnObstacle = false;

            const playerRect =
                player.getBoundingClientRect();


            obstacles.forEach(function (obstacle) {

                const obstacleRect =
                    obstacle.getBoundingClientRect();


                const horizontalCollision =
                    playerRect.right > obstacleRect.left + 10 &&
                    playerRect.left < obstacleRect.right - 10;


                /* AKO PAGJAME NADOLU */

                if (
                    horizontalCollision &&
                    velocityY <= 0
                ) {

                    const groundY =
                        window.innerHeight - 78;

                    const obstacleHeight =
                        obstacleRect.height;

                    const topOfObstacle =
                        obstacleHeight;


                    /*
                       Ako nozete se blisku
                       do vrvot na preckata
                    */

                    if (
                        playerY <= topOfObstacle + 15 &&
                        playerY >= topOfObstacle - 20
                    ) {

                        playerY = topOfObstacle;

                        velocityY = 0;

                        jumping = false;

                        landedOnObstacle = true;
                    }

                }

            });


            /* AKO NE SME NA PRECKA */

            if (!landedOnObstacle && playerY <= 0) {

                playerY = 0;

                velocityY = 0;

                jumping = false;
            }


            player.style.bottom =
                (78 + playerY) + "px";
        }


        checkStandingOnObstacle();

        checkWin();
    }


    requestAnimationFrame(gameLoop);
}


gameLoop();



/* ==============================
   PROVERKA DALI STOIME NA PRECKA
============================== */

function checkStandingOnObstacle() {

    if (jumping) {
        return;
    }


    let standing = false;

    const playerRect =
        player.getBoundingClientRect();


    obstacles.forEach(function (obstacle) {

        const obstacleRect =
            obstacle.getBoundingClientRect();


        const horizontalCollision =
            playerRect.right > obstacleRect.left + 10 &&
            playerRect.left < obstacleRect.right - 10;


        const obstacleHeight =
            obstacleRect.height;


        if (
            horizontalCollision &&
            Math.abs(playerY - obstacleHeight) < 10
        ) {

            playerY = obstacleHeight;

            standing = true;

        }

    });


    /*
       Ako sme izlezeni od rabot
       na preckata -> pagjame
    */

    if (!standing && playerY > 0) {

        jumping = true;

        velocityY = 0;

    }

}


/* ==============================
   PRECKI
============================== */

function checkObstacle() {

    const playerRect =
        player.getBoundingClientRect();


    obstacles.forEach(function (obstacle) {

        const obstacleRect =
            obstacle.getBoundingClientRect();


        const horizontalCollision =
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right;


        const playerFeet =
            playerRect.bottom;


        const obstacleTop =
            obstacleRect.top;


        if (
            horizontalCollision &&
            playerFeet > obstacleTop
        ) {

            playerX -= 12;
        }

    });

}


/* ==============================
   KRAJ
============================== */

function checkWin() {

    const playerRect =
        player.getBoundingClientRect();

    const ratkoRect =
        ratko.getBoundingClientRect();


    if (
        playerRect.right >=
        ratkoRect.left + 15
    ) {

        finishGame();
    }

}


/* ==============================
   GUSKANJE
============================== */

function finishGame() {

    gameFinished = true;


    const ratkoRect =
        ratko.getBoundingClientRect();


    playerX =
        ratkoRect.left - 65;


    player.style.left =
        playerX + "px";


    player.classList.add("hugging");

    ratko.classList.add("hugging");


    hearts.style.display = "block";


    setTimeout(function () {

        winMessage.classList.add("show");

    }, 600);

}

/* ENTER -> NAZAD NA TRETATA STRANA */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        window.location.href = "rade.html?menu=open";
    }

});