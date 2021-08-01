import React, {useState} from "react";
import "./_reservation-form.scss";
import {db} from "../firebase/firebase";
import campsitePlace from "../images/campsitePlace.jpg";
import {arrival, dateRange, departure} from "../calendar/calendar";
import firebase from "firebase";
import {placeID} from "../plan/plan";
import {Link} from "react-router-dom"


export let confirmationNumber;

export const Reservation = () => {

    const [reservationDetails, setReservationDetails] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        place: placeID,
        arrival: arrival,
        departure: departure,
        cancelled: false,
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setReservationDetails(prev => ({...prev, [name]: value}));

    }

    const handleSubmit = e => {

        const reservedDates = [];
        dateRange.forEach(date => {
            reservedDates.push(JSON.stringify(date).slice(1, 11));
        })


        db.collection("places").doc(reservationDetails.place).update({
            reserved: firebase.firestore.FieldValue.arrayUnion(...reservedDates),
        })
            .then(() => {
                console.log("it worked")
            });

        db.collection("reservations").add({
            name: reservationDetails.name,
            surname: reservationDetails.surname,
            email: reservationDetails.email,
            phone: reservationDetails.phone,
            place: reservationDetails.place,
            arrival: reservationDetails.arrival,
            departure: reservationDetails.departure,
            cancelled: reservationDetails.cancelled,
            reservedDates: reservedDates,
        })
            .then((docRef) => {
                confirmationNumber = docRef.id;
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }


    return (
        <div className="reservation__container">
            <div className="reservation__details">
                <img src={campsitePlace} alt="namioty w lesie" className="details__image"/>
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
                        Przyjazd: {arrival}
                    </span>
                    <span className="details__departure">
                        Wyjazd: {departure}
                    </span>
                </div>

            </div>
            <div className="reservation__form">
                <h3>Prosimy o uzupełnienie danych rezerwacji</h3>
                <form action="">
                    <label> Imię
                        <input required={true} onChange={handleChange} type="text" value={reservationDetails.name}
                               name="name"/>
                    </label>
                    <label> Nazwisko
                        <input required={true} onChange={handleChange} type="text" value={reservationDetails.surname}
                               name="surname"
                        />
                    </label>
                    <label> E-mail
                        <input required={true} onChange={handleChange} type="email" value={reservationDetails.email}
                               name="email"
                        />
                    </label>
                    <label> Nr telefonu
                        <input min={0} max={9} required={true} placeholder="np. 123 123 123" minLength={9}
                               maxLength={11} onChange={handleChange} type="tel" value={reservationDetails.phone}
                               name="phone"
                        />
                    </label>
                    <div className="check-container">
                        <input required={true} className="reservation__form-check" type="checkbox"/><span>Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w rezerwacji zgodnie z Rozporządzeniem
                        Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 roku oraz ustawą z
                        dnia 10 maja 2018 roku o ochronie danych osobowych (Dz.U.2018 poz. 1000) oraz zgodnie
                        klauzulą informacyjną dołączoną do mojej zgody.</span>
                    </div>
                    <Link onClick={handleSubmit} to="/confirmation"
                          className="reservation__form-btn btn--correct">Potwierdź</Link>
                </form>
            </div>
        </div>
    )
}