const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];
const letters = characters.slice(0, 52);
const numbers = characters.slice(52, 62);
const symbols = characters.slice(62);

const genBtn = document.getElementById("gen-btn");
const reSet = document.getElementById("reset");

const pdata1 = document.getElementById("op1");
const pdata2 = document.getElementById("op2");
const inPt = document.getElementById("ipt");
const output = document.getElementById("value");

const alphabetCb = document.getElementById("Alphabet");
const numberCb = document.getElementById("Number");
const symbolsCb = document.getElementById("Symbols");

genBtn.addEventListener("click", genpass);
reSet.addEventListener("click", resetpass);

output.innerHTML = inPt.value;

inPt.oninput = function () {
  output.innerHTML = this.value;
};

inPt.addEventListener("input", function () {
  let x = inPt.value * 4;
  let color = `linear-gradient(90deg, #05e648 ${x}%, #ffffff1a ${x}%)`;
  inPt.style.background = color;
  // genpass()
});

function resetpass() {
  pdata1.textContent = "Password 1";
  pdata2.textContent = "Password 2";
  inPt.value = 0;
  inPt.style.background = `linear-gradient(90deg, #05e648 ${0}%, #ffffff1a ${0}%)`;
  // clear checkboxes
  alphabetCb.checked = false;
  numberCb.checked = false;
  symbolsCb.checked = false;

  localStorage.removeItem("pass");
  localStorage.removeItem("options");
  inPt.focus();
}
function genpass() {
  const n = Number(inPt.value);
  if (isNaN(n) || n === 0) {
    pdata1.textContent = "Password 1";
    pdata2.textContent = "Password 2";
    return;
  }

  // Create pool from selected options
  let pool = [];
  if (alphabetCb.checked) pool = pool.concat(letters);
  if (numberCb.checked) pool = pool.concat(numbers);
  if (symbolsCb.checked) pool = pool.concat(symbols);

  if (pool.length === 0) {
    pdata1.textContent = "⚠️ Select at least one type";
    pdata2.textContent = "";
    return;
  }

  // Generate both passwords
  const pass1 = generatePassword(pool, n);
  const pass2 = generatePassword(pool, n);

  // Always ensure exact length
  if (pass1.length !== n || pass2.length !== n) {
    console.warn("Password length mismatch, regenerating...");
    return genpass(); // retry once safely
  }

  // Save in localStorage
  const pass = [pass1, pass2];
  const options = {
    alphabet: alphabetCb.checked,
    number: numberCb.checked,
    symbols: symbolsCb.checked,
    length: n,
  };
  localStorage.setItem("pass", JSON.stringify(pass));
  localStorage.setItem("options", JSON.stringify(options));

  // Display
  pdata1.innerHTML = `${pass1} <i class="fa-regular fa-copy copy"></i>`;
  pdata2.innerHTML = `${pass2} <i class="fa-regular fa-copy copy"></i>`;
}

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generatePassword(pool, length) {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += pool[randomIndex(pool)];
  }
  return password;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    const text = e.target.parentElement.textContent.trim();
    navigator.clipboard.writeText(text);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("pass"));
  const savedOptions = JSON.parse(localStorage.getItem("options"));

  if (saved && saved.length === 2) {
    pdata1.innerHTML = `${saved[0]} <i class="fa-regular fa-copy copy"></i>`;
    pdata2.innerHTML = `${saved[1]} <i class="fa-regular fa-copy copy"></i>`;
  }
  if (savedOptions) {
    alphabetCb.checked = savedOptions.alphabet;
    numberCb.checked = savedOptions.number;
    symbolsCb.checked = savedOptions.symbols;
    inPt.value = savedOptions.length || 0;

   output.innerHTML = inPt.value;
   let x = inPt.value * 4;
   inPt.style.background = `linear-gradient(90deg, #05e648 ${x}%, #ffffff1a ${x}%)`;
  }
});
