
export default (sequelize, DataTypes) => {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      id_estabelecimento: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "estabelecimento",
          key: "id",
        },
      },
    },
    {
      tableName: "funcionario",

      timestamps: true,          // createdAt / updatedAt
      paranoid: true,            // deletedAt

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

    }
  );

  Funcionario.associate = (models) => {
    Funcionario.belongsTo(models.Estabelecimento, {
      foreignKey: "id_estabelecimento",
      as: "estabelecimento",
    });
  };

  return Funcionario;
};
