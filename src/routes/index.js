import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "../contexts/auth";
import PublicRoutes from "./PublicRoutes";
import IncompleteUserRoutes from "./IncompleteUserRoutes";
import UserRoutes from "./UserRoutes";
import OperatorRoutes from "./OperatorRoutes";
import AdministratorRoutes from "./AdministratorRoutes";

const Routes = _ => {

    const { isLogged, user } = useUser();
    console.log(isLogged, user);
    const accessLevel = () => {

        console.log("entrou");
        if (isLogged && user.accessLevel === "I") {
            
            return (
                <Router>
                    <IncompleteUserRoutes />
                </Router>
            );
        }
        else if (isLogged && user.accessLevel === "U") {
            console.log("entrou2");
            return (
                <Router>
                    <UserRoutes />
                </Router>
            );
        }
        else if (isLogged && user.accessLevel === "O") {
            return (
                <Router>
                    <OperatorRoutes />
                </Router>
            );
        }
        else if (isLogged && user.accessLevel === "A") {
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
    
    return accessLevel();
}

export default Routes;
