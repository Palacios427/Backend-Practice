// controllers/hash.controllers.js
import crypto from "crypto";

export const hashText = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const hash = crypto.createHash("sha256").update(text).digest("hex");
  res.json({ hash });
};
