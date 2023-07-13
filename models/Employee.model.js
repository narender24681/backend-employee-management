const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    department: {type: String},
    salary: {type: Number}
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
    EmployeeModel
}
