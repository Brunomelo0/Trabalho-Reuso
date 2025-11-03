document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../home.html";
});

function carregarDashboard() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://localhost:3000/feiras/total", { headers })
        .then(response => {
            document.getElementById("total-feiras").textContent = response.data.total;
        })
        .catch(error => {
            console.error("Erro ao carregar total de feiras", error);
        });

    axios.get("http://localhost:3000/estandes/total", { headers })
        .then(response => {
            document.getElementById("total-estandes").textContent = response.data.total;
        })
        .catch(error => {
            console.error("Erro ao carregar total de estandes", error);
        });

    axios.get("http://localhost:3000/feirantes/total", { headers })
        .then(response => {
            document.getElementById("total-feirantes").textContent = response.data.total;
        })
        .catch(error => {
            console.error("Erro ao carregar total de feirantes", error);
        });
}

carregarDashboard();