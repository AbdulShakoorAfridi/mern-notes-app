// import userModel from "../models/user.model.js";
// import notesModel from "../models/Notes.model.js";
import expressAsyncHandler from "express-async-handler";
import { User as userModel } from "../models/user.model.js";
import { Notes as notesModel } from "../models/Notes.model.js";

// @all notes
// @route GET /notes
// @access private

export const gettingAllTheNotes = expressAsyncHandler(
  async (req, res, next) => {
    const notes = await notesModel.find({}).populate("user");
    if (!notes || notes === "") {
      const error = new Error("notes not found!");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ status: "success", message: "all notes", notes });
  }
);

// @create notes
// @route POST /notes
// @access private

export const createNotes = expressAsyncHandler(async (req, res, next) => {
  const { title, text } = req.body;
  if (!title || !text) {
    const error = new Error("all fields are required!");
    error.status = 400;
    return next(error);
  }

  const note = await notesModel.create(req.body);
  if (!note) {
    const error = new Error("Note does not created!");
    error.status = 400;
    return next(error);
  }

  res.status(201).json({
    status: "success",
    message: "Note created",
    note,
  });
});

// @getting single note
// @route get/notes/:id
// @access private

export const singleNote = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await notesModel.findById(id).populate("user");
  if (!note) {
    const error = new Error("note does not found!");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({
    status: "success",
    message: "Note data",
    note,
  });
});
// @update note
// @route PATCH /notes/:id
// @access private

export const updateNotes = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await notesModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) {
    const error = new Error("note does not found!");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({
    status: "success",
    message: "Note updated",
    note,
  });
});

// @delete note
// @route delete /note/:id
// @access private

export const deleteNote = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new Error("id not found!");
    error.status = 404;
    return next(error);
  }

  const note = await notesModel.findByIdAndDelete(id);
  if (!note) {
    const error = new Error("Note does not found!");
    error.status = 404;
    return next(error);
  }

  res.status(204).json({
    status: "success",
    message: "Note deleted",
    note: note.title,
  });
});
