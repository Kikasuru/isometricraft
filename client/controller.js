//Controller.js - Handles Mouse Inputs.

//Define Inputs
var mouse = {
    x:0,
    y:0,
    left:false
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
    mouse.x = Math.floor(event.offsetX/zoom);
    mouse.y = Math.floor(event.offsetY/zoom);
}

canvas.onmousedown = function (event){
    switch (event.button) {
        case 0:
            mouse.left = true
            break
    }
}

canvas.onmouseup = function (event){
    switch (event.button) {
        case 0:
            mouse.left = false
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

canvas.onwheel = function (event){
    //Set zoom up or down depending on where the wheel is going.
    if(event.deltaY === -100 && zoom !== 4) zoom++;
    if(event.deltaY === 100 && zoom !== 1) zoom--;

    //Resize the canvas.
    resize();
}

//Buttons
function breakMode(){
    //Set the mode to Break Mode.
    userinfo.button = 0;
    //Set the button to be clicked.
    document.getElementById("breakMode").classList.add("clicked");

    //Remove the clicked class from any other button.
    document.getElementById("panMode").classList.remove("clicked");
    for(i=0;i<16;i++){
        //Get each icon.
        var span = document.getElementById("hotbar").childNodes[i*2+1];
        //Remove the Clicked class
        span.classList.remove("clicked");
    }
}

function panMode(){
    //Set the mode to Pan Mode.
    userinfo.button = 2;
    //Set the button to be clicked.
    document.getElementById("panMode").classList.add("clicked");

    //Remove the clicked class from any other button.
    document.getElementById("breakMode").classList.remove("clicked");
    for(i=0;i<16;i++){
        //Get each icon.
        var span = document.getElementById("hotbar").childNodes[i*2+1];
        //Remove the Clicked class
        span.classList.remove("clicked");
    }
}

//Hotbar Blocks

//Create each button.
for(i=0;i<16;i++){
    //Get the span
    var span = document.getElementById("hotbar").childNodes[i*2+1];
    //Set the style of the span so it loads from the sheet.
    span.style = `
        background: lightGray url(assets/blocksheet.png) -`+(userinfo.hotbar[i]*24)+`px 0;
    `
    //Set the block number.
    span.setAttribute("data-block",i);
    //Set the onclick property
    span.onclick = function(event){
        //Set the mode to Build Mode.
        userinfo.button = 1;

        //Switch to that block.
        userinfo.hotbarSelection = event.target.getAttribute("data-block");

        //Remove the clicked class from any other button.
        document.getElementById("breakMode").classList.remove("clicked");
        document.getElementById("panMode").classList.remove("clicked");
        for(i=0;i<16;i++){
            //Get each icon.
            var span = document.getElementById("hotbar").childNodes[i*2+1];
            //Remove the Clicked class
            span.classList.remove("clicked");
        }

        //Set the class to clicked.
        event.target.classList.add("clicked");
    }
}
