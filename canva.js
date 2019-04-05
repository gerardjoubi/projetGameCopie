/////////////////////////////Begin/////////////////
////////////////////Pay coin///////////////
var pieceMoney = 0;
function setPiece() {

    const credit = Number(prompt("PUT one coin to play the Game"));
    pieceMoney += credit;
    if (pieceMoney >= 1) {
       var player = document.querySelector("#audioPlayer");
        startGame()
     
         player.play()
    } else {
        console.log("bug", pieceMoney);
    }
}


document.body.onload = function() {
    document.getElementById("insert_coins").onclick = setPiece;
}
var gameImg = new component();
gameImg.src = "./images/space.jpg"



///////////////////// init important vars ///////////////////
var myObstacles = [];
myGamePiece = new component(25, 9, gameImg, 19, 50);//rectangle
myGamePiece.gravity = 0.05;
myScore = new component("15px", "Consolas", "#e6ff06", 320, 35, "text");//score
const shipTest = new ShipComponent(60, 60, "./images/spaceShip.gif", 0, 0);
shipTest.gravity = 0.05;
// console.log("testShipConstruct", shipTest)
///////////////////////////Game Area////////////
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 540;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("board").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
///////////////////////////Game Area////////////////////
//////////////////////////Space Ship//////////////////////
function spaceShip(x, y, width, height) {
    console.log("hello from spaceship");
    const shipImg = new Image();
    shipImg.src = "./images/spaceShip.gif";
    ctx.drawImage(shipImg, x, y, width, height);
}
//////////////////////:Space Ship Component://///////////////
function ShipComponent(width, height, img, x, y) {
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.img = new Image();
    this.img.src = img;

    this.update = function () {
        //  console.log("ship is updated", this)
        ctx = myGameArea.context;
        ctx.fillStyle = img;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
}
////////////////////////////Rectangle Component///////////////////
function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ///////////////////////////////////
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        ///////////////////////////Colusion  explosion//////////////
        if (crash) {
            
            console.log("crach booo");
            theCanvas2 = document.getElementById("example2");
            const fireballImg = new Image();
            fireballImg.src = "./images/giphy.gif";
            ctx.drawImage(fireballImg, 0, -10, 535, 540);
            clearInterval(this.updateGameArea);
            setTimeout(function() {
                document.location.reload(true)
            }, 1500)
            
            // let player = document.querySelector("#sound_explosion");

            // player.onload = function() {
            //     console.log("loaded");
            //     player.play();
            // }
        }

        return crash;
    }
}
/////////////////////Rectangle Component////////////////////////////
//////////////////////Update Game Area ///////////////////////////

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(5, height, "#00ffc8", x, 0));//obstacle up 
        myObstacles.push(new component(5, x - height - gap, "#00ffc8", x, height + gap));//obstacle down
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    shipTest.newPos();
    shipTest.update();
}
///////////////////////////////////// update Game Area ///////////////
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
    shipTest.gravity = n;
}

function startGame() {
    myGameArea.start();
}


// function restart() {
//     startGame;
// }


