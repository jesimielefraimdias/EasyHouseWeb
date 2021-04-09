import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import CreateUser from "../pages/CreateUser";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";

const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>

            <Route exact path="/CreateUser">
                <CreateUser />
            </Route>

            <Route exact path="/ForgotPassword">
                <ForgotPassword />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default PublicRoutes;
