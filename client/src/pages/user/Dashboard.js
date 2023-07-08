import React from 'react'
import layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <layout title={"Dashboard  - Ecommerce App"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'></div>
                        <h3>{auth?.user?.name}</h3>
                        <h3>{auth?.user?.email}</h3>
                        <h3>{auth?.user?.address}</h3>
                    </div>
                </div>
            </div>
        </layout >

    )
}

export default Dashboard