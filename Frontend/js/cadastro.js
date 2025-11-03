document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    axios.post("http://localhost:3000/auth/register", { nome, email, senha })
        .then(response => {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("Erro no cadastro", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        });
});