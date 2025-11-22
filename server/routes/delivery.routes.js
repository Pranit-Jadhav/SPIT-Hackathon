import express from "express";
import {
  createDelivery,
  listDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
} from "../controller/delivery.controller.js";

const router = express.Router();

router.post("/", createDelivery);
router.get("/", listDeliveries);
router.get("/:id", getDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

export default router;
