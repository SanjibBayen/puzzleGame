
var row = 3;
var coll = 3;
var thisImg;
var nextImg;
var turn=0;
function suffeling(){
var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
imgOrder.sort(() => Math.random() - 0.5);
return imgOrder;
}

window.onload = function () {
   let imgOrder=suffeling();
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < coll; c++) {
            let imgS = document.createElement("img");
            imgS.id = r.toString() + "-" + c.toString();
            imgS.src = "picture/" + imgOrder.shift() + ".jpg";
            imgS.draggable = true;  
            
            imgS.addEventListener("dragstart", Dstart);
            imgS.addEventListener("dragover", Dover);
            imgS.addEventListener("dragenter", Denter);
            imgS.addEventListener("dragleave", Dleave);
            imgS.addEventListener("drop", Ddrop);
            imgS.addEventListener("dragend", Dend);

            document.getElementById("board").append(imgS);
        }
    }
};

function Dstart(e) {
    thisImg = this;
    
}

function Dover(e) {
    e.preventDefault(); 
}

function Denter(e) {
    e.preventDefault(); 
}

function Dleave() {}

function Ddrop(e) {
    e.preventDefault(); 
    nextImg = this;
}

function  Dend() {
if(!nextImg.src.includes("picture/3.jpg"))
{
    return;
}

    let curId=thisImg.id.split("-");
    let r1=parseInt(curId[0]);
    let c1=parseInt(curId[1]);

    let othId=nextImg.id.split("-");
    let r2=parseInt(othId[0]);
    let c2=parseInt(othId[1]);

    let mLeft= r1==r2 && c1==c2-1;
    let mRight= r1==r2 && c1==c2+1;

    let mUP= c1==c2 && r1==r2-1;
    let mDown= c1==c2 && r1==r2+1;

    let AllMoves= mLeft || mRight || mUP || mDown;
    if(AllMoves){
    let currImg = thisImg.src;
    let otherImg = nextImg.src;

    thisImg.src = otherImg;
    nextImg.src = currImg;

     turn=turn+1;
    document.getElementById("turn").innerText=turn;


    if (checkWin()) {
        setTimeout(function () {
            alert("Congratulations! You solved the puzzle in " + turn + " turns.");
        }, 200);
    }
    }
}

function checkWin() {
    let corimgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < coll; c++) {
            let imgS = document.getElementById(r.toString() + "-" + c.toString());
            let imgNum = imgS.src.match(/(\d+)\.jpg$/)[1]; 
            if (imgNum !== corimgOrder.shift()) {
                return false;
            }
        }
    }
    return true;
}
