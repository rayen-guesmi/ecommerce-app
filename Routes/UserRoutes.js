import Express from "express"
import { Router } from "express"
import mongoose from 'mongoose';
import { User } from '../Models/UserSchema.js';
import {
    loginController,
    registerController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from "./../controllers/authControllers.js";

import { isAdmin, requireSignIn } from "../middelwares/authMiddelwares.js";

//router object 
const router = Router();

//add a user 
//@POST
router.post('/register', async (req, res) => {
    // @method  using create
    const newUser = await User.create(req.body)
    res.json(newUser)
})
//LOGIN || POST
router.post('/login', loginController)

//forgot password || POST

router.post('/forogot-password', forgotPasswordController)

//test routes 
router.get('/test', requireSignIn, isAdmin, testController)



//protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })

})
//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })

})
//update Profile
router.put('/profile', requireSignIn, updateProfileController)

//orders 
router.get('/orders', requireSignIn, getOrdersController)



// all orders 
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// order  status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)


export default router;