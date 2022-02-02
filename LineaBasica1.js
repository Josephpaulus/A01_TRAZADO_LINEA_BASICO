var canvas = document.getElementById("canvas");

/* ESCUCHAR CLIC */ 
canvas.addEventListener("click", function(event){
    getMousePos(canvas, event);
});

/* VAR PARA IMPRIMIR  X0 Y0 .. X1 Y1 */
const clic1 = document.getElementById("clic1");
const clic2 = document.getElementById("clic2");

var ctx = canvas.getContext("2d");
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var data = imgData.data;

/*CLIC1*/
var x0 = 0;
var y0 = 0;
/*CLIC2*/
var x1 = 0;
var y1 = 0;

var contador = 0;

console.log(canvas.width + " - " + canvas.height);

//////////////////////////////////////////////////////////// DIBUJAR PIXELES (SetPixel - posición - color)

var color = [
    {r:   0, g:   0, b:   0, a: 255},
    {r:   0, g:   0, b:   0, a: 255}, 
    {r:   0, g:   0, b:   0, a: 255}, 
];

function setPixel(x, y, color) {
    var n = (y * canvas.width + x) * 4;
    data[n] = color.r;
    data[n + 1] = color.g;
    data[n + 2] = color.b;
    data[n + 3] = color.a;
}

//////////////////////////////////////////////////////////// [[   ALGORITMO DE TRAZADO BÁSICO   ]]

function Basico(x0, y0, x1, y1) {
    const m = (y1 - y0) / (x1 - x0);
    const b = y0 - m * x0;

    for (let x = x0; x <= x1; x++){
        let y = m * x + b;
        setPixel(x, Math.round(y), color[2]);
        if (Math.round(x) == x1 && Math.round(y) == y1){
        }
    }

    for (let x = x1; x <= x0; x++){
        let y = m * x + b;
        setPixel(x, Math.round(y), color[2]);
        if (Math.round(x) == x1 && Math.round(y) == y1){
        }
    }

    for (let y = y1; y <= y0; y++){
        let x = (y - b) / m;
        setPixel(Math.round(x), y, color[2]);
        if (x == x0 && y == y0){
        }
    }

    for (let y = y0; y <= y1; y++){
        let x = (y - b) / m;
        setPixel(Math.round(x), y, color[2]);
        if (x == x0 && y == y0){
        }
    }

    /*ACTUALIZAR CANVAS*/
    ctx.putImageData(imgData, 0, 0);
}

////////////////////////////////////////////////////////////////////////////// CLIC 2 > CLIC
//Confirmamos que no sea el 2do clic y nos vamos al primero para nueva linea

function getMousePos(canvas, evt) {
    contador++;
    var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;

    console.warn("x = " + x + " y = " + y);

    console.log( {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    });

    if (contador == 2){

        x1 = x;
        y1 = Math.trunc(y);
        clic2.innerHTML = "X<sub>2</sub>[" +
        x1 + "] Y<sub>2</sub>[" + y1 + "]";
        Basico(x0, y0, x1, y1);

        /*ACTUALIZAR CANVAS*/
        ctx.putImageData(imgData, 0, 0);
        contador = 0;

    }else{

        x0 = x;
        y0 = Math.trunc(y);
    
        clic1.innerHTML = "X<sub>1</sub>[" +
            x0 + "]  Y<sub>1</sub>[" + y0 + "]";

    }
}