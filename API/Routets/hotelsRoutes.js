import express from "express"
import hotel from "../models/hotelModule.js"
import { createError } from "../utils/error.js"
import { DeleteHotel, UpdateHotel, countByCity, countByType, createHotel, getHotel, getHotelAll, getHotelRooms } from "../controllers/hotelController.js"
const router = express.Router()

//Create 
router.post("/", createHotel)

//Update
router.put("/:id", UpdateHotel)

//Delete
router.delete("/:id", DeleteHotel)

//Get
router.get("/find/:id", getHotel)

//Get All
router.get("/", getHotelAll)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms) 
export default router