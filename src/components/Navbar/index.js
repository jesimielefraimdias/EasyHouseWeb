import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { SideBarStyled, TitleStyled, SBRoutesStyled, LogoutStyled } from "./layout";
import { useUser } from "../../contexts/auth";
import "./style.css";

const Sidebar = () => {
    const { signOut, userAcessLevel } = useUser();
    const history = useHistory();

    return (
        <SideBarStyled>

            <TitleStyled>
                DASHBOARD
            </TitleStyled>

            <SBRoutesStyled>
                <NavLink to="/" className="sideBarText">
                    <i className="fas fa-home" />
                    Home
                </NavLink>
            </SBRoutesStyled>

            <SBRoutesStyled>

                <NavLink to="/Profile" className="sideBarText">
                    <i className="fas fa-user" />
                    Perfil
                </NavLink>
            </SBRoutesStyled>

            <SBRoutesStyled>

                <NavLink to="/CreateEvaluation" className="sideBarText">
                    <i className="fas fa-user" />
                    Enviar sugestão
                </NavLink>
            </SBRoutesStyled>

            { userAcessLevel === "A" ?
                <>
                    <SBRoutesStyled>
                        <NavLink to="/CreateOperator" className="sideBarText">
                            <i className="fas fa-user-edit" />
                           Criar operador
                        </NavLink>
                    </SBRoutesStyled>

                    <SBRoutesStyled>
                        <NavLink to="/ControleAdministrator" className="sideBarText">
                            <i className="fas fa-table" />
                            Controle usuários
                        </NavLink>
                    </SBRoutesStyled>
                </>
                :
                null
            }



            { userAcessLevel !== "U" ?
                <SBRoutesStyled>
                    <NavLink to="ControleEvaluation" className="sideBarText">
                        <i className="fas fa-user-edit" />
                            Controlar avaliação
                        </NavLink>
                </SBRoutesStyled>
                :
                null
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