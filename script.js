const CARD_DECK = document.querySelectorAll(".card-deck");
const RESET = document.querySelector(".resetButton");
var IMG = [];

var counter = 0;
var flipCounter = 0;
var images;
var shuffleIMG;
var firstElement, secondElement;
var initialTimerCounter = 5;
var gameTimerCounter = 0;
var gameScore = 0;

var initialTimer, gameTimer;


var IMGURL = ["https://memorygame.now.sh/images/birds-paradise.jpg",
"https://memorygame.now.sh/images/bridge-water.jpg",
"https://memorygame.now.sh/images/car.jpg",
"https://memorygame.now.sh/images/cat.jpg",
"https://memorygame.now.sh/images/dog.jpg",
"https://memorygame.now.sh/images/house.jpg",
"https://memorygame.now.sh/images/lion-fish.jpg",
"https://memorygame.now.sh/images/pattern.jpg",
"https://memorygame.now.sh/images/soldier.jpg",
"https://memorygame.now.sh/images/sonia-leigh.jpg",
"https://memorygame.now.sh/images/tree.jpg"
];


IMG[0] = "./images/birds-paradise.jpg";
IMG[1] = "./images/bridge-water.jpg";
IMG[2] = "./images/car.jpg";
IMG[3] = "./images/cat.jpg";
IMG[4] = "./images/dog.jpg";
IMG[5] = "./images/house.jpg";
IMG[6] = "./images/lion-fish.jpg";
IMG[7] = "./images/soldier.jpg";
IMG[8] = "./images/sonia-leigh.jpg";
IMG[9] = "./images/tree.jpg";
IMG[10] = "./images/birds-paradise.jpg";
IMG[11] = "./images/bridge-water.jpg";
IMG[12] = "./images/car.jpg";
IMG[13] = "./images/cat.jpg";
IMG[14] = "./images/dog.jpg";
IMG[15] = "./images/house.jpg";
IMG[16] = "./images/lion-fish.jpg";
IMG[17] = "./images/soldier.jpg";
IMG[18] = "./images/sonia-leigh.jpg";
IMG[19] = "./images/tree.jpg";

window.onload = function () {
  preloadImages(IMGURL);

  shuffleIMG = shuffle(IMG);
  createImages();

  gameTimers();

  RESET.addEventListener('click', function () {
    initialTimerCounter = 5;
    gameTimerCounter = 0;
    gameScore = 0;
    counter = 0;
    flipCounter = 0;

    clearInterval(initialTimer);
    clearInterval(gameTimer);

    document.querySelector(".timer-bottom label").innerHTML = "05";
    document.querySelector(".timer-side label").innerHTML = "00";
    document.querySelector(".score label").innerHTML = "00";

    clearImages();
    shuffleIMG = shuffle(IMG);
    createImages();

    gameTimers();
  
  });


}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createImages() {
  for (let i = 0; i < CARD_DECK.length; i++) {
    for (let j = 0; j < 5; j++) {
      var img = document.createElement("img");
      img.src = shuffleIMG[j + counter];
      img.alt = j + counter;
      CARD_DECK[i].appendChild(img);
    }
    counter += 5;
  }
}

function gameTimers(){
  initialTimer = setInterval(function () {
    if (initialTimerCounter != 0) {
      initialTimerCounter--;
      document.querySelector(".timer-bottom label").innerHTML = `0${initialTimerCounter}`;
    } else {
      coverImages();
      clearInterval(initialTimer);
      gameTimer = setInterval(function () {
        if (gameTimerCounter == 50) {
          showImages();
          clearInterval(gameTimer);
          return;
        }
        gameTimerCounter++;
        if (gameTimerCounter <= 9) {
          document.querySelector(".timer-side label").innerHTML = `0${gameTimerCounter}`;
        } else {
          document.querySelector(".timer-side label").innerHTML = `${gameTimerCounter}`;
        }

      }, 1000);
    }
  }, 1000);
}

function showImages() {
  images = document.querySelectorAll(".cards img");
  for (let i = 0; i < images.length; i++) {
    images[i].src = shuffleIMG[i];
    images[i].removeEventListener('click', flip);
    images[i].classList.remove("flip");
  }
}

function coverImages() {
  images = document.querySelectorAll(".cards img");
  for (let i = 0; i < images.length; i++) {
    images[i].src = "./images/pattern.jpg";
    images[i].addEventListener('click', flip);
  }
}

function clearImages(){
  let imgs = document.querySelectorAll(".cards img");
  for (let i = 0; i < imgs.length; i++){
    var element = imgs[i];
    element.parentNode.removeChild(element);
  }
}


function flip(e) {
  // console.log("click");
  flipCounter++;
  if (flipCounter == 1) {
    firstElement = e.target;
    firstElement.classList.add('flip');
    firstElement.src = shuffleIMG[firstElement.alt];
    // firstElement.removeEventListener('click', flip);
  } else if (flipCounter > 1) {
    secondElement = e.target;
    // console.log(IMG[firstElement.alt], IMG[secondElement.alt]);
    // console.log(firstElement, secondElement,firstElement.alt== secondElement.alt);

    if (firstElement.alt == secondElement.alt){
      secondElement.classList.remove('flip');
      secondElement.src = "./images/pattern.jpg";
      flipCounter = 0;
    }else if (IMG[firstElement.alt] == IMG[secondElement.alt]) {
      // console.log("match");
      secondElement.classList.add('flip');
      secondElement.src = shuffleIMG[secondElement.alt];
      firstElement.removeEventListener('click', flip);
      secondElement.removeEventListener('click', flip);
      gameScore += 10;
      document.querySelector(".score label").innerHTML = `${gameScore}`;
      if (gameScore == 100) {
        clearInterval(gameTimer);
      }
      flipCounter = 0;
      firstElement.classList.remove("flip");
      secondElement.classList.remove("flip");
    } else {
      // console.log("don't match");
      firstElement.classList.remove('flip');
      firstElement.classList.add('wrong');
      secondElement.classList.add("wrong");
      secondElement.src = shuffleIMG[secondElement.alt];
      for( let i = 0 ; i < document.querySelectorAll("img").length; i++ ){
        document.querySelectorAll("img")[i].removeEventListener('click', flip);
      }
      setTimeout(function () {
        firstElement.classList.remove('wrong');
        firstElement.src = "./images/pattern.jpg";
        secondElement.classList.remove("wrong");
        secondElement.src = "./images/pattern.jpg";
        flipCounter = 0;
        for( let i = 0 ; i < document.querySelectorAll("img").length; i++ ){
          // console.log(document.querySelectorAll("img")[i].src.includes("/images/pattern.jpg"))
          if( document.querySelectorAll("img")[i].src.includes("/images/pattern.jpg"))
          document.querySelectorAll("img")[i].addEventListener('click', flip);
        }
      }, 500);
    }
  }
}

function preloadImages(arrayurl) {
  if (!preloadImages.list) {
      preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < arrayurl.length; i++) {
      var imgurl = new Image();
      imgurl.onload = function() {
          var indexurl = list.indexOf(this);
          if (indexurl !== -1) {
              // remove image from the array once it's loaded
              // for memory consumption reasons
              list.splice(indexurl, 1);
          }
      }
      list.push(imgurl);
      imgurl.src = arrayurl[i];
  }
}