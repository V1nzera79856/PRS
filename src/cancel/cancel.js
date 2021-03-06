import React, {useState} from "react";
import "../reservation-form/_reservation-form.scss"
import "./cancel.scss"
import {db} from "../firebase/firebase";
import {Link} from "react-router-dom";


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
                    setCancelDetails(doc.data());
                    const cancelBtn = document.querySelector(".cancel-reservation-btn");
                    cancelBtn.classList.remove("button-hidden")
                } else {
                    alert("Rezerwacja była juz anulowana")
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
                alert("Rezerwacja została anulowana");
                setCancelDetails({
                    name: "",
                    surname: "",
                    email: "",
                    phone: "",
                    arrival: "",
                    departure: ""
                })
                setConfirmationNumber("");
            })
        }, 500)
    }


    return (
        <div className="cancel-container">
            <div className="cancel-serach">
                <Link to="/" className="back" > Powrót do stony głównej </Link>
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
                <button className="cancel-reservation-btn button-hidden" onClick={handleCancel}>Anuluj rezerwację</button>
            </div>
        </div>
    )
}