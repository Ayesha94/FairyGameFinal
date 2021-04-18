

var energy = 100;
var randNum, randNum2, randNum3;
var healthyObjectGroup, unhealthyObjectGroup, fireballGroup, fairyBallGroup;
var gameState="start";

function preload() {
    backgroundImg = loadImage("images/back.jpg");
    fairyImg = loadImage("images/fairyImage1.png");
    appleImg = loadImage("images/apple.png");
    orangeImg = loadImage("images/orange.png");
    burgerImg = loadImage("images/burger.png");
    fairyballsImg = loadImage("images/fairy balls.png");
    fireballsImg = loadImage("images/fire ball.png");
    girlImg = loadImage("images/girl.png");
    boyImg = loadImage("images/boy.png");
    sodaImg = loadImage("images/soda.png");
    strawImg = loadImage("images/straw.png");
    frenchfriesImg = loadImage("images/frenchfries.png");
    gameOverImg = loadImage("images/gameOver.png");
    startingImg = loadImage("images/startImg.jpg");
    winImg=loadImage("images/index.jpg");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);

    fairy = createSprite(displayWidth/2,50);
    fairy.addImage(fairyImg);
    fairy.scale=0.3;
   // fairy.velocityX=2;
    fairy.setCollider("rectangle",0,0,1100,1100)

    kid = createSprite(200,height-150);
    kid.scale = 0.4;

    edges = createEdgeSprites();

    //Healthy objects group
    healthyObjectGroup=createGroup();
    //Unhealthy Objects group
    unhealthyObjectGroup=createGroup();
    //fireball group
    fireballGroup=createGroup();
    //fairyBall group
    fairyBallGroup=createGroup();

}

function draw(){
    if(gameState==="start"){
        background(startingImg);
        textSize(100);
        fill("red");
        text("The kids mother is very angry that her child does not like to eat healthy food.",100,height/2 );
        text("She takes the help of fairy to teach her kid a lesson",100,height/2+150);
        text("To play this game press G if you are a girl or press B if you are a boy",100,height/2+300);

        if(keyDown("g")){
            kid.addImage(girlImg);
            gameState="play";
        }
        else if(keyDown("b")){
            kid.addImage(boyImg);
            gameState="play";
        }
    }

    if(gameState==="play"){
        background(backgroundImg);

        if(frameCount % 70 === 0){
        fairy.x = Math.round(random(50,width-50));
        }

        if(fairy.isTouching(edges)){
        fairy.bounceOff(edges);
        }

        if(keyDown("right")){
        kid.x+=10;
        }
        if(keyDown("left")){
        kid.x-=10;
        }

        fill("red");
        textSize(50);
        text("Energy :"+energy,width-350,50);

        createObject();
        
        if(kid.isTouching(healthyObjectGroup)){
            increaseEnergy(50);
            healthyObjectGroup.destroyEach();
        }

        if(kid.isTouching(unhealthyObjectGroup)){
            decreaseEnergy(50);
            unhealthyObjectGroup.destroyEach();
        }

        if(kid.isTouching(fairyBallGroup)){
            increaseEnergy(100);
            fairyBallGroup.destroyEach();
        }
        if(energy>500){
            gameState="win";
        }
        if(kid.isTouching(fireballGroup)){
            gameState="gameOver";
        }
        drawSprites();
    }
    if(gameState==="win"){
        fairy.destroy();
        kid.destroy();
        fairyBallGroup.destroyEach();
        fireballGroup.destroyEach();
        unhealthyObjectGroup.destroyEach();
        healthyObjectGroup.destroyEach();
        background(winImg);
        fill("red");
        textSize(150);
        text("Now you are healthy and strong", width/2-100, height/2);
    }
    if(gameState==="gameOver"){
        fairy.destroy();
        kid.destroy();
        fairyBallGroup.destroyEach();
        fireballGroup.destroyEach();
        unhealthyObjectGroup.destroyEach();
        healthyObjectGroup.destroyEach();
        background("Black");
        textSize(150);
        text("Game Over", width/2-100, height/2);
    }
    
}

function createObject(){
    if(frameCount % 70 === 0){

        randNum=Math.round(random(1,4));
        console.log(randNum)
        //healthy object will be created
        if(randNum === 1){

            healthyObject = createSprite(fairy.x,fairy.y);
            healthyObject.velocityY=energy/100*3;
            healthyObject.scale=0.1;

            healthyObjectGroup.add(healthyObject);
            healthyObjectGroup.setLifetimeEach(300);
            //healthy object can be apple(1)/orange(2)/strawberry(3)/fireball(4/5)
            var randNum2 = Math.round(random(1,3));
            switch(randNum2){
                
                case 1 : healthyObject.addImage(appleImg);
                break;
                case 2 : healthyObject.addImage(orangeImg);         
                break;
                case 3 : healthyObject.addImage(strawImg);
                            healthyObject.scale = 0.3;
                break;
               
            }
        }

        //unhealthy oject will be created in randNum value is 2
        if(randNum===2){
            unhealthyObject = createSprite(fairy.x,fairy.y);
            unhealthyObject.velocityY=(energy/100)*3;
            unhealthyObject.scale=0.1;

            unhealthyObjectGroup.add(unhealthyObject);
            unhealthyObjectGroup.setLifetimeEach(300);
            randNum3=Math.round(random(1,3));
            switch(randNum3){
                case 1 : unhealthyObject.addImage(sodaImg);
                break;
                case 2 : unhealthyObject.addImage(burgerImg);
                break;
                case 3 : unhealthyObject.addImage(frenchfriesImg);
                break;
            }
        }
        //fireball
        if(randNum===3){
            fireball=createSprite(fairy.x, fairy.y);
            fireball.velocityY=(energy/100)*3;
            fireball.scale=0.1;
            fireball.addImage(fireballsImg);
            fireballGroup.add(fireball);
            fireballGroup.setLifetimeEach(300);
        }
        //fairyBall->energy level will inc by 100 
        if(randNum===4){
            fairyBall=createSprite(fairy.x, fairy.y);
            fairyBall.velocityY=(energy/100)*3;
            fairyBall.scale=0.1;
            fairyBall.addImage(fairyballsImg);
            fairyBallGroup.add(fairyBall);
            fairyBallGroup.setLifetimeEach(300);
        }
        

    }
}
//to increase energy when the kid will eat healthy food
function increaseEnergy(level){
    energy+=level;
}

function decreaseEnergy(level){
    energy-=level;
}