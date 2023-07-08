//import UserSchema from "../Models/UserSchema"
//import { comparePassword, hashPassword } from "../helpers/authHelpers"
//import UserSchema from '../Models/UserSchema'

const { requireSignIn } = require('../middelwares/authMiddelwares')
const { User } = require('../Models/UserSchema')

const { comparePassword, hashPassword } = require('../helpers/authHelpers')
import { Jwt } from "jsonwebtoken"
import router from "../Routes/UserRoutes"
import userModel from '../Models/UserSchema.js'
import ordersModels from '../Models/orderModels.js'



export const registerController = async (req, res) => {
    try {
        const { name,
            age,
            email,
            password,
            phone,
            adress,
            answer, } = req.body;


        //validations
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!age) {
            return res.send({ message: 'Age is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone number is required' })
        }
        if (!adress) {
            return res.send({ message: 'Adress is required' })
        }

        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }

        //check user 
        const existingUser = await UserSchema.findOne({ email })
        //existing user 
        if (existingUser) {
            return res.status(200).send({
                succes: false,
                message: 'Already register please Login'
            })

        }
        // register user 
        const hashedPassword = await hashPassword(password)
        // save 
        const user = new UserSchema({
            name,
            age,
            email,
            adresse,
            phone,
            password: hashedPassword,
            answer,

        }).save();

        res.status(201).send({
            succes: true,
            message: 'user Registered succesfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: 'error in Registration',
            error
        })
    }
}

//POST LOGIN

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validation 

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or password'
            })
        }

        //check user 
        const user = await UserSchema.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registred'
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid Password '
            })
        }

        //token 
        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d ',
        })
        res.status(200).send({
            success: true,
            message: 'login succesfully',
            user: {
                _id: user._id,
                name: user.name,
                age: user.age,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,

            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error,

        })
    }

}
//fogotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'new Password is required' })
        }


        //check 
        const user = await UserSchema.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await UserSchema.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })

    }
}


//test controller 

export const testController = (req, res) => {

    try {
        res.send("protected Routes")
    } catch (error) {
        console.log(error)
        res.send({ error })
    }

}


// update profile

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (!passwordd && password.length < 6) {
            return res.json({
                error: 'Password is required and 6 character long'
            })
        }
        const Password = password ? await hashedPassword(password) : undefined
        const updateUser = await userModel.findByIdandUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            adress: address || user.address,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error While Updating Profile',
            error
        })
    }
}

//orders

export const getOrdersController = async (req, res) => {
    try {
        const orders =
            await
                ordersModels.find({ buyer: req.user._id })
                    .populate("products", "-photo")
                    .populate("buyer", "name");
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'ERROR While Getting Orders',
            error
        })
    }
}
export const getAllOrdersController = async (req, res) => {
    try {
        const orders =
            await
                ordersModels.find({})
                    .populate("products", "-photo")
                    .populate("buyer", "name").
                    sort({ createdAt: "-1" })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'ERROR While Getting Orders',
            error
        })
    }
}


//order status

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await ordersModels.findByIdAndUpdate
            (orderId,
                { status },
                { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Updating Order",
            error
        })
    }
}

//export default router