// var parse = require("modules/animframe.js");
// import requestAnimFrame from "./modules/animframe.js";

function getrand(min, max) {
  return Math.random() * (max - min) + min;
}

time = 0;
// debug don't wipe screen
// helped planet iteration and screen wipe problem
keepclearing = true;//false;//true;
// post general planet info at first
general_info_planet(planets[0]);
function gameLoop() {
  // only clear once per game loop
  // DO NOT clear for every planet or only 1 planet will show
  if (keepclearing)
  {
    // Clear Screen
    clearScreen();
  }
  // update time
  time = (time + 1) % 360;
  for (var i = 0; i < planets.length; i++) {
    // The Sun
    drawSun();
    // update planet
    var planet = planets[i];
    updatePlanet(planet, time);
    // draw planet
    drawPlanet(planet);
    // then post specific time-dependent info
    // observe planet (html table)
    observePlanet(planet);
    // if (keepclearing)
    // {
      // console.log(planet);
    // }
  }
  window.requestAnimFrame(gameLoop);
}
window.requestAnimFrame(gameLoop);