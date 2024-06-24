import express from "express";

import {
  createNotes,
  deleteNote,
  gettingAllTheNotes,
  singleNote,
  updateNotes,
} from "../controllers/notes.controller.js";
const router = express.Router();

router.route("/").get(gettingAllTheNotes).post(createNotes);
router.route("/:id").get(singleNote).patch(updateNotes).delete(deleteNote);
export default router;
