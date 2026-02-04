import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", verifyJWT, getCurrentUser);
router.put("/me", verifyJWT, updateAccountDetails);

export default router;
