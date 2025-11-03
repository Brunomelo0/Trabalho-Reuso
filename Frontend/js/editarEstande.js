document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

const urlParams = new URLSearchParams(window.location.search);
const estandeId = urlParams.get('id');
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

const feiraSelect = document.getElementById("feira_id");
const feiranteSelect = document.getElementById("feirante_id");

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

function carregarEstande() {
    axios.get(`http://localhost:3000/estandes/${estandeId}/details`, { headers })
        .then(response => {
            const estande = response.data;
            document.getElementById("numero").value = estande.numero;
            document.getElementById("tamanho_m2").value = estande.tamanho;
        })
        .catch(error => console.error("Erro ao carregar feirante", error));
}

document.getElementById("editar-estande-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const estandeData = {
        feira_id: document.getElementById("feira_id").value,
        feirante_id: document.getElementById("feirante_id").value,
        numero: document.getElementById("numero").value,
        tamanho_m2: document.getElementById("tamanho_m2").value,
    };

    axios.put(`http://localhost:3000/estandes/${estandeId}`, estandeData, { headers })
        .then(() => {
            alert("Estande atualizado com sucesso!");
            window.location.href = "cadastroEstande.html";
        })
        .catch(error => console.error("Erro ao atualizar estande", error));
});

loadFeiras();
loadFeirantes();
carregarEstande();