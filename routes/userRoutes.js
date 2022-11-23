require("dotenv").config;
var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// router.post("/login", async (req, res) => {
//   const { name, password } = req.body;
//   User.findOne({ name: name }).then((savedUser) => {
//     if (!savedUser) {
//       res.status(422).json({ error: "Invalid Email or password" });
//     }
//   });
//   try {
//     if (await bcrypt.compare(req.body.password, { password: password })) {
//       // Yaha pr ghalti hai
//       res.send("Success");
//     } else {
//       res.send("Not Allowed");
//     }
//   } catch (error) {
//     res.status(500).send();
//   }
// });

//////////////////////////////////////////////////////////////////////////////////////

router.post("/post", authenticationToken, (req, res) => {
  res.json(User.filter((post) => post.username == req.body.name));
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  // User.findOne({ name: name }, (err, returnedUser) => {
  //   if (err || !returnedUser) {
  //     return res.status(400).json({
  //       error: "Name already Exists",
  //     });
  //   }
  //   bcrypt
  //     .compare(password, returnedUser.password)
  //     .then((result) => {
  //       if (!result) {
  //         return res.status(400).json({
  //           error: "Wrong password",
  //         });
  //       }

  //       res.json({ returnedUser });
  //     })
  //     .catch((err) => {
  //       return res.status(400).json({
  //         error: err,
  //       });
  //     });

  // Authentication

  // const username = req.body.name;
  // const user = { name: username };

  const accessToken = jwt.sign(
    { name: name },
    `${process.env.ACCESS_TOKEN_SECRET}`
  );
  res.json({ accessToken: accessToken });
});
// });

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
