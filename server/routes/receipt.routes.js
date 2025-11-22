import express from "express";
import {
  createReceipt,
  listReceipts,
  getReceipt,
  updateReceipt,
  deleteReceipt,
} from "../controller/receipt.controller.js";

const router = express.Router();

router.post("/", createReceipt);
router.get("/", listReceipts);
router.get("/:id", getReceipt);
router.put("/:id", updateReceipt);
router.delete("/:id", deleteReceipt);

export default router;
