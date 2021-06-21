const winCanvas = document.getElementById("winCanvas");
const winCanvasCtx = winCanvas.getContext("2d");
const btnRestart = document.getElementById("btnRestart");

btnRestart.addEventListener("click", ()=> {window.location.href = "index.html";})

document.addEventListener("keydown", restart);

function restart(e){
    if(e.code == "Enter"){
        window.location.href = "index.html";
    }
}


const winImg1 = new Image();
winImg1.src = "media/other/pig1.png";

const winImg2 = new Image();
winImg2.onload = drawWin;
winImg2.src = "media/other/pig2.png";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawWin(){
    winCanvasCtx.clearRect(0, 0, winCanvasCtx.width, winCanvasCtx.height);
    winCanvasCtx.drawImage(winImg1, 0, 0, 400, 400);
    await sleep(1000);
    winCanvasCtx.drawImage(winImg2, 0, 0, 400, 400);
    await sleep(1000);
    drawWin();
}

