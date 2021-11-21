import express from "express";
const router = express.Router();

import {
  requireSignIn,
  requireAgentSignIn,
  requireAdminSignIn,
} from "../middlewares";
import {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  uploadFormTransaction,
  getAdminTransaction,
  updateAdminTransaction,
} from "../controllers/transaction";

router.post("/transaction/get", requireAgentSignIn, getTransaction);
router.post("/transaction/create", requireAgentSignIn, createTransaction);
router.post("/transaction/update", requireAgentSignIn, updateTransaction);
router.post("/transaction/delete", requireAgentSignIn, deleteTransaction);
router.post(
  "/transaction/upload-form",
  requireAgentSignIn,
  uploadFormTransaction
);

router.get("/transaction/admin/get", requireAdminSignIn, getAdminTransaction);
router.post(
  "/transaction/admin/update",
  requireAdminSignIn,
  updateAdminTransaction
);
module.exports = router;
