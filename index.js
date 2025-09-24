const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
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
  localStorage.removeItem("pass");
});

let alphabetCb = document.getElementById("Alphabet");
let numberCb = document.getElementById("Number");
let symbolsCb = document.getElementById("Symbols");

const letters = characters.slice(0, 52);
const numbers = characters.slice(52, 62);
const symbols = characters.slice(62);

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function genpass() {
  let n = Number(inPt.value);
  if (isNaN(n) || n <= 0 || n > 35) {
    alert("Please enter a valid positive integer less than 35.");
    return;
  }

  let pool = [];
  if (alphabetCb.checked) pool = pool.concat(letters);
  if (numberCb.checked) pool = pool.concat(numbers);
  if (symbolsCb.checked) pool = pool.concat(symbols);

  if (pool.length === 0) {
    alert("Please select at least one character type.");
    return;
  }

  let pass1 = "";
  let pass2 = "";

  for (let i = 0; i < n; i++) {
    pass1 += pool[randomIndex(pool)];
    pass2 += pool[randomIndex(pool)];
  }

  pass = [pass1, pass2];
  localStorage.setItem("pass", JSON.stringify(pass));

   pdata1.innerHTML = `${pass1} <i class="fa-regular fa-copy copy"></i>`;
   pdata2.innerHTML = `${pass2} <i class="fa-regular fa-copy copy"></i>`;
   
  inPt.value = "";
}
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy")) {
    const text = e.target.parentElement.textContent.trim();
    navigator.clipboard.writeText(text)
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("pass"));
  if (saved && saved.length === 2) {
    pdata1.innerHTML = `${saved[0]} <i class="fa-regular fa-copy copy"></i>`;
    pdata2.innerHTML = `${saved[1]} <i class="fa-regular fa-copy copy"></i>`;
  }
});
