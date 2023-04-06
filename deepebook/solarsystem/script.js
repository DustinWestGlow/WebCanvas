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

function getrand(min, max) {
  return Math.random() * (max - min) + min;
}

class Star {
  constructor(rad) {
    this.x = 0;
    this.y = 0;
    this.radius = rad;
  }
}

class Planet {
  constructor(rad, orb_rad) {
    this.radius = rad;
    this.orbitRadius = orb_rad;
    this.x = orb_rad;
    this.y = 0;
  }
}

//get a reference to the canvas
var canvas = document.getElementById('canvas');
//get a reference to the drawing context
var c = canvas.getContext('2d');

// https://stackoverflow.com/questions/5760897/html5-canvas-inverted-coordinate-system
c.translate(0, 250);
c.scale(1, -1);
c.translate(250/2, 250/2);

function clearScreen() {
    c.fillStyle = "white";
    c.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
}

var sun = new Star(25);
function drawSun() {
    c.beginPath();
    c.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
}

// solar system constants
var earth_real = 9.3024 *Math.pow(10, 7);
// largest real of planet orbits (earth or neptune/pluto)
var lg_orbit = earth_real;
var earth_mapped = (lg_orbit/earth_real)*canvas.width/2;

var planets = [];
var earth = new Planet(10, canvas.width / 2);
planets.push(earth);
function calc_orbit(orbit_real) {
  orbit_ratio = orbit_real / earth_real;
  ratio_mapped = earth_mapped * orbit_ratio;
  return ratio_mapped;
}
function calc_radius(radius_real) {
  // planets are really small in comparison to distance from sun
  // so if planet radius too small, keep minmum size regardless
  Math.max(, 7);
}
var mercury_distance = 2.9634 * Math.pow(10, 7);
var mercury = new Planet(10, calc_orbit(mercury_distance));
planets.push(mercury);


//new code
var imgs = [];
 
function loadResources() {
  img = new Image();
  img.src = "media/earth.jpeg";
  imgs.push(img);
}
loadResources();

function drawPlanet(planet) {
    // draw and color planet
    c.beginPath();
    c.drawImage(imgs[0], planet.x - planet.radius, planet.y - planet.radius, 20, 20)
    // c.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    c.fillStyle = "green";
    c.fill();
    // draw and color orbit circle
    c.beginPath();
    c.arc(sun.x, sun.y, planet.orbitRadius, 0, Math.PI*2);
    c.strokeStyle = "purple";
    c.stroke();
}

time = 0;
// debug don't wipe screen
// helped planet iteration and screen wipe problem
keepclearing = true;
function gameLoop() {
  // only clear once per game loop
  // DO NOT clear for every planet or only 1 planet will show
  if (keepclearing)
  {
    // Clear Screen
    clearScreen();
  }
  for (var i = 0; i < planets.length; i++) {
    
    // The Sun
    drawSun();
    // draw Earth
    var planet = planets[i];
    drawPlanet(planet);
    // update Earth
    time += 1;
    planet.x = Math.cos(time * (2*Math.PI/360)) * planet.orbitRadius;
    planet.y = Math.sin(time * (2*Math.PI/360)) * planet.orbitRadius;
  }
    window.requestAnimFrame(gameLoop);
}
window.requestAnimFrame(gameLoop);