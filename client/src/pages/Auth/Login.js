import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import layout from '../components/layouts/Layout'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    //form function

    consthadleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "/api/v1/auth/login",
                {
                    email,
                    password,
                }
            );

            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/')
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
                <div className="form-container">

                    <form onSubmit={handleSubmit}>
                        <h4 className='title'>LOGIN FORM </h4>
                        <div className="mb-3">


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
                            <button
                                type="submit" className="btn btn-primary"
                                onClick={() => {
                                    navigate('/forgot-Password')
                                }}>
                                Forgot Password
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            LOGIN

                        </button>


                    </form>

                </div>
            </layout >
        </div >
    )
}
export default Login