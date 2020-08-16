
var player, player_img;
var trash1, trash2, trash3;
var track, trackImg;
var trashGroup1, trashGroup2, trashGroup3;
var play = 1;
var end = 0;                   
var gameState = play;
var score = 0;

function preload(){
  player_img = loadImage("player.png");
  trash1 = loadImage("trash1.png");
  trash2 = loadImage("trash2.png");
  trash3 = loadImage("trash3.png");
  trackImg = loadImage("track.jpg")
}

function setup(){
  createCanvas(displayWidth - 100, displayHeight - 100);  

  track = createSprite((displayWidth-100)/2,(displayHeight-100)/2,displayWidth-200, displayHeight-200);
  track.addImage("track", trackImg);
  track.velocityY = 10;

  player = createSprite((displayWidth-100)/2,450,20,50);
  player.addImage("player", player_img);
  player.scale = 0.1;
  player.setCollider("rectangle",0,200,700,900);

  trashGroup1 = new Group();
  trashGroup2 = new Group();
  trashGroup3 = new Group();
}

function draw(){
  background(180);


  if (gameState === play) {

    player.x = World.mouseX;

    track.velocityY = 10;
    if (track.y > displayHeight + 2850){
      track.y = (displayHeight-100)/3;
    }

    spawnTrash();
    spawnTrash1();
    spawnTrash2();

    if (trashGroup1.isTouching(player) || trashGroup2.isTouching(player) ||trashGroup3.isTouching(player)) {
      score = score + 1;
      if (trashGroup1.isTouching(player)) {
        trashGroup1.destroyEach();
      } 
      
      if (trashGroup2.isTouching(player)) {
        trashGroup2.destroyEach();
      }
      
      if (trashGroup3.isTouching(player)) {
        trashGroup3.destroyEach();
      }
    }

    if (score === 50) {
      gameState = end;
    }    
  }
  if (gameState===end) {
      track.velocityY = 0;
      trashGroup1.setVelocityYEach(0);
      trashGroup2.setVelocityYEach(0);
      trashGroup3.setVelocityYEach(0);

      trashGroup1.setLifetimeEach(-1);
      trashGroup2.setLifetimeEach(-1);
      trashGroup3.setLifetimeEach(-1); 

      if (keyDown("space")) {
        gameState = play;
        score = 0;
        trashGroup1.destroyEach();
        trashGroup2.destroyEach();
        trashGroup3.destroyEach();
      }
  }
  drawSprites();
  stroke("black");
  strokeWeight(4);
  textSize(30);
  fill(255,255,255);
  text("Score: " + score, displayWidth-300, 70)    
  if (gameState===end) {
    text("The world generates 3.5 million tons of solid waste every day.",185,(displayHeight-300)/2)
    text("Together we can stop this and reduce our waste, making the \n world a cleaner and better place.",185,(displayHeight-200)/2)
    text("Press Space To Restart",400,(displayHeight-10)/2)
  }                                                      
}

function spawnTrash() {
  if(frameCount % 70 === 0) {
    var trash = createSprite(displayWidth-300,0,10,40);
    trash.x = Math.round(random(350,displayWidth-450));                                               

    trash.velocityY = 6;
    trash.addImage(trash1);
    
    
    //assign scale and lifetime to the obstacle           
    trash.scale = 0.1;
    trash.lifetime = 120;
    //add each obstacle to the group
    trashGroup1.add(trash);
  }
}

function spawnTrash1() {
  if(frameCount % 80 === 0) {
    var trash = createSprite(displayWidth-300,0,10,40);
    trash.x = Math.round(random(350,displayWidth-450));

    trash.velocityY = 6;
    trash.addImage(trash2);
    //generate random obstacles
    
    
    //assign scale and lifetime to the obstacle           
    trash.scale = 0.1;
    trash.lifetime = 120;
    trashGroup2.add(trash);
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
  }
}

function spawnTrash2() {
  if(frameCount % 90 === 0) {
    var trash = createSprite(displayWidth-300,0,10,40);
    trash.x = Math.round(random(350,displayWidth-450));

    trash.velocityY = 6;
    trash.addImage(trash3);
    
    //assign scale and lifetime to the obstacle           
    trash.scale = 0.1;
    trash.lifetime = 120;
    //add each obstacle to the group
    trashGroup3.add(trash);
  }
}