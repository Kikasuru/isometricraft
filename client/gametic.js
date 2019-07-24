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

//tic - Runs a game tic/frame (Active)
function tic(){
    //console.log(mouseCamera,camera);

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

    //---Block Selection---
    //Find what block the user is hovering
    userinfo.hovering = false
    for(i=0;i<blockPositions.length;i++){
        if(hit(blockPositions[i][0],blockPositions[i][1],mouse.x,mouse.y)){
            userinfo.hovering = i;
            //break;
        }
    }
}
