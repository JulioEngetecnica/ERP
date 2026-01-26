
import express from "express";
import cors from "cors";
import { connectDB } from "#database";
import routes from "#routes";
import cookieParser from 'cookie-parser';

// import setHorario from "./features/configuracoes/horario/horarioFuncionario.controller.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // porta do seu front
  credentials: true
}));

app.use("/api", routes);

await connectDB();

app.listen(5000, () => {
  console.log("🚀 Servidor rodando na porta 5000");
});

// const a = await setHorario(1,2,1,"08:00","08:00");