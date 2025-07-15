const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let pdata1=document.getElementById("op1")
let pdata2=document.getElementById("op2")

function randomIndex(){
    return Math.floor(Math.random()*characters.length)
}

function genpass(){
    pdata1.textContent=" ";
    pdata2.textContent=" ";
    for(let i=0;i<15;i++){
        pdata1.textContent+=characters[ randomIndex()];
    }
    for(let i=0;i<15;i++){
        pdata2.textContent+=characters[ randomIndex()];
    }
    
}