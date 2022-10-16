var express = require("express");
var mongoose = require("mongoose");

const http = require("http").createServer(app);

var app = express();
app.use(express.json());

const port = 3000;

var productRouter = require("./routes/productRoutes");

app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello Rehan");
});

mongoose
  .connect("mongodb+srv://rehan:123@cluster1.gaeyhad.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});

module.exports = app;
