import React, { useEffect, useState } from 'react';
import { LineChart, Tooltip, Legend, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import { Event } from '../../models/event';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const DaysGraph: React.FC = () => {
    const [data, setData] = useState<Event[]>([]);
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:3001/events/by-days/${(new Date().getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60)}`)
            setData(data)
        })();
    }, [startDate])
    return (
        <div>
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
            <LineChart width={400} height={200} data={data}>
                <Line type="linear" dataKey='count' stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    )
}

export default DaysGraph;
