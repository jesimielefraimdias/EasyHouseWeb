import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "../contexts/auth";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import OperatorRoutes from "./OperatorRoutes";
import AdministratorRoutes from "./AdministratorRoutes";

const Routes = _ => {

    const { isLogged, userAcessLevel } = useUser();

    const acessLevel = () => {

        if (isLogged && userAcessLevel === "U") {
            return (
                <Router>
                    <UserRoutes />
                </Router>
            );
        }
        else if (isLogged && userAcessLevel === "O") {
            return (
                <Router>
                    <OperatorRoutes />
                </Router>
            );
        }
        else if (isLogged && userAcessLevel === "A") {
            return (
                <Router>
                    <AdministratorRoutes />
                </Router>
            );
        }

        return (
            <Router>
                <PublicRoutes />
            </Router>
        );

    }
    return acessLevel();
}

export default Routes;
