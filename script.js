'use strict';

const balanceEl = document.getElementById('balance');

const moneyPlusEl = document.getElementById('money-plus');

const moneyMinusEl = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const transactionInputEl = document.getElementById('transaction');

const amountInputEl = document.getElementById('amount');

//Global variables
let transactions = [];

//functions

//generateRandomID
const generateRandomID = function () {
  return Math.floor(Math.random() * 10000);
};

const init = function () {
  list.innerHTML = '';
  transactions.forEach(addTransaction);
  updateValues();
  transactionInputEl.value = ``;
  amountInputEl.value = ``;
};

const addTransaction = (transactionObj) => {
  const { id, transaction, amount } = transactionObj;
  const type = amount > 0 ? 'plus' : 'minus';
  const transactionEl = document.createElement('li');
  transactionEl.classList.add(type);
  transactionEl.innerHTML = `
    ${transaction} 
    <span>₹${amount}</span>
    <button 
      class="delete-btn" 
      onclick = 'deleteTransaction(${id})'
    >
      x
    </button>
  `;
  list.appendChild(transactionEl);
};

const deleteTransaction = (id) => {
  transactions = transactions.filter((transaction) => {
    return transaction.id !== id;
  });
  init();
};

const updateValues = () => {
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .map((transaction) => transaction.amount)
    .reduce((acc, amount) => acc + amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .map((transaction) => transaction.amount)
    .reduce((acc, amount) => acc + amount, 0);

  const balance = totalIncome - -totalExpense;
  balanceEl.innerText = `₹${balance}`;
  moneyPlusEl.innerText = `₹${totalIncome}`;
  moneyMinusEl.innerText = `₹${totalExpense}`;
};

//Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const transaction = transactionInputEl.value;
  const amount = Number(amountInputEl.value);

  if (transaction.trim() && amount) {
    const newTransaction = {
      id: generateRandomID(),
      transaction,
      amount,
    };

    transactions.push(newTransaction);
    init();
  }
});

//initial Settings
init();

