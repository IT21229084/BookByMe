import user from "../models/userModule.js";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
export const register = async (req, res, next) => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new user({
            ...req.body,
            password: hash
        })

        await newUser.save()
        res.status(200).send("user has been Registred.")

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {


    try {
        const User = await user.findOne({ userName: req.body.userName })
        if (!User) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password)
        if (!isPasswordCorrect) return next(createError(400, "wrong password"))

        const token = Jwt.sign({ id: User._id, isAdmin: User.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = User._doc
        res.cookie("access Token", token, {
            httpOnly: true,
        }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        next(error)
    }
}