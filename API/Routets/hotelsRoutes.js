import express from "express"
import hotel from "../models/hotelModule.js"
import { createError } from "../utils/error.js"
import { DeleteHotel, UpdateHotel, createHotel, getHotel, getHotelAll } from "../controllers/hotelController.js"
const router = express.Router()

//Create 
router.post("/", createHotel)

//Update
router.put("/:id", UpdateHotel)

//Delete
router.delete("/:id", DeleteHotel)

//Get
router.get("/:id", getHotel)

//Get All
router.get("/", getHotelAll)

export default router