var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var score,ring;

var form, player, game;

var fishs,fish1,fish2,fish3,fish4;

function preload(){
  fish1Img=loadImage("images/blue.jpg");
  fish2Img=loadImage("images/green.png");
  fish3Img=loadImage("images/yellow.png");
  fish4Img=loadImage("images/red.png");
  underTheSeaImg=loadImage("images/underTheSea.jpg");
  sandImg=loadImage("images/sand.jpg");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    spawnrings();
  }
  if(gameState===2){
    game.end();
  }
}

function spawnrings(){
  if(frameCount%60===0){
      var rand =Math.round(random(displayWidth - 20,displayWidth+30))
      ring=createSprite(displayWidth,displayHeight-30)
      ring.velocityX=-6;
  }
}