import express from "express";
const router = express.Router();

import { sendEmail } from "../controllers/util";
// import { requireAdminSignIn } from "../middlewares/index";

router.post("/util/send-email", sendEmail);

module.exports = router;
