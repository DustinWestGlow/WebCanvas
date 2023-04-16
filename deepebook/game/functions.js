function drawCanvas()
{
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
}

function drawEnemies()
{
    for (var i = 0; i < enemies.length; i++)
    {
        // draw each Enemy at
        // x 
        var  = (canvas.width / enemies.length);
        var x = i * ();
        x += enxs;
        var x = enxs + (i * (200 / enemies.length));
        var w = 140 / enemies.length;
        // c.beginPath();
        enemies[i].x = x;
        if (enemies[i].alive == true) {
            c.fillStyle = "green";
            c.fillRect(x, 10, w, w);
        }
    }
}