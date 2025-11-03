document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let senha = ""+password
    axios.post("http://localhost:3000/auth/login", { email, senha })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            window.location.href = "dashboard.html";
        })
        .catch(error => alert("Login falhou! Verifique suas credenciais."));
}); 