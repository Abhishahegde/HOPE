// Sample contacts data
let contacts = [
    { name: "Ananya", phone: "9900467854" },
    { name: "Ashok", phone: "8494860227" },
    { name: "Aman", phone: "8978434567" }
];

// Function to populate the contacts table
function populateContacts() {
    const tableBody = document.querySelector('#contactsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${contact.name}</td><td><a href="tel:${contact.phone}">${contact.phone}</a></td>`;
        tableBody.appendChild(row);
    });
}

// Function to initialize the app
function initializeApp() {
    populateContacts(); // Populate the table with initial contacts
}

// Handle emoji selection
const emojis = document.querySelectorAll('.emoji');
const suggestionsDiv = document.getElementById('suggestions');
const suggestionText = document.getElementById('suggestionText');
const callButton = document.getElementById('callSomeoneButton');

emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
        const selectedEmotion = emoji.getAttribute('data-emotion');
        emojis.forEach(e => e.classList.remove('selected')); // Clear previous selection
        emoji.classList.add('selected'); // Highlight selected emoji

        // Display relevant message based on selected emotion
        if (selectedEmotion === 'happy') {
            suggestionText.textContent = "That's great to hear! Keep smiling!";
            callButton.classList.add('hidden'); // Hide call button
        } else if (selectedEmotion === 'neutral') {
            suggestionText.textContent = "A neutral day can be a good day! How about a short walk?";
            callButton.classList.add('hidden'); // Hide call button
        } else if (selectedEmotion === 'sad') {
            suggestionText.textContent = "I'm sorry to hear that. Would you like to:";
            callButton.classList.remove('hidden'); // Show call button
        }

        suggestionsDiv.classList.remove('hidden'); // Show suggestions
    });
});

// Handle adding new contacts
document.getElementById('addContactButton').addEventListener('click', () => {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');

    if (nameInput.value && phoneInput.value) {
        contacts.push({ name: nameInput.value, phone: phoneInput.value });
        populateContacts();
        nameInput.value = ''; // Clear input
        phoneInput.value = ''; // Clear input
    } else {
        alert("Please fill in both fields.");
    }
});

// Handle call someone button (this can be customized as needed)
document.getElementById('callSomeoneButton').addEventListener('click', () => {
    alert("Calling someone for support...");
    // Here you can integrate actual calling functionality if needed
});

// Initialize the app on page load
window.onload = initializeApp;