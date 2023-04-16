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
var player = new Player();
player.width = 46;  
player.height = 46;

function gameLoop() {
    processInput();
    checkConditions();
    draw();
    windows.requestAnimFrame(gameLoop);
}
windows.requestAnimFrame(gameLoop);

