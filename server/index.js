import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { readdirSync } from "fs";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.listen(5001, () => {
  console.log(`Listening on port 5001`);
});
