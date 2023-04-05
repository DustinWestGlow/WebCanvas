function getrand(min, max) {
  return Math.random() * (max - min) + min;
}

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
    }
}
var me = new Character(120, 230);
document.onkeydown = function(e) {
	if(e.keyCode == 37) {
	    me.vx = -1;
	}
    if (e.keyCode == 39) {
	    me.vx = 1;
	}
}

class Bullet {
    constructor(x, y) {
        this.x = y;
        this.y = y;
    }
}

var bullets = [];

class Pulsar {
    constructor(x, y) {
        this.x = y;
        this.y = y;
    }
}

var pulsars = [];


document.onkeyup = function(e) {
	if(e.keyCode == 37 || e.keyCode == 39) {
	    me.vx = 0;
	}
    if (e.keyCode == 32) {
        var new_pulsar = new Pulsar(me.x, me.y-5);
        pulsars.append(new_pulsar);
    }
}



class Enemy {
  constructor() {
    this.alive = true;
  }
}
var enemies = [];
for (var i = 0; i < 10; i++) {
    var new_enemy = new Enemy();
    enemies.push(new_enemy);
}

//get a reference to the canvas 
var canvas = document.getElementById('canvas'); 
//get a reference to the drawing context 
var c = canvas.getContext('2d'); 

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

var tick = 0;
var img = document.getElementById("spriteimg");
var enxs = 0;
var denxs = 1;
function gameLoop() {
    window.requestAnimFrame(gameLoop);
    tick ++;
    if (tick > 10)
    {
        tick = 0;
    }
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    // c.drawImage( 
    //     img,        // the image of the sprite sheet 
    //     (12*tick) % (12*9) + 3,0+3,13-3*2,13-3*2, // source coordinates      (x,y,w,h) 
    //      50,50,13*5,13*5,  // destination coordinates (x,y,w,h) 
    // ); 
    enxs += denxs;
    if (enxs > 40) {
        denxs = -1 * 0.2;
    }
    else if (enxs < 10) {
        denxs = 1 * 0.2;
    }
    for (var i = 0; i < enemies.length; i++)
    {
        var x = enxs + (i * (200 / enemies.length));
        var w = 140 / enemies.length;
        // c.beginPath();
        if (enemies[i].alive == true) {
            c.fillStyle = "green";
        } else {
            c.fillStyle = "teal";
        }
        c.fillRect(x, 10, w, w);
        // c.closePath();
    }
    if (Math.ceil(getrand(1, 80)) == 14) {
        var bx = getrand(10, 240);
        var by = 20;
        this.bullets.push(new Bullet(bx, by));
    }
    for (var i = 0; i < bullets.length; i++)
    {
        c.fillStyle = "yellow";
        c.fillRect(bullets[i].x, bullets[i].y,
        5, 10);
        bullets[i].y += 1;
    }
    me.x += me.vx;
    c.fillStyle = "red";
    c.fillRect(me.x, me.y, 10, 20);
    for (var i = 0; i < pulsars.length; i++) {
        c.fillStyle = "blue";
        c.fillRect(pulsars[i].x, pulsars[i].y,
        2, 2);
        pulsars[i].y -= 4;
    }
}
window.requestAnimFrame(gameLoop);