var express = require("express");
var router = express.Router();
var Product = require("../models/Product");

//GET ALL

router.get("/", async (req, res) => {
  // res.send(req);
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST

router.post("/post", async (req, res) => {
  // console.log(req.body);
  const data = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.post("/post", async (req, res) => {
//   console.log("Inside Post Function");
//   console.log(req.body);

//   const data = new Product({
//     name: req.body.name,
//     price: req.body.price,
//   });

//   const val = await data.save();
//   res.json(val);
// });

//GET BY ID
router.get("/:id", async (req, res) => {
  const fetchid = req.params.id;
  try {
    const data = await Product.findById(fetchid);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Edit Posted Product
router.post("/edit/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  try {
    const dataToSave = await product.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID
router.get("/delete/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
