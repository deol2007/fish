class Game {
  constructor(){
      /*this.rank1=loadImage("images/rank 1.jpg");
      this.rank2=loadImage("images/rank 2.jpg");
      this.rank3=loadImage("images/rank 3.jpg");
      this.rank4=loadImage("images/rank 4.jpg");*/
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    fish1 = createSprite(100,50);
    fish2 = createSprite(300,50);
    fish3 = createSprite(500,50);
    fish4 = createSprite(700,50);
    fishs = [fish1, fish2, fish3, fish4];
    fish1.addImage(fish1Img);
    fish2.addImage(fish2Img);
    fish3.addImage(fish3Img);
    fish4.addImage(fish4Img);
    fish1.scale= 0.1;
    fish2.scale= 0.1;
    fish3.scale= 0.1;
    fish4.scale= 0.1;
  }
 

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(sandImg);
      image(underTheSeaImg,0,-displayHeight/4,displayWidth,displayHeight/1.2)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        fishs[index-1].x = x;
        fishs[index-1].y = y;

        if (index === player.index){
          fill("yellow");
          ellipse(x,y,60,60);
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x -=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x +=10
      player.update();
    }

    if(player.distance>4350){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      /*if(player.rank===1){
        image(this.rank1,displayWidth/2-200,-(displayHeight*4+300),400,400);
      }
      if(player.rank===2){
        image(this.rank2,displayWidth/2-200,-(displayHeight*4+300),400,400);
      }
      if(player.rank===3){
        image(this.rank3,displayWidth/2-200,-(displayHeight*4+300),400,400);
      }
      if(player.rank===4){
        image(this.rank4,displayWidth/2-200,-(displayHeight*4+300),400,400);
      }*/
    }

    drawSprites();
  }
  end(){
    console.log("game has ended");
  }
}