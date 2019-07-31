//Map Layout
/*
-Chunk
    -Layers (Z Axis)
        -X Axis
            -Y Axis
*/

var map = {
    "chunkMatrix":[
        [0,1],
        [2,3]
    ],
    "spawn":[1,1],
    "chunk0":{
        "layers":[
            [
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4]
            ]
        ]
    },
    "chunk1":{
        "layers":[
            [
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4]
            ]
        ]
    },
    "chunk2":{
        "layers":[
            [
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4]
            ]
        ]
    },
    "chunk3":{
        "layers":[
            [
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4]
            ]
        ]
    }
}

var camera = [Math.floor(window.innerWidth/2)-(map.spawn[0]*196)+98,Math.floor(window.innerHeight/2)-(map.spawn[0]*108)+48];

var chunkCanvases = {};

var blockPositions = [];

//render - Renders the game (Active)
function render(ctx){
    //Make a Black background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    //Draw Chunks
    blockPositions = [];

    //For each X axis in the Map Matrix
    //Element: Y Axis
    //Index: X Position
    map.chunkMatrix.forEach(function(ex,ix){
        //Element: Chunk ID
        //Index: Y Position
        ex.forEach(function(ey,iy){
            //If the chunk is in frame, draw the chunk.
            if(
                //X Position
                (camera[0]+(iy*96)-(ix*96)).between(-192,window.innerWidth+192)&&
                //Y Position
                (camera[1]+(iy*48)+(ix*48)).between(-108,window.innerHeight+108)
            ){
                ctx.drawImage(chunkCanvases["chunk"+ey],
                //X Position
                camera[0]+(iy*96)-(ix*96),
                //Y Position
                camera[1]+(iy*48)+(ix*48)-(chunkCanvases["chunk"+ey].height-108))
            }
        });
    });

    /*//Hotbar
    ctx.drawImage(images.hotbar,
        Math.floor(window.innerWidth/2)-114,window.innerHeight-32
    );
    //Hotbar Blocks
    userinfo.hotbar.forEach(function(e,i){
        ctx.drawImage(images.blocksheet,
            //Sprite Position & Size
            24*(e),0,24,24,
            //Position & Size
            Math.floor(window.innerWidth/2)-110+(i*28),window.innerHeight-28,24,24);
        if(userinfo.hotbarSelection === i&&
        //Check if Build Mode is on.
        userinfo.button === 1){
            ctx.drawImage(images.selection,Math.floor(window.innerWidth/2)-110+(i*28),window.innerHeight-28,24,24);
        }
    });
    //Buttons
    //Break Button
    ctx.drawImage(images.buttons,
        //Sprite Position & Size
        0,userinfo.button === 0 ?16:0,16,16,
        //Position & Size
        Math.floor(window.innerWidth/2)-110,window.innerHeight-48,16,16);

    //Build Button
    ctx.drawImage(images.buttons,
        //Sprite Position & Size
        16,userinfo.button === 1 ?16:0,16,16,
        //Position & Size
        Math.floor(window.innerWidth/2)-94,window.innerHeight-48,16,16);

    //Hand Button
    ctx.drawImage(images.buttons,
        //Sprite Position & Size
        32,userinfo.button === 2 ?16:0,16,16,
        //Position & Size
        Math.floor(window.innerWidth/2)-78,window.innerHeight-48,16,16);*/
}

function drawChunk(num){
    //Get a layer count.
    var layerCount = map["chunk"+num].layers.length
    //Create a new canvas for the chunk.
    var chunkCanvas = document.createElement("canvas")
    chunkCanvas.height = 108+((layerCount-1)*12);
    chunkCanvas.width = 196;
    document.getElementById("chunks").appendChild(chunkCanvas);
    chunkCanvases["chunk"+num] = chunkCanvas;

    var ctx = chunkCanvas.getContext("2d");

    //Draw each Layer
    //Element: Layer
    //Index: Layer Position
    map["chunk"+num].layers.forEach(function(el,il){
        //For each X Axis
        //Element: Y Axis
        //Index: X Position
        el.forEach(function(ex,ix){
            //For each Y Axis
            //Element: Block Number
            //Index: Y Position
            ex.forEach(function(ey,iy){
                //If block is not air
                if(ey!==0){
                    //X Position
                    var x = 86+(iy*12)-(ix*12);
                    //Y Position
                    var y = (iy*6)+(ix*6)-(il*12)+((layerCount-1)*12);
                    //Draw a Block
                    ctx.drawImage(images.blocksheet,
                        //Sprite Position & Size
                        24*(ey),0,24,24,
                        //Position & Size
                        x,y,24,24);
                    //Check if Mouse is hovering the block and if Hand Mode is off.
                    if(userinfo.hovering === blockPositions.length && userinfo.button !== 2){
                        ctx.drawImage(images.selection,x,y,24,24);
                    }
                    //Put the block position in a variable for the Gametic to read.
                    blockPositions.push({x,y,blockInfo:{
                        type:ey,
                        chunk:num,
                        x:ix,
                        y:iy,
                        layer:il
                    }});
                }
            });
        });
    });
}

//Inbetween function because I'm lazy. (Call)
Number.prototype.between = function(a, b, inclusive) {
  var min = Math.min(a, b),
    max = Math.max(a, b);

  return inclusive ? this >= min && this <= max : this > min && this < max;
}
