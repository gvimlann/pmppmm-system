import express from "express";
const router = express.Router();

import {
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
} from "../controllers/agent";
import { requireAdminSignIn } from "../middlewares/index";

router.get("/agent/get", requireAdminSignIn, getAgent);
router.post("/agent/create", requireAdminSignIn, createAgent);
router.post("/agent/update", requireAdminSignIn, updateAgent);
router.post("/agent/delete", requireAdminSignIn, deleteAgent);

module.exports = router;
