import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import layout from '../components/layouts/Layout'
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()


    //form function

    consthadleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "/api/v1/auth/register",
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    answer,
                }
            );

            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    // console.log(process.env.REACT_APP_API)
    return (
        <div>
            <layout title={"Register -Ecommerce App"}>
                <div className="register">

                    <h1>Register Page</h1>
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'>REGISTER FORM</h4>
                        <div className="mb-3">

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="enter your name"
                                required
                            />
                        </div>
                        <div className="mb-3">

                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="enter your Email"
                                required
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>

                        <div className="mb-3">

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder="enter your Password"
                                required
                            />
                        </div>
                        <div className="mb-3">

                            <input type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="enter your phone number "
                                required
                            />
                        </div>
                        <div className="mb-3">

                            <input type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="enter your address"
                                required
                            />
                        </div>
                        <div className="mb-3">

                            <input type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="what is you Favorite Sports "
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            REGISTER
                        </button>
                    </form>

                </div>
            </layout >
        </div >
    )
}
export default Register