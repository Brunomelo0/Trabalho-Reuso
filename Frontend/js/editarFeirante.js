document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const urlParams = new URLSearchParams(window.location.search);
const feiranteId = urlParams.get('id');
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

function carregarFeirante() {
    axios.get(`http://localhost:3000/feirantes/${feiranteId}`, { headers })
        .then(response => {
            const feirante = response.data;
            document.getElementById("nome").value = feirante.nome;
            document.getElementById("cpf").value = feirante.cpf;
            document.getElementById("telefone").value = feirante.telefone;
            document.getElementById("email").value = feirante.email;
            document.getElementById("endereco").value = feirante.endereco;
        })
        .catch(error => console.error("Erro ao carregar feirante", error));
}

document.getElementById("editar-feirante-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const feiranteData = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
    };

    axios.put(`http://localhost:3000/feirantes/${feiranteId}`, feiranteData, { headers })
        .then(() => {
            alert("Feirante atualizada com sucesso!");
            window.location.href = "cadastroFeirante.html";
        })
        .catch(error => console.error("Erro ao atualizar feirante", error));
});

carregarFeirante();