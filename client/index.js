var userinfo = {
    hovering:false,
    position:"top",
    hotbar:[1,2,3,4,5,6,7,8],
    hotbarSelection:0,
    button:0,
    reverse:false
};

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

        //Render each frame.
        setInterval(function(){
            tic();
            render(ctx);
        },16);

        //Render Chunks
        //Element: Y Axis
        map.chunkMatrix.forEach(function(ex){
            //Element: Chunk ID
            ex.forEach(function(ey){
                console.log(ey)
                //Draw the chunk.
                drawChunk(ey);
            });
        });
    } else {
        //Tell the user that their browser is not Canvas compatible.
        document.body.innerHTML = "Sorry, your browser does not support Canvas."; //get beaned dummy
    }
}

//resize - Updates the Window Size (Call)
function resize(){
    //Get Canvas
    var canvas = document.getElementById("canvas");

    //Set Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
