import React from "react";

import Navbar from "../../components/Navbar";
import TableExpense from "../../components/TableExpense";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";

import { CardCreateStyled } from "./layout";
import { useParams } from "react-router-dom";

const ListExpenses = () => {
    const { id } = useParams();
 
    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <CardCreateStyled>
                    <TableExpense title="Listagem de Despesas" id={id}/>
                </CardCreateStyled>
            </ContentStyled>
        </Layout>

    );
}

export default ListExpenses;