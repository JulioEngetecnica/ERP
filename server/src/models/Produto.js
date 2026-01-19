export default (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },

      preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      unidade_medida: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "produto",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );



  return Produto;
};
