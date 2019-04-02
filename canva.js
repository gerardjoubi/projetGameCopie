

/////
var body = document.getElementById("boddy");

var myGamePiece;
var myObstacles = [];
var myScore;
var bqckground = document.getElementsByTagName("canvas");
console.log(bqckground)
body.onload = startGame;

function spaceShip () {
    console.log("hello from spaceship");
    
    const theCanvas2 = document.getElementById("example2");
    const shipImg = new Image();
    shipImg.src = "./images/spaceShip.gif";
    
    ctx.drawImage(shipImg, 0, 120, 120, 120);
} 

function startGame() {
    /////

    var celineImg = new Image();
    //celineImg.src = "spaceShip.gif";
    // celineImg.onload = function () {
    //     console.log("in start", celineImg)
    //     //drawCeline();
    // };

    // var celine = {
    //     x: 10,
    //     y: 45,
    //     width: 10,
    //     height: 100,
    //     isCrashed: false
    // };

    // function make_base() {
    //     ctx.drawImage(celineImg, celine.x, celine.y, celine.width, celine.height);
    // }
 
    



//     myGamePiece = new Image(gameImg, 10, 25,  10, 120);//rectangle
//     myGamePiece.gravity = 0.05;
//     myScore = new component("20px", "Consolas", "#d3d3d3", 350, 35, "text");//score
     myGameArea.start();
}

var gameImg = new component();
gameImg.src = "./images/space.jpg"
//////
// myGamePiece = new component(10, 25, "red", 10, 120);//rectangle
myGamePiece = new component(10, 25, gameImg, 10, 160);//rectangle
myGamePiece.gravity = 0.05;
myScore = new component("15px", "Consolas", "#d3d3d3", 320, 35, "text");//score
// myGameArea.start();

//}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

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
           spaceShip()

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
        if (crash) {
            console.log("crach booo");
        ///////////////////////////explosion//////
       
        const theCanvas2 = document.getElementById("example2");
        const fireballImg = new Image();
        fireballImg.src = "./images/giphy.gif";
        
       
        ctx.drawImage(fireballImg, 0, -10, 475, 300);
            


        /////////////////////////////
        }
        return crash;
    }
}

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
        myObstacles.push(new component(05, height, "#00ffc8", x, 0));//obstacle up 
        myObstacles.push(new component(05, x - height - gap, "#00ffc8", x, height + gap));//obstacle down
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
