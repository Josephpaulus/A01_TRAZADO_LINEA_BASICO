

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imgData.data;



//////////////////////////////////
bresenham(50, 50, 250, 250);
ctx.putImageData(imgData, 0, 0);


function setPixel(x, y) {
    var n = (y * canvas.width + x) * 4;
    data[n] = 0;
    data[n + 1] = 0;
    data[n + 2] = 255;
    data[n + 3] = 255;
}

//////////////////////////////////
function bresenham(x0, y0, x1, y1) {
    var dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1;
    var err = (dx > dy ? dx : -dy) / 2;
    while (true) {
        setPixel(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        var e2 = err;
        if (e2 > -dx) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dy) {
            err += dx;
            y0 += sy;
        }
    }
}

function printMousePos() {
    var cursorX;
    var cursorY;
    document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
document.getElementById('test').innerHTML = "x: " + cursorX + ", y: " + cursorY;
}   