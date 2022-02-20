const express = require("express");
const dotenv = require("dotenv");
const hospital = require("./routes/hospitals");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

//Connect to Database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//cookieparser
app.use(cookieParser());

app.use("/api/v1/hospitals", hospital);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode one port ",
    PORT
  )
); //server run แล้วนะ รอ connection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
