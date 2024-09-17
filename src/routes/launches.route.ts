import { Request, Response, Router } from "express";
import { launchesService } from "../services/launches.service";
import { NotFoundError } from "../errors/notFound.error";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
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

export default router;
