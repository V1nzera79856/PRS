import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Reservation} from "./reservation-form/reservation-form";
import {Calendar} from "./calendar/calendar";


ReactDOM.render(
    <React.StrictMode>
        <Reservation/>
        <Calendar/>
    </React.StrictMode>,
    document.getElementById('root')
);

