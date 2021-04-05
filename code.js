// Challenge 1: Age in Days
function challenge(){
    var birthYear = prompt('what year were you born?');
    var ageInDays = (2021 - birthYear) * 365
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDays + 'days old!');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);    
}

function reset(){
    document.getElementById('ageInDays').remove()
}


// Challenge 2: Cat Gen
function challenge2(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src='https://thecatapi.com/api/images/get?frmat=src&type=gif&size=small'
    div.appendChild(image);

}

// Challenge 3: RPS
function rpsGame(yourChoice){
    var humanChoice;
    var botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice((randToRpsInt()));
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message);

}

function randToRpsInt(){
    return Math.floor(Math.random()*3) 
}

function numberToChoice(number){ //give it a number and it will pick the choice for you
    return ['rock', 'paper', 'scissors'] [number]
}

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper':0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors':{'paper': 1, 'scissors': 0.5, 'rock':0}
    };

    var yourScore = rpsDatabase[yourChoice][botChoice]; 
    var botScore = rpsDatabase[botChoice][yourChoice]; 

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]){
    if (yourScore === 0) {
        return {'message':'you lost womp womp...', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'sigh.. it a tie', 'color': 'blue'};
    } else {
        return {'message': 'you won!!', 'color': 'green'};
    }

}


document.querySelector('#rps-reset-btn').addEventListener('click', resetRps);

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 30px rgba(182, 19, 223, 0.7);'>"
    messageDiv.innerHTML = "<h1 style='color'" + "id='rps-final-text'" + finalMessage['color'] + "; font-size: 40px; padding: 20px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 30px rgba(21, 91, 184, 0.9);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
function resetRps(){
    let rpsImages = document.querySelector('#flex-box-rps-div').querySelectorAll('img');
    document.getElementById('rps-final-text').remove();

    for (i=0; i < rpsImages.length; i++) {
        rpsImages[i].remove();
        }
    yourScore = 0;
    botScore = 0;
    //console.log(yourScore);
}



// Challenge Four: Button Changing
let allButtons = document.getElementsByTagName('button');
let copyAllButtons = [];

for (let i=0; i < allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}
function buttonColorChange(colorSelector){
    if (colorSelector.value === 'red'){
        buttonsRed();
    } else if (colorSelector.value === 'green'){
        buttonsGreen();
    } else if (colorSelector.value === 'reset'){
        buttonsReset();
    } else if (colorSelector.value === 'random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonsReset(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function buttonsRandom(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    
    for (let i=0; i < allButtons.length; i++){
        let randomNumer = Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumer]);
    }
}
var archer = new Audio();
var malory = new Audio();
var lana = new Audio();
var cheryl = new Audio();

archer.src = "sounds/archer-danger-zone.mp3"
malory.src = "sounds/malory-shitsake.mp3"
lana.src = "sounds/lana-danger-zone.mp3"
cheryl.src = "sounds/cheryl-not-sup.mp3"

// Challenge Five: BlackJack

let blackjackGame = {
    'you': {
        'scoreSpan': '#your-blackjack-result',
        'div': '#your-box',
        'score': 0},
    'dealer': {
        'scoreSpan': '#dealer-blackjack-result',
        'div': '#dealer-box',
        'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
    'isHit': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio ('sounds/swish.m4a');
const winSound = new Audio ('sounds/cash.mp3');
const lossSound = new Audio ('sounds/aww.mp3');



document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);

function blackjackHit(){
    blackjackGame['isHit'] = true;
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);  
    } 
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer){
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        return activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
 }

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function showScore (activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true){
        
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
        }
        for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
     }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
        blackjackGame['isStand'] = false;
        
        document.querySelector('#blackjack-result').textContent = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = 'black';
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white'; 
        
        blackjackGame['turnsOver'] = false;
        blackjackGame['isHit'] = false;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    
    if (blackjackGame['isHit'] === true) {
        blackjackGame['isStand'] = true;
        
        while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);  
        }
    
    if (DEALER['score'] > 15){
        blackjackGame['turnsOver'] = true;
        showResult(computeWinner());
        }
    }
}

function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] ||  DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score'] || YOU['score'] > 21){
            blackjackGame['losses']++;
            winner = DEALER
        } else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;   
}
function showResult(winner){
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true){
        if (winner === YOU){
                message = 'You won!';
                messageColor = 'green';
                document.querySelector('#wins').textContent = blackjackGame['wins'];
                winSound.play ();
            } else if (winner === DEALER){
                message = 'You lost!';
                messageColor = 'red';
                document.querySelector('#losses').textContent = blackjackGame['losses'];
                lossSound.play ();
            } else {
                message = 'You tied!';
                messageColor = 'black';
                document.querySelector('#draws').textContent = blackjackGame['draws'];
            }

            document.querySelector('#blackjack-result').textContent = message;
            document.querySelector('#blackjack-result').style.color = messageColor;
    }
}