const characters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9",
  "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
];

let pass = [];
let pdata1 = document.getElementById("op1");
let pdata2 = document.getElementById("op2");
let inPt = document.getElementById("ipt");

let genBtn = document.getElementById("gen-btn");
genBtn.addEventListener("click", genpass);

let reSet = document.getElementById("reset");
reSet.addEventListener("click", function () {
  pdata1.textContent = "Password 1";
  pdata2.textContent = "Password 2";
  inPt.value = "";
  localStorage.removeItem("pass"); // clear storage as well
});

function randomIndex() {
  return Math.floor(Math.random() * characters.length);
}

function genpass() {
  let n = Number(inPt.value);
  if (isNaN(n) || n <= 0 || n > 35) {
    alert("Please enter a valid positive integer less than 35.");
    return;
  }

  let pass1 = "";
  let pass2 = "";

  for (let i = 0; i < n; i++) {
    pass1 += characters[randomIndex()];
  }
  for (let i = 0; i < n; i++) {
    pass2 += characters[randomIndex()];
  }

  pass = [pass1, pass2];

  localStorage.setItem("pass", JSON.stringify(pass));

  pdata1.textContent = pass1;
  pdata2.textContent = pass2;

  inPt.value = "";
}

// Load saved passwords on page refresh
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("pass"));
  if (saved && saved.length === 2) {
    pdata1.textContent = saved[0];
    pdata2.textContent = saved[1];
  }
});
