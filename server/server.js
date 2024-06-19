const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
require("./config/database.js").dbConnect();
app.use("/app", require("./router/user"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
