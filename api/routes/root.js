import express from "express";
const router = express.Router();
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public", "index.html"));
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
