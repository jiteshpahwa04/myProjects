let container = document.querySelector(".array-container");
const elements = document.getElementsByClassName("array-bar");

let unsortedArr = [];

function createNewArray(){
    container.innerHTML = '';
    unsortedArr = [];
    for(let i=0;i<200;i++){
        const rect = document.createElement('div');
        rect.className="array-bar";
        let randHeight = Math.floor(Math.random()*(700 - 5 +1) + 5);
        unsortedArr.push(randHeight);
        rect.style.height = `${randHeight}px`;
        container.appendChild(rect);
    }
}

createNewArray();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeActive(elements, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[i].classList.add("active");
        }, 5);
    })
}

function removeActive(elements, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[i].classList.remove("active");
        }, 5);
    })
}

async function bubbleSort(){
    const arr = unsortedArr;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            await makeActive(elements, j);
            await makeActive(elements, j+1);
            
            if (arr[j] > arr[j + 1]) {
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
                [elements[j].style.height, elements[j+1].style.height] = [elements[j+1].style.height, elements[j].style.height];
            }
            
            await removeActive(elements, j);
            await removeActive(elements, j+1);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeGreen(elements, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[i].classList.add("green");
        }, 5);
    })
}

function removeGreen(elements, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[i].classList.remove("green");
        }, 5);
    })
}

async function selectionSort(){
    const arr = unsortedArr;
    for (var i = 0; i < arr.length; i++) {
        let mini = i;
        await makeActive(elements, i);
        console.log(i);
        for (var j = i+1; j < (arr.length); j++) {
            await makeActive(elements, j);
            
            if (arr[j] < arr[mini]) {
                await removeGreen(elements, mini);
                mini = j;
                await makeGreen(elements, mini);
            }
            
            await removeActive(elements, j);
        }
        [arr[i],arr[mini]] = [arr[mini], arr[i]];
        [elements[i].style.height, elements[mini].style.height] = [elements[mini].style.height, elements[i].style.height];
        removeActive(elements, i);
        removeGreen(elements, mini);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertionSort(){
    const arr = unsortedArr;
    for (var i = 1; i < arr.length; i++) {
        let temp = arr[i];
        let j = i-1;
        await makeActive(elements, i);
        // await makeGreen(elements, j);
        for (; j >= 0; j--) {
            await makeActive(elements, j);
            
            if (arr[j] > temp) {
                arr[j+1] = arr[j];
                elements[j+1].style.height = elements[j].style.height;
            }else{
                await removeActive(elements, j);
                break;
            }
            
            await removeActive(elements, j);
        }
        arr[j+1] = temp;
        elements[j+1].style.height = `${temp}px`;
        removeActive(elements, i);
        // removeGreen(elements, j);
    }
    console.log(arr);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeLeftHeight(k, left, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[k].style.height = `${left[i]}px`;
        }, 50);
    })
    
}
function changeRightHeight(k, right, i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
            elements[k].style.height = `${right[i]}px`;
        }, 50);
    })
    
}

function colorArr(i){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
                elements[i].classList.remove("active");
        }, 5);
        setTimeout(() => {
            resolve("resolved");
                elements[i].classList.add("active");
        }, 5);
    })
}

async function mergeSort(arr){

    if (arr === null) {
        return;
    }

    if (arr.length > 1) {
        var mid = parseInt(arr.length / 2);
        // makeActive(elements, mid);

        // Split left part
        var left = Array(mid).fill(0);
        for (i = 0; i < mid; i++) {
            left[i] = arr[i];
            console.log("Left: ",left);
        }
        
        // Split right part
        var right = Array(arr.length - mid).fill(0);
        for (i = mid; i < arr.length; i++) {
            right[i - mid] = arr[i];
            console.log("Right: ",right);
        }

        mergeSort(left);
        mergeSort(right);

        var i = 0;
        var j = 0;
        var k = 0;

        // Merge left and right arrays
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k] = left[i];
                // await colorArr(k);
                await changeLeftHeight(k, left, i);
                i++;
            } else {
                arr[k] = right[j];
                // await colorArr(k);
                await changeRightHeight(k, right, j);
                j++;
            }
            k++;
        }
        // Collect remaining elements
        while (i < left.length) {
            arr[k] = left[i];
            await changeLeftHeight(k, left, i);
            i++;
            k++;
        }
        while (j < right.length) {
            arr[k] = right[j];
            await changeRightHeight(k, right, j);
            j++;
            k++;
        }
    }

    return arr;
}


async function mergeSortHandler(){
    const arr = unsortedArr;
    await mergeSort(arr);
    console.log(arr);
}