var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");

//Get All
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);

    const data = new User({
      name: req.body.name,
      password: hashedPassword,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch {
      res.status(400).json({ message: error.message });
    }
  } catch {
    res.status(500).send;
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: "Invalid Email or password" });
    }
  });
  // if (user == null) {
  //   return res.status(400).send("Cannot find user");
  // }
  try {
    if (await bcrypt.compare(req.body.password, { password: password })) {
      // Yaha pr ghalti hai
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
