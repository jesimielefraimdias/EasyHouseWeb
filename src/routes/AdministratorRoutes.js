import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateOperator from "../pages/CreateOperator";
import ControleAdministrator from "../pages/ControleAdministrator";
import CreateEvaluation from "../pages/CreateEvaluation";
import ControleEvaluation from "../pages/ControleEvaluation";
import NotFound from "../pages/NotFound";

const AdministratorRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/Profile">
                <Profile />
            </Route>

            <Route exact path="/CreateOperator">
                <CreateOperator />
            </Route>

            <Route exact path="/ControleAdministrator">
                <ControleAdministrator />
            </Route>

            <Route exact path="/CreateEvaluation">
                <CreateEvaluation />
            </Route>

            <Route exact path="/ControleEvaluation">
                <ControleEvaluation />
            </Route>

            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
}

export default AdministratorRoutes;
