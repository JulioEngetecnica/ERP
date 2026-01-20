export default (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      id_estabelecimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "estabelecimento", // nome da tabela de estabelecimento
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // ou SET NULL dependendo da regra de negócio
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

      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "produto",

      timestamps: true,
      paranoid: true,
      underscored: true,

    }
  );

  // Associação com Estabelecimento
  Produto.associate = (models) => {
    Produto.belongsTo(models.Estabelecimento, {
      foreignKey: "id_estabelecimento",
      as: "estabelecimento",
    });
  };

  return Produto;
};
