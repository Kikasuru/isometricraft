var images = {}
function init(){
    //Get Canvas
    var canvas = document.getElementById("canvas");
    //Check if Canvas is compatible
    if (canvas.getContext) {
        //Resize the Canvas
        resize();

        //Get Context
        var ctx = canvas.getContext("2d");

        //Define Block Image
        newImage("blocksheet","blocksheet.png");

        //Render each frame.
        setInterval(function(){
            render(ctx);
        },16);
    } else {
        //Tell the user that their browser is not Canvas compatible.
        document.body.innerHTML = "Sorry, your browser does not support Canvas."; //get beaned dummy
    }
}

function render(ctx){
    //Make a White background
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    //Singular Block.
    ctx.drawImage(images.blocksheet,
        //Sprite Position & Size
        43*14,0,42,49,
        //Position & Canvas Size
        Math.floor((window.innerWidth/2)-(42/2)),Math.floor((window.innerHeight/2)-(49/2)),42,49);
}

function newImage(name,src){
    //Define new Image
    var ni = new Image();
    //Set the Source
    ni.src = "assets/"+src;
    //Add to the Object
    images[name] = ni
}

function resize(){
    //Get Canvas
    var canvas = document.getElementById("canvas");

    //Set Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
