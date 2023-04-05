function getrand(min, max) {
  return Math.random() * (max - min) + min;
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

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var bullets = [];

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
    if (tick == 5) {
        var bx = getrand(10, 240);
        var by = 20;
        this.bullets.push(new Bullet(bx, by));
    }
}
window.requestAnimFrame(gameLoop);