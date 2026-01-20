export default (sequelize, DataTypes) => {
    const FuncionarioHorario = sequelize.define(
        "FuncionarioHorario",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            id_funcionario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            dia_semana: {
                type: DataTypes.TINYINT,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 6,
                },
            },

            data: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            atendimento: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            entrada: {
                type: DataTypes.TIME,
                allowNull: true,
            },

            saida: {
                type: DataTypes.TIME,
                allowNull: true,
            },
        },
        {
            tableName: "funcionario_horario",

            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return FuncionarioHorario;
};
