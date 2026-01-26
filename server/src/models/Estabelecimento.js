
export default (sequelize, DataTypes) => {
    const Estabelecimento = sequelize.define(
        "Estabelecimento",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "usuario",
                    key: "id",
                },
            },

            nome: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            logo: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },


            cnpj: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            endereco: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            coordenadas_endereco: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            telefone: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },

        },
        {
            tableName: "estabelecimento",

            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    Estabelecimento.associate = (models) => {
        Estabelecimento.belongsTo(models.Usuario, {
            foreignKey: "id_usuario",
            as: "usuario",
        });

        Estabelecimento.hasMany(models.Funcionario, {
            foreignKey: "id_estabelecimento",
            as: "funcionario",
        });

        Estabelecimento.hasMany(models.Servico, {
            foreignKey: "id_estabelecimento",
            as: "servico",
        });

        Estabelecimento.hasMany(models.Produto, {
            foreignKey: "id_estabelecimento",
            as: "produto",
        });
    };

    return Estabelecimento;
};
