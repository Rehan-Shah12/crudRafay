var express = require("express");
var mongoose = require("mongoose");

var app = express();

const port = 3000;

var productRouter = require("./routes/productRoutes");

app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello Rehan");
});

mongoose
  .connect("mongodb://localhost:27017/newcruds", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});

module.exports = app;
