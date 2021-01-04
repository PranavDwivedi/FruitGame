//GAME STATES
var PLAY = 1;
var END = 0;
var gameState = 1;

//creating variables
var sword, fruit ,monster, score, rand, randomFruit;
var swordImage, monsterImage, enemyGroup, fruitGroup;

var apple, banana , mango, strawberry, gameOverImage;
var knifeSwooshSounder, gameoverSound;

var score;

function preload()
{
  //loading the swordImage
  swordImage = loadImage("sword.png");

  ////loading the monsterAnimation
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  //loading the fruit1Image
  fruit1 = loadImage("fruit1.png");
  
  //loading the fruit2Image
  fruit2 = loadImage("fruit2.png");
  
  //loading the fruit3Image
  fruit3 = loadImage("fruit3.png");
  
  //loading the fruit4Image
  fruit4 = loadImage("fruit4.png");
  
  //loading the gameOver Image
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSounder = loadSound("knifeSwooshSound.mp3");
  
  gameoverSound = loadSound("gameover.mp3");
 
}

function setup()
{
  createCanvas(600, 600);
  
  //creating sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
              
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);
  
  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw()
{
  background("lightblue");

  
  if (gameState===PLAY)
{
   //Call fruits and Enemy function
    fruits();
    Enemy();
  
  //move sword with mouse
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword))
{
      fruitGroup.destroyEach();
  
    knifeSwooshSounder.play();
      score = score+2;
}
  else 
{
   // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword))
{
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
  
  // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
  

    gameoverSound.play();
}

}
  
}
  
drawSprites();

//Display score
  text("Score : "+ score,300,30);

}

function Enemy() 
{
  if (World.frameCount%200===0)
{
  monster = createSprite(400,200,20,20);
  monster.addAnimation("moving", monsterImage);
  monster.y = Math.round(random(100,300));
  monster.velocityX = -(8+(score/10));
  monster.setLifetime = 50;
  
  enemyGroup.add(monster);
}
  
}

function fruits()
{
  if (World.frameCount%80===0)
{
  position = Math.round(random(1,2));
  fruit = createSprite(400,200,20,20);
  
  if (position === 1)
{
  fruit.x = 400;
  fruit.velocityX = -(7+(score/4));
}
  else
{
  if (position === 2)
{
   fruit.x = 0;
  
  //increase the velocity of fruit after score 4 or 10
  fruit.velocityX = (7+(score/4));
  
}
    
}
    
    
  fruit.scale = 0.2;
   //fruit.debug=true;
  rand=Math.round(random(1,4));
   if (rand == 1) 
{
      fruit.addImage(fruit1);
} 
    else if (rand == 2) 
{
      fruit.addImage(fruit2);
}
    else if (rand == 3) 
{
      fruit.addImage(fruit3);
} 
    else 
{
      fruit.addImage(fruit4);
}
  
  fruit.y=Math.round(random(50,340));
  
  
  fruit.setLifetime = 100;

   fruitGroup.add(fruit);
  
}

}