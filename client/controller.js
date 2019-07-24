//Define Inputs
var mouse = {
    x:0,
    y:0,
    left:false,
    right:false
};

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
