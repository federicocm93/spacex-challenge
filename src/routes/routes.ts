import { Router } from "express";
import launchesRoutes from "./launches.route";
const router = Router();

router.use("/launches", launchesRoutes);

export default router;
