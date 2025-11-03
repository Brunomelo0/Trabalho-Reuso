document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };
let itensVenda = [];

function carregarFeirantes() {
    axios.get("http://localhost:3000/feirantes", { headers })
        .then(response => {
            const select = document.getElementById("feirante");
            response.data.forEach(feirante => {
                let option = new Option(feirante.nome, feirante.id);
                select.add(option);
            });
        })
        .catch(error => console.error("Erro ao carregar feirantes", error));
}

function carregarFeiras() {
    axios.get("http://localhost:3000/feiras", { headers })
        .then(response => {
            const select = document.getElementById("feira");
            response.data.forEach(feira => {
                let option = new Option(feira.nome, feira.id);
                select.add(option);
            });
        })
        .catch(error => console.error("Erro ao carregar feiras", error));
}

function carregarProdutos() {
    const feiranteId = document.getElementById("feirante").value;
    axios.get(`http://localhost:3000/produtos?feirante_id=${feiranteId}`, { headers })
        .then(response => {
            const select = document.getElementById("produto");
            select.innerHTML = "";
            response.data.forEach(produto => {
                let option = new Option(`${produto.nome} - R$ ${produto.preco}`, produto.id);
                option.dataset.preco = produto.preco;
                select.add(option);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos", error));
}

document.getElementById("feirante").addEventListener("change", carregarProdutos);

document.getElementById("adicionar-item").addEventListener("click", function() {
    const produtoSelect = document.getElementById("produto");
    const quantidade = document.getElementById("quantidade").value;
    const precoUnitario = produtoSelect.selectedOptions[0].dataset.preco;
    const subtotal = quantidade * precoUnitario;

    itensVenda.push({ produto_id: produtoSelect.value, quantidade, preco_unitario: precoUnitario });

    let itemElement = document.createElement("li");
    itemElement.className = "list-group-item";
    itemElement.textContent = `${produtoSelect.selectedOptions[0].text} x ${quantidade} = R$ ${subtotal.toFixed(2)}`;
    document.getElementById("lista-itens").appendChild(itemElement);

    let total = itensVenda.reduce((sum, item) => sum + (item.quantidade * item.preco_unitario), 0);
    document.getElementById("total-venda").textContent = total.toFixed(2);
});

document.getElementById("venda-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const feiranteId = document.getElementById("feirante").value;
    const feiraId = document.getElementById("feira").value;
    const valorTotal = document.getElementById("total-venda").textContent;

    axios.post("http://localhost:3000/vendas", { feirante_id: feiranteId, feira_id: feiraId, valor_total: valorTotal }, { headers })
        .then(response => {
            const vendaId = response.data.id;
            const promises = itensVenda.map(item => axios.post("http://localhost:3000/item_venda", { ...item, venda_id: vendaId }, { headers }));
            return Promise.all(promises);
        })
        .then(() => {
            alert("Venda cadastrada com sucesso!");
            window.location.reload();
        })
        .catch(error => console.error("Erro ao cadastrar venda", error));
});

carregarFeirantes();
carregarFeiras();