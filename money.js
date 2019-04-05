var body = document.getElementById("moneyInput");
function money() {
    
    var pieceMoney = prompt("PUT one coin to play the Game");
    console.log(pieceMoney);

    if (pieceMoney == 1) {
        console.log("hhhhhhh");
        document.getElementById("onePiece").src = "./images/piece.gif"
    }
}
