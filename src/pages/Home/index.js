import React from "react";

import Navbar from "../../components/Navbar";

import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";

const Home = () => {

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <h1>Home</h1>
            </ContentStyled>
        </Layout>
    );
}

export default Home;