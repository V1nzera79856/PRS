import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {Reservation} from "./reservation-form/reservation-form";
import {Calendar} from "./calendar/calendar";
import {WelcomePage} from "./welcome-page/welcome-page";
import {Plan} from "./plan/plan";
import {Confirmation} from "./confirmation/confirmation";
import {Cancel} from "./cancel/cancel";

const App = () => {
    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={WelcomePage}/>
                        <Route path="/calendar" component={Calendar}/>
                        <Route path="/plan" component={Plan}/>
                        <Route path="/reservation" component={Reservation}/>
                        <Route path="/confirmation" component={Confirmation}/>
                        <Route path="/cancel" component={Cancel}/>
                    </Switch>
                </div>
            </Router>
        </>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

