const express = require("express");
const dotenv = require("dotenv");
const hospital = require("./routes/hospitals");
const appointments = require("./routes/appointments")
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require('helmet');
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors');
const { use } = require("./routes/auth");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

dotenv.config({ path: "./config/config.env" });

//Connect to Database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//cookieparser
app.use(cookieParser());

//mongoSanitize
app.use(mongoSanitize());

//helmet
app.use(helmet());

//xss
app.use(xss())

//rate limit
// const limiter = rateLimit({windowsMs:10*60*1000, //10mins
//   max: 1 //for test
// })

// app.use(limiter);

//hpp
app.use(hpp())

//cors
app.use(cors())



const swaggerOptions = {
  swaggerDefinition:{
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express VacQ API'
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      }
    ]
  },apis:['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs))




app.use("/api/v1/hospitals", hospital);
app.use("/api/v1/auth", auth);
app.use('/api/v1/appointments',appointments)

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
