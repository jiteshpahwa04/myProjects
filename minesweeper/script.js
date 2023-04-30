var board = [];
var rows = 8;
var columns = 8;

var  minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

let minescount = 10;

window.onload = function(){
    startgame();
}

function setMines(){
    // minesLocation.push("2-2");
    // minesLocation.push("2-3");
    // minesLocation.push("5-6");
    // minesLocation.push("1-1");
    // minesLocation.push("3-4");

    let minesLeft = minescount;
    while(minesLeft){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);
        let id = r.toString() + "-" + c.toString();

        if(!minesLocation.includes(id)){
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function restart(){
    window.location.reload();
}

function startgame(){
    document.querySelector("#mines-count").innerText = minescount;
    document.querySelector(".flag-btn").addEventListener("click", setFlag);
    document.querySelector(".reload-btn").addEventListener("click", restart);

    setMines();

    // populate the board variable
    for(let i=0;i<rows;i++){
        let row = [];
        for(let j=0;j<columns;j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.addEventListener("click", clickTileHandler)
            document.querySelector("#board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }

}

function setFlag(){

    if(flagEnabled){
        flagEnabled = false;
        document.querySelector(".flag-btn").style.backgroundColor = "lightgray";
    }else{
        flagEnabled = true;
        document.querySelector(".flag-btn").style.backgroundColor = "darkgray";
    }
}

function clickTileHandler(){

    if(gameOver || this.classList.contains("tile-clicked")){
        return;
    }

    let tile = this;
    console.log(tile);
    if(flagEnabled){
        if(tile.innerText === ""){
            tile.innerText = "🚩";
        }else if(tile.innerText == "🚩"){
            tile.innerText = "";
        }
        return;
    }

    if(minesLocation.includes(tile.id)){
        revealMines();
        alert("Game Over !!");
        gameOver = true;
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    checkMines(r,c);

    tile.classList.add("tile-clicked");
}

function revealMines(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let tile = board[i][j];
            if(minesLocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}

function checkMines(r, c){
    
    if((r<0 || r>=rows) || (c<0 || c>=columns)){
        return;
    }
    if(board[r][c].classList.contains("tile-clicked")){
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;
    let cnt = 0;

    cnt += checkTiles(r-1,c-1);
    cnt += checkTiles(r-1,c);
    cnt += checkTiles(r-1,c+1);

    cnt += checkTiles(r,c-1);
    cnt += checkTiles(r,c+1);

    cnt += checkTiles(r+1, c-1);
    cnt += checkTiles(r+1, c);
    cnt += checkTiles(r+1, c+1);

    if(cnt > 0){
        board[r][c].innerText = cnt;
        board[r][c].classList.add("x"+cnt.toString());
    }else{
        checkMines(r-1,c-1);
        checkMines(r-1,c);
        checkMines(r-1,c+1);

        checkMines(r,c-1);
        checkMines(r,c+1);

        checkMines(r+1, c-1);
        checkMines(r+1, c);
        checkMines(r+1, c+1);
    }

    if(tilesClicked == rows*columns - minescount){
        document.querySelector("#mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTiles(r, c){

    if((r<0 || r>=rows) || (c<0 || c>=columns)){
        return 0;
    }

    if(minesLocation.includes(r.toString()+"-"+c.toString())){
        return 1;
    }

    return 0;
}