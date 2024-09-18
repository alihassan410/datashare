import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getAllSales, getAllExpense, getAllMilk } from '../../../api/internal';

const DashboardHome = () => {
  const [lossProfit, setLossProfit] = useState({ type: '', amount: 0 });
  const [lossProfitData, setLossProfitData] = useState({ labels: ['Loss/Profit'], datasets: [] });
  const [dailyMilkData, setDailyMilkData] = useState({ labels: [], datasets: [] });
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let salesResponse = await getAllSales();
        let sales = salesResponse.data.milkSales;
        let expensesResponse = await getAllExpense();
        let expenses = expensesResponse.data.expenses;
        let milkResponse = await getAllMilk();
        let milks = milkResponse.data.milks;
        // Calculate dates for the last 7 days
        console.log("test", milks, "check");
        let lastSevenDays = new Array(7)
          .fill(null)
          .map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - index);
            return date.toLocaleDateString();
          }).reverse();
        // Calculate expenses for the last 7 days
        const expensesValues = new Array(7).fill(0);
        expenses.forEach(expense => {
          const expenseDate = new Date(expense.dateIncurred).toLocaleDateString();
          const index = lastSevenDays.indexOf(expenseDate);
          if (index !== -1) {
            expensesValues[index] += expense.amount;
          }
        });

        setExpensesData({
          labels: lastSevenDays,
          datasets: [
            {
              label: 'Expenses Average',
              data: expensesValues,
              backgroundColor: 'rgba(255,99,132,0.6)',
            },
          ],
        });

        // Calculate daily milk average for the last 7 days
        let milkQuantities = new Array(7).fill(0);
        milks.forEach(milk => {
          const milkDate = new Date(milk.date).toLocaleDateString();
          const index = lastSevenDays.indexOf(milkDate);
          if (index !== -1) {
            milkQuantities[index] += milk.quantity;
          }
        });
        setDailyMilkData({
          labels: lastSevenDays,
          datasets: [
            {
              label: 'Daily Milk Average',
              data: milkQuantities,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        });

        // Calculate sales for the last 7 days
        const salesValues = new Array(7).fill(0);
        sales.forEach(sale => {
          const saleDate = new Date(sale.date).toLocaleDateString();
          const index = lastSevenDays.indexOf(saleDate);
          if (index !== -1) {
            salesValues[index] += sale.totalSale;
          }
        });

        setSalesData({
          labels: lastSevenDays,
          datasets: [
            {
              label: 'Sales Average',
              data: salesValues,
              backgroundColor: 'rgba(30,144,255,0.6)',
            },
          ],
        });

        // Calculate total sales and expenses
        const totalSales = sales.reduce((acc, curr) => acc + curr.totalSale, 0);
        const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        // Calculate loss or profit
        const profitOrLoss = totalSales - totalExpenses;
        const type = profitOrLoss >= 0 ? 'Profit' : 'Loss';

        setLossProfit({ type, amount: Math.abs(profitOrLoss) });

        // Prepare data for the Loss & Profit chart
        setLossProfitData({
          labels: ['Loss/Profit'],
          datasets: [
            {
              label: type,
              data: [Math.abs(profitOrLoss)],
              backgroundColor: type === 'Profit' ? 'rgba(0,128,0,0.6)' : 'rgba(255,0,0,0.6)',
            },
          ],
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto mt-[70px] bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Daily Milk Average</h2>
          <Line data={dailyMilkData} options={chartOptions} />
        </div>

        <div className="bg-gray-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Expenses Average</h2>
          <Line data={expensesData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Average</h2>
          <Line data={salesData} options={chartOptions} />
        </div>

        <div className="bg-gray-200 p-6 rounded-md shadow">
          <h2 className="text-xl  font-semibold mb-4">Loss & Profit</h2>
          <Bar data={lossProfitData} options={chartOptions} />
          <p className="mt-2">{lossProfit.type}: {lossProfit.amount}</p>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
