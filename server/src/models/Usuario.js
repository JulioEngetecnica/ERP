export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
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
          len: [2, 100],
        },
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
    },
    {
      tableName: "usuario",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Estabelecimento, {
      foreignKey: "id_usuario",
      as: "estabelecimento",
    });
  };


  return Usuario;
};
