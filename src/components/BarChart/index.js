import React from 'react';
import {
    BarChart,
    Bar,
    // LineChart,
    // Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip, Legend
} from 'recharts';

const BarChartGraphics = ({data}) => {

        return (

            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="despesa" fill="#8884d8" />
            </BarChart>
        );
}

export default BarChartGraphics;