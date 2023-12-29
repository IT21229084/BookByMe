import express from "express"
import { DeleteRoom, UpdateRoom, UpdateRoomAvailable, createRoom, getRoom, getRoomAll } from "../controllers/roomController.js"
const router = express.Router()

//Create 
router.post("/:hotelid", createRoom)

//Update
router.put("/:id", UpdateRoom)
router.put("/available/:id", UpdateRoomAvailable)

//Delete
router.delete("/:id/:hotelid", DeleteRoom)

//Get
router.get("/:id", getRoom)

//Get All
router.get("/", getRoomAll)

export default router
