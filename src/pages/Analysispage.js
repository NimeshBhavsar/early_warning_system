
import './Analysispage.css';
import React, { useState } from 'react';

function Analysispage() {

    const [dropdownValue1, setDropdownValue1] = useState('');

    const handleChange1 = (event) => {
        setDropdownValue1(event.target.value);
    };

    const [dropdownValue2, setDropdownValue2] = useState('');

    const handleChange2 = (event) => {
        setDropdownValue2(event.target.value);
    };
    return (
        <div>
            <h2>Analysis Page</h2>
            <div id='Analysis_Container'>
                <div id="inner_container1">
                    <h2>Filters</h2>
                    <div id="filters">

                    </div>
                </div>
                <div id="inner_container2">
                    <div id="chart_container">
                        <form id='form_input1'>
                            <label for="select_type_1"></label>
                            <select
                                id="select_type_1"
                                value={dropdownValue1}
                                onChange={handleChange1}
                            >
                                <option value={0}>Self</option>
                                <option value={10}>Age</option>
                                <option value={20}>Gender</option>
                                <option value={30}>Joined Through Referal</option>
                                <option value={40}>Membership category</option>
                                <option value={50}>Used Special Discount</option>
                                <option value={60}>Offer Application Preference</option>
                                <option value={70}>Feedback</option>
                                <option value={80}>Region Category</option>
                                <option value={90}>Medium of Operation</option>
                                <option value={100}>Preferred Offer Types</option>
                                <option value={110}>Internet Option</option>
                                <option value={120}>Complaint Status</option>
                                <option value={130}>Avg Time Spent</option>
                                <option value={140}>Avg Transaction Value</option>
                                <option value={150}>Avg Frequency Login Days</option>
                                <option value={160}>Points in Wallet</option>
                            </select>
                        </form>
                        
                        <div id="output_chart"></div>

                        <form id='form_input2'>
                            <label for="select_type_2"></label>
                            <select
                                id="select_type_2"
                                value={dropdownValue2}
                                onChange={handleChange2}
                            >
                                <option value={0}>Select Option</option>
                                <option value={10}>Age</option>
                                <option value={20}>Gender</option>
                                <option value={30}>Joined Through Referal</option>
                                <option value={40}>Membership category</option>
                                <option value={50}>Used Special Discount</option>
                                <option value={60}>Offer Application Preference</option>
                                <option value={70}>Feedback</option>
                                <option value={80}>Region Category</option>
                                <option value={90}>Medium of Operation</option>
                                <option value={100}>Preferred Offer Types</option>
                                <option value={110}>Internet Option</option>
                                <option value={120}>Complaint Status</option>
                                <option value={130}>Avg Time Spent</option>
                                <option value={140}>Avg Transaction Value</option>
                                <option value={150}>Avg Frequency Login Days</option>
                                <option value={160}>Points in Wallet</option>
                            </select>
                        </form>
                    
                    </div>
                </div>
                <div id="inner_container3">
                    <div id="alternate_chart_container">
                        <div id="alternate_chart1"></div>
                        <div id="alternate_chart1"></div>
                        <div id="alternate_chart1"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Analysispage;



/*

<div>
            <h2>Analysis Page</h2>
            <div id='Analysis_Container'>
                <div id="inner_container1">
                    <h2>Filters</h2>
                    <div id="filters">

                    </div>
                </div>
                <div id="inner_container2">
                    <div id="chart_container">
                            <FormControl >
                                <InputLabel id="select1"></InputLabel>
                                <Select
                                    labelId="select1"
                                    id="select_type_1"
                                    value={dropdownValue}
                                    label=""
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}> Self </MenuItem>
                                    <MenuItem value={10}>Age</MenuItem>
                                    <MenuItem value={20}>Gender</MenuItem>
                                    <MenuItem value={30}>Joined Through Referal</MenuItem>
                                    <MenuItem value={40}>Membership category</MenuItem>
                                    <MenuItem value={50}>Used Special Discount</MenuItem>
                                    <MenuItem value={60}>Offer Application Preference</MenuItem>
                                    <MenuItem value={70}>Feedback</MenuItem>
                                    <MenuItem value={80}>Region Category</MenuItem>
                                    <MenuItem value={90}>Medium of Operation</MenuItem>
                                    <MenuItem value={100}>Preferred Offer Types</MenuItem>
                                    <MenuItem value={110}>Internet Option</MenuItem>
                                    <MenuItem value={120}>Complaint Status</MenuItem>
                                    <MenuItem value={130}>Avg Time Spent</MenuItem>
                                    <MenuItem value={140}>Avg Transaction Value</MenuItem>
                                    <MenuItem value={150}>Avg Frequency Login Days</MenuItem>
                                    <MenuItem value={160}>Points in Wallet</MenuItem>
                                </Select>
                            </FormControl>

                            
                        <div id="output_chart">
                            </div>

                        <FormControl >
                                <InputLabel id="select2"></InputLabel>
                                <Select
                                    labelId="select2"
                                    id="select_type_2"
                                    value={dropdownValue}
                                    label=""
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Select Option</MenuItem>
                                    <MenuItem value={10}>Age</MenuItem>
                                    <MenuItem value={20}>Gender</MenuItem>
                                    <MenuItem value={30}>Joined Through Referal</MenuItem>
                                    <MenuItem value={40}>Membership category</MenuItem>
                                    <MenuItem value={50}>Used Special Discount</MenuItem>
                                    <MenuItem value={60}>Offer Application Preference</MenuItem>
                                    <MenuItem value={70}>Feedback</MenuItem>
                                    <MenuItem value={80}>Region Category</MenuItem>
                                    <MenuItem value={90}>Medium of Operation</MenuItem>
                                    <MenuItem value={100}>Preferred Offer Types</MenuItem>
                                    <MenuItem value={110}>Internet Option</MenuItem>
                                    <MenuItem value={120}>Complaint Status</MenuItem>
                                    <MenuItem value={130}>Avg Time Spent</MenuItem>
                                    <MenuItem value={140}>Avg Transaction Value</MenuItem>
                                    <MenuItem value={150}>Avg Frequency Login Days</MenuItem>
                                    <MenuItem value={160}>Points in Wallet</MenuItem>
                                </Select>
                            </FormControl>
                    
                    </div>
                </div>
                <div id="inner_container3">
                    <div id="alternate_chart_container">
                        <div id="alternate_chart1">
                            </div>
                        <div id="alternate_chart1">
                            </div>
                            <div id="alternate_chart1">
                            </div>
                    </div>
                </div>

            </div>
        </div>
**/
