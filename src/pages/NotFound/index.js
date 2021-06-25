import React, { useLayoutEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";
import {
    Layout,
    ContentStyled,
} from "../../layout/publicLayout";

const NotFound = () => {
    const history = useHistory();

    useLayoutEffect(() => {
        setTimeout(function () {
            history.push("/");
        }, 4000);
    }, []);

    return (
        <Layout>
            <Header />
            <ContentStyled>
                <h1>Página não existe ou seu tempo de login expirou.</h1>
            </ContentStyled>
            <Footer />
        </Layout>
    );
}

export default NotFound;