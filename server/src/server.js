
import express from "express";
import cors from "cors";
import { connectDB } from "#connect";
import routes from "#routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

await connectDB();

app.listen(5000, () => {
  console.log("🚀 Servidor rodando na porta 5000");
});
