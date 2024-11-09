document.getElementById('addReminderButton').addEventListener('click', function() {
    const phoneNumber = document.getElementById('phoneNumberInput').value;
    const message = document.getElementById('messageInput').value;

    fetch('/addReminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, message })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle success
    })
    .catch(error => {
        console.error('Error:', error); // Handle error
    });
});