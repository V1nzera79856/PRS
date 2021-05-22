import React, {useEffect, useState} from "react";
import "./_reservation-form.scss";
import {db} from "../firebase/firebase";

export const Reservation = () => {

    const [reservationDetails, setReservationDetails] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        place: 6,
        arrival: "07/07/2021",
        departure: "21/08/2021",
        cancelled: false,
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setReservationDetails(prev => ({...prev, [name]: value}));
    }

    const checkPhone = e => {
        if (e.target.length < 9) {

        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        db.collection("reservations").add({
            name: reservationDetails.name,
            surname: reservationDetails.surname,
            email: reservationDetails.email,
            phone: reservationDetails.phone,
            place: reservationDetails.place,
            arrival: reservationDetails.arrival,
            departure: reservationDetails.departure,
            cancelled: reservationDetails.cancelled,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }


    return (
        <div className="reservation__container">
            <div className="reservation__details">
                <div className="details__image"></div>
                <div className="reservation__details-text">
                    <span className="details__name">
                        Imię: {reservationDetails.name}
                    </span>
                    <span className="details__surname">
                        Nazwisko: {reservationDetails.surname}
                    </span>
                    <span className="details__email">
                        E-mail: {reservationDetails.email}
                    </span>
                    <span className="details__phone">
                        Nr telefonu: {reservationDetails.phone}
                    </span>
                    <span className="details__arrival">
                        Przyjazd: {reservationDetails.arrival}
                    </span>
                    <span className="details__departure">
                        Wyjazd: {reservationDetails.departure}
                    </span>
                </div>

            </div>
            <div className="reservation__form">
                <h3>Prosimy o uzupełnienie danych rezerwacji</h3>
                <form action="" onSubmit={handleSubmit}>
                    <label> Imię
                        <input required={true} onChange={handleChange} type="text" value={reservationDetails.name} name="name"/>
                    </label>
                    <label> Nazwisko
                        <input required={true} onChange={handleChange} type="text" value={reservationDetails.surname} name="surname"
                               />
                    </label>
                    <label> E-mail
                        <input required={true} onChange={handleChange} type="email" value={reservationDetails.email} name="email"
                               />
                    </label>
                    <label> Nr telefonu
                        <input min={0} max={9} required={true} placeholder="np. 123 123 123" minLength={9} maxLength={11} onChange={handleChange} type="tel" value={reservationDetails.phone} name="phone"
                               />
                    </label>
                    <input className="reservation__form-check" type="checkbox"/><span>Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w rezerwacji zgodnie z Rozporządzeniem
                        Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 roku oraz ustawą z
                        dnia 10 maja 2018 roku o ochronie danych osobowych (Dz.U.2018 poz. 1000) oraz zgodnie
                        klauzulą informacyjną dołączoną do mojej zgody.</span>
                    <button className="reservation__form-btn btn--disabled">Potwierdź</button>
                </form>
            </div>
        </div>
    )
}