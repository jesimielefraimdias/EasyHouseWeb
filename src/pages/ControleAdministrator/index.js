import React from "react";

import Navbar from "../../components/Navbar";
import TableUser from "../../components/TableUser";

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
                    <TableUser title="Listagem de Propriedades" />
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ControleAdministrator;