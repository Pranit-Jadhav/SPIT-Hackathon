import express from "express";
import {
  createWarehouse,
  listWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../controller/warehouse.controller.js";

const router = express.Router();

router.post("/", createWarehouse);
router.get("/", listWarehouses);
router.get("/:id", getWarehouse);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

export default router;
