//creating Variables
var monkey, food ,rock, foodGrp, rockGrp, score=0, ground ,gameState=1, survivalTime=0, bananas=0, Ground1, Restart;

function preload(){
  //loading images, sounds
  monkey_running=   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  foodImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  endMonkey = loadImage("sprite_0.png");
  bite = loadSound("bite.mp3");
  hitRock = loadSound("rock.mp3");
  Ground = loadImage("ground.jpg");
  restart = loadImage("restart.png");
}

function setup() {
  //creating canvas, sprites, groups
   createCanvas(400,400);
   Ground1=createSprite(400,200,0,0);
   Ground1.addImage("ground",Ground);
   Ground1.velocityX=-5;
   monkey=createSprite(50,330,0,0);
   monkey.scale=0.13;
   monkey.addAnimation("monkey",monkey_running);
   ground=createSprite(200,370,400,10);
   rockGrp=new Group();
   foodGrp=new Group();
   Restart=createSprite(200,300,0,0);
   Restart.addImage("restart",restart);
   Restart.scale=0.5;
   Restart.visible=false;
}

function draw() {
  background("lightblue");
  drawSprites();
  //starting game
  if(gameState==1){
    //drawing ground, sprites and rocks, foods
    rocksFoods();
    if(Ground1.x<0){
       Ground1.x=400;
    }
    //making survival time
    survivalTime=Math.ceil(frameCount/frameRate());
    //adding gravity
    monkey.velocityY=monkey.velocityY+0.5;
    //making monkey jump when space clicked
    if(keyDown("space")&&monkey.y==326){
      monkey.velocityY=-17.5;
    }
    //ending game
    if(monkey.collide(rockGrp)){
       hitRock.play();
       gameState=0;
    }
    //getting bananas
    if(monkey.isTouching(foodGrp)){
      bite.play();
      bananas=bananas+1;
      foodGrp.destroyEach();
    }
  }else if(gameState==0){
    //ended game
    monkey.addImage("monkey",endMonkey);
    rockGrp.setVelocityXEach(0);
    foodGrp.setVelocityXEach(0);
    monkey.x=50;
    monkey.velocityY=0;
    rockGrp.setLifetimeEach(-1);
    foodGrp.setLifetimeEach(-1);
    Ground1.velocityX=0;
    Restart.visible=true;
    //restarting game
    if(mousePressedOver(Restart)){
      frameCount=0;
      bananas=0;
      setup();
      rockGrp.destroyEach();
      foodGrp.destroyEach();
      gameState=1;
    }
    textSize(40);
    fill("black");
    text("Game Over",100,200);
  }
  monkey.collide(ground);
  monkey.setCollider("rectangle",0,0,500,600);
  Restart.setCollider("circle",0,-3,70);
  //showing points
  fill("white");
  textSize(20);
  text("Survival Time:"+survivalTime,150,100);
  text("Bananas:"+bananas,150,120);
  text("❗Speed increases with time",100,140);
}
//making rocks and foods
function rocksFoods(){
  if(World.frameCount%200==0){
     rock=createSprite(400,330,0,0);
     food=createSprite(400,100,0,0);
     food.velocityX=rock.velocityX=-(3+survivalTime/5);
     rock.scale=0.2;
     food.scale=0.1;
     rock.addImage("rock",rockImage);
     food.addImage("food",foodImage);
     food.lifetime=rock.lifetime=190;
     rockGrp.add(rock);
     foodGrp.add(food);
     //rock.debug=true;
     rock.setCollider("circle",-30,0,160);
  }
}




