sessionStorage.setItem("mode", "mouse");
let activeModeButtonIndex = 0;

const btnMouse = document.getElementById("btnMouse");
const btnKey = document.getElementById("btnKey");

btnMouse.addEventListener("click", ()=> {sessionStorage.setItem("mode", "mouse"); window.location.href = "menu.html";})
btnKey.addEventListener("click", ()=> {sessionStorage.setItem("mode", "key"); window.location.href = "menu.html";})

btnMouse.addEventListener("click", ()=> {selectMode("button");})
btnKey.addEventListener("click", ()=> {selectMode("key");})

document.addEventListener("keydown", nextActiveModeButton);

function nextActiveModeButton(e){
    if(e.code == "Space"){
        activeModeButtonIndex++;
        if(activeModeButtonIndex > 1){
            activeModeButtonIndex = 0;
        }
        btnMouse.classList.remove("active");
        btnKey.classList.remove("active");
        switch (activeModeButtonIndex){
            case 0: 
                btnMouse.classList.add("active");
                break;
            case 1: 
                btnKey.classList.add("active");    
                break;
            default: break;
        }
    }
    if(e.code == "Enter"){
        switch (activeModeButtonIndex){
            case 0: 
                selectMode("button");
                break;
            case 1: 
                selectMode("key");  
                break;
            default: break;
        }
    }
}

function selectMode(mode){
    sessionStorage.setItem("mode", mode);
    window.location.href = "menu.html";
}