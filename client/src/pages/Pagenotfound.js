import React from 'react'
import { Link } from 'react-router-dom'
import layout from '../components/layouts/Layout'

const Pagenotfound = () => {
    return (
        <layout title={"Go back - page not found"} >
            <div className="pnf" >
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading"> Oops! Page Not Found </h2>
                <Link to="/" className="pnf-btn">
                    Go Back
                </Link>

            </div>

        </layout>
    )
}

export default Pagenotfound;