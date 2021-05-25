import React, {useState} from "react";
import "./_welcome-page.scss"
import Logo from "../images/logo.png"
import {Link} from "react-router-dom";

export const WelcomePage = () => {


    return (
        <>
            <div className="welcome-container">
                <a className="welcome-logo" href="https://camping-leba.pl/">
                <img src={Logo} alt="logo ośrodka" className="welcome-logo"/>
                </a>
                <h1 className="welcome-title">
                    Witamy w systemie rezerwacyjnym ośrodka Camping 48 "Przymorze"
                </h1>
                <h3 className="welcome-text">
                    W czym możemy dzisiaj pomóc?
                </h3>

                <div className="welcome-widget-container">
                    <div className="widget-reservation">
                        <h4>Zakładam rezerwację</h4>
                        <Link to="/calendar" className="reservation-btn">

                        </Link>
                    </div>
                    <div className="widget-cancel">
                        <h4>Anuluję rezerwację</h4>
                        <Link to="/cancel" className="cancel-btn">

                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}