import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { launchesService } from "./services/launches.service";
import { NotFoundError } from "./errors/notFound.error";

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Welcome to Cliengo's SpaceX Challenge!");
});

app.get("/launches", async (req: Request, res: Response) => {
  try {
    const launches = await launchesService.getLaunches();
    res.status(200).send([...launches]);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).send({
        error: error.message,
      });
    } else if (error instanceof Error) {
      res.status(500).send({
        error: error.message,
      });
    } else {
      res.status(500).send("An unknown error ocurred");
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
