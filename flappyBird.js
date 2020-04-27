let gameCanvas = document.getElementById('gameContainer');
let gameCtxt = gameCanvas.getContext("2d");

let ghost = new Image();;
let bg = new Image();
let cross = new Image();
let pipeBottom = new Image();
let person = new Image();
let personRunLeft = new Image();
let personSpeak;

ghost.src = 'ghostSmall';
bg.src = 'sunset';
cross.src = 'cross'; 
pipeBottom.src = 'tube2.png';
person.src = 'personNorm';
personRunLeft.src = 'personScareRunLeftSheet.png'

let bX;
let bY;
// let pX;
// let pY;
let score;
let jumping = 0;
let bXvelo = 0;
let bYvelo = 1.5;
let pXvelo = 0;
let pYvelo = 1.5;
let scoreLog;
var crossArr = [];
let crossNum;
var people = [];
let peopleNum;

window.onload = startUp();

function startUp(){

bX = 10;
bY = 85;
// pX = 700;
// pY = 297;
scoreLog = 0;
crossNum = Math.floor(Math.random()*10);
for (i = 1; i < crossNum; i++){
    crossArr.push(cross)
    crossArr[i] = {
        x : Math.random()*800,
    } 
}
peopleNum = Math.floor(Math.random()*10);
for (i = 1; i < peopleNum; i++){
    people.push(person)
    people[i] = {
        pX : Math.random()*800,
        pY : 296,
        pXvelo : 0,
        pYvelo : 1.5,
        //src : 'personNorm'

    } 
}

};


controller = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event){
        var key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 37:
            controller.left = key_state;
            break;
            case 38:
            controller.up = key_state;
            break;
            case 39:
            controller.right = key_state;
            break;

        }
    }
}

let scaring = false;

function draw(){
    //draw background
    gameCtxt.drawImage(bg,0,0, bg.width, bg.height, 0, 0, gameCanvas.width, gameCanvas.height);


    //draw crosses
    for (i = 0; i<crossArr.length; i++){
        gameCtxt.drawImage(cross, crossArr[i].x, 312);
    }

    //draw people
    for (i = 0; i<people.length; i++){
        gameCtxt.drawImage(person, people[i].pX, people[i].pY);
        if (bX >= people[i].pX - 100 && bX <= people[i].pX + 100 && bY >= 200){
            if (bX < people[i].pX){
                if (scaring == false){
                    scoreLog++;
                }
                scaring = true;
                people[i].pXvelo += 0.2;
                //people[i].src = 'personScareRunLeftSheet.png';
                gameCtxt.fillText('Aaaaah!', people[i].pX - 2, people[i].pY -10);
                
            }
            else if (bX > people[i].pX){
                if (scaring == false){
                    scoreLog++;
                }
                scaring = true;
                people[i].pXvelo -= 0.2;
                //people[i].src = 'personScareRunLeftSheet.png';
                gameCtxt.fillText('Aaaaah!', people[i].pX - 2, people[i].pY -10);
                
            }
        }
        else{
            people[i].src = 'personNorm';
            scaring = false;
            
        }

        if (people[i].pX < 0 - person.width){
            people[i].pX = 780;
        }
        else if (people[i].pX > gameCanvas.width){
            people[i].pX = 20 - person.width;
        }
        people[i].pX += people[i].pXvelo;
        people[i].pY += people[i].pYvelo;
        people[i].pXvelo *= 0.9;
        people[i].pYvelo *= 0.9;
    }

    //gameCtxt.drawImage(person, pX, pY);

    if (controller.up ==true){
        jumping = true;
        bYvelo -= 1;
    }

    if (controller.left ==true){
        ghost.src = 'ghostLeft'
        bXvelo -= 0.5;
    }

    if (controller.right ==true){
        ghost.src = 'ghostSmall'
        bXvelo += 0.5;
    }

    if (bY < (gameCanvas.height - 65)){
        jumping = true;
        bY +=3;
    }

    if (bX < 0 - ghost.width){
        bX = 790;
    }
    else if (bX > gameCanvas.width){
        bX = 10 - ghost.width;
    }

    bX += bXvelo;
    bY += bYvelo;
    bXvelo *= 0.9;
    bYvelo *= 0.9;

    gameCtxt.drawImage(ghost,bX,bY);

    gameCtxt.font = 'bold 20px Annie Use Your Telescope';
    gameCtxt.fillText('Scare score: ' + scoreLog, gameCanvas.width - 150, 50);

    requestAnimationFrame(draw);

}

draw();

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);

