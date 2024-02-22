import express from "express";
import {
  signUp,
  logIn,
  logOut,
  protect,
  restrict,
} from "../controllers/authController.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";

// Routování
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

// "protectne" všechny routes po tomto řádku
router.use(protect);

// "restrictne" všechny routes po tomto řádku
router.use(restrict("admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
