// app.js

// Customer array to hold data in memory
let customers = [];
let editingCustomerId = null;  // New variable to track if we're editing a customer

// Select DOM elements
const customerForm = document.getElementById('customerForm');
const customerTableBody = document.getElementById('customerTableBody');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const discountCodeInput = document.getElementById('discountCode');

// Event listener for form submission (adding or editing customer)
customerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const discountCode = discountCodeInput.value;

    if (editingCustomerId) {
        // If editing an existing customer
        const customer = customers.find(c => c.id === editingCustomerId);
        customer.name = name;
        customer.email = email;
        customer.discountCode = discountCode;
        editingCustomerId = null;  // Reset the edit state
    } else {
        // If adding a new customer
        const newCustomer = {
            id: Date.now(), // Generate unique ID
            name,
            email,
            discountCode,
            used: false // Default to not used
        };
        customers.push(newCustomer);
    }

    // Clear form
    customerForm.reset();

    // Update the UI
    renderCustomerTable();
});

// Function to render the customer table
function renderCustomerTable() {
    customerTableBody.innerHTML = ''; // Clear table body

    customers.forEach(customer => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="border px-4 py-2">${customer.name}</td>
            <td class="border px-4 py-2">${customer.email}</td>
            <td class="border px-4 py-2">${customer.discountCode}</td>
            <td class="border px-4 py-2">${customer.used ? 'Used' : 'Not Used'}</td>
            <td class="border px-4 py-2">
                <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="markAsUsed(${customer.id})">Mark as Used</button>
                <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editCustomer(${customer.id})">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;

        customerTableBody.appendChild(row);
    });
}

// Function to mark a discount code as used
function markAsUsed(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        customer.used = true;
        renderCustomerTable();
    }
}

// Function to edit customer details
function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        nameInput.value = customer.name;
        emailInput.value = customer.email;
        discountCodeInput.value = customer.discountCode;
        editingCustomerId = customer.id; // Set the customer being edited
    }
}

// Function to delete a customer
function deleteCustomer(customerId) {
    customers = customers.filter(c => c.id !== customerId);
    renderCustomerTable();
}
