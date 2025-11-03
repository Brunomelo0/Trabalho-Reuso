document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

document.addEventListener("DOMContentLoaded", function () {
    const feiraSelect = document.getElementById("feira_id");
    const feiranteSelect = document.getElementById("feirante_id");
    const estandesList = document.getElementById("estandes-list");

    function loadFeiras() {
        axios.get("http://localhost:3000/feiras", { headers }).then(response => {
            feiraSelect.innerHTML = "";
            response.data.forEach(feira => {
                feiraSelect.innerHTML += `<option value="${feira.id}">${feira.nome}</option>`;
            });
        });
    }

    function loadFeirantes() {
        axios.get("http://localhost:3000/feirantes", { headers }).then(response => {
            feiranteSelect.innerHTML = "";
            response.data.forEach(feirante => {
                feiranteSelect.innerHTML += `<option value="${feirante.id}">${feirante.nome}</option>`;
            });
        });
    }

    document.getElementById("estande-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const estandeData = {
            feira_id: feiraSelect.value,
            feirante_id: feiranteSelect.value || null,
            numero: document.getElementById("numero").value,
            tamanho_m2: document.getElementById("tamanho_m2").value
        };

        axios.post("http://localhost:3000/estandes", estandeData, { headers })
            .then(() => {
                alert("Estande cadastrado com sucesso!");
                loadEstandes();
            })
            .catch(error => console.error("Erro ao cadastrar estande", error));
    });

    loadFeiras();
    loadFeirantes();
    loadEstandes();
});
const estandesList = document.getElementById("estandes-list");
function loadEstandes() {
    axios.get("http://localhost:3000/estandes", { headers }).then(response => {
        estandesList.innerHTML = "";
        response.data.forEach(estande => {
            axios.get(`http://localhost:3000/estandes/${estande.id}/details`, { headers }).then(response => {
                row = `<tr>
                <td>${response.data.numero || 'Não definido'}</td>
                <td>${response.data.feira || 'Nenhum'}</td>
                <td>${response.data.feirante || 'Nenhum'}</td>
                <td>${response.data.tamanho || 'Não definido'}</td>
                <td>
                    <a href="editarEstande.html?id=${response.data.estande_id}" class="btn btn-primary btn-sm">Editar</a>
                    <button class="btn btn-danger btn-sm" onclick="deleteEstande(${response.data.estande_id})">Deletar</button>
                </td>
            </tr>`;
            estandesList.innerHTML += row;
            })
        });
    });
}
function deleteEstande(id) {
    if (confirm("Tem certeza que deseja deletar este estande?")) {
        axios.delete(`http://localhost:3000/estandes/${id}`, { headers })
            .then(() => {
                alert("Estande deletado com sucesso!");
                loadEstandes();
            })
            .catch(error => console.error("Erro ao deletar feirante", error));
    }
}