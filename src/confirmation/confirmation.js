import React, {useEffect, useState} from "react";
import "./confirmation.scss";
import {confirmationNumber} from "../reservation-form/reservation-form"
import {Link} from "react-router-dom";

export const Confirmation = () => {

    const [confirmationNr, setConfirmationNr] = useState();

    useEffect(() => {
        setTimeout(() => {
            setConfirmationNr(confirmationNumber);
        }, 1000)
    }, [])

    if (confirmationNr === undefined) return "Loading..."

    return (
        <div className="confirmation-container">
            <Link to="/" className="back" > Powrót do stony głównej </Link>
            <h2 className="confirmation-title">
                Dziękujemy za założenie rezerwacji.
            </h2>
            <h4 className="confirmation-text">
                W celu odwołania rezerwacji potrzebny będzie numer rezerwacji: <span
                className="confirmation-nr">{confirmationNr}</span>
            </h4>
            <p className="confirmation-info">Wszystkie informacje zostały również wysłane na adres mailowy. Do
                zobaczenia wkrótce!</p>
        </div>
    )
}