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
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2],
                [2,2,2,2,2,2,2,2]
            ],
            [
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1]
            ]
        ]
    }
}

//render - Renders the game (Active)
function render(ctx){
    //Make a Black background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    //X: 12 Y: 6 Z: 12

    //Draw each Layer
    //Element: Layer
    //Index: Z Position
    map.chunk0.layers.forEach(function(el,il){
        //For each X Axis
        //Element: Y Axis
        //Index: X Position
        el.forEach(function(ex,ix){
            //For each Y Axis
            //Element: Block Number
            //Index: Y Position
            ex.forEach(function(ey,iy){
                //Draw a Block
                ctx.drawImage(images.blocksheet,
                    //Sprite Position & Size
                    24*(ey),0,24,24,
                    //X Position
                    camera[0]-Math.floor(24/2)+(iy*12)-(ix*12),
                    //Y Position
                    camera[1]-Math.floor(24/2)+(iy*6)+(ix*6)-(il*12),
                    //Size
                    24,24);
            });
        });
    });
}
