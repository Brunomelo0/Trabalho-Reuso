document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const urlParams = new URLSearchParams(window.location.search);
const feiraId = urlParams.get('id');
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

function carregarFeira() {
    axios.get(`http://localhost:3000/feiras/${feiraId}`, { headers })
        .then(response => {
            const feira = response.data;
            document.getElementById("nome").value = feira.nome;
            document.getElementById("descricao").value = feira.descricao;
            document.getElementById("localizacao").value = feira.localizacao;
            document.getElementById("data_inicio").value = feira.data_inicio;
            document.getElementById("data_fim").value = feira.data_fim;
            document.getElementById("horario_inicio").value = feira.horario_inicio;
            document.getElementById("horario_fim").value = feira.horario_fim;
        })
        .catch(error => console.error("Erro ao carregar feira", error));
}

document.getElementById("editar-feira-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const feiraData = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        localizacao: document.getElementById("localizacao").value,
        data_inicio: document.getElementById("data_inicio").value,
        data_fim: document.getElementById("data_fim").value,
        horario_inicio: document.getElementById("horario_inicio").value,
        horario_fim: document.getElementById("horario_fim").value
    };

    axios.put(`http://localhost:3000/feiras/${feiraId}`, feiraData, { headers })
        .then(() => {
            alert("Feira atualizada com sucesso!");
            window.location.href = "cadastroFeira.html";
        })
        .catch(error => console.error("Erro ao atualizar feira", error));
});

carregarFeira();