var images = {};
var camera = [Math.floor(window.innerWidth/2),Math.floor(window.innerHeight/2)];

//init - Starts the Main Loop (Passive)
function init(){
    //Get Canvas
    var canvas = document.getElementById("canvas");
    //Check if Canvas is compatible
    if (canvas.getContext) {
        //Resize the Canvas
        resize();

        //Disable Rightclicks
        canvas.oncontextmenu = function(e) {
            return false;
        };

        //Get Context
        var ctx = canvas.getContext("2d");

        //Define Block Image
        newImage("blocksheet","blocksheet.png");

        //Render each frame.
        setInterval(function(){
            tic();
            render(ctx);
        },16);
    } else {
        //Tell the user that their browser is not Canvas compatible.
        document.body.innerHTML = "Sorry, your browser does not support Canvas."; //get beaned dummy
    }
}

//Mouse Camera Variable - Remembers the position of the mouse when rightclicked
var mouseCamera = {
    moving:false,
    //Mouse X and Y
    mx:0,
    my:0,
    //Camera X and Y
    cx:0,
    cy:0
}

//tic - Runs a game tic/frame (Active)
function tic(){
    console.log(mouseCamera,camera);

    //---Camera---
    //Checks if the right button is pressed
    if(mouse.right === true){
        //If it wasn't already moving, initialize the move.
        if(mouseCamera.moving === false){
            mouseCamera.moving = true;
            //Mouse X and Y
            mouseCamera.mx = mouse.x;
            mouseCamera.my = mouse.y;
            //Camera Original Position
            mouseCamera.cx = camera[0];
            mouseCamera.cy = camera[1];
        } else {
            camera = [
                //X
                mouseCamera.cx-(mouseCamera.mx-mouse.x),
                //Y
                mouseCamera.cy-(mouseCamera.my-mouse.y)
            ]
        }
    } else if(mouseCamera.moving === true) mouseCamera.moving = false;
    //If Moving is true, make it false.
}

//render - Renders the game (Active)
function render(ctx){
    //Make a Black background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    //X: 20 Y: 12 Z: 24

    //Singular Block.
    ctx.drawImage(images.blocksheet,
        //Sprite Position & Size
        43*14,0,42,49,
        //Position & Canvas Size
        camera[0]-Math.floor(42/2),camera[1]-Math.floor(49/2),42,49);

    //A Second Block.
    ctx.drawImage(images.blocksheet,
        //Sprite Position & Size
        43*14,0,42,49,
        //Position & Canvas Size
        camera[0]-Math.floor(42/2)+20,camera[1]-Math.floor(49/2)+12,42,49);

    //Another one.
    ctx.drawImage(images.blocksheet,
        //Sprite Position & Size
        43*14,0,42,49,
        //Position & Canvas Size
        camera[0]-Math.floor(42/2)-20,camera[1]-Math.floor(49/2)+12,42,49);

    //ANOTHER ONE.
    ctx.drawImage(images.blocksheet,
        //Sprite Position & Size
        43*14,0,42,49,
        //Position & Canvas Size
        camera[0]-Math.floor(42/2),camera[1]-Math.floor(49/2)+24,42,49);
}

//newImage - Loads a new image into the queue (Call)
function newImage(name,src){
    //Define new Image
    var ni = new Image();
    //Set the Source
    ni.src = "assets/"+src;
    //Add to the Object
    images[name] = ni;
}

//resize - Updates the Window Size (Call)
function resize(){
    //Get Canvas
    var canvas = document.getElementById("canvas");

    //Set Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
