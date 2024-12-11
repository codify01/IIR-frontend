import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Loader from '../Loader'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CardSeven from "../card/Cardseven";

const apiURL = import.meta.env.VITE_API_URL;

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type MonetaryData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

type NonMonetaryData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

type APIResponse = {
  total_users: string;
  total_amount_deposited: string;
  total_amount_withdrawn: string;
  total_pending_deposit: string;
  total_pending_withdraw: string;
  total_deposit: string;
  total_withdraw: string;
  total_investment: string;
  current_investment: string;
};

const DashboardChart: React.FC = () => {
  const [monetaryData, setMonetaryData] = useState<MonetaryData | null>(null);
  const [nonMonetaryData, setNonMonetaryData] = useState<NonMonetaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overviewData, setOverviewData] = useState({
    totalInvestors: 0,
    availableInvestments: 0,
    pendingDeposit: 0,
    pendingTransactions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      try {
        const response = await axios.get<APIResponse>(`${apiURL}/adminTotal.php`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        // Set monetary data
        setMonetaryData({
          labels: ["Total Deposited", "Total Withdrawn"],
          datasets: [
            {
              label: "Amounts (in millions)",
              data: [
                parseFloat(data.total_amount_deposited),
                parseFloat(data.total_amount_withdrawn),
              ],
              backgroundColor: ["#2196f3", "#ff5722"],
            },
          ],
        });

        // Set non-monetary data
        setNonMonetaryData({
          labels: [
            "Total Users",
            "Pending Deposits",
            "Pending Withdrawals",
            "Total Deposits",
            "Total Withdrawals",
            "Total Investments",
            "Current Investments",
          ],
          datasets: [
            {
              label: "Counts",
              data: [
                parseInt(data.total_users),
                parseInt(data.total_pending_deposit),
                parseInt(data.total_pending_withdraw),
                parseInt(data.total_deposit),
                parseInt(data.total_withdraw),
                parseInt(data.total_investment),
                parseInt(data.current_investment),
              ],
              backgroundColor: [
                "#4caf50",
                "#ff9800",
                "#9c27b0",
                "#3f51b5",
                "#00bcd4",
                "#8bc34a",
                "#ffc107",
              ],
            },
          ],
        });

        // Set overview data
        setOverviewData({
          totalInvestors: parseInt(data.total_users),
          availableInvestments: parseInt(data.current_investment),
          pendingDeposit: parseInt(data.total_pending_deposit),
          pendingTransactions: parseInt(data.total_pending_withdraw),
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load chart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mb-5">
            <CardSeven
              redirect="/admin/manageinvestors"
              balType="Total Investors"
              amount={overviewData.totalInvestors}
              cta="View"
            />
            <CardSeven
              redirect="/admin/"
              balType="Ongoing Investments"
              amount={overviewData.availableInvestments}
            //   cta="View"
            />
            <CardSeven
              redirect="/admin/managetransactions/incoming"
              balType="Pending Deposit"
              amount={overviewData.pendingDeposit}
              cta="View"
            />
            <CardSeven
              redirect="/admin/managetransactions/outgoing"
              balType="Pending Withdrawal"
              amount={overviewData.pendingTransactions}
              cta="View"
            />
          </div>

          {monetaryData && (
            <div style={{ marginBottom: "2rem" }}>
              <h3>Transaction Statistics</h3>
              <Bar
                data={monetaryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                }}
              />
            </div>
          )}
          {nonMonetaryData && (
            <div>
              <h3>Users' Statistics</h3>
              <Bar
                data={nonMonetaryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardChart;
