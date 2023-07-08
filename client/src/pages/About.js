import React from 'react'
import layout from '../components/layouts/Layout'

const About = () => {
    return (
        <layout title={"About us - Ecommerce App"} >
            <div className="row contactus">
                <div className="col-md-6">
                    <img
                        src="/image/aboutus.png"
                        alt="contactus"
                        style={{ width: " 100% " }}
                    />

                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2">
                        we provide with the latest informations and answer
                        all your questions.We try to make the shopping experience
                        enjoyable and fun,and try to fulfill your demands.

                    </p>
                </div>


            </div>

        </layout>
    )
}

export default About