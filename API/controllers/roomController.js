import Room from "../models/RoomModule.js"
import Hotel from "../models/hotelModule.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;


    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
};

export const UpdateRoom = async (req, res) => {
    try {

        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)

    } catch (error) {
        next(err)
    }

}


export const UpdateRoomAvailable = async (req, res) => {
    try {

       await Room.updateOne({"roomNumber._id":req.params.id},
       {
        $push:{
            "roomNumber.$.unavailableDates":req.body.dates
        },
       }
       )
        res.status(200).json("Room has been Updated.")

    } catch (error) {
        next(err)
    }

}

export const DeleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    try {

        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted.")

    } catch (error) {
        next(err)
    }
}

export const getRoom = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id)
        res.status(200).json(room)

    } catch (error) {
        next(err)
    }

}

export const getRoomAll = async (req, res) => {
    try {

        const Rooms = await Room.find();
        res.status(200).json(Rooms)

    } catch (err) {
        next(err)
    }
}

