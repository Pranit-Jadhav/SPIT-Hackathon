import express from "express";
import {
  createLocation,
  listLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} from "../controller/location.controller.js";

const router = express.Router();

router.post("/", createLocation);
router.get("/", listLocations);
router.get("/:id", getLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
