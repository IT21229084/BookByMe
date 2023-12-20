import hotel from "../models/hotelModule.js"
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
    try {

        const Hotels = await hotel.find();
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
        const apartmentCount = await hotel.countDocuments({ type: "apartment" })
        const resortCount = await hotel.countDocuments({ type: "resort" })
        const villansCount = await hotel.countDocuments({ type: "villa" })
        const cabinCount = await hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            {type:"Hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villansCount},
            {type:"cabins",count:cabinCount},
        ])

    } catch (err) {
        next(err)
    }
}

