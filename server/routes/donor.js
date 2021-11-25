import express from "express";
const router = express.Router();

import {
  getAdminDonor,
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
  validateDonor,
} from "../controllers/donor";

import { requireAgentSignIn, requireAdminSignIn } from "../middlewares/index";

router.get("/donor/admin/get", requireAdminSignIn, getAdminDonor);
router.post("/donor/get", requireAgentSignIn, getDonor);
router.post("/donor/create", requireAgentSignIn, createDonor);
router.post("/donor/update", requireAgentSignIn, updateDonor);
router.post("/donor/delete", requireAgentSignIn, deleteDonor);
router.post("/donor/validate", requireAgentSignIn, validateDonor);

module.exports = router;
