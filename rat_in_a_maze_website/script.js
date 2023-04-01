const board = document.querySelector(".container");

let blockArr = [
    [1,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,1]
];
let idArr = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24]
]
function updateArray(index){
    let cnt = 0;
    console.log(index);
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(cnt === index){
                blockArr[i][j] = blockArr[i][j]=== 1 ? 0 : 1;
                console.log(blockArr);
            }
            cnt = cnt + 1;
        }
    }
}

function upadtePath(event){
    let index = event.target.id;
    const pathBlock = document.getElementById(index);
    pathBlock.classList.toggle("path");
    updateArray(parseInt(index));
}


function spawnBoard(){
    let index = 0;
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            const newBlock = document.createElement("div");
            newBlock.classList.add("block");
            newBlock.id = index;
            // console.log(newBlock);
            newBlock.addEventListener('click',upadtePath);
            board.appendChild(newBlock);
            index = index + 1;
        }
    }
    let start = document.getElementById("0");
    let end = document.getElementById("24");
    start.classList.add("initialBlock");
    end.classList.add("initialBlock");
    start.removeEventListener('click', upadtePath);
    end.removeEventListener('click', upadtePath);
}
spawnBoard();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

dx = [1, 0, 0, -1];
dy = [0, -1, 1, 0];
direction = ['D', 'L', 'R', 'U'];

function isSafe(i, j, row, col, arr, visited){
    if( ((i>=0 && i<row) && (j>=0 && j<col)) &&
        (arr[i][j]==1) && (visited[i][j]==false) )
    {
        return true;
    }else{
        return false;
    }
}

function makeActive(i, j){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            let index = idArr[i][j];
            const obj = document.getElementById(`${index}`);
            obj.classList.toggle("active");
        }, 300);
    })
}

function removeActive(i, j){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            let index = idArr[i][j];
            const obj = document.getElementById(`${index}`);
            obj.classList.toggle("active");
        }, 200);
    })
}

async function solveMaze(arr, row, col, i, j, visited, path, output){
    if(i == row-1 && j == col-1){
        // answer found
        path.push(output);
        return;
    }

    for (let k = 0; k < 4; k++)
    {
        let newx = i + dx[k];
        let newy = j + dy[k];
        let dir = direction[k];
        if (isSafe(newx, newy, row, col, arr, visited))
        {
            await makeActive(newx, newy);
            visited[newx][newy] = true;
            await solveMaze(arr, row, col, newx, newy, visited, path, output + dir);
            // backtrack
            await removeActive(newx, newy);
            visited[newx][newy] = false;
        }
    }

}

async function getPath(){

    console.log("got to function");
    let row=5;
    let col=5;

    let visited = [[],[],[],[],[]];
    for(let i=0;i<row;i++){
        for(let j=0;j<row;j++){
            visited[i][j] = false;
        }
    }

    visited[0][0] = true;

    let path = [];
    let output = "";

    await solveMaze(blockArr, row, col, 0, 0, visited, path, output);
    // test(blockArr);

    if(path.length==0){
        console.log("No Path Exists");
        showError();
    }else{
        console.log(path);
        showPath(path);
    }

}

function showError(){
    const element = document.getElementsByClassName('wrapper')[0];
    const message = document.createElement('p');
    message.classList.add("trajectory");
    message.style.color = 'red';
    message.innerHTML = "NO PATH EXISTS";
    element.appendChild(message);
}
function showPath(path){
    const element = document.getElementsByClassName('wrapper')[0];
    const message = document.createElement('p');
    message.classList.add("trajectory");
    message.innerHTML = `${path}`;
    element.appendChild(message);
}