import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Graphics from "../pages/Graphics";
import Profile from "../pages/Profile";
import CreateProperty from "../pages/CreateProperty";
import ListProperties from "../pages/ListProperties";
import ListPropertiesFromUser from "../pages/ListPropertiesFromUser";
import ControleAdministrator from "../pages/ControleAdministrator";
import CreateExpense from "../pages/CreateExpense";
import ListExpenses from "../pages/ListExpenses";
import NotFound from "../pages/NotFound";

const AdministratorRoutes = () => {
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

            <Route exact path="/ListProperties">
                <ListProperties />
            </Route>

            <Route exact path="/ListPropertiesFromUser/:user_id">
                <ListPropertiesFromUser />
            </Route>

            <Route exact path="/ControleAdministrator">
                <ControleAdministrator />
            </Route>

            <Route exact path="/CreateExpense/:id">
                <CreateExpense />
            </Route>

            <Route exact path="/ListExpenses/:id">
                <ListExpenses />
            </Route>

            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
}

export default AdministratorRoutes;
