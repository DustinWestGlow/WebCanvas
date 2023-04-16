// canvas variables
var can = document.getElementById("canvas"); 
var c = can.getContext('2d'); 
// shim layer with setTimeout fallback 
window.requestAnimFrame = (function(){ 
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          window.oRequestAnimationFrame      ||  
          window.msRequestAnimationFrame     ||  
          function( callback ){ 
            window.setTimeout(callback, 1000 / 60); 
          }; 
})();

// image loading and storing
var ship_image; 
var bomb_image; 
var bullet_image; 
loadResources(); 
function loadResources() { 
    
    ship_image = new Image(); 
    ship_image.src = "Hunter1.bmp"; 
    
    bomb_image = new Image(); 
    bomb_image.src = "bomb1.bmp"; 
     
    bullet_image = new Image(); 
    bullet_image.src = "Bullets.bmp"; 
    
} 

var can_vars = {
    w: 600,
    h: 400
};

// key storage variable
var keys = {};
// key binds affect key variables
document.onkeydown = function(e) {
    keys[e.keyCode] = true;
};
document.onkeyup = function(e) {
    keys[e.keyCode] = false;
};

// player initialization
class Player {
    constructor(x, y, w, h) {
        this.x = 20;
        this.y = can_vars.h - 50;
        this.w = w;
        this.h = w;
        this.alive = true;
    }
}
var player = new Player(0,0, 46, 46);
player.width = 46;  
player.height = 46;

// player's weapon definition
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.counter = 0;
    }
}
var bullets = [];

function createBomb(enemy) { 
    return { 
        x:enemy.x, 
        y:enemy.y+enemy.height, 
        width:4, 
        height:12, 
        width:30, 
        height:30, 
        counter:0, 
    } 
} 
 

// enemy definition
class Enemy {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = 50;
        this.w = w;
        this.h = h;
        this.alive = true;
    }
}
// generate enemies
var enemies = [];
// 10 enemies
var enemy_count = 10;
// for each new enemy
for (var i = 0; i < enemy_count; i++) {
    // x = range(45, 600-45-e.w, ~e.w)
    var x_min = 45;
    var x_max = can_vars.w - 45 - 50;
    var step = (x_max - x_min) / enemy_count;
    var enemy_x = x_min + (step * i);
    // add enemy to list
    enemies.push(new Enemy(enemy_x, 0,
    25, 25));
}
// if gone right, go left and down
// if gone left, go right and down
var edriftx = 0;
var emovex = 2;
var edrifty = 0;



// affect player coords by key input
// only Left/Right by 3 pix per frame
// bullet once per key press trick
var bullet_pressed = false;
function processInput() {
    // left
    if (keys[37] == true) {
        player.x -= 4;
    }
    // right
    if (keys[39] == true) {
        player.x += 4;
    }
    // space bullets
    if (keys[32] == true) {
        bullet_pressed = true;
    }
    if (keys[32] == false
    && bullet_pressed == true) {
        bullets.push(new Bullet(
            player.x, player.y));
        bullet_pressed = false;
    }
}

// 
function checkConditions() {
    
    // explained above
    // keep moving enemies left/right and down
    // 100 and 50 magic numbers very confused
    if (edriftx > 100) {
        emovex = -2;
        edrifty += 5;
    }
    if (edriftx < -40) {
        emovex = 2;
        edrifty += 5;
    }
    // should be handled in update()
    // but would be confusing code
    edriftx += emovex;
    
}

function update() {
    
    // move enemies
    for (var i = 0; i < enemy_count; i++) {
        enemies[i].x += emovex;
        enemies[i].y = 50 + edrifty;
    }
    
    // keep shot path of bombs (enemy bullets)
    // update their counters
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].counter ++;
        bombs[i].y += 1.5;
    }
    
    // keep shot path of bullets
    // update their counters
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].counter ++;
        bullets[i].y -= 4;
    }
    
}

function drawPlayerBullets() {
    for(i in bullets) { 
        var bullet = bullets[i]; 
        var count = Math.floor(bullet.counter/10); 
        var yoff = (count%3)*12; 
        //c.fillRect(bullet.x, bullet.y, bullet.width,bullet.height); 
        c.drawImage( 
            bullet_image, 
            0+146,yoff+2,8,8,//src 
            bullet.x,bullet.y,bullet.w,bullet.h//dst 
        ); 
    } 
}

function drawBombs(c) { 
    for(var i in enemyBullets) { 
        var bullet = enemyBullets[i]; 
        c.fillStyle = "yellow"; 
        c.fillRect(bullet.x, bullet.y , bullet.width, bullet.height); 
        var xoff = (bullet.counter%9)*12 + 1; 
        var yoff = 1; 
        c.drawImage(bomb_image, 
            xoff,yoff,11,11,//src 
            bullet.x,bullet.y,bullet.width,bullet.height//dest 
            ); 
    } 
} 

// draw screen
function draw() {
    
    // background
    c.fillStyle = "black";
    c.fillRect(0,0,
    can_vars.w, can_vars.h);
    
    // player
    // c.fillStyle = "red";
    // c.fillRect(player.x, player.y,
    // player.w, player.h)
     c.drawImage(ship_image,  
	    26,2, 21,21, //src coords 
	    player.x, player.y, player.w, player.h //dst coords 
	    ); 
 
    
    // enemies
    c.fillStyle = "green";
    for (var i = 0; i < enemy_count; i++) {
        var e = enemies[i];
        c.fillRect(e.x, e.y,
        e.w, e.h);
    }
    
    // player bullets
    drawPlayerBullets();
    // // bullets
    // c.fillStyle = "blue";
    // for (var i = 0; i< bullets.length; i++) {
    //     var p = bullets[i];
    //     c.fillRect(p.x, p.y,
    //     p.w, p.h);
    // }
    
    // enemy bullets/bombs
    drawBombs();
    
}

function gameLoop() {
    processInput();
    checkConditions();
    update();
    draw();
    window.requestAnimFrame(gameLoop);
}
window.requestAnimFrame(gameLoop);

