
// App elements 
const balanceEl = document.querySelector('.balance .value');
const incomeTotalEl = document.querySelector('.outcome-total');
const outcomeTotalEl = document.querySelector('income-total');
const chartEl = document.querySelector('.chart');
const canvas = documt.querySelector("canvas");

canvas.width = 50;
canvas.height = 50;

chartEl.appendChild( canvas );
const ctx = canvas.getContext("2d");
ctx.arc(x, y, Radius, startAngle, endAngle, anticlockwise );

const R = 20;

function drawCircle( color, ratio, anticlockwise){
  ctx.strokeStyle = color 
  ctx.beginPath();
  ctx.arc( cvs.width/2, cvs.height/2, R, 0, ratio * 2 * Math.PI, anticlockwise);
}

function updateChart(income, outcome){
  ctx.clearRect(0,0, cvs.width, cvs.height);
  let ratio = income/(income + outcome);
  drawCircle("#FFFFFF", -ratio, true)
  drawCircle("#F0624D", 1 - ratio, false)

}



// Dashboard buttons
const expenseBtn = document.querySelector('.tab1');
const incomeBtn = document.querySelector('.tab2');
const allBtn = document.querySelector('.tab3');

      element.classList.remove("active");
      element.classList.add("active");

const expenseEl = document.querySelector('#expense');
const incomeEl = document.querySelector('#income');
const allEl = document.querySelector('#all');

    element.classList.remove("hide");
    element.classList.add("hide");

// List items on dashboard
const incomeList = document.querySelector('#income .list');
const expenseList = document.querySelector('#expense .list');
const allList = document.querySelector('#all .list');

// Lower dashboard items Income
const addIncome = document.querySelector('.add-income');
const incomeTitle = document.getElementById('income-title-input');
const incomeAmount = document.getElementById('income-amount-input');

// Lower dashboard items Outcome

const addExpense = document.querySelector('add-expense');
const expenseTitle = document.getElementById('expense-title-input');
const expenseAmount = document.getElementById('expense-amount-input');

// Update chart elements



// Functions chapter eventlisteners

expenseBtn.addEventListener('click', function(){
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
  show(expenseEl);
  hide([incomeEl, allEl]);

})

incomeBtn.addEventListener('click', function(){
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
  show(incomeEl);
  hide([expenseEl, allEl]);

})

allBtn.addEventListener('click', function(){
  active(allBtn);
  inactive([expenseBtn, incomeBtn]);
  show(allEl);
  hide([expenseEl, incomeEl]);

})

function active( element ) {
  element.classList.add("active");
}

function show( element ) {
  element.classList.remove("hide");
}

function hide( elementsArray) {
  elementsArray.forEach(element => {
    element.classList.add("hide");
  });
}

function inactive( elementsArray) {
  elementsArray.forEach(element => {
    element.classList.remove("active");
  });
}

function clearInput( inputsArray ) {
  inputsArray.forEach(input => {
    input.value = "";
  });
}

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("outcome", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));

  let sign = (income >= outcome) ? "$" : "$";

balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
incomeEl.innerHTML = `<small>$</small>${income}`;
outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;

clearElement([incomeList, expenseList, allList]);

ENTRY_LIST.forEach( (entry, index) => {
  if(entry.type == "income"){
    showEntry(incomeList, entry.type, entry.title, entry.amount, index);
  } else if(entry.type == "expense"){
    showEntry(expenseList, entry.type, entry.title, entry.amount, index);
  }
  showEntry(allList, entry.type, entry.title, entry.amount, index);
});
  updateChart( income, outcome);
}

let ENTRY_LIST = [];

addIncome.addEventListener("click", function(){
  if( !incomeTitle.value || !incomeAmount.value ) return;
  let income = {
    type : "income",
    title : incomeTitle.value,
    amount : parseFloat(incomeAmount.value),
  }
  ENTRY_LIST.push( income );
  updateUI();
  clearInput( [incomeTitle, incomeAmount]);

})

addExpense.addEventListener("click", function(){
  if( !expenseTitle.value || !expenseAmount.value ) return;
  let expense = {
    type : "expense",
    title : expenseTitle.value,
    amount : parseFloat(expenseAmount.value),
  }
  ENTRY_LIST.push( expense );
  updateUI();
  clearInput( [expenseTitle, expenseAmount]);

})

function calculateTotal( type, ENTRY_LIST) {
  let sum = 0;
  ENTRY_LIST.forEach( entry => {
    if( entry.type == type) {
      sum += entry.amount;
    }
  });
  return sum;
}

income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("outcome", ENTRY_LIST);
balance = calculateBalance(income, outcome)

function calculateBalance(income, outcome) {
  return income - outcome;
}

// Show entry to the user
function showEntry(list, type, title, amount, id) {
  const entry = `<li id="${id}" class="${type}">
                          <div class="entry">${title}: $${amount} </div>
                          <div id="edit"></div>
                          <div id="delete"></div>
                </li> `;
  
  const position = "afterbegin";
  list.insertAdjacentHTML(position, entry);
}

