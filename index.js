const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const cors = require("cors");
const { dbConnection } = require("./db");
const { userRouter } = require("./routes/User.route");
const { employeeRouter } = require("./routes/Employee.route");

app.use(express.json());
app.use(cors());
app.use("/", userRouter);
app.use("/employees", employeeRouter);

app.listen(port, async () => {
    try {
        await dbConnection;
        console.log("Connected to the Database");
    }
    catch(err) {
        console.log(err);
        console.log("Cannot connect to the Database");
    }
    console.log(`Server is running on the port: ${port}`)
})