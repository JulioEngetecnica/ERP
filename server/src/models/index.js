import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "#database";

import UsuarioModel from "./Usuario.js";
import ProdutoModel from "./Produto.js";
import FuncionarioModel from "./Funcionario.js";
import EstabelecimentoModel from "./Estabelecimento.js";


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Usuario = UsuarioModel(sequelize, DataTypes);
db.Produto = ProdutoModel(sequelize, DataTypes);
db.Funcionario = FuncionarioModel(sequelize, DataTypes);
db.Estabelecimento = EstabelecimentoModel(sequelize, DataTypes);

// Executa associações (se existirem)
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
