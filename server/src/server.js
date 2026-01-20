
import express from "express";
import cors from "cors";
import { connectDB } from "#database";
import routes from "#routes";

// import setHorario from "./features/configuracoes/horario/horarioFuncionario.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

await connectDB();

app.listen(5000, () => {
  console.log("🚀 Servidor rodando na porta 5000");
});

// const a = await setHorario(1,2,1,"08:00","08:00");