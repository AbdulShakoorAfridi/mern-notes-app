// import userModel from "../models/user.model.js";
// import notesModel from "../models/Notes.model.js";
import expressAsyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import { User as userModel } from "../models/user.model.js";
import { Notes as notesModel } from "../models/Notes.model.js";
// @all users
// @route GET /users
// @access private

export const gettingAllTheUsers = expressAsyncHandler(
  async (req, res, next) => {
    const users = await userModel.find({}).select("-password").lean();
    if (!users || users === "") {
      const error = new Error("no users found!");
      error.status = 404;
      return next(error);
    }
    res
      .status(200)
      .json({ status: "success", message: "all users", users: users });
  }
);

// @create user
// @route POST /users
// @access private

export const createUser = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    const error = new Error("all fields are required!");
    error.status = 400;
    return next(error);
  }

  //   checking email
  const checkDuplicate = await userModel.find({ email });
  if (checkDuplicate.length > 0) {
    const error = new Error("user already exists!");
    error.status = 409;
    return next(error);
  }

  //   hashing password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const userObject = { ...req.body, password: hashedPassword };
  const user = await userModel.create(userObject);
  if (!user) {
    const error = new Error("user not created!");
    error.status = 400;
    return next(error);
  }

  res.status(201).json({
    status: "success",
    message: "user created",
  });
});

// @update user
// @route PATCH /user/:id
// @access private

export const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { password, ...rest } = req.body;
  const user = await userModel.findByIdAndUpdate(id, rest, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    const error = new Error("user not found!");
    error.status = 404;
    return next(error);
  }
  if (password) {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    user.password = hashedPassword;
    await user.save();
  }

  res.status(200).json({
    status: "success",
    message: "user updated",
    user: user.username,
  });
});

// @delete user
// @route delete /user/:id
// @access private

export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new Error("id not found!");
    error.status = 404;
    return next(error);
  }

  const checkasignNotes = await notesModel.findOne({ user: id }).lean().exec();
  if (checkasignNotes) {
    const error = new Error("user can't be deleted. User has assigned notes!");
    error.status = 409;
    return next(error);
  }

  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    const error = new Error("user not found!");
    error.status = 404;
    return next(error);
  }

  res.status(204).json({
    status: "success",
    message: "user deleted",
    user: user.username,
  });
});
