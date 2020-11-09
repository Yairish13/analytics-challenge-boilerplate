import React, { useState,useEffect,PureComponent } from 'react'
import axios from 'axios'
import {
  PieChart, Pie, Sector, Cell,Legend
} from 'recharts';

const COLORS = ['#FF1580','#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00FF00'];
  


function OsChart() {

const [data,setData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("http://localhost:3001/events/by-os")
            setData(data)
        })();
    }, [])

    console.log(data)

    return (
        <>
        <h2>Pie Chart by OS</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Legend 
                    layout="vertical"
                    align="left"
                    verticalAlign="middle"/>
        </PieChart>
        </>
      );
}


export default OsChart
