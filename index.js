const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

//dotenv config
dotenv.config();

//restobj
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//static access
app.use(express.static(path.join(__dirname, "./portfolio/build")));

//routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));
app.get("*", function (req, res) {
  res.senFile(path.join(__dirname, "./portfolio/build/index.html"));
});

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
