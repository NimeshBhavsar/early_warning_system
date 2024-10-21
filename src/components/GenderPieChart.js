import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const GenderPieChart = () => {
  const [genderData, setGenderData] = useState([]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/output.json'); // Fetch JSON from public folder
      const result = await response.json();

      // Extract and count the gender data
      const data = result;
      const genderCount = data.reduce((acc, customer) => {
        const gender = customer.gender;
        if (!acc[gender]) {
          acc[gender] = 0;
        }
        acc[gender]++;
        return acc;
      }, {});

      // Convert the gender count object into an array for recharts
      const chartData = Object.keys(genderCount).map((key) => ({
        name: key === 'M' ? 'Male' : 'Female',
        value: genderCount[key],
      }));

      setGenderData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);


  const [dropdownValue1, setDropdownValue1] = useState('');

    const handleChange1 = (event) => {
        setDropdownValue1(event.target.value);
        console.log(dropdownValue1);
    };

    const [dropdownValue2, setDropdownValue2] = useState('');

    const handleChange2 = (event) => {
        setDropdownValue2(event.target.value);
        console.log(dropdownValue2);
    };

  const COLORS = ['#0088FE', '#FF8042']; // Colors for Male and Female

  return (
    <div>
    <form id='form_input1'>
                            <label htmlFor="select_type_1"></label>
                            <select
                                id="select_type_1"
                                value={dropdownValue1}
                                onChange={handleChange1}
                            >
                                <option value={'self'}>Self</option>
                                <option value={'age'}>Age</option>
                                <option value={'gender'}>Gender</option>
                                <option value={'joined_through_referral'}>Joined Through Referral</option>
                                <option value={'membership_category'}>Membership category</option>
                                <option value={'used_special_discount'}>Used Special Discount</option>
                                <option value={'offer_application_preference'}>Offer Application Preference</option>
                                <option value={'feedback'}>Feedback</option>
                                <option value={'region_category'}>Region Category</option>
                                <option value={'medium_of_operation'}>Medium of Operation</option>
                                <option value={'preferred_offer_types'}>Preferred Offer Types</option>
                                <option value={'internet_option'}>Internet Option</option>
                                <option value={'complaint_status'}>Complaint Status</option>
                                <option value={'avg_time_spent'}>Avg Time Spent</option>
                                <option value={'avg_transaction_value'}>Avg Transaction Value</option>
                                <option value={'avg_frequency_login_days'}>Avg Frequency Login Days</option>
                                <option value={'points_in_wallet'}>Points in Wallet</option>
                            </select>
                        </form>

    <PieChart width={400} height={400}>
      <Pie
        data={genderData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {genderData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    <form id='form_input2'>
                            <label htmlFor="select_type_2"></label>
                            <select
                                id="select_type_2"
                                value={dropdownValue2}
                                onChange={handleChange2}
                            >
                                <option value={'churn_risk_score'}>Churn Risk Score</option>
                                <option value={'age'}>Age</option>
                                <option value={'gender'}>Gender</option>
                                <option value={'joined_through_referral'}>Joined Through Referral</option>
                                <option value={'membership_category'}>Membership category</option>
                                <option value={'used_special_discount'}>Used Special Discount</option>
                                <option value={'offer_application_preference'}>Offer Application Preference</option>
                                <option value={'feedback'}>Feedback</option>
                                <option value={'region_category'}>Region Category</option>
                                <option value={'medium_of_operation'}>Medium of Operation</option>
                                <option value={'preferred_offer_types'}>Preferred Offer Types</option>
                                <option value={'internet_option'}>Internet Option</option>
                                <option value={'complaint_status'}>Complaint Status</option>
                                <option value={'avg_time_spent'}>Avg Time Spent</option>
                                <option value={'avg_transaction_value'}>Avg Transaction Value</option>
                                <option value={'avg_frequency_login_days'}>Avg Frequency Login Days</option>
                                <option value={'points_in_wallet'}>Points in Wallet</option>
                                
                            </select>
                        </form>
    </div>
  );
};

export default GenderPieChart;
