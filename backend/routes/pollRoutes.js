import express from "express";
import { getPolls, createPoll, votePoll } from "../controllers/pollController.js";

const router = express.Router();

router.get("/", getPolls);
router.post("/", createPoll);
router.post("/:id/vote", votePoll);

export default router
