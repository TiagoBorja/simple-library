document.getElementById('loginform').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Armazena o token no localStorage ou sessionStorage
        localStorage.setItem('Authorization', token);

        alert('Login successful!');
    } else {
        alert('Login failed!');
    }
});