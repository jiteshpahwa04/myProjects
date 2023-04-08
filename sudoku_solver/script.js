const board = document.querySelector(".container");

function spawnBoard(){
    let index = 0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const newBlock = document.createElement("input");
            newBlock.id = index;
            newBlock.addEventListener('keydown',()=>{
                newBlock.classList.remove("noClues");
            })
            board.appendChild(newBlock);
            if((index % 3 == 0 || index % 6 == 0) && (index % 9 !== 0) ){
                newBlock.classList.add("border-left");
            }
            if((index>=18 && index<=26) || (index>=45 && index<=53)){
                newBlock.classList.add("border-bottom");
            }
            if( index==21 || index==24 || index==48 || index==51 ){
                newBlock.classList.add("border-bottom-left");
            }
            index = index + 1;
        }
    }
}
spawnBoard();

async function validateInput(){

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let element = document.getElementById(nums[i][j]);
            let data = element.value;
            let val = parseInt(data);
            if((val>=1 && val<=9) || (data=="")){
                element.classList.remove("wrongInput");
                if(data==""){
                    element.classList.add("noClues");
                }else{
                    if(await isSafe(val,i,j)){
                        arr[i][j] = val;
                    }else{
                        console.log("Not safe", i, j,"data: ", val);
                        element.classList.add("wrongInput");
                        return false;
                    }
                }
            }else{
                console.log("invalid input");
                element.classList.add("wrongInput");
                return false;
            }
        }
    }
    console.log("Validated!");
    console.log("created array!");
    console.log(arr);
    return true;
}

async function getResult(){
    const isValid = await validateInput();
    if(isValid){
        await solveSudoku(arr);
        console.log(arr);
    }else{
        // resetSudoku();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const nums = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
[9, 10, 11, 12, 13, 14, 15, 16, 17],
[18, 19, 20, 21, 22, 23, 24, 25, 26],
[27, 28, 29, 30, 31, 32, 33, 34, 35],
[36, 37, 38, 39, 40, 41, 42, 43, 44],
[45, 46, 47, 48, 49, 50, 51, 52, 53],
[54, 55, 56, 57, 58, 59, 60, 61, 62],
[63, 64, 65, 66, 67, 68, 69, 70, 71],
[72, 73, 74, 75, 76, 77, 78, 79, 80]
];

let arr = [[0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0]];


function pushNum(element, value){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            element.value = value;
        }, 10);
    })
}

function popNum(element){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            element.value = "";
        }, 10);
    })
}

async function checkRow(value, curr_row){
    for(let col=0;col<9;col++){
        // console.log("Checking index:", i, "row: ", row, "for index: ", index);
        if(arr[curr_row][col]===value){
            console.log("row me false");
            console.log(arr);
            return false;
        }
        // console.log("Checked index:", i);
    }
    return true;
}

async function checkCol(value, curr_col){
    for(let row=0; row<9; row++){
        if(arr[row][curr_col]==value){
            console.log("col me false");
            console.log(arr);
            return false;
        }
    }
    return true;
}

async function check3x3(value, curr_col, curr_row){
    for(let i=0;i<9;i++){
        if( arr[ 3*(Math.floor(curr_row/3)) + (Math.floor(i/3)) ][ 3*(Math.floor(curr_col/3)) + (i%3) ] == value ){
            console.log("3x3 me false");
            return false;
        }
    }
    return true;
}

async function isSafe(value, curr_row, curr_col){

    if(arr[curr_row][curr_col]===value){
        return true;
    }

    // row check
    const c1 = await checkRow(value, curr_row);
    if(c1===false){
        return false;
    }

    // col check
    const c2 = await checkCol(value, curr_col);
    if(c2===false){
        return false;
    }

    // 3x3 board check
    const c3 = await check3x3(value, curr_col, curr_row);
    if(c3===false){
        return false;
    }

    console.log("True for value: ", value, " and for index: ", nums[curr_row][curr_col]);

    return true;
}

async function solveSudoku(arr){
    console.log("Solving");
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            console.log("got after 2 loops");
            let elmt = document.getElementById(nums[i][j]);
            console.log(elmt);
            if(arr[i][j]===0){
                for(let value=1;value<=9;value++){
                    const checkSafety = await isSafe(value,i,j);
                    if(await isSafe(value, i, j)){
                        // elmt.value = value;
                        await pushNum(elmt,value);
                        arr[i][j] = value;
                        console.log(arr);
                        
                        let aageKaSolution = await solveSudoku(arr);
                        if(aageKaSolution){
                            return true;
                        }
                        
                        // backtracking
                        // elmt.value = 0;
                        await popNum(elmt);
                        arr[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    console.log("Solved!!");
    console.log(arr);
    return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetSudoku(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            arr[i][j] = 0;
            let elmt = document.getElementById(nums[i][j]);
            elmt.value = "";
            elmt.classList.remove("wrongInput");
        }
    }
}