var gamestate;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  gamestate = "play";
  score = 0;
  monkey = createSprite(50,140,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(0,windowheight/5*4,windowWidth,10);
  //monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  foodGroup = createGroup();
  obstacleGroup = createGroup();  
}


function draw() {
  background("white");
  text("Survival Time = "+score,250,50);
  monkey.collide(ground);
  console.log(monkey.y)
  if(gamestate=="play"){
    
  monkey.velocityY = 3;
  monkey.collide(ground);
   if(touches.length>1 || keyDown("space")){
        monkey.velocityY = -12;
        
    }
    
      
  
  if(frameCount%100===0 ){
    fruit();
    obstacleFunc();
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup[0].destroy();
    score = score+2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gamestate = "end";
  }
  }
  else if(gamestate=="end"){
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
}
  
  
    //add gravity
    
  drawSprites();
}

function obstacleFunc(){
  obstacle = createSprite(windowWidth,170,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX =  -(6 + score/5);
  obstacle.lifetime = 200;
  obstacle.scale = 0.1;
  obstacleGroup.add(obstacle);
}
function fruit(){
  banana = createSprite(windowWidth,85,20,20);
  banana.addImage(bananaImage);
  banana.velocityX = -(6 + score/5);
  banana.lifetime = 200;
  banana.scale = 0.1;
  foodGroup.add(banana);
}




