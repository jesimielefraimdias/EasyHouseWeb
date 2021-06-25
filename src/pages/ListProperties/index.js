import React from "react";

import Navbar from "../../components/Navbar";
import Table from "../../components/TableProperty";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";
import { CardCreateStyled } from "./layout";

const ListProperties = () => {
    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <Table title="Listagem de Imóveis" />
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ListProperties;