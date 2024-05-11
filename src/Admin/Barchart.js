import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Barchart = ({ ConfOrder: { ConfOrder } }) => { 
  const chartRef = useRef();
  console.log("barchart", ConfOrder);
  

useEffect(() => {
  
  const monthlyTotals = {};
  for (let month = 0; month < 12; month++) {
    monthlyTotals[month] = 0;

  }
  ConfOrder.forEach((order,i) => {
    if(order.bill_address){

      let dt=order.bill_address.orderDate
      const date = new Date(dt);
      let month = date.getMonth();
    
    const total = order.payment ? order.payment.total : 0;
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = total;
    } else {
      monthlyTotals[month] += total;
    }

}});
   

    const labels = Object.keys(monthlyTotals).map(month => {
      return new Date(2024, month).toLocaleString('default', { month: 'short' });
    });
    const chartData = Object.values(monthlyTotals);
  
    const chartInstance = chartRef.current.chart;
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    const ctx = chartRef.current.getContext('2d');
   
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Payment',
          data: chartData,
          backgroundColor: 'orange',
          // backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [ConfOrder]);
  
  return (
    <div>
    
      <canvas ref={chartRef} className='canvas'></canvas>
    </div>
  );
}

export default Barchart;
