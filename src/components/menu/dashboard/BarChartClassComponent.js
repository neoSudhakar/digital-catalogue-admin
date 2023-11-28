import { useQuery } from '@tanstack/react-query';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAccountOrdersForManufacturer } from '../../../util/http';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 3000,
//     amt: 2290,
//   },
// ];

export default function BarChartClassComponent() {
// export default class BarChartClassComponent extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  const [chartData, setChartData] = useState();

  const {data: accountOrdersData} = useQuery({
    queryKey: ["accountOrders"],
    queryFn: fetchAccountOrdersForManufacturer,
  })

  useEffect(()=>{
    if(accountOrdersData){
      console.log("accountOrders data is", accountOrdersData);
      const mappedList = accountOrdersData.map((eachObj)=>{
        return {name: eachObj.account.name, orders: eachObj.orders.length, amt: 1}
      })
      setChartData([...mappedList]);
    }
  },[accountOrdersData])

  // render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  // }
}
