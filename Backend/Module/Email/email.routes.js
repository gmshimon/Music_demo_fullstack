import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import { getAllEmails, getEmailById, updateEmail } from "./email.controller.js";

const router = express.Router();

// Admin protected routes
router.get("/", verifyToken, getAllEmails);
router.put("/:id", verifyToken, updateEmail);

export default router;
