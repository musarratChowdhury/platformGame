//Global Variables
let CANVAS_HEIGHT=600;
let CANVAS_WIDTH=3500;
let CHARACTER_HEIGHT=140;
let CHARACTER_WIDTH=100;
let SPRITESHEET_WIDTH=258;
let SPRITESHEET_HEIGHT=405;
let ROW=4;
let COL=3;

let OBSTACLES=[];
let COLLECTABLES=[];

//keyboard setup
const SPACEBAR = 32;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_UP = 38;

let moveleft=false;
let moveright=false;
let jump = false;
let faceleft=false;
let keyachieved=false


 
let gameOver=false;
let levelcomplete=false;

let score=0;
let lives=0;
let fps=10;

//startAll function
function startAll(){
    myGameArea.start()

    wallpaper = new imageBuilder(0,0,CANVAS_WIDTH,CANVAS_HEIGHT,'./assets/bg.png')
    musique = new Sound("assets/musique1.wav") //background music
    
    
    ground1= new imageBuilder(0,413,752,189,'./assets/ground1.png','ground')
    ground2 = new imageBuilder(748,472,255,129,'./assets/ground2.png','ground')
    ground3 = new imageBuilder(1555,473,579,127,'./assets/ground3.png','ground')
    ground4 = new imageBuilder(2130,419,252,187,'./assets/ground4.png','ground')
    ground5 = new imageBuilder(3093,488,407,122,'./assets/ground5.png','ground')

    box1 = new imageBuilder(895,317,191,64,'./assets/box1.png','box');
    box2 = new imageBuilder(1166,183,191,64,'./assets/box2.png','box');
    box3 = new imageBuilder(1224,397,191,64,'./assets/box3.png','box');
    box4 = new imageBuilder(1462,288,191,64,'./assets/box1.png','box');
    box5 = new imageBuilder(2271,288,191,64,'./assets/box2.png','box');
    box6 = new imageBuilder(2440,144,191,64,'./assets/box3.png','box');
    box7 = new imageBuilder(2629,288,191,64,'./assets/box1.png','box');
    box8 = new imageBuilder(2975,165,191,64,'./assets/box2.png','box');
    box9 = new imageBuilder(2900,356,191,64,'./assets/box3.png','box');
    box10 = new imageBuilder(240,265,191,64,'./assets/box2.png','box');
    

    danger1 = new imageBuilder(1004,572,556,32,'./assets/danger.png','danger');
    danger2 = new imageBuilder(2382,573,709,34,'./assets/danger2.png','danger');
    danger3 = new imageBuilder(2019,447,119,33,'./assets/danger3.png','danger');

    zombie1 = new SPRITEIMAGE(0,0,480,94,6,1,630,ground1.y-CHARACTER_HEIGHT,CHARACTER_WIDTH,CHARACTER_HEIGHT,'./assets/zombie.png','zombie')
    zombie2 = new SPRITEIMAGE(0,0,480,94,6,1,ground3.x+ground3.width-CHARACTER_WIDTH,ground3.y-CHARACTER_HEIGHT,CHARACTER_WIDTH,CHARACTER_HEIGHT,'./assets/zombie.png','zombie')
    
    door = new imageBuilder(3434,366,66,128,'./assets/door.png','door')
    key = new imageBuilder(3099,104,44,27,'assets/key.png','key')
    
    Diamonds=[]
    for(let i=0;i<12;i++){
        for(let j=0;j<4;j++){
            Diamonds.push(new imageBuilder(100+getRndInteger(300,1000)*i,75+getRndInteger(100,300)*j,40,40,'./assets/diamond1.png'))
        } 
    }
    for(let i=0;i<12;i++){
        for(let j=0;j<4;j++){
            Diamonds.push(new imageBuilder(100+getRndInteger(300,1300)*i,75+getRndInteger(100,300)*j,40,40,'./assets/diamond2.png'))
        } 
    }
    for(let i=0;i<12;i++){
        for(let j=0;j<1;j++){
            Diamonds.push(new imageBuilder(100+getRndInteger(300,2000)*i,75+getRndInteger(100,500)*j,40,40,'./assets/diamond3.png'))
        } 
    }

    grounds=[ground1,ground2,ground3,ground4,ground5]
    obstacles=[danger1,danger2,danger3]
    boxes=[box1,box2,box3,box4,box5,box6,box7,box8,box9,box10]
 
    momo = new SPRITEIMAGE(0,0,SPRITESHEET_WIDTH,SPRITESHEET_HEIGHT,COL,ROW,200,ground1.y-CHARACTER_HEIGHT,CHARACTER_WIDTH,CHARACTER_HEIGHT,'./assets/final_spritesheet2.png')

    window.onkeydown = keyDownHandler;
    window.onkeyup = keyUpHandler;

}





//Our GameArea

let myGameArea={
    canvas:document.getElementById('gameCanvas'),
    viewport:document.getElementById('gameCanvasV'),
    start:function(){
        this.canvas.width=CANVAS_WIDTH;
        this.canvas.height=CANVAS_HEIGHT;
        

        this.viewport.width=1000;
        this.viewport.height=600;
        this.viewport.style.border='2px solid';
        this.context2=this.viewport.getContext('2d');
        this.canvas.style.border='2px solid'
        this.context=this.canvas.getContext('2d');
        this.frameNo=0;
        this.interval=setInterval(()=>{
            musique.Play()  ///music added here
            drawEverything()
            viewportDraw()
        },1000/fps)
    },
    clear:function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.context2.clearRect(0, 0, this.viewport.width, this.viewport.height);
    },
    stop:function(){
        clearInterval(this.interval)
    }
}
//viewport settings
function viewportDraw(){
                let  ctx = myGameArea.context2;
			
				
				 //alert(cat.x);
				 var w = -momo.x+500-momo.height/2;//camera fix
				 var h = -momo.y+350-momo.height/2;
				 
                 if(w > 0)w = 0;
                 if(h > 0)h = 0;
                 if(w < -myGameArea.canvas.width+1000)w = -myGameArea.canvas.width+1000;
                 if(h < -myGameArea.canvas.height+600)h = -myGameArea.canvas.height+600;
                 ctx.drawImage(myGameArea.canvas,w,h);
                 ctx.font = "30px Arial";
                 ctx.fillStyle = "green";
                 ctx.fillText("Score : "+score,20,30);
                 
                 if(gameOver){
                     ctx.font = "50px Arial"
                     ctx.fillStyle='red';
                     ctx.fillText("Game Over !!",340,220)
                     myGameArea.stop()
                 }
                 if(levelcomplete){
                     ctx.font = "50px Arial"
                     ctx.fillStyle='navy';
                     ctx.fillText("Level Completed!!",300,220)
                     myGameArea.stop()
                 }
}

//drawEverything function
function drawEverything(){
    myGameArea.clear()
    wallpaper.draw()

    Diamonds.forEach(diamond=>{
        diamond.draw()
    })

    obstacles.forEach(obstacle=>{
        obstacle.draw()
    })
   
    grounds.forEach(element => {
        element.draw() 
    });
    boxes.forEach(box=>{
        box.draw()
    })
    


    momo.draw()
    
    zombie1.draw()
    zombie2.draw()
    door.draw()
    if(!keyachieved)key.draw()
    momo.newpos()
    momo.landOn(ground1)
    momo.landOn(ground2)
    momo.landOn(ground3)
    momo.landOn(ground4)
    momo.landOn(ground5)
    momo.landOn(danger1)
    momo.landOn(danger2)
    momo.landOn(danger3)
    momo.landOn(box1)
    momo.landOn(box2)
    momo.landOn(box3)
    momo.landOn(box4)
    momo.landOn(box5)
    momo.landOn(box6)
    momo.landOn(box7)
    momo.landOn(box8)
    momo.landOn(box9)
    momo.landOn(box10)

    if(moveright){
        momo.moveright()
    }
    if(moveleft){
        faceleft=true;
        momo.moveleft()
    }
    if(jump){
        momo.moveup()
    }
    if(momo.crashWith(key)){
        console.log('key achieved');
       return keyachieved=true;
    }
    if(momo.crashWith(door)){
        if(keyachieved && score>=100){
            console.log('level completed');
            levelcomplete=true;
        }
    }
    
    momo.hitbottom()
    momo.hitBorder()
    momo.getsDiamondChk(Diamonds)
    
    zombie1.zombieMove(ground1)
    zombie2.zombieMove(ground3)

    if(momo.crashWith(zombie1)||momo.crashWith(zombie2)){
        console.log('gameOver!');
        gameOver=true;
    }


}


//Constructor Functions
class imageBuilder{//......................ECMA6 clss/object constructor...........
    constructor(x,y,width,height,color,type){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.image = new Image();
        this.image.src = color;  
        this.type=type; 
    }
    draw(){
         let ctx=myGameArea.context;
         ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }

}


class SPRITEIMAGE{
    constructor(srcX,srcY,spritewidth,spriteheight,col,row,x,y,width,height,src,type){
        this.srcX=srcX;
        this.srcY=srcY;
        this.swidth=spritewidth/col;
        this.sheight = spriteheight/row;
        this.x=x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = src;
        this.moveleftZ=false;
        this.type=type;
        this.curFrame = 0;
        this.frameCount = col;
        this.bounce=.3; 
        this.gravity = 0;
        this.gravitySpeed = 0;  
        this.keyMoveUp=false;
    }
    draw(){
       // this.updateFrame()
        let ctx = myGameArea.context;

        if(this.type=='zombie'){
            this.updateFrame();
            ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }else{
            if(moveleft){
                this.shiftRow(3);
                this.updateFrame();
                ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            }
            else if(moveright){
                faceleft=false;
                this.shiftRow(2);
                this.updateFrame();
                ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            }
            else if(jump){
                this.shiftRow(1);
                this.updateFrame();
                ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            }
            else{
                    if(faceleft){
                        this.srcY=0;
                        this.shiftCol(2);
                    }else{
                        this.srcY=0;
                        this.srcX=0;
                    } 
                    ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
                
            }
        }
        
       
        
        
    }
    updateFrame(){
        if(this.curFrame>=this.frameCount){
            this.curFrame=0;     
        }
        this.srcX = this.curFrame*this.swidth;
        this.curFrame++;
    }
    shiftRow(row_no){
        this.srcY=row_no*this.sheight;
    }
    shiftCol(col_no){
        this.srcX = col_no*this.swidth;
    }
    moveright(){
      this.x+=20;
    }
    moveleft(){
      this.x-=20;
    }
    moveup(){
          if(!this.keyMoveUp){
            this.gravitySpeed=-52;
            this.gravity=+12;
            return this.keyMoveUp=true;
          }
    }
    hitbottom(){
        let rockbottom=CANVAS_HEIGHT-this.height;
        if(this.y>rockbottom){
            this.y=rockbottom
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            return this.keyMoveUp=false;
           
        }
    }
    hitBorder(){
        let rightborder=CANVAS_WIDTH-this.width;
        
        if(this.y<0){
            this.y=0;
        }
    
        if(this.x>rightborder){
            this.x=rightborder;
        }
        if(this.x<0){
            this.x=0;
        }
    }
    newpos(){
        
        this.gravitySpeed += this.gravity;
        this.y +=this.gravitySpeed;
  
    }
    landOn(otherobj){

        if(otherobj.type=='ground'||otherobj.type=='box'){
            let rockbottom=otherobj.y-this.height;//this.y=otherobj.y-this.height
       
            if(this.x+this.width>otherobj.x&&this.x<otherobj.x+otherobj.width){
                if(this.y>rockbottom&&this.y+this.height<otherobj.y+otherobj.height){
                     this.y=rockbottom;
               
              this.gravitySpeed = -(this.gravitySpeed * this.bounce);
             return this.keyMoveUp=false;
             
                            
                }
            }
        }
        if(otherobj.type=='danger'){
            let rockbottom=otherobj.y-this.height;//this.y=otherobj.y-this.height
       
            if(this.x+this.width>otherobj.x&&this.x<otherobj.x+otherobj.width){
                if(this.y>rockbottom&&this.y+this.height<otherobj.y+otherobj.height){
                     this.y=rockbottom;
                     console.log('gameOver');
                     gameOver=true;
                }
            }
        }
      
    }
    crashWith(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width-50);
        var mytop = this.y;
        var mybottom = this.y + (this.height-20);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
     }
    getsDiamondChk(Diamonds){
        Diamonds.forEach((Diamond,i)=>{
            if(this.crashWith(Diamond)){
                Diamonds.splice(i,1);
                i--;
                score+=10; 
            }
        })
    }
    zombieMove(ground){
        
         if(this.moveleftZ){
            this.x-=12;
         }else{
             this.x+=12;
         } 
         if(this.x<=ground.x){
            this.moveleftZ=false;
        }    
        if(this.x+this.width>=ground.x+ground.width){
            this.moveleftZ=true;
        }  
               
            
    }

}


//necessary functions

function getRndInteger(min,max){
     return Math.floor(Math.random()*(max-min))+min;
}
function Sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload","auto");
    this.sound.setAttribute("controls","none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.Play = function(){
        this.sound.play()
    }
    this.Stop = function(){
        this.sound.pause()
    }
}

//keyboard controlls

function keyDownHandler(e){
    switch(e.keyCode){
        
        case KEYCODE_LEFT:moveleft=true;
        break;
        case KEYCODE_RIGHT:moveright=true;
        break;
        case SPACEBAR:jump=true
        break;

    }
}
function keyUpHandler(e){
    switch(e.keyCode){
        case KEYCODE_LEFT:moveleft=false;
        break;
        case KEYCODE_RIGHT:moveright=false;
        break;
        case SPACEBAR:jump=false;
        break;
    }
}