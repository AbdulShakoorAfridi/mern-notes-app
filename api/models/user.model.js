import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email address should be unique."],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "password must be at least 6 characters."],
    },
    roles: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
