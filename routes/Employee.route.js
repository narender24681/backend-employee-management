const {Router} = require("express");
const { EmployeeModel } = require("../models/Employee.model");

const employeeRouter = Router();

employeeRouter.post("/", async (req, res) => {
    // console.log(req.body);

    try {
        const employee = new EmployeeModel(req.body);
        await employee.save();

        res.status(200).send({"msg": "Employee added successfully"});
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});


employeeRouter.get("/", async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        // console.log(employees);

        res.status(200).send({"employees": employees});
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});


employeeRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    try {
        await EmployeeModel.findByIdAndDelete({_id: id});

        res.status(200).send({"msg": "Employees deleted"});
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
})

module.exports = {
    employeeRouter
}