import express from "express";
import users from "../models/users.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json(users[req.params.id]);
});

export default router;
