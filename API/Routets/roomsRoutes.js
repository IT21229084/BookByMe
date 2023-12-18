import express from "express"
import { DeleteRoom, UpdateRoom, createRoom, getRoom, getRoomAll } from "../controllers/roomController.js"
const router = express.Router()

//Create 
router.post("/:hotelid", createRoom)

//Update
router.put("/:id", UpdateRoom)

//Delete
router.delete("/:id/:hotelid", DeleteRoom)

//Get
router.get("/:id", getRoom)

//Get All
router.get("/", getRoomAll)

export default router
