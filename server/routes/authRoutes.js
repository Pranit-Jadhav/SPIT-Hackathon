import express from "express";
import {
  signup,
  signin,
  requestPasswordReset,
  confirmPasswordReset,
} from "../controller/auth.controller.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/password-reset/request", requestPasswordReset);
router.post("/password-reset/confirm", confirmPasswordReset);

export default router;
