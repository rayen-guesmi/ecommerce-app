import { Jwt, decode } from "jsonwebtoken";
//import { User } from '../Models/UserSchema'
//import UserSchema from '../Models/UserSchema'

//protected Routes token base 
export const requireSignIn = async (req, res, next) => {
    //const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    try {
        const decode = Jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log(error)
    }

}

// admin access 
export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserSchema.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access'
            })
        }

        else {
            req.user = decode
            next()
        }
    }

    catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "ERROR in Admin Middelware",
        })
    }
} 