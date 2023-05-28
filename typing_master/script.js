const pg = document.getElementById("pg");
const userInput = document.querySelector(".textinput");
const resetBtn = document.querySelector(".reset-btn");
const totalTime = document.querySelector(".time>.value");
const totalMistakes = document.querySelector(".mistake>.value");
const totalCPM = document.querySelector(".cpm>.value");
const totalWPM = document.querySelector(".wpm>.value");

const xValues = [];
const yValues = [];

const paragraphs = [
    "Sometimes there isn't a good answer. No matter how you try to rationalize the outcome, it doesn't make sense. And instead of an answer, you are simply left with a question. Why?",
    "There are only three ways to make this work. The first is to let me take care of everything. The second is for you to take care of everything. The third is to split everything 50 / 50. I think the last option is the most preferable, but I'm certain it'll also mean the end of our marriage.",
    "Her hand was balled into a fist with her keys protruding out from between her fingers. This was the weapon her father had shown her how to make when she walked alone to her car after work. She wished that she had something a little more potent than keys between her fingers. It would have been nice to have some mace or pepper spray. He had been meaning to buy some but had never gotten around to it. As the mother bear took another step forward with her cubs in tow, she knew her fist with keys wasn't going to be an adequate defense for this situation.",
    "She patiently waited for his number to be called. She had no desire to be there, but her mom had insisted that she go. She's resisted at first, but over time she realized it was simply easier to appease her and go. Mom tended to be that way. She would keep insisting until you wore down and did what she wanted. So, here she sat, patiently waiting for her number to be called.",
    "She considered the birds to be her friends. She'd put out food for them each morning and then she'd watch as they came to the feeders to gorge themselves for the day. She wondered what they would do if something ever happened to her. Would they miss the meals she provided if she failed to put out the food one morning?",
    "Have you ever wondered about toes? Why 10 toes and not 12. Why are some bigger than others? Some people can use their toes to pick up things while others can barely move them on command. Some toes are nice to look at while others are definitely not something you want to look at. Toes can be stubbed and make us scream. Toes help us balance and walk. 10 toes are just something to ponder.",
    "What were the chances? It would have to be a lot more than 100 to 1. It was likely even more than 1,000 to 1. The more he thought about it, the odds of it happening had to be more than 10,000 to 1 and even 100,000 to 1. People often threw around the chances of something happening as being 1,000,000 to 1 as an exaggeration of an unlikely event, but he could see that they may actually be accurate in this situation. Whatever the odds of it happening, he knew they were big. What he didn't know was whether this happening was lucky or unlucky.",
    "There was something beautiful in his hate. It wasn't the hate itself as it was a disgusting display of racism and intolerance. It was what propelled the hate and the fact that although he had this hate, he didn't understand where it came from. It was at that moment that she realized that there was hope in changing him.",
    "The boxed moved. That was a problem. Peter had packed the box three hours before and there was nothing inside that should make it move. The question now was whether or not Peter was going to open it up and look inside to see why it had moved. The answer to that question was obvious. Peter dropped the package into the mailbox so he would never have to see it again.",
    "Matt told her to reach for the stars, but Veronica thought it was the most ridiculous advice she'd ever received. Sure, it had been well-meaning when he said it, but she didn't understand why anyone would want to suggest something that would literally kill you if you actually managed to achieve it.",
    "Finding the truth wouldn't be easy, that's for sure. Then there was the question of whether or not Jane really wanted to know the truth. That's the thing that bothered her most. It wasn't the difficulty of actually finding out what happened that was the obstacle, but having to live with that information once it was found.",
    "There wasn't a whole lot more that could be done. It had become a wait-and-see situation with the final results no longer in her control. That didn't stop her from trying to control the situation. She demanded that things be done as she desperately tried to control what couldn't be.",
    "He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himself and again tried to imagine it was the first time."
];

let timer = 1;
let maxTime = 600;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

async function createGraph(){
    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        data: yValues,
        borderColor: "blue",
        fill:false
        }]
    },
    options:{
        legend: false,
        responsive: true
    }
    });
}


const setParagraph  = ()=>{
    const randIndex = Math.floor(Math.random()*paragraphs.length);
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char=>{
        pg.innerHTML += `<span>${char}</span>`;
    })
    document.addEventListener("keydown",()=>userInput.focus());
    pg.querySelectorAll('span')[0].className="active";
    userInput.value = "";
    totalTime.innerText = 0;
    totalCPM.innerText = 0;
    totalWPM.innerText = 0;
    totalMistakes.innerText = 0;
}
function disableTxt() {
    userInput.disabled = true;
}
async function startTyping(){
    // if(isTyping===false){
    //     startTimer();
    //     isTyping = true;
    // }
    let characters = pg.querySelectorAll('span');
    characters[charIndex].classList.add("active");
    let typedChar = userInput.value.charAt(charIndex);
    console.log(userInput.value);
    // console.log(typedChar);
    console.log("charIndex: ",charIndex);
    if(charIndex===characters.length-1){
        disableTxt();
    }
    if(typedChar===characters[charIndex].innerText){
        characters[charIndex].classList.remove("incorrect");
        characters[charIndex].classList.add("correct");
    }
    if(typedChar!==characters[charIndex].innerText){
        // characters[charIndex].classList.remove("correct");
        if(!characters[charIndex].classList.contains("incorrect")){
            characters[charIndex].classList.add("incorrect");
            mistakes++;
            totalMistakes.innerText = mistakes;
        }
    }
    if(typedChar===" " && characters[charIndex].innerText===" "){
        let cpm = parseInt(userInput.value.length/(timer/60));
        let words = userInput.value.split(" ");
        let wpm = parseInt(words.length/(timer/60));
        if(isNaN(wpm)){
            console.log("this is nan");
            wpm = 0;
        }
        if(isNaN(cpm)){
            cpm = 0;
        }
        console.log(wpm, cpm);
        totalCPM.innerText = cpm;
        totalWPM.innerText = wpm;
        xValues.push(timer);
        yValues.push(wpm);
        await createGraph();
    }
    charIndex++;
}
async function removeChar(){
    console.log("Backspaced");
    let characters = pg.querySelectorAll('span');
    charIndex=userInput.value.length-1;
    if(charIndex<0){
        charIndex=0;
    }
    characters[charIndex].classList.remove("incorrect");
    characters[charIndex].classList.remove("correct");
    if(charIndex!=0){
        characters[charIndex].classList.remove("active");
    }
    charIndex=userInput.value.length-2;
    if(charIndex<0){
        charIndex=0;
    }
}
async function startTimer(){
    console.log("here");
    let characters = pg.querySelectorAll('span');
    setInterval(()=>{
        if(timer>maxTime || charIndex==characters.length){
            return;
        }
        totalTime.innerText = timer;
        timer++;
    }, 1000);
}
const resetPara = ()=>{
    location.reload()
}

setParagraph();
resetBtn.addEventListener("click",resetPara);
userInput.addEventListener("input",()=>{
    if(isTyping===false){
        startTimer();
        isTyping = true;
    }
});
userInput.addEventListener("input",startTyping);
userInput.addEventListener("keydown",(event)=>{
    if(charIndex>0 && event.key=="Backspace"){
        removeChar();
    }
})