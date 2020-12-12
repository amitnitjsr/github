import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import App from './Container/home/App';
import User from './Container/User/Table';
import PageNotFound from './Container/PageNotFound';
// import PreLoading from './Component/PreLoading';


const routes = (props) => {
    return (
        <Router>
            {/* <PreLoading /> */}
            <Switch>
                <Route
                    exact
                    path="/"
                    component={App} />
                <Route
                    exact
                    path="/user"
                    component={User} />
                <Route
                    path=""
                    component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default routes;