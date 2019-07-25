var userinfo = {
    hovering:false,
    position:"top",
    hotbar:[1,2,3,4,5,6,7,8],
    hotbarSelection:0,
    button:0,
    reverse:false
};

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

        //Enable Nearest Neighbor
        canvas.imageSmoothingEnabled = false;
        canvas.mozImageSmoothingEnabled = false;
        canvas.webkitImageSmoothingEnabled = false;
        canvas.msImageSmoothingEnabled = false;

        //Disable Rightclicks
        canvas.oncontextmenu = function(e) {
            return false;
        };

        //Get Context
        var ctx = canvas.getContext("2d");

        //Define Images
        newImage("blocksheet","blocksheet.png"); //Block Tileset
        newImage("selection", "selection.png"); //Selection Overlay
        newImage("buttons", "buttons.png"); //Action Buttons
        newImage("hotbar", "hotbar.png"); //Block Hotbar

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
