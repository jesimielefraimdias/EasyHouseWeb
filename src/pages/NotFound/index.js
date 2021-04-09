import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Layout,
    ContentStyled,
    LabelStyled,
    ErrorStyled
} from "../../layout/publicLayout";

const NotFound = () => {
    return (
        <Layout>
            <Header />
            <ContentStyled>
                <h1>Página não encontrada.</h1>
            </ContentStyled>
            <Footer />
        </Layout>
    );
}

export default NotFound;