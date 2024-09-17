import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { launchesService } from "./services/launches.service";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/launches", async (req: Request, res: Response) => {
  try {
    const launches = await launchesService.getLaunches();
    res.status(200).send([...launches]);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
