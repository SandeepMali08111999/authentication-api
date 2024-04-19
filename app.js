import express from "express";
import { AuthRouter } from "./routes/index.js";
import { config } from "dotenv";
import connectDB from "./config/db.js";
const app = express();
const port = process.env.PORT || 8080;
config();
connectDB();

app.use(express.json());

app.use("/auth", AuthRouter);
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
