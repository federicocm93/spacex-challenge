import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/routes";

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Welcome to Cliengo's SpaceX Challenge!");
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
