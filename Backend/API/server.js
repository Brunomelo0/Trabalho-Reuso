require("dotenv").config();
require("./models/feira");
require("./models/estande");
require("./models/produto");
require("./models/venda");
require("./models/itemVenda");
const express = require("express");
const sequelize = require("./sequelize-config");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const feiranteRoutes = require("./routes/feiranteRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const vendaRoutes = require("./routes/vendaRoutes");
const itemVendaRoutes = require("./routes/itemVendaRoutes");
const feiraRoutes = require("./routes/feiraRoutes");
const estandeRoutes = require("./routes/estandeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use("/auth", authRoutes);
app.use("/feirantes", feiranteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/vendas", vendaRoutes);
app.use("/itens-venda", itemVendaRoutes);
app.use("/feiras", feiraRoutes);
app.use("/estandes", estandeRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});