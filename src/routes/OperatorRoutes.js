import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateEvaluation from "../pages/CreateEvaluation";
import ControleEvaluation from "../pages/ControleEvaluation";
import NotFound from "../pages/NotFound";

const OperatorRoutes = () => {

    return (
        <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/Profile">
                    <Profile />
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

export default OperatorRoutes;
