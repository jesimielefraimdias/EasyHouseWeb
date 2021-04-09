import React, { useState } from "react";
import axiosServer from "../../services/axiosServer";

import {
    ContainerToWorkStyled,
    TitleStyled,
    ContainerLeftStyled,
    UlStyled,
    LiStyled,
    ContainerRightStyled,
    ButtonStyled
} from "./layout";


const NextState = ({ loan_state, changeLoanState }) => {

    const [display, setDisplay] = useState("none");

    const showOrUnshow = () => {
        if (display === "none") {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    }

    if (loan_state === "N") {
        return (
            <ContainerToWorkStyled>
                <TitleStyled onClick={showOrUnshow}>Alterar estado do empréstimo do usuário</TitleStyled>
                <ContainerLeftStyled display={display}>

                    <UlStyled>
                        <LiStyled>
                            <p>
                                O estado de não visualizado permite o usuário alterar os dados do empréstimo.
                            </p>
                        </LiStyled>

                        <LiStyled>
                            <p>
                                O estado avaliando informações indica para o usuário que as informações estão sendo avaliadas.
                            </p>
                        </LiStyled>

                        <LiStyled>
                            <p>
                                No estado aprovado ou desaprovado, você não poderá mais trocar o estado.
                            </p>
                        </LiStyled>
                    </UlStyled>
                </ContainerLeftStyled>

                <ContainerRightStyled display={display}>
                    <ButtonStyled onClick={_ => { changeLoanState("E") }}>Avaliando informações</ButtonStyled>
                </ContainerRightStyled>
            </ContainerToWorkStyled>
        );
    } else if (loan_state === "E") {
        return (
            <ContainerToWorkStyled onClick={showOrUnshow}>
                <TitleStyled>Alterar estado do empréstimo do usuário</TitleStyled>
                <ContainerLeftStyled display={display}>
                    <UlStyled>
                        <LiStyled>
                            <p>
                                O estado de não visualizado permite o usuário alterar os dados do empréstimo.
                            </p>
                        </LiStyled>

                        <LiStyled>
                            <p>
                                O estado avaliando informações indica para o usuário que as informações estão sendo avaliadas.
                            </p>
                        </LiStyled>

                        <LiStyled>
                            <p>
                                No estado aprovado ou desaprovado, você não poderá mais trocar o estado.
                            </p>
                        </LiStyled>
                    </UlStyled>
                </ContainerLeftStyled>
                <ContainerRightStyled display={display}>
                    <ButtonStyled onClick={_ => { changeLoanState("N") }}>Voltar para estado de não visualizado</ButtonStyled>
                    <ButtonStyled onClick={_ => { changeLoanState("A") }} backgroundColor={"green"} >Aprovar empréstimo</ButtonStyled>
                    <ButtonStyled onClick={_ => { changeLoanState("U") }} backgroundColor={"var(--notification)"}>Negar empréstimo</ButtonStyled>
                </ContainerRightStyled>
            </ContainerToWorkStyled>
        );
    } else {
        return null;
    }
}

export default NextState;