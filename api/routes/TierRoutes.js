import { Router } from "express";
import { TierController } from "../controllers/TierController.js";

export const TierRouter = Router()

TierRouter.post("/", TierController.store)
TierRouter.get("/", TierController.index)
TierRouter.delete("/", TierController.delete)
TierRouter.post("/:id", TierController.find)
TierRouter.patch("/:id", TierController.update)
TierRouter.get("/all", TierController.getAll)