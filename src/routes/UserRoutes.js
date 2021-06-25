import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateEvaluation from "../pages/CreateEvaluation";
import CreateProperty from "../pages/CreateProperty";
import NotFound from "../pages/NotFound";
import ListProperties from "../pages/ListProperties";
import Graphics from "../pages/Graphics";

const UserRoutes = () => {

    return (
        <Switch>

            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/Graphics">
                <Graphics />
            </Route>

            <Route exact path="/Profile">
                <Profile />
            </Route>

            <Route exact path="/CreateProperty">
                <CreateProperty />
            </Route>

            <Route exact path="/CreateEvaluation">
                <CreateEvaluation />
            </Route>

            <Route exact path="/ListProperties">
                <ListProperties />
            </Route>

            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
}

export default UserRoutes;
