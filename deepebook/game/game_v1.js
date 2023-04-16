function getrand(min, max) {
  return Math.random() * (max - min) + min;
}

document.onkeydown = function(e) {
	if(e.keyCode == 37) {
	    me.vx = -1;
	}
    if (e.keyCode == 39) {
	    me.vx = 1;
	}
	if (e.keyCode == 32) {
        var new_pulsar = new Pulsar(me.x, me.y);
        // console.log(new_pulsar);
        // console.log(me);
        // console.log(me.x);
        pulsars.push(new_pulsar);
        // console.log(pulsars);
    }
};

document.onkeyup = function(e) {
	if(e.keyCode == 37 || e.keyCode == 39) {
	    me.vx = 0;
	}
};



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
// var img = document.getElementById("spriteimg");
var enxs = 0;
var denxs = 1;
var dead = false;

function gameLoop() {
    if (dead == true) {
        var death_h1 = document.getElementById("dead")
        death_h1.style.display = "block";
        canvas.style.display = "none";
        return;
    }
    // Refresh Canvas
    drawCanvas();
    window.requestAnimFrame(gameLoop);
    tick ++;
    if (tick > 10)
    {
        tick = 0;
    }
    
    // c.drawImage( 
    //     img,        // the image of the sprite sheet 
    //     (12*tick) % (12*9) + 3,0+3,13-3*2,13-3*2, // source coordinates      (x,y,w,h) 
    //      50,50,13*5,13*5,  // destination coordinates (x,y,w,h) 
    // ); 
    
    // bounce x movement of enemies
    enxs += denxs;
    if (enxs > 40) {
        denxs = -1 * 0.2;
    }
    else if (enxs < 10) {
        denxs = 1 * 0.2;
    }
    // draw enemies
    drawEnemies();
    
    if (Math.ceil(getrand(1, 80)) == 14) {
        var bx = Math.ceil(getrand(30, 200));
        var by = 20;
        var new_bullet = new Bullet(bx, by);
        bullets.push(new_bullet);
        // console.log(bullets);
    }
    for (var i = 0; i < bullets.length; i++)
    {
        
        c.fillStyle = "yellow";
        // console.log(bullets[i]);
        c.fillRect(bullets[i].x, bullets[i].y,
        5, 10);
        bullets[i].y += 1;   
    }
    me.x += me.vx;
    c.fillStyle = "red";
    c.fillRect(me.x, me.y, 10, 20);
    for (var i = 0; i < pulsars.length; i++)
    {
        c.fillStyle = "blue";
        c.fillRect(pulsars[i].x, pulsars[i].y,
        2, 2);
        pulsars[i].y = pulsars[i].y - 2;
    }
    for (var i = 0; i < bullets.length; i++)
    {
        bx = bullets[i].x;
        by = bullets[i].y;
        if (bx >= me.x-5 && bx <= me.x) {
            if (by >= me.y-5 && by <= me.y)
            {
                dead = true;
                return;
            }
        }
    }
    for (var i = 0; i < pulsars.length; i++)
    {
        var px = pulsars[i].x;
        var py = pulsars[i].y;
        for (var j = 0; j < enemies.length; j++)
        {
            if (enemies[j].alive == false)
            {
                console.log("enemies[j].alive == false");
                console.log(enemies);
                continue;
            }
            var ex = enemies[j].x;
            // enemies DONT HAVE A '.y'
            var ey = 10;
            // console.log("pulsar shots");
            // console.log(enemies);
            if (px >= ex-10 && px <= ex)
            {
                if (py >= ey-10 && py <= ey)
                {
                    
                    enemies[j].alive = false;
                    continue;
                }
            }
        }
    }
    var won = true;
    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive == true)
        {
            won = false;
            break;
        }
    }
    if (won == true)
    {
        var won_h1 = document.getElementById("won");
        won_h1.style.display = "block";
        canvas.style.display = "none";
        return;
    }
    for (var i = 0; i < bullets.length; i++)
    {
        if (bullets[i].y > 250) {
            bullets.splice(i, 1);
        }
    }
    for (var i = 0; i < pulsars.length; i++)
    {
        if (pulsars[i].y > 250) {
            pulsars.splice(i, 1);
        }
    }
}
window.requestAnimFrame(gameLoop);