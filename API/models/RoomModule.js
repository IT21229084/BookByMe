import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    }, maxPeople: {
        type: Number,
        required: true
    },

    desc: {
        type: String,
        default: false
    },
    roomNumber: [{number:Number,unavailableDates:{type:[Date]}}]


}, { timestamps: true })

export default mongoose.model("Room", RoomSchema)