const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let pdata1=document.getElementById("op1")
let pdata2=document.getElementById("op2")
let inPt=document.getElementById("ipt")

let reSet=document.getElementById("reset");
reSet.addEventListener("click",function(){
    pdata1.textContent="password 1";
    pdata2.textContent="password 2";
    inPt.value=" ";
})


function randomIndex(){
    return Math.floor(Math.random()*characters.length)
}
console.log(n);

function genpass(){
    pdata1.textContent=" ";
    pdata2.textContent=" ";
    let n = Number(inPt.value);
    if(isNaN(n)||n<=0){
        alert("Please Enter a valid positive integer.");
        return;
    }

    for(let i=0;i<n;i++){
        pdata1.textContent+=characters[ randomIndex()];
    }
    for(let i=0;i<n;i++){
        pdata2.textContent+=characters[ randomIndex()];
    }
    inPt.value="";
}