import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {arrival, dateRange, departure} from "../calendar/calendar";
import "../calendar/_calendar.scss";
import Logo from "../images/logo.png";
import {db} from "../firebase/firebase";
import "./_plan.scss"
import {getDates} from "../date-range/date-renge";
import {Link} from "react-router-dom";

export const Plan = () => {
    const [arrivalDate, setArrivalDate] = useState(dateRange[0]);
    const [departureDate, setDepartureDate] = useState(dateRange[dateRange.length - 1]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        db.collection("places").get().then((querySnapshot) => {
            let allPlaces = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                allPlaces.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setPlaces(allPlaces);
        });
    }, [])

    useEffect(()=>{
        handleReserved();
    }, [places])

    const handleReserved = () => {
        places.forEach(place => {
            dateRange.forEach(date => {
                let dateJson = JSON.stringify(date).slice(1, 11);
                if (place.reserved.includes(dateJson)) {
                    const divsOcc = document.querySelectorAll(`[data-key=${place.id}]`)
                    divsOcc.forEach(div => {
                        div.classList.add("plan-place-occupied");
                    })
                }
            })
        })
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
                        <DatePicker className="calendar calendar-arrival" selected={arrivalDate}
                                    onChange={handleChangeArrival}/>

                        <DatePicker className="calendar calendar-departure" selected={departureDate}
                                    onChange={handleChangeDeparture}/>
                    </div>
                    <a className="welcome-logo plan-logo" href="https://camping-leba.pl/">
                        <img src={Logo} alt="logo ośrodka" className="welcome-logo plan-logo"/>
                    </a>
                </header>
                <Link to="/reservation"> Do okna rezerwacji </Link>
                <main className="plan-main-container">
                    {places.map(place => {
                        return (
                            <div className="plan-place" data-key={place.id} key={place.id}>
                                <h3>{place.id}</h3>
                            </div>
                        )
                    })}
                </main>
            </div>
        </>
    )
}