import express from "express";
import prisma from "../config/prisma.config.js";
import joi from "joi"

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const artists = await prisma.artist.findMany();
      res
        .status(200)
        .json({ status: "success", results: artists.length, data: artists });
    } catch (e) {
      res.status(400).json({ status: "success", message: e.message });
    }
  })
  .post(async (req, res) => {
    // if (req.body.email) {
    //   res.status(401).json({ status: "success", message: "Invalide Email address " });
    // }
    try {
      const artists = await prisma.artist.create({
        data: req.body,
      });
      res
        .status(201)
        .json({ status: "success", results: artists.length, data: artists });
    } catch (e) {
      res.status(400).json({ status: "success", message: e.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const artists = await prisma.artist.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: artists });
    } catch (e) {
      res.status(400).json({ status: "success", message: e.message });
    }
  })
  .put(async (req, res) => {
    try {
      const artists = await prisma.artist.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
      res.status(200).json({ status: "success", data: artists });
    } catch (e) {
      res.status(400).json({ status: "success", message: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const artists = await prisma.artist.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(204).json({ status: "success" });
    } catch (e) {
      res.status(400).json({ status: "success", message: e.message });
    }
  });

export default router;
