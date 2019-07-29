//Define Inputs
var mouse = {
    x:0,
    y:0,
    left:false,
    right:false
};

var keyboard = {
    numberKeys:[
        //0-2
        false,
        false,
        false,
        //3-6
        false,
        false,
        false,
        //7-9
        false,
        false,
        false
    ]
}

var canvas = document.getElementById("canvas");

canvas.onmousemove = function (event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

canvas.onmousedown = function (event){
    switch (event.button) {
        case 0:
            mouse.left = true
            break
        case 2:
            mouse.right = true
            break
    }
}

canvas.onmouseup = function (event){
    switch (event.button) {
        case 0:
            mouse.left = false
            break
        case 2:
            mouse.right = false
            break
    }
}

canvas.onkeydown = function (event){
    //Number Keys
    if(event.which.between(48,57)){
        keyboard.numberKeys[event.which-48] = true;
    }
}

canvas.onkeyup = function (event){
    //Number Keys
    if(event.which.between(48,57)){
        keyboard.numberKeys[event.which-48] = false;
    }
}
