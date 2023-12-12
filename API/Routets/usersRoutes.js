import express from "express"
import { Updateuser, Deleteuser, getuser, getuserAll} from "../controllers/userController.js"
import  {verifAdmin, verifyToken, verifyuser}  from "../utils/verifyToken.js"
const router = express.Router()

// router.get("/check",verifyToken,(req,res,next) =>{
//     res.send("Hello user, You are logged in.")
// })
// router.get("/checkuser/:id",verifyuser,(req,res,next) =>{
//     res.send("Hello user, You are logged in and you can delete account.")
// })
// router.get("/checkadmin/:id",verifAdmin,(req,res,next) =>{
//     res.send("Hello admin, You are logged in and you can all account.")
// })

//Update
router.put("/:id",Updateuser)

//Delete
router.delete("/:id",Deleteuser)

//Get
router.get("/:id", getuser)

//Get All
router.get("/", getuserAll)


export default router