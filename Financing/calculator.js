let price = 20000;
let downPayment = 1000;
let tradeIn = 0;
let credit = "excellent";
let loan = 72;

document.addEventListener("DOMContentLoaded", function(event) {
  updateAmounts();
});

function changePrice() {
  price = parseInt(document.getElementById("vehicle-price").value);
  updateAmounts();
}

function changeDown() {
  downPayment = parseInt(document.getElementById("down-p").value);
  updateAmounts();
}

function changeTrade() {
  tradeIn = parseInt(document.getElementById("trade-in").value);
  updateAmounts();
}

function changeCredit() {
  credit = document.getElementById("credit-score").value;
  updateAmounts();
}

function changeLoan() {
  loan = parseInt(document.getElementById("loan-term").value);
  updateAmounts();
}

function updateAmounts() {
  let values = calculatePrices();

  document.getElementById("apr").innerHTML = (values[0] * 100).toFixed(2).toLocaleString('en-us') + "% APR";
  document.getElementById("tax").innerHTML = "$" + Math.floor(values[1]).toLocaleString('en-us');
  document.getElementById("tAmount").innerHTML = "$" + Math.floor(values[2]).toLocaleString('en-us');
  document.getElementById("price").innerHTML = "$" + Math.floor(values[3]).toLocaleString('en-us');

  document.getElementById("vBudget").innerHTML = "$" + Math.floor(price).toLocaleString('en-us');
  document.getElementById("dPayment").innerHTML = "$" + Math.floor(-downPayment).toLocaleString('en-us');
  document.getElementById("tIValue").innerHTML = "$" + Math.floor(-tradeIn).toLocaleString('en-us');
}

function calculatePrices() {
  let APR = 0.1646;
  if (credit === "excellent") {
    APR = 0.0685;
  } else if (credit === "good") {
    APR = 0.0909;
  } else if (credit === "average") {
    APR = 0.1238;
  }

  let tax = Math.min(0.101 * price, 10000);
  let total = price - downPayment - tradeIn + tax;
  let monthly = total * (1 + APR) / loan;

  return [APR, tax, total, monthly];
}
