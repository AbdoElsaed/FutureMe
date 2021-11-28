const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

require("dotenv").config();


const port = process.env.PORT || "5000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


const mailerRoutes = require("./routes/mailer");

const baseRoute = "/api/v1/";
const generateApiRoute = (route) => `${baseRoute}${route}`;

app.use(generateApiRoute("mailer"), mailerRoutes);


app.listen(port, () => console.log(`server started on port ${port}`));