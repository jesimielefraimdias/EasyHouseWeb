import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const IncompleteUserRoutes = () => {

    return (
        <Switch>

            <Route exact path="/">
                <Profile />
            </Route>

            <Route exact path="/Profile">
                <Profile />
            </Route>

            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
}

export default IncompleteUserRoutes;
