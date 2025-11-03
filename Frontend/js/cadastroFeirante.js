document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

document.getElementById("feirante-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const feiranteData = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
    };
    
    axios.post("http://localhost:3000/feirantes", feiranteData, { headers })
        .then(() => {
            alert("Feirante cadastrada com sucesso!");
            window.location.reload();
        })
        .catch(error => console.error("Erro ao cadastrar feira", error));
});

function loadFeirantes() {
    axios.get("http://localhost:3000/feirantes", { headers })
        .then(response => {
            const feirantesList = document.getElementById("feirantes-list");
            feirantesList.innerHTML = "";
            response.data.forEach(feirante => {
                const row = `<tr>
                    <td>${feirante.nome}</td>
                    <td>${feirante.cpf}</td>
                    <td>${feirante.telefone}</td>
                    <td>${feirante.email}</td>
                    <td>
                        <a href="editarFeirante.html?id=${feirante.id}" class="btn btn-primary btn-sm">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="deleteFeirante(${feirante.id})">Deletar</button>
                    </td>
                </tr>`;
                feirantesList.innerHTML += row;
            });
        })
        .catch(error => console.error("Erro ao carregar feirantes", error));
}

function deleteFeirante(id) {
    if (confirm("Tem certeza que deseja deletar este feirante?")) {
        axios.delete(`http://localhost:3000/feirantes/${id}`, { headers })
            .then(() => {
                alert("Feirante deletado com sucesso!");
                loadFeirantes();
            })
            .catch(error => console.error("Erro ao deletar feirante", error));
    }
}

loadFeirantes();