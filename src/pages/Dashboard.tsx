import React, { useState, useEffect } from 'react';
import { ThermometerSnowflake, AlertTriangle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define TypeScript interfaces
interface BatchData {
  currentTemp: number;
  currentHumidity: number;
  optimalTemp: number;
  alerts: number;
  batches: number;
  uptime: string;
  temperatureData: number[];
  humidityData: number[];
}

interface BatchDataSet {
  [key: string]: BatchData;
}

// Mock data for different batches
const initialBatchData: BatchDataSet = {
  'Batch #1234': {
    currentTemp: 2.4,
    currentHumidity: 85,
    optimalTemp: 2.0,
    alerts: 2,
    batches: 12,
    uptime: "99.9%",
    temperatureData: [2.0, 2.1, 2.3, 2.4, 2.2, 2.1, 2.0],
    humidityData: [80, 82, 85, 84, 83, 81, 80],
  },
  'Batch #1235': {
    currentTemp: 3.0,
    currentHumidity: 75,
    optimalTemp: 2.5,
    alerts: 1,
    batches: 10,
    uptime: "98.5%",
    temperatureData: [2.5, 2.6, 2.8, 3.0, 2.9, 2.7, 2.6],
    humidityData: [70, 72, 75, 74, 73, 71, 70],
  },
  'Batch #1236': {
    currentTemp: 1.8,
    currentHumidity: 90,
    optimalTemp: 2.0,
    alerts: 3,
    batches: 15,
    uptime: "99.0%",
    temperatureData: [1.8, 1.9, 2.0, 2.1, 2.0, 1.9, 1.8],
    humidityData: [85, 86, 90, 89, 88, 87, 85],
  },
};

// Reusable StatsCard Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  description?: string;
  trend?: {
    value: string | number;
    isIncreasing: boolean;
  };
}

const StatsCard = ({ title, value, icon, description, trend }: StatsCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-center mt-2">
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <span className="ml-2 flex items-center text-sm" style={{ color: trend.isIncreasing ? '#16a34a' : '#dc2626' }}>
              {trend.isIncreasing ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {trend.value}
            </span>
          )}
        </div>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">{icon}</div>
    </div>
    {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
  </div>
);

const Dashboard = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('Batch #1234');
  const [batchData, setBatchData] = useState<BatchDataSet>(initialBatchData);
  const batch = batchData[selectedBatch] || batchData[Object.keys(batchData)[0]];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatchData((prevData) => {
        const updatedData: BatchDataSet = { ...prevData };
        Object.keys(updatedData).forEach((batchKey) => {
          const batch = updatedData[batchKey];
          // Simulate small fluctuations in temperature and humidity
          const newTemp = batch.currentTemp + (Math.random() - 0.5) * 0.2;
          const newHumidity = batch.currentHumidity + (Math.random() - 0.5) * 1;

          // Update temperature and humidity data
          batch.currentTemp = parseFloat(newTemp.toFixed(1));
          batch.currentHumidity = parseFloat(newHumidity.toFixed(1));

          // Update temperature and humidity history
          batch.temperatureData = [...batch.temperatureData.slice(1), batch.currentTemp];
          batch.humidityData = [...batch.humidityData.slice(1), batch.currentHumidity];
        });
        return updatedData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Chart data for Temperature Trend
  const temperatureData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: batch.temperatureData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Chart data for Humidity Levels
  const humidityData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    datasets: [
      {
        label: 'Humidity (%)',
        data: batch.humidityData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  // Chart options
  const temperatureChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Trend',
      },
    },
  };

  const humidityChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Humidity Levels',
      },
    },
  };

  // Function to handle batch selection
  const handleBatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(event.target.value);
  };

  // Function to handle report download
  const handleDownloadReport = () => {
    const reportContent = `Batch Report for ${selectedBatch}
Current Temperature: ${batch.currentTemp}°C
Current Humidity: ${batch.currentHumidity}%
Optimal Temperature: ${batch.optimalTemp}°C
Active Alerts: ${batch.alerts}
Batches: ${batch.batches}
Uptime: ${batch.uptime}`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedBatch}_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {/* Removed logo */}
            <h1 className="text-3xl font-bold text-gray-900">Logic Lynk Dashboard</h1>
          </div>
          <div className="flex space-x-4">
            <select
              className="rounded-lg border-gray-300 text-gray-700 text-sm"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              {Object.keys(batchData).map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              onClick={handleDownloadReport}
            >
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Temperature Card */}
          <StatsCard
            title="Current Temperature"
            value={`${batch.currentTemp}°C`}
            icon={<ThermometerSnowflake className="h-6 w-6 text-blue-600" />}
            description={`Optimal: ${batch.optimalTemp}°C`}
            trend={{
              value: `${(batch.currentTemp - batch.optimalTemp).toFixed(1)}°`,
              isIncreasing: batch.currentTemp > batch.optimalTemp,
            }}
          />

          {/* Alerts Card */}
          <StatsCard
            title="Active Alerts"
            value={batch.alerts}
            icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
            description={`From ${batch.batches} active batches`}
          />

          {/* Uptime Card */}
          <StatsCard
            title="System Uptime"
            value={batch.uptime}
            icon={<Clock className="h-6 w-6 text-green-600" />}
            description="Last 30 days"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend</h3>
            <div className="h-64">
              <Line data={temperatureData} options={temperatureChartOptions} />
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Humidity Levels</h3>
            <div className="h-64">
              <Line data={humidityData} options={humidityChartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Alerts Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {/* Alert 1 */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Temperature Threshold Exceeded</p>
                  <p className="text-sm text-gray-600">Batch #1234 - Zone A</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 min ago</span>
            </div>

            {/* Alert 2 */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Humidity Warning</p>
                  <p className="text-sm text-gray-600">Batch #1235 - Zone B</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">15 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;