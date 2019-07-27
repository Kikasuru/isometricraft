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

document.onmousemove = function (event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

document.onmousedown = function (event){
    switch (event.button) {
        case 0:
            mouse.left = true
            break
        case 2:
            mouse.right = true
            break
    }
}

document.onmouseup = function (event){
    switch (event.button) {
        case 0:
            mouse.left = false
            break
        case 2:
            mouse.right = false
            break
    }
}

document.onkeydown = function (event){
    //Number Keys
    if(event.which.between(48,57)){
        keyboard.numberKeys[event.which-48] = true;
    }
}

document.onkeyup = function (event){
    //Number Keys
    if(event.which.between(48,57)){
        keyboard.numberKeys[event.which-48] = false;
    }
}
