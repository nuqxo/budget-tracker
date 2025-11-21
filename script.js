const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function render() {
    expenseList.innerHTML = "";
    expenses.forEach((item, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} — $${item.amount.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeItem(${i})">✖</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

function addExpense() {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!name || isNaN(amount)) return;

    expenses.push({ name, amount });
    save();
    render();

    nameInput.value = "";
    amountInput.value = "";
}

function removeItem(index) {
    const li = expenseList.children[index];
    li.classList.add("removing");

    setTimeout(() => {
        expenses.splice(index, 1);
        save();
        render();
    }, 200);
}

addBtn.addEventListener("click", addExpense);

render();
