import React, {useState} from "react";
import DatePicker from "react-datepicker";
import car from "../images/car.svg"

import "react-datepicker/dist/react-datepicker.css";
import "./_calendar.scss"


export const Calendar = () => {
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());

    return (
        <>
            <div className="dates-container">
                <h1 className="calendar-container-title">Prosimy o podanie daty pobytu</h1>
                <div className="calendars-container">
                    <div className="arrival-container">
                        <h2 className="arrival-title calendar-title">Data przyjazdu</h2>
                        <DatePicker className="calendar calendar-arrival" selected={arrivalDate}
                                    onChange={date => setArrivalDate(date)}/>
                    </div>
                    <div className="departure-container">
                        <h2 className="departure-title calendar-title">Data wyjazdu</h2>
                        <DatePicker className="calendar calendar-departure" selected={departureDate}
                                    onChange={date => setDepartureDate(date)}/>
                    </div>
                </div>
                <button className="calendar-btn">Potwierdź</button>
            </div>
        </>
    );
};