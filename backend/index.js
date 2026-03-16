const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");
const JWT_SECRET = require('./config')
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/", mainRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
