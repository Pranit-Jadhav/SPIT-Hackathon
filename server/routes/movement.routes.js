import express from "express";
import {
  createMovement,
  listMovements,
  getMovement,
  updateMovement,
  deleteMovement,
} from "../controller/movement.controller.js";

const router = express.Router();

router.post("/", createMovement);
router.get("/", listMovements);
router.get("/:id", getMovement);
router.put("/:id", updateMovement);
router.delete("/:id", deleteMovement);

export default router;
