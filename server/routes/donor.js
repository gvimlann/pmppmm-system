import express from "express";
const router = express.Router();

import {
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
  validateDonor,
} from "../controllers/donor";

import { requireSignIn, requireAgentSignIn } from "../middlewares/index";

router.post("/donor/get", requireAgentSignIn, getDonor);
router.post("/donor/create", requireAgentSignIn, createDonor);
router.post("/donor/update", requireAgentSignIn, updateDonor);
router.post("/donor/delete", requireAgentSignIn, deleteDonor);
router.post("/donor/validate", requireAgentSignIn, validateDonor);

module.exports = router;
