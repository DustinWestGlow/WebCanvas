const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var grad = ctx.createLinearGradient(0,0,200,0);
grad.addColorStop(0, "white");
grad.addColorStop(0.2, "red");
grad.addColorStop(1, "black");

ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.fill();

// ctx.fillStyle = "black";
// ctx.font = "italic "+28+"pt Arial ";
// ctx.fillText("this is text", 9,37);

// ctx.drawImage(img, 0,0); //normal drawing
// ctx.drawImage(img, //draw stretched
//     0,0,66,66, //source (x,y,w,h)
//     100,0,100,100//destination (x,y,w,h)
//     );
// ctx.drawImage(img, //draw a slice
//     20,10,20,20, //source coords (x,y,w,h)
//     250,0,250,50//destination coords (x,y,w,h)
//     );

// c.fillStyle = '#ccddff';
// c.beginPath();
// c.moveTo(50,20);
// c.lineTo(200,50);
// c.lineTo(93,82);
// c.closePath();
// c.fill();
// c.strokeStyle = 'rgb(0,128,0)';
// c.lineWidth = 2;
// c.stroke();

// c.fillStyle = 'red';
// c.beginPath();
// c.moveTo(10,30);
// c.bezierCurveTo(171,128,71,-59,200,30);
// c.lineTo(200,90);
// c.lineTo(10,90);
// c.closePath();
// c.fill();
// c.lineWidth = 4;
// c.strokeStyle = 'black';
// c.stroke();    