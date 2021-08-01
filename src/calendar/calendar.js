import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./_calendar.scss"
import {Link} from "react-router-dom";
import {getDates} from "../date-range/date-renge";

export let arrival = [];
export let departure = [];
export let arrivalAsDate = [];
export let departureAsDate = [];
export let dateRange;

export const Calendar = () => {
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());


    const handleChangeArrival = (date) => {
        setArrivalDate(date);
    }

    const handleChangeDeparture = (date) => {
        setDepartureDate(date);
    }


    const handleClick = () => {
        arrival = JSON.stringify(arrivalDate).slice(1, 11);
        arrivalAsDate = arrivalDate;
        departure = JSON.stringify(departureDate).slice(1, 11);
        departureAsDate = departureDate;
        dateRange = getDates(arrivalDate, departureDate);
    }

    return (
        <>
            <div className="dates-container">
                <h1 className="calendar-container-title">Prosimy o podanie daty pobytu</h1>
                <div className="calendars-container">
                    <div className="arrival-container">
                        <h2 className="arrival-title calendar-title">Data przyjazdu</h2>
                        <DatePicker className="calendar calendar-arrival" selected={arrivalDate}
                                    onChange={handleChangeArrival}/>
                    </div>
                    <div className="departure-container">
                        <h2 className="departure-title calendar-title">Data wyjazdu</h2>
                        <DatePicker className="calendar calendar-departure" selected={departureDate}
                                    onChange={handleChangeDeparture}/>
                    </div>
                </div>
                <Link to="/plan" className="calendar-btn" onClick={handleClick}>
                    Potwierdź
                </Link>
            </div>
        </>
    );
};