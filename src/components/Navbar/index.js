import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { SideBarStyled, TitleStyled, SBRoutesStyled, LogoutStyled } from "./layout";
import { useUser } from "../../contexts/auth";
import "./style.css";

const Sidebar = () => {
    const { signOut, user } = useUser();
    const history = useHistory();
    console.log("user", user);
    return (
        <SideBarStyled>

            <TitleStyled>
                DASHBOARD
            </TitleStyled>
            {
                user.accessLevel !== "I" &&
                <>
                    <SBRoutesStyled>
                        <NavLink to="/" className="sideBarText">
                            <i className="fas fa-house-user" />
                            Home
                        </NavLink>
                    </SBRoutesStyled>
                    <SBRoutesStyled>
                        <NavLink to="/Graphics" className="sideBarText">
                            <i className="fas fa-house-user" />
                            Despesas
                        </NavLink>
                    </SBRoutesStyled>
                </>
            }

            <SBRoutesStyled>

                <NavLink to="/Profile" className="sideBarText">
                    <i className="fas fa-user" />
                    Perfil
                </NavLink>
            </SBRoutesStyled>

            {
                user.accessLevel !== "I" &&
                <>
                    <SBRoutesStyled>
                        <NavLink to="/CreateProperty" className="sideBarText">
                            <i className="fas fa-file-upload" />
                            Cadastrar imóvel
                        </NavLink>
                    </SBRoutesStyled>
                    <SBRoutesStyled>
                        <NavLink to="/listProperties" className="sideBarText">
                            <i className="fas fa-file-upload" />
                            Listar imóveis
                        </NavLink>
                    </SBRoutesStyled>
                </>
            }
            {user.accessLevel === "A" &&
                <>

                    <SBRoutesStyled>
                        <NavLink to="/ControleAdministrator" className="sideBarText">
                            <i className="fas fa-table" />
                            Controle usuários
                        </NavLink>
                    </SBRoutesStyled>
                </>
            }

            <SBRoutesStyled>
                <a href="#" className="sideBarText" onClick={
                    () => {
                        signOut();
                        history.push("/");
                    }
                }>
                    <i className="fas fa-sign-out-alt" />
                    Sair
                </a>
            </SBRoutesStyled>

        </SideBarStyled>
    );
}

export default Sidebar;