import { Router } from "express";
import { FEATURE_FLAGS, FeatureFlagUpdate } from "../../config/feature-flags";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    paginationLimit: FEATURE_FLAGS.paginationLimit,
    chatHistoryEnabled: FEATURE_FLAGS.chatHistoryEnabled,
    streamingEnabled: FEATURE_FLAGS.streamingEnabled,
    aiToolsEnabled: FEATURE_FLAGS.aiToolsEnabled,
  });
});

router.patch("/", (req, res) => {
  const body = (req.body ?? {}) as FeatureFlagUpdate;

  // Lightweight validation for case constraints
  if (body.paginationLimit !== undefined) {
    if (typeof body.paginationLimit !== "number" || Number.isNaN(body.paginationLimit)) {
      return res.status(400).json({ message: "paginationLimit must be a number" });
    }
    // clamp 10-100
    body.paginationLimit = Math.min(100, Math.max(10, Math.floor(body.paginationLimit)));
  }

  if (body.chatHistoryEnabled !== undefined && typeof body.chatHistoryEnabled !== "boolean") {
    return res.status(400).json({ message: "chatHistoryEnabled must be boolean" });
  }
  if (body.streamingEnabled !== undefined && typeof body.streamingEnabled !== "boolean") {
    return res.status(400).json({ message: "streamingEnabled must be boolean" });
  }
  if (body.aiToolsEnabled !== undefined && typeof body.aiToolsEnabled !== "boolean") {
    return res.status(400).json({ message: "aiToolsEnabled must be boolean" });
  }

  FEATURE_FLAGS.update(body);
  res.json({
    message: "flags updated",
    flags: {
      paginationLimit: FEATURE_FLAGS.paginationLimit,
      chatHistoryEnabled: FEATURE_FLAGS.chatHistoryEnabled,
      streamingEnabled: FEATURE_FLAGS.streamingEnabled,
      aiToolsEnabled: FEATURE_FLAGS.aiToolsEnabled,
    },
  });
});

export default router;
