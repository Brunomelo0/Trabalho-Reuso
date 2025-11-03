const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");
const Feira = require("./feira");
const Feirante = require("./feirante");

const Estande = sequelize.define("Estande", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  feira_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Feira, key: "id" } },
  feirante_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: Feirante, key: "id" } },
  numero: { type: DataTypes.STRING(10), allowNull: false },
  tamanho_m2: { type: DataTypes.DECIMAL(5,2), allowNull: false },
}, {
  tableName: "estande",
  timestamps: false
});

Feira.hasMany(Estande, { foreignKey: "feira_id", as: "estandes" });
Estande.belongsTo(Feira, { foreignKey: "feira_id", as: "feira" });

Feirante.hasMany(Estande, { foreignKey: "feirante_id", as: "estandes" });
Estande.belongsTo(Feirante, { foreignKey: "feirante_id", as: "feirante" });

module.exports = Estande;