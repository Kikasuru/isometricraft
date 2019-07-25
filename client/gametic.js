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

//hitboxes - Block Hitboxes
var hitboxes = {
    "top":[
        //Middle
        [[6,2],[19,11]],
        //Left
        [[2,4],[7,9]],
        //Right
        [[18,4],[23,9]]
    ],
    "right":[
        //Middle
        [[14,11],[23,21]],
        //Left
        [[12,12],[17,24]],
        //Right
        [[20,8],[25,20]]
    ],
    "left":[
        //Middle
        [[2,11],[11,21]],
        //Left
        [[0,8],[5,20]],
        //Right
        [[8,12],[13,24]]
    ]
}

//hit - Calculates Hitboxes (Call)
function hit (blockx,blocky,hitx,hity){
    var output = false;
    Object.keys(hitboxes).forEach(function(eo,io){
        //For each Hitbox that triggers the next hitbox.
        hitboxes[eo].forEach(function(e,i){
            //If Mouse is inbetween Block Position+Hitbox Offset
            //X Position
            if(hitx.between(blockx+e[0][0],blockx+e[1][0])&&
            //Y Position
            hity.between(blocky+e[0][1],blocky+e[1][1])){
                //Set Output to true
                output = eo;
            };
        });
    });
    return output;
}

var mouseLeftPressed = false;
//tic - Runs a game tic/frame (Active)
function tic(){
    //console.log(mouseCamera,camera);

    //---Camera---
    //Checks if the right button is pressed or if the current mode is Hand Mode.
    if(mouse.right === true || (userinfo.button === 2 && mouse.left === true)){
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

    //---Block Selection---
    //Find what block the user is hovering
    userinfo.hovering = false
    for(i=0;i<blockPositions.length;i++){
        //
        var hovering = hit(blockPositions[i].x,blockPositions[i].y,mouse.x,mouse.y)
        //If hovering is true, log it.
        if(hovering){
            userinfo.position = hovering;
            userinfo.hovering = i;
            //break;
        }
    }

    //--Building--
    //Check if the mouse is clicked and if Build Mode is on.
    if(mouse.left === true && userinfo.button === 1){
        //If the mouse wasn't already clicked, place a block.
        if(mouseLeftPressed === false){
            mouseLeftPressed = true;
            //Check if a block is being hovered.
            if(userinfo.hovering !== false){
                var block = blockPositions[userinfo.hovering];
                //console.log(block);
                switch(userinfo.position){
                    case "top":
                        //If there's no layer above the block, create one.
                        if(typeof map["chunk"+block.blockInfo.chunk].layers[block.blockInfo.layer+1] === "undefined"){
                            map["chunk"+block.blockInfo.chunk].layers.push([
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0]
                            ]);
                        }
                        //Add the block to the layer above the block.
                        console.log("chunk"+block.blockInfo.chunk)
                        map["chunk"+block.blockInfo.chunk].layers[block.blockInfo.layer+1][block.blockInfo.x][block.blockInfo.y] = userinfo.hotbar[userinfo.hotbarSelection]
                        break;
                    case "right":

                        break;
                }
            }
        }
    } else if(mouseLeftPressed === true) mouseLeftPressed = false;

    //---Buttons---
    //Check each button.
    for(i=0;i<3;i++){
        var buttonx = Math.floor(window.innerWidth/2)-(110-(i*16))
        var buttony = window.innerHeight-48
        //Checks if the left button is pressed and the cursor is on the button.
        if(mouse.left === true &&
        mouse.x.between(buttonx,buttonx+16)&&
        mouse.y.between(buttony,buttony+16)){
            //Switch to that button.
            userinfo.button = i;
        }
    }
    //Check each block.
    for(i=0;i<8;i++){
        var buttonx = Math.floor(window.innerWidth/2)-110+(i*28)
        var buttony = window.innerHeight-28
        //Checks if the left button is pressed and the cursor is on the button.
        if(mouse.left === true &&
        mouse.x.between(buttonx,buttonx+24)&&
        mouse.y.between(buttony,buttony+24)&&
        //Check if Build Mode is on.
        userinfo.button === 1){
            //Switch to that button.
            userinfo.hotbarSelection = i;
        }
    }
}
