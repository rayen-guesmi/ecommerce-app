import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    porducts: [{
        type: mongoose.ObjectId,
        ref: "Products"
    },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],

    }
},
    { timestamps: true }
)

export default mongoose.model('Order', orderSchema)