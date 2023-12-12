import user from "../models/userModule.js"

export const Updateuser = async (req, res) => {
    try {

        const updateuser = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateuser)

    } catch (error) {
        next(err)
    }

}

export const Deleteuser = async (req, res) => {
    try {

        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted.")

    } catch (error) {
        next(err)
    }
}

export const getuser = async (req, res) => {
    try {

        const User = await user.findById(req.params.id)
        res.status(200).json(User)

    } catch (error) {
        next(error)
    }

}

export const getuserAll = async (req, res) => {
    try {

        const users = await user.find();
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}
