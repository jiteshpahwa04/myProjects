// Wordnik API key:
// let api_key = '/?api_key=<api_key>'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function printDetails(data, word_called, word_meaning, word_synonym, word_antonym){

  // Print the word
  word_called.innerHTML = capitalizeFirstLetter(data[0].word);

  // Get complete definitions Array
  const meaningArr = data[0].meanings;

  // Print definitions
  for(let i=0;i<meaningArr.length,i<2;i++){
    if(i===meaningArr.length){
      break;
    }

    // Print max 2 meanings
    let meanNode = document.createElement('h3');
    meanNode.innerHTML = meaningArr[i].partOfSpeech.toUpperCase();
    let meanText = document.createElement('p');
    meanText.innerHTML = meaningArr[i].definitions[0].definition;
    meanText.classList.add("data-text");
    word_meaning.appendChild(meanNode);
    meanNode.appendChild(meanText);

    // Print all synonyms in those meanings
    if(meaningArr[i].synonyms.length){
      let synNode = document.createElement('h3');
      let synText = document.createElement('p');
      // let synArr = [];
      for(let j=0;j<meaningArr[i].synonyms.length && j<6;j++){
        synText.innerText += capitalizeFirstLetter( meaningArr[i].synonyms[j] );
        if(j<meaningArr[i].synonyms.length-1 && j<5){
          synText.innerText += ",";
        }
      }
      synNode.innerHTML = meaningArr[i].partOfSpeech.toUpperCase();
      // synText.innerHTML = synArr;
      synText.classList.add("data-text");
      word_synonym.appendChild(synNode);
      synNode.appendChild(synText);
    }
    
    // // Print all antonyms in those meanings
    if(meaningArr[i].antonyms.length){
      let antNode = document.createElement('h3');
      let antText = document.createElement('p');
      // let antArr = [];
      for(let j=0;j<meaningArr[i].antonyms.length && j<6;j++){
        antText.innerText += capitalizeFirstLetter( meaningArr[i].antonyms[j] );
        if(j<meaningArr[i].antonyms.length-1 && j<5){
          antText.innerText += ",";
        }
      }
      antNode.innerHTML = meaningArr[i].partOfSpeech.toUpperCase();
      // antText.innerHTML = antArr;
      antText.classList.add("data-text");
      word_antonym.appendChild(antNode);
      antNode.appendChild(antText);
    }

  }
}

async function setup(){ // to start the process
  noCanvas(); // to clear the previous output
  
  let bgpage = chrome.extension.getBackgroundPage();
  let word = bgpage.word.trim();
  console.log(word);
  
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
  
  let word_called = document.getElementById("word_called");
  let word_meaning = document.getElementById("word_meaning");
  let word_synonym = document.getElementById("word_synonym");
  let word_antonym = document.getElementById("word_antonym");

  printDetails(jsonData, word_called, word_meaning, word_synonym, word_antonym);
  
}
