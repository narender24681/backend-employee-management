const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    try {
        bcrypt.hash(password, 5, async (err, hashPassword) => {
            const user = new UserModel({ email, password: hashPassword });
            await user.save();

            res.status(200).send({ "msg": "User created successfully" });
        });
    }
    catch (err) {
        res.status(401).send({ "err": err.message });
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    try {
        const user = await UserModel.findOne({ email });
        // console.log(user);

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ authorId: user._id }, "randomSecretKey");
                    res.status(200).send({ "msg": "Logged-in successfully", "token": token });
                }
                else {
                    res.status(200).send({ "msg": "Wrong credentials" });
                }
            });
        }
        else {
            res.status(200).send({ "msg": "Wrong credentials" });
        }
    }
    catch (err) {
        res.status(400).send({ "err": err.message });
    }
});


module.exports = {
    userRouter
}