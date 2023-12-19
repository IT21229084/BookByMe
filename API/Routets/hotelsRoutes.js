import express from "express"
import hotel from "../models/hotelModule.js"
import { createError } from "../utils/error.js"
import { DeleteHotel, UpdateHotel, countByCity, createHotel, getHotel, getHotelAll } from "../controllers/hotelController.js"
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
router.get("/countByType", getHotelAll)

export default router