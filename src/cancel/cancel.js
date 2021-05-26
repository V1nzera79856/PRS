import React, {useEffect, useState} from "react";
import "../reservation-form/_reservation-form.scss"
import "./cancel.scss"
import {db} from "../firebase/firebase";
import {getDates} from "../date-range/date-renge";
import {logDOM} from "@testing-library/react";

//testing : pPdClfkaDrWnbRm9svaR

export const Cancel = () => {

    const [confirmationNumber, setConfirmationNumber] = useState("")
    const [cancelDetails, setCancelDetails] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        arrival: "",
        departure: ""
    })

    const handleSearch = (e) => {
        e.preventDefault();

        db.collection("reservations").doc(`${confirmationNumber}`).get().then((doc) => {
            if (doc.exists) {
                if (doc.data().cancelled === false) {
                    console.log(doc.data());
                    setCancelDetails(doc.data());
                } else {
                    alert("Rezerwacja była juz anulowana")
                    console.log(doc.data());
                }

            } else {
                alert("Błędny nr rezerwacji")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleChange = (e) => {
        const {value} = e.target

        setConfirmationNumber(value)
    }

    const handleCancel = (e) => {
        e.preventDefault();

        let placeDates = []
        let resultDates = [];

        db.collection("places").doc(`${cancelDetails.place}`).get().then((doc) => {
            if (doc.exists) {
                placeDates = doc.data().reserved;
                console.log(placeDates);
                resultDates = placeDates.filter(date => !cancelDetails.reservedDates.includes(date));
            } else {
                console.log("not a place")
            }
        })

        setTimeout(() => {
            db.collection("places").doc(`${cancelDetails.place}`).update({
                reserved: resultDates,
            }).then(() => {
                console.log("updated")
            })

            db.collection("reservations").doc(`${confirmationNumber}`).update({
                cancelled: true,
            }).then(() => {
                console.log("done");
            })
        }, 500)
    }


    return (
        <div className="cancel-container">
            <div className="cancel-serach">
                <form action="" className="cancel-form" onSubmit={handleSearch}>
                    <label htmlFor="">Numer Rezerwacji:
                        <input onChange={handleChange} type="text" placeholder="Numer rezerwacji"
                               value={confirmationNumber} name={confirmationNumber}/>
                    </label>
                    <button className="search-btn">
                        Szukaj
                    </button>
                </form>
            </div>
            <div className="cancel-reservation">
                 <span className="details__name">
                        Imię: {cancelDetails.name}
                    </span>
                <span className="details__surname">
                        Nazwisko: {cancelDetails.surname}
                    </span>
                <span className="details__email">
                        E-mail: {cancelDetails.email}
                    </span>
                <span className="details__phone">
                        Nr telefonu: {cancelDetails.phone}
                    </span>
                <span className="details__arrival">
                        Przyjazd: {cancelDetails.arrival}
                    </span>
                <span className="details__departure">
                        Wyjazd: {cancelDetails.departure}
                    </span>
                <button className="cancel-reservation-btn" onClick={handleCancel}>Potwierdź</button>
            </div>
        </div>
    )
}