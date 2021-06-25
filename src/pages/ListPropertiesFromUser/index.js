import React from "react";

import Navbar from "../../components/Navbar";
import Table from "../../components/TableProperty";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";
import { CardCreateStyled } from "./layout";
import { useParams } from "react-router-dom";

const ListProperties = () => {

    const { user_id } = useParams();

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <Table title="Listagem de Imóveis do Usuário" user_id={user_id} />
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ListProperties;