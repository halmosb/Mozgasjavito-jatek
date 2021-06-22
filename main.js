const animalImages = ['zsiráf.png', 'mamut.png', 'ló.jpg', 'elefánt.gif', 'majom.jpg', 'vakond.jpg', 'homár.png', 'gyík.jpg', 'szurikáta.jpg', 'mosómedve.jpg', 'sün.jpg', 'varacskos disznó.png', 'egér.png', 'kenguru.gif', 'pillangó.jpg', 'lajhár.png', 'zebra.jpg', 'őz.jpg', 'kígyó.jpg', 'szúnyog.png', 'dínó.jpg', 'százlábú.gif', 'patkány.jpg', 'szöcske.jpg', 'antilop.jpg', 'pingvin.jpg', 'hiéna.png', 'orrszarvú.jpg', 'hangya.jpg', 'kaméleon.png', 'panda.jpeg', 'tatú.jpg', 'hiúz.png', 'cica.jpg', 'csótány.jpg', 'darázs.jpg', 'rénszarvas.png', 'párduc.jpg', 'muflon.jpg', 'szamár.png', 'sas.jpg', 'bivaly.jpeg', 'kagyló.jpg', 'denevér.png', 'kacsacsőrű emlős.png', 'krokodil.png', 'csiga.jpeg', 'fóka.jpg', 'rozmár.png', 'cápa.jpg', 'tigtis.png', 'méh.jpg', 'láma.jpg', 'malac.png', 'farkas.jpg', 'rák.jpg', 'oroszlán.jpg', 'tengericsillag.png', 'vaddisznó.jpg', 'gólya.jpg', 'teve.jpg', 'béka.jpeg', 'tengerimalac.jpg', 'bálna.png', 'róka.png', 'víziló.jpeg', 'nyúl.jpg', 'ürge.gif', 'szarvas.png', 'kukac.gif', 'strucc.jpg', 'papagáj.jpg', 'jegesmedve.jpg', 'tintahal.jpg', 'teknős.png', 'delfin.jpeg', 'polip.png', 'kecske.png', 'hal.jpg', 'medve.gif', 'pók.jpg', 'keselyű.png', 'koala.jpg'];
const animalSounds = ['bárány.mp3', 'kecske.mp3', 'elefánt.mp3', 'csörgőkígyó.mp3', 'medve.mp3', 'cica.mp3', 'majom.mp3', 'kutya.mp3', 'oroszlán.mp3', 'liba.mp3', 'galamb.mp3', 'kacsa.mp3', 'méh.mp3', 'szamár.mp3', 'malac.mp3', 'tehén.mp3', 'varjú.mp3', 'tücsök.mp3', 'szarka.mp3', 'denevér.mp3', 'bagoly.mp3', 'sas.mp3', 'farkas.mp3', 'szöcske.mp3'];
const animalHabitats = ["hal.png", "madár.svg", "mókus.png", "teve.jpg"];

const canvas = document.getElementById("mediaCanvas");
const canvasCtx = canvas.getContext("2d");

const imageElements = [];
const soundElements = [];
const habitatElements = [];

let answer = "";

let type = sessionStorage.getItem("type");
switch (type){
    case "animal": type = "Állat"; break;
    case "sound": type = "Állathang"; break;
    case "habitat": type = "Élőhely"; break;
    default: console.log("valami nem jó"); break;
}
switch (type){
    case "Állat": document.getElementById("title").innerText = "Milyen állat van a képen?"; break;
    case "Állathang": document.getElementById("title").innerText = "Melyik állat hangját hallod?"; break;
    case "Élőhely": document.getElementById("title").innerText = "Melyik állat lakik itt?"; break;
}
let difficulty = "könnyű";
let score = 0;
const maxScore = 10;

let activeButtonIndex = 0;

let mode = sessionStorage.getItem("mode");

const width = 400;
const height = 400;

const tickImg = new Image();
tickImg.src = "media/other/tick.png";
const xImg = new Image();
xImg.src = "media/other/x.png";

const nextLevelTxt = document.getElementById("nextLevelTxt");
const btnStart = document.getElementById("btnStart");

let prevAnswer = "";

btn0.addEventListener("click", ()=> {button(btn0.innerText);})
btn1.addEventListener("click", ()=> {button(btn1.innerText);})
btn2.addEventListener("click", ()=> {button(btn2.innerText);})

let isStarted = false;

btnStart.addEventListener("click", ()=> {
    next();
    isStarted = true;
});

document.addEventListener("keydown", nextActiveButton);

function nextActiveButton(e){
    if(isStarted){
        if(e.code == "Space"){
            activeButtonIndex++;
            if(activeButtonIndex >= 3){
                activeButtonIndex = 0;
            }
        }
        if(mode === "key"){
            btn0.classList.remove("active");
            btn1.classList.remove("active");
            btn2.classList.remove("active");
            switch (activeButtonIndex){
                case 0: 
                    btn0.classList.add("active");
                    break;
                case 1: 
                    btn1.classList.add("active");    
                    break;
                case 2:
                    btn2.classList.add("active");
                    break;
                default: break;
            }
        }
        if(mode === "key" && e.code == "Enter" && !(btn0.disabled)){
            switch (activeButtonIndex){
                case 0: 
                    button(btn0.innerText);
                    break;
                case 1: 
                    button(btn1.innerText);  
                    break;
                case 2:
                    button(btn2.innerText);
                    break;
                default: break;
            }
        }
    } else {
        if(e.code == "Enter"){
            next();
            isStarted = true;
        }
    }
    
}

function button(btnText){
    btn0.disabled = true;
    btn1.disabled = true;
    btn2.disabled = true;
    soundElements.forEach(element => {
        element.pause();
    });

    let waitTime = 1500;
    if(btnText === answer){
        score++;
        if(score >= maxScore){
            switch (difficulty){
                case "könnyű": 
                    difficulty = "közepes";
                    document.getElementById("nextLevel").classList.remove("invisible");
                    nextLevelTxt.innerText = "Helytelen válasz után levonunk egy pontot."
                    waitTime = 7000;
                    document.getElementById("media").classList.add("changedOrder");
                    break;
                case "közepes":
                    difficulty = "nehéz"
                    document.getElementById("nextLevel").classList.remove("invisible");
                    nextLevelTxt.innerText = "Helytelen válasz után 0 pontról kell újrakezdeni."
                    document.getElementById("media").classList.remove("changedOrder");
                    waitTime = 7000;
                    break;
                case "nehéz": 
                    //console.log("NYERTÉL");
                    window.location.href = "win.html";
                    break;
                default: 
                    console.error("Nem várt hiba történt. Kérlek lépj kapcsolatba a fejlesztővel.")
                    break;
            }
            score = 0;
        }
        canvasCtx.font = "40px Bold Times New Roman";
        canvasCtx.fillStyle = "rgba(0,255,0,1)";
        canvasCtx.fillText("+1", width/2, 30);
        canvasCtx.fillStyle = "rgba(0,255,0,0.2)";
        canvasCtx.fillRect(0,0,width,height);
        canvasCtx.drawImage(tickImg, 0, 0, width, height);
    } else {
        canvasCtx.font = "40px Bold Times New Roman";
        canvasCtx.fillStyle = "rgba(255,0,0,1)";
        switch (difficulty){
            case "könnyű": 
                canvasCtx.fillText("-0", width/2, 30);
                break;
            case "közepes":
                if(score >= 1){
                    score--;
                    canvasCtx.fillText("-1", width/2, 30);
                }
                break;
            case "nehéz":
                canvasCtx.fillText("-" + score, width/2, 30);
                score = 0;
                break;
            default: 
                console.error("Nem várt hiba történt. Kérlek lépj kapcsolatba a fejlesztővel.")
                break;
        }
        canvasCtx.fillStyle = "rgba(255,0,0,0.2)";
        canvasCtx.fillRect(0,0,width,height);
        canvasCtx.drawImage(xImg, 0, 0, width, height);
    }
    updateScoreText();
    
    setTimeout(next, waitTime);
}

function updateScoreText(){
    document.getElementById("typeTxt").innerText = type;
    document.getElementById("difficultyTxt").innerText = difficulty;
    document.getElementById("scoreTxt").innerText = score + " / " + maxScore;
}

function randomArray(){
    let tmp = [];
    if(type === "Állat"){
        animalImages.forEach(element => {
            tmp.push(element.substring(0, element.indexOf(".")));
        });
    } else if(type === "Állathang"){
        animalSounds.forEach(element => {
            tmp.push(element.substring(0, element.indexOf(".")));
        });
    } else if (type === "Élőhely"){
        animalHabitats.forEach(element => {
            tmp.push(element.substring(0, element.indexOf(".")));
        });
    }
    
    let answ = (tmp.sort(() => Math.random() - 0.5)).slice(0, 3);
    return answ;
}

function prepare(){
    if(type === "Állat"){
        for(let i = 0; i < animalImages.length; i++){
            let img = new Image();
            img.src = "media/images/" + animalImages[i];
            imageElements.push(img);
        }
    } else if(type === "Állathang"){
        for(let i = 0; i < animalSounds.length; i++){
            let aud = new Audio();
            aud.src = "media/sounds/" + animalSounds[i];
            aud.muted = true;
            aud.autoplay = true;
            aud.loop = true;
            soundElements.push(aud);
        }
    } else if(type === "Élőhely"){
        for(let i = 0; i < animalHabitats.length; i++){
            let img = new Image();
            img.src = "media/habitats/" + animalHabitats[i];
            habitatElements.push(img);
        }
    }
    
    updateScoreText();
    if(mode === "key"){
        btn0.classList.add("active");
    }
    document.getElementById("mediaCanvas").width = width;
    document.getElementById("mediaCanvas").height = height;
}

function next(){
    nextLevelTxt.innerText = "";
    document.getElementById("nextLevel").classList.add("invisible");
    const btn0 = document.getElementById("btn0");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    
    btn0.disabled = false;
    btn1.disabled = false;
    btn2.disabled = false;

    btn0.classList.remove("invisible");
    btn1.classList.remove("invisible");
    btn2.classList.remove("invisible");
    btnStart.classList.add("invisible");

    if(mode === "key"){
        activeButtonIndex = 0;
        btn0.classList.add("active");
        btn1.classList.remove("active");
        btn2.classList.remove("active");
    }
    

    answers = randomArray();
    //console.log(answers);

    btn0.innerText = answers[0];
    btn1.innerText = answers[1];
    btn2.innerText = answers[2];

    let i = 0;
    while(answer == prevAnswer){
        answer = answers[Math.round(Math.random() * 2)];
        //console.log("a");
        i++;
        if(i >= 30){break;}
    }
    prevAnswer = answer;
    
    //console.log(answer);
    let answerImgIndex;
    
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    if(type === "Állat"){
        answerImgIndex = animalImages.findIndex(e => e.startsWith(answer));
        canvasCtx.drawImage(imageElements[answerImgIndex], 0, 0, width, height);
    } else if(type === "Állathang"){
        answerImgIndex = animalSounds.findIndex(e => e.startsWith(answer));
        soundElements[answerImgIndex].muted = false;
        soundElements[answerImgIndex].play(); 
    } else if (type === "Élőhely"){
        answerImgIndex = animalHabitats.findIndex(e => e.startsWith(answer));
        canvasCtx.drawImage(habitatElements[answerImgIndex], 0, 0, width, height);
    }
   
}


window.onload = ()=>{
    prepare();
    //setTimeout(next, 1000);
}