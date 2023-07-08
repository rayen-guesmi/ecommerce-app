import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please type a valid email']
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        Number,
        required: true
    },
    adress: {
        type: {},
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },

},
    { timestamps: true })
const User = mongoose.model('User', UserSchema)


//export { User };
