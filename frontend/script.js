document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('birthdayForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;

        const response = await fetch('http://localhost:3000/api/users', {  // Use localhost:3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, dob })
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');

        if (response.ok) {
            messageDiv.textContent = 'User registered successfully!';
            messageDiv.style.color = 'green';
        } else {
            messageDiv.textContent = 'Error registering user: ' + result.message;
            messageDiv.style.color = 'red';
        }
    });
});
