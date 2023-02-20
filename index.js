// Define initial expenses data
const initialExpenses = [
    { id: 1, title: 'Groceries', amount: 100 },
    { id: 2, title: 'Gas', amount: 50 },
    { id: 3, title: 'Dinner', amount: 75 },
  ];
  
  // Define state variables
  let expenses = initialExpenses;
  let totalExpense = 0;
  
  // Get DOM elements
  const expensesList = document.getElementById('expenses-list');
  const totalExpenseElement = document.getElementById('total-expense');
  const addExpenseForm = document.getElementById('add-expense-form');
  const expenseTitleInput = document.getElementById('expense-title-input');
  const expenseAmountInput = document.getElementById('expense-amount-input');
  
  // Render expenses list
  function renderExpenses() {
    expensesList.innerHTML = '';
    for (const expense of expenses) {
      const expenseItem = document.createElement('li');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <div class="expense-item__title">${expense.title}</div>
        <div class="expense-item__amount">$${expense.amount}</div>
        <button class="expense-item__delete-btn" data-id="${expense.id}">X</button>
      `;
      expensesList.appendChild(expenseItem);
    }
  }
  
  // Calculate total expense
  function calculateTotalExpense() {
    totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    totalExpenseElement.textContent = `$${totalExpense}`;
  }
  
  // Handle form submit
  function handleFormSubmit(event) {
    event.preventDefault();
    const title = expenseTitleInput.value;
    const amount = parseInt(expenseAmountInput.value);
    if (title && amount) {
      const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
      expenses.push({ id, title, amount });
      renderExpenses();
      calculateTotalExpense();
      expenseTitleInput.value = '';
      expenseAmountInput.value = '';
    }
  }
  
  // Handle delete expense
  function handleDeleteExpense(event) {
    if (event.target.classList.contains('expense-item__delete-btn')) {
      const id = parseInt(event.target.dataset.id);
      expenses = expenses.filter((expense) => expense.id !== id);
      renderExpenses();
      calculateTotalExpense();
    }
  }
  
  // Attach event listeners
  addExpenseForm.addEventListener('submit', handleFormSubmit);
  expensesList.addEventListener('click', handleDeleteExpense);
  
  // Initial render
  renderExpenses();
  calculateTotalExpense();
  