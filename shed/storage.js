// Draw shadows on a circle!
var grad = ctx.createLinearGradient(0,0,200,0);
grad.addColorStop(0, "white");
grad.addColorStop(0.2, "red");
grad.addColorStop(1, "black");

ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.fill();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}