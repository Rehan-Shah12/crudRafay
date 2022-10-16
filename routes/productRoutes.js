var express = require("express");
// const { Model } = require("mongoose");

var router = express.Router();
var Product = require("../models/Product");

router.get("/", async (req, res) => {
  // res.send(req);
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/post", async (req, res) => {
//   console.log(req);
//   const data = new Product({
//     name: req.body.name,
//     price: req.body.price,
//   });
//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.post("/post", async (req, res) => {
  console.log("Inside Post Function");
  console.log(req.body);

  const data = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const val = await data.save();
  res.json(val);
});

module.exports = router;
