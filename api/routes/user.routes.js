import express from "express";
import {
  createUser,
  deleteUser,
  gettingAllTheUsers,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });
router.route("/").get(gettingAllTheUsers).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);
export default router;
