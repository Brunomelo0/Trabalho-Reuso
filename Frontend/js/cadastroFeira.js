document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

document.getElementById("feira-form").addEventListener("submit", function (event) {
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

    axios.post("http://localhost:3000/feiras", feiraData, { headers })
        .then(() => {
            alert("Feira cadastrada com sucesso!");
            window.location.reload();
        })
        .catch(error => console.error("Erro ao cadastrar feira", error));
});

function loadFeiras() {
    axios.get("http://localhost:3000/feiras", { headers })
        .then(response => {
            const feirasList = document.getElementById("feiras-list");
            feirasList.innerHTML = "";
            response.data.forEach(feira => {
                const row = `<tr>
                    <td>${feira.nome}</td>
                    <td>${feira.descricao}</td>
                    <td>${feira.localizacao}</td>
                    <td>${feira.data_inicio}</td>
                    <td>
                        <a href="editarFeira.html?id=${feira.id}" class="btn btn-primary btn-sm">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="deleteFeira(${feira.id})">Deletar</button>
                    </td>
                </tr>`;
                feirasList.innerHTML += row;
            });
        })
        .catch(error => console.error("Erro ao carregar feiras", error));
}

function deleteFeira(id) {
    if (confirm("Tem certeza que deseja deletar esta feira?")) {
        axios.delete(`http://localhost:3000/feiras/${id}`, { headers })
            .then(() => {
                alert("Feira deletada com sucesso!");
                loadFeiras();
            })
            .catch(error => console.error("Erro ao deletar feira", error));
    }
}


loadFeiras();