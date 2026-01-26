
export default (sequelize, DataTypes) => {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.INTEGER,
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
      underscored: true,

    }
  );

  Funcionario.associate = (models) => {
    // Um funcionário pertence a um estabelecimento
    Funcionario.belongsTo(models.Estabelecimento, {
      foreignKey: "id_estabelecimento",
      as: "estabelecimento",
    });

    // Um funcionário tem muitos horários
    Funcionario.hasMany(models.FuncionarioHorario, {
      foreignKey: "id_funcionario",
      as: "funcionario_horario",
    });
  };

  
  return Funcionario;
};
