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
