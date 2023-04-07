/** Planet Radii
 * and Orbit Radii (Circular)
 * Used to calculate real math 2 pixels
 **/
var radii = [
1.516 * Math.pow(10, 3),
3.760 * Math.pow(10, 3),
3.959 * Math.pow(10, 3),
2.106 * Math.pow(10, 3),
4.344 * Math.pow(10, 4),
3.618 * Math.pow(10, 4),
1.576 * Math.pow(10, 4),
1.530 * Math.pow(10, 4)
];
var orbit_radii = [
5.79 * Math.pow(10, 7),
0.672 * Math.pow(10, 8),
0.930 * Math.pow(10, 8),
1.417 * Math.pow(10, 8),
4.837 * Math.pow(10, 8),
8.898 * Math.pow(10, 8),
1.421 * Math.pow(10, 9),
2.805 * Math.pow(10, 9)
];
// scale out to neptune
outer = orbit_radii[orbit_radii.length - 1];
// real miles 2 digital pixels
// based on outer canvas limit a.k.a outermost planet
// then draw outer as outer pix, middle as middle px, ...
function real2d(miles) {
  return miles / outer * canvas.width / 2;
}
class Planet {
  constructor(nth, rad, real_rad, orb_rad, real_orb_rad, pimg) {
    this.nth = nth;
    this.radius = {r: real_rad, d: rad};
    this.orbitRadius = {r: real_orb_rad, d: orb_rad};
    this.x = {r: 0, d: 0};
    this.y = {r: 0, d: 0};
    this.img = pimg;
    // start all planets in line at beginning of simulation
    // distanced realistically
    // will be wiped/updated by update loop
  }
}
var pimgs = [
"mercury.jpeg",
"venus.jpeg",
"earth.jpeg",
"elonmusk.jpeg",
"jupiter.jpeg",
"saturn.jpeg",
"uranus.jpeg",
"neptune.jpeg",
];

planet_count = 8;
var planets = [];
for (var i = 0; i < planet_count; i++)
{
  var img = new Image();
  img.src = "media/" + pimgs[i];
  var np = new Planet(i, real2d(radii[i]), radii[i], real2d(orbit_radii[i]), orbit_radii[i], img);
  planets.push(np);
}

/** BEGIN SUN */
class Star {
  constructor(rad) {
    this.x = 0;
    this.y = 0;
    this.radius = rad;
  }
}
var sun_radii = 4.325 * Math.pow(10, 5);
var sun = new Star(sun_radii);
var sun_img = new Image();
// 'media' not '/media'
sun_img.src = "media/sun.jpeg";
function drawSun() {
    // c.drawImage(sun_img, sun.x - 10, sun.y - 10, 20, 20);
    c.beginPath();
    c.arc(sun.x, sun.y, real2d(sun.radius), 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
}
/** END SUN */

function drawPlanet(planet) {
    // draw and color planet
    c.drawImage(planet.img, planet.x.d, planet.y.d, 20, 20);
    // c.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    // draw and color orbit circle
    c.beginPath();
    // circle x,y at sun, then stretch out to planet
    c.arc(sun.x, sun.y, planet.orbitRadius.d, 0, Math.PI*2);
    c.strokeStyle = "purple";
    c.stroke();
}
function updatePlanet(planet, time) {
  angle = (time/360) * (2 * Math.PI);
  planet.x.r = Math.cos(angle) * planet.orbitRadius.r;
  planet.y.r = Math.sin(angle) * planet.orbitRadius.r;
  planet.x.d = Math.cos(angle) * planet.orbitRadius.d;
  planet.y.d = Math.sin(angle) * planet.orbitRadius.d;
}
function pl_table_el(planet_nth, item_nth) {
  var tr = document.querySelectorAll("#planets tr")[planet_nth];
  var td = tr.querySelectorAll("td")[item_nth];
  return td;
}
function observePlanet(planet) {
}
function general_info_planet(planet) {
  pl_table_el(planet.nth, 0).textContent = planet.radius.d;
  pl_table_el(planet.nth, 1).textContent = planet.radius.r;
  pl_table_el(planet.nth, 2).textContent = planet.orbitRadius.d;
  pl_table_el(planet.nth, 3).textContent = planet.orbitRadius.r;
}
// PHEW! Under 100 lines after refactor
