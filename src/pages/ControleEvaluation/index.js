import React from "react";

import Navbar from "../../components/Navbar";
import TableEvaluation from "../../components/TableEvaluation";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";

import { CardCreateStyled } from "./layout";

const ControleEvaluation = () => {
    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <TableEvaluation title="Controle avaliação" />
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ControleEvaluation;