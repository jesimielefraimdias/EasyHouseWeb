import React from "react";

import Navbar from "../../components/Navbar";
import Table from "../../components/Table";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";

import { CardCreateStyled } from "./layout";

const ControleAdministrator = () => {
    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <Table title="Controle administrador" />
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ControleAdministrator;