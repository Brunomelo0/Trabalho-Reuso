const EventEmitter = require("events");

const notifier = new EventEmitter();

notifier.on("vendaCreated", (data) => {
  console.log(`[Notifier] Nova venda criada! ID: ${data.venda_id}`);
});

notifier.on("stockZero", (data) => {
  console.log(`[Notifier] Estoque zerado para o produto: ${data.nome} (ID: ${data.produto_id})`);
});

module.exports = notifier;
