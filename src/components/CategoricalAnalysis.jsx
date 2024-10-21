import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoricalAnalysis = () => {
  const [salesData, setSalesData] = useState([]); // Initialize with an empty array
  const [selectedField, setSelectedField] = useState('gender');
  const [chartData, setChartData] = useState([]);

  // Fetch the data
  const fetchSalesData = async () => {
    try {
      const response = await fetch('/output.json'); // Assuming the JSON is in the public folder
      const result = await response.json();
      const data = result["Supply Chain"] || []; // Handle undefined or missing "Supply Chain" data
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  // Function to group and count occurrences of a field
  const getChartData = (field) => {
    if (!salesData || salesData.length === 0) {
      return []; // Return an empty array if salesData is undefined or empty
    }

    const fieldCounts = salesData.reduce((acc, item) => {
      const key = item[field];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(fieldCounts).map(key => ({
      name: key,
      value: fieldCounts[key],
    }));
  };

  // Update chart data whenever selected field changes
  useEffect(() => {
    if (salesData.length > 0) {
      const data = getChartData(selectedField);
      setChartData(data);
    }
  }, [selectedField, salesData]);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>Univariable Analysis Chart</h1>

      {/* Dropdown for selecting categorical data */}
      <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
        <option value="gender">Gender</option>
        <option value="membership_category">Membership Category</option>
        <option value="region_category">Region Category</option>
        {/* Add more options as needed */}
      </select>
      {console.log(selectedField)}
      {console.log(chartData)}

      {/* Render pie chart only if there is data */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the selected field.</p>
      )}
    </div>
  );
};

export default CategoricalAnalysis;
