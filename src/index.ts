import express from "express";
import cors from "cors";

import userRoutes from "./routes/routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server ok.");
});
