import hotel from "../models/hotelModule.js"
import Room from "../models/RoomModule.js"
export const createHotel = async (req, res) => {
    const newHotel = new hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const UpdateHotel = async (req, res) => {
    try {

        const updateHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)

    } catch (error) {
        next(err)
    }

}

export const DeleteHotel = async (req, res) => {
    try {

        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.")

    } catch (error) {
        next(err)
    }
}

export const getHotel = async (req, res) => {
    try {

        const Hotel = await hotel.findById(req.params.id)
        res.status(200).json(Hotel)

    } catch (error) {
        next(err)
    }

}

export const getHotelAll = async (req, res) => {
    const { min, max, ...others } = req.query
    try {

        const Hotels = await hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 }
        }).limit(req.query.limit)
        res.status(200).json(Hotels)

    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",")
    try {

        const list = await Promise.all(cities.map(city => {
            return hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)

    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res) => {

    try {
        const hotelCount = await hotel.countDocuments({ type: "Hotel" })
        const apartmentCount = await hotel.countDocuments({ type: "Apartment" })
        const resortCount = await hotel.countDocuments({ type: "Resort" })
        const villansCount = await hotel.countDocuments({ type: "Villa" })
        const cabinCount = await hotel.countDocuments({ type: "Cabin" })

        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villansCount },
            { type: "cabins", count: cabinCount },
        ])

    } catch (err) {
        next(err)
    }
}

export const getHotelRooms = async (req,res,next) =>{
    try {

        const Hotel = await hotel.findById(req.params.id)
        const list = await Promise.all(Hotel.rooms.map((room) =>{
            return Room.findById(room)
        })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }

}

