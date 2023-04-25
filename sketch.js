const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

//declalring variables

//ground
var ground
var lowerground

//background
var bg_img

//bunny main charactor
var rabbit
var blink,eat,sad
var bunny

//fruit and bubble
var fruit
var food_con
var food_con_2
var bubble
var bubble_img;

//buttons
var button
var button2

//sounds
var cut_sound;
var sad_sound;
var eating_sound;

//rope
var rope
var rope2


// function preload to load images 
function preload(){
  // background 
  bg_img=loadImage("background.png")

  //bunny
  rabbit=loadImage("Rabbit-01.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  //food and bubble
  food = loadImage('melon.png');
  bubble_img = loadImage("bubble.png")

  //sounds
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //creating new ground
  ground = new Ground(300,250,80,10);
   
  //creating lower ground
  lowerground =new Ground(250,700,500,20);

  // creating bunny
  bunny = createSprite(280,180,100,100);
  bunny.scale = 0.2;

  //framdely for slowmotion of animation
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  //adding animations to bunny
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  //creating buttons
  button= createImg('cut_btn.png');
  button.position(30,350);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(160,340);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  //creating rope
  rope = new Rope(3,{x:50,y:370});
  rope2 = new Rope(5,{x:200,y:340});
  

  //creating fruit
  fruit = Bodies.circle(350,250,20);
  Matter.Composite.add(rope.body,fruit);
  //connecting fruit
  fruit_con = new link(rope,fruit);
  fruit_con_2 = new link(rope2,fruit);

  //creating bubble
  bubble = createSprite(300,500,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(51);
  image(bg_img,0,0,490,690); 
  Engine.update(engine);
  

  push();
  imageMode(CENTER);  
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  
  //showing class
  ground.show();
  lowerground.show();
  rope.show();
  rope2.show();

  //condition for gravity change
  if(collide(fruit,bubble,40) == true){
    engine.world.gravity.y = -1;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
  }

  // condition to detect collision between bunny and fruit
  if(collide(fruit,bunny,80)==true){
    drop2();
    World.remove(engine.world,fruit);
    fruit= null
    bubble.visible = false;
    bunny.changeAnimation('eating');

  }

  drawSprites(); 

}

//creation function to detach rope with button
//for button1
function drop(){
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//for button2
function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2= null; 
}

// function collide to detect collisison
function collide(body,sprite,x){
  if(body!=null){
   var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x){
      return true; 
     }
    else{
     return false;
    }
   }
}