import express from "express";
const router = express.Router();

import { requireSignIn } from "../middlewares";
import { login, agentLogout, currentUser } from "../controllers/auth";

router.post("/auth/login", login);
router.get("/auth/logout", agentLogout);
router.get("/auth/current-user", requireSignIn, currentUser);

module.exports = router;
