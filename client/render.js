//Map Layout
/*
-Chunk
    -Layers (Z Axis)
        -X Axis
            -Y Axis
*/

var map = {
    "chunk0":{
        "layers":[
            [
                [0,0,0,0,0,0,16,16],
                [0,0,0,0,16,16,12,13],
                [0,0,0,16,12,13,13,13],
                [0,0,16,12,13,13,13,13],
                [0,0,16,13,13,13,13,13],
                [0,16,13,13,13,13,13,13],
                [16,12,13,13,13,13,13,13],
                [16,13,13,13,13,13,13,13]
            ]
        ]
    },
    "chunk1":{
        "layers":[
            [
                [16,16,16,0,0,0,0,0],
                [13,13,12,16,16,0,0,0],
                [13,13,13,13,12,16,0,0],
                [13,13,13,13,13,16,0,0],
                [13,13,13,13,13,12,16,0],
                [13,16,13,16,13,12,16,0],
                [13,16,13,16,13,13,13,16],
                [13,16,13,16,13,13,13,16]
            ]
        ]
    },
    "chunk2":{
        "layers":[
            [
                [16,13,13,13,13,13,12,12],
                [16,12,13,13,12,13,13,13],
                [0,16,12,13,16,13,13,13],
                [0,0,16,16,12,13,13,13],
                [0,0,0,16,16,12,12,13],
                [0,0,16,12,12,16,16,16],
                [0,16,12,12,12,12,12,16],
                [0,0,16,16,16,16,16,0],
            ]
        ]
    },
    "chunk3":{
        "layers":[
            [
                [13,13,13,13,12,12,13,16],
                [13,13,13,13,13,12,13,16],
                [13,13,16,13,13,16,12,16],
                [13,13,13,13,12,16,16,0],
                [13,13,13,12,16,16,0,0],
                [16,16,16,16,12,12,16,0],
                [16,16,16,12,12,12,12,16],
                [0,0,16,16,16,16,16,16],
            ]
        ]
    }
}

//render - Renders the game (Active)
function render(ctx){
    //Make a Black background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    //Draw Chunks
    drawChunk(ctx,0,0,0);
    drawChunk(ctx,1,1,0);
    drawChunk(ctx,2,0,1);
    drawChunk(ctx,3,1,1);
}

function drawChunk(ctx, num, positionx, positiony){
    //Draw each Layer
    //Element: Layer
    //Index: Z Position
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
                    var x = camera[0]-Math.floor(24/2)+(iy*12)-(ix*12)+(positionx*96)-(positiony*96)
                    //Y Position
                    var y = camera[1]-Math.floor(24/2)+(iy*6)+(ix*6)-(il*12)+(positionx*48)+(positiony*48)
                    //Block Brightness
                    var hover = 0
                    //Check if Mouse is hovering the block.
                    if(mouse.x.between(x,x+24,true)&&
                    mouse.y.between(y,y+12,true)){
                        var hover = 24
                    }
                    //Draw a Block
                    ctx.drawImage(images.blocksheet,
                        //Sprite Position & Size
                        24*(ey),hover,24,24,
                        //Position & Size
                        x,y,24,24);
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
