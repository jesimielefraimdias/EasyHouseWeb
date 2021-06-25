import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import axiosServer from "../../services/axiosServer";
import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";
import { CardCreateStyled, PStyled } from "./layout";
import GoogleMapsVisualization from "../../components/GoogleMapsVisualization";

const Home = () => {

    const [locations, setLocations] = useState([]);
    const getProperties = async () => {
        try {
            const res = await axiosServer.get("listProperties");
            console.log(res.data);
            setLocations(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

        getProperties();
    }, []);

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <GoogleMapsVisualization locations={locations} />
            </ContentStyled>
        </Layout>
    );
}

export default Home;