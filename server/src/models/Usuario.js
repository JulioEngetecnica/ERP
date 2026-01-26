import bcrypt from "bcrypt";

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
    Usuario.hasOne(models.Estabelecimento, {
      foreignKey: "id_usuario",
      as: "estabelecimento",
    });
  };


  //------------------
  //    HASH SENHA
  //------------------
  Usuario.beforeCreate(async (usuario, options) => {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  });

  Usuario.beforeUpdate(async (usuario, options) => {
    if (usuario.changed("senha")) { // só faz hash se a senha mudou
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);
    }
  });

  // Método para verificar senha
  Usuario.prototype.validarSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
  };

  return Usuario;
};
