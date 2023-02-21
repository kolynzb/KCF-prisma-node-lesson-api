import express from "express";

import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

const app = express();

app.use("static", express.static("./src/public"));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.set("view engine", "pug");

app.get("/", (req, res) => {course
  res.statusCode = 200;
  res.render("index");
});

app.get("/hello", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World!");
});

app.get("/download", (req, res) => {
  res.status(200).download("./src/models/products.model.js");
});

app.all("*", (req, res) => res.status(404).send("Page not found"));

export default app;
