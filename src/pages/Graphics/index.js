import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import axiosServer from "../../services/axiosServer";
import {
    Layout,
    ContentStyled,
} from "../../layout/privateLayout";
// import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";

const Graphics = () => {

    const [data, setData] = useState([]);
    const getExpenses = async () => {
        try {
            const res = await axiosServer.get("getExpenses");
            console.log(res.data);
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

        getExpenses();
    }, []);

    return (
        <Layout>
            <Navbar />
            <ContentStyled>
                <BarChart data={data} />
            </ContentStyled>
        </Layout>
    );
}

export default Graphics;