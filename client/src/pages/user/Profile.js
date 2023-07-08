import React, { useState, useEffect } from 'react'
import layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {

    //context
    const [auth, setAuth] = useAuth()
    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")


    //get user data
    useEffect(() => {
        const { email, name, phone, address, password } = auth?.user

        setName()
        setPhone()
        setEmail()
        setAddress()
        setPassword()
    }, [auth?.user])
    //form function

    consthadleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                "/api/v1/auth/profile",
                {
                    name,
                    email,
                    password,
                    phone,
                    address,

                }
            );
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <layout title={'Your Profile'} >
            <div className='container-fluid  m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit}>
                            <h4 className='title'>USER PROFILE</h4>
                            <div className="mb-3">

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="enter your name"
                                    required
                                    autoFocus
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
                                    disabled

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

                            <button type="submit" className="btn btn-primary">
                                UPDATE
                            </button>
                        </form>
                    </div>

                </div>
            </div>

        </layout>
    )
}

export default Profile