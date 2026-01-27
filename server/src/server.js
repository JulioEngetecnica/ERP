
import express from "express";
import cors from "cors";
import { connectDB } from "#database";
import routes from "#routes";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORIGIN_URL, // porta do seu front
  credentials: true
}));

app.use("/api", routes);

await connectDB();

app.listen(process.env.PORT, () => {
  console.log("🚀 Servidor rodando na porta " + process.env.PORT);
});

