import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {arrivalAsDate, departureAsDate} from "../calendar/calendar";
import "../calendar/_calendar.scss";
import Logo from "../images/logo.png";
import {db} from "../firebase/firebase";
import "./_plan.scss"
import {getDates} from "../date-range/date-renge";
import {Link} from "react-router-dom";

export let placeID = "";

export const Plan = () => {
    const [arrivalDate, setArrivalDate] = useState(arrivalAsDate);
    const [departureDate, setDepartureDate] = useState(departureAsDate);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        db.collection("places").get().then((querySnapshot) => {
            let allPlaces = [];
            querySnapshot.forEach((doc) => {
                allPlaces.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setPlaces(allPlaces);
            console.log(allPlaces,places);
        });
    }, [arrivalDate, departureDate]);

    useEffect(() => {
        handleReserved();
    }, [places])

    const handleReserved = () => {
        const allDivs = document.querySelectorAll(".plan-place");
        allDivs.forEach(div => {
            div.classList.remove("plan-place-occupied")
        })
        const newDates = getDates(arrivalDate, departureDate);
        places.forEach(place => {
            newDates.forEach(date => {
                let dateJson = JSON.stringify(date).slice(1, 11);
                if (place.reserved.includes(dateJson)) {
                    const divsOcc = document.querySelectorAll(`[data-key=${place.id}]`);
                    divsOcc.forEach(div => {
                        div.classList.add("plan-place-occupied");
                    })
                }
            })
        })
    }

    const handleClickPlace = (e) => {
        if (e.target.classList.contains("plan-place-occupied")) {
            e.preventDefault();
        } else {
            placeID = e.target.getAttribute("id");
        }
    }

    const handleChangeArrival = (date) => {
        setArrivalDate(date);
    }

    const handleChangeDeparture = (date) => {
        setDepartureDate(date);
    }
    return (
        <>
            <div className="plan-container">
                <header className="plan-header">
                    <div className="plan-calendar">
                        <h3>Data Przyjazdu:</h3>
                        <DatePicker className="calendar calendar-arrival" selected={arrivalDate}
                                    onChange={handleChangeArrival}/>
                        <h3>Data Wyjazdu:</h3>
                        <DatePicker className="calendar calendar-departure" selected={departureDate}
                                    onChange={handleChangeDeparture}/>
                    </div>
                    <a className="welcome-logo plan-logo" href="https://camping-leba.pl/">
                        <img src={Logo} alt="logo ośrodka" className="welcome-logo plan-logo"/>
                    </a>
                </header>
                <h2 className="plan-title">Prosimy o wybranie miejsca</h2>
                <main className="plan-main-container">
                    {places.map(place => {
                        return (
                            <Link to="/reservation" onClick={handleClickPlace}
                                  className="plan-place" id={place.id} data-key={place.id} key={place.id}>
                                <h3>{place.id}</h3>
                            </Link>
                        )
                    })
                    }
                </main>
            </div>
        </>
    )
}