let activeTypeButtonIndex = 0;

const mode = sessionStorage.getItem("mode");
const btnAnimal = document.getElementById("btnAnimal");
const btnSound = document.getElementById("btnSound");
const btnHabitat = document.getElementById("btnHabitat");

btnAnimal.addEventListener("click", ()=> {selectType("animal");})
btnSound.addEventListener("click", ()=> {selectType("sound");})
btnHabitat.addEventListener("click", ()=> {selectType("habitat");})

document.addEventListener("keydown", nextActiveTypeButton);

if(mode === "key"){
    btnAnimal.classList.add("active");
}

function nextActiveTypeButton(e){
    if(e.code == "Space" && mode === "key"){
        activeTypeButtonIndex++;
        if(activeTypeButtonIndex > 2){
            activeTypeButtonIndex = 0;
        }
        btnAnimal.classList.remove("active");
        btnSound.classList.remove("active");
        btnHabitat.classList.remove("active");
        switch (activeTypeButtonIndex){
            case 0: 
                btnAnimal.classList.add("active");
                break;
            case 1: 
                btnSound.classList.add("active");    
                break;
            case 2:
                btnHabitat.classList.add("active");
                break;
            default: break;
        }
    }
    if(e.code == "Enter" && mode === "key"){
        switch (activeTypeButtonIndex){
            case 0: 
                selectType("animal");
                break;
            case 1: 
                selectType("sound");  
                break;
            case 2:
                selectType("habitat");
                break;
            default: break;
        }
    }
}

function selectType(mode){
    sessionStorage.setItem("type", mode);
    //console.log(mode);
    window.location.href = "game.html";
}