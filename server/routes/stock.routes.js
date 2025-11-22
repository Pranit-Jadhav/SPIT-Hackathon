import express from "express";
import {
  listStocks,
  getStock,
  updateStock,
} from "../controller/stock.controller.js";

const router = express.Router();

router.get("/", listStocks);
router.get("/:id", getStock);
router.put("/:id", updateStock);

export default router;
