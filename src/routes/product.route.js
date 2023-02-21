import products from "../models/products.model.js";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  })
  .post((req, res) => {
    res.status(200).json(products[req.params.id]);
  });

router.get("/:id", (req, res) => {
  res.status(200).json(products[req.params.id]);
});

export default router;
