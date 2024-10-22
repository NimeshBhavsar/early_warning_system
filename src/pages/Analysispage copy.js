
import './Analysispage.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChurnRiskScoreBarGraph from '../charts/churn_risk_score_bar_graph.png';
// import GenderPieChart from '../graph_1/self_gender_chart1_all_all.png'
function Analysispage1() {

    const [dropdownValue1, setDropdownValue1] = useState('self');

    const handleChange1 = (event) => {
        setDropdownValue1(event.target.value);
    };

    const [dropdownValue2, setDropdownValue2] = useState('age');

    const handleChange2 = (event) => {
        setDropdownValue2(event.target.value);
    };


    const [churning, setChurningValue] = useState('all');
    const handleChangeChurning = (event) => {
        setChurningValue(event.target.value);
        setDropdownValue1('self');
        setDropdownValue2('age');
        setGenderFilter('all');
    }
    const [genderfilter, setGenderFilter] = useState('all');
    const handleGenderFilterValue = (event) => {
        setGenderFilter(event.target.value);
        setDropdownValue1('self');
        setDropdownValue2('age');
        setChurningValue('all');
    }


    const handleAlt2Change = () => {
        document.querySelector('#output_chart img').src = document.querySelector('#alternate_chart2 img').src;
    }
    const handleAlt1Change = () => {
        document.querySelector('#output_chart img').src = document.querySelector('#alternate_chart1 img').src;
    }

const change_chart_img = (t1, t2, c1, g1) => {
    var newImageSrc = `/graph_1/${t1}_${t2}_chart1_${c1}_${g1}.png`;
    console.log(newImageSrc);
    var imgElement = document.querySelector('#output_chart img');
    imgElement.src = newImageSrc;

    var imgElement = document.querySelector('#alternate_chart1 img');
    newImageSrc = `/graph_1/${t1}_${t2}_chart1_${c1}_${g1}.png`;
    imgElement.src = newImageSrc;
    // Select the image element
    var imgElement = document.querySelector('#alternate_chart2 img');
    newImageSrc = `/graph_1/${t1}_${t2}_chart2_${c1}_${g1}.png`;
    imgElement.src = newImageSrc;


};

    useEffect(() => {
        change_chart_img(dropdownValue1, dropdownValue2,churning,genderfilter);
    }, [dropdownValue1, dropdownValue2,churning,genderfilter]);


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    useEffect(() => {
        const chart = query.get('chart');
        if (chart) {
            setDropdownValue1('self');
            setDropdownValue2(chart);
        }
    }, [query]);




    return (
        <div>
            <h2>Analysis Page</h2>
            <div id='Analysis_Container'>
                <div id="inner_container1">
                    <h2>Filters</h2>
                    <div id="filters">
                            <p1>Select Churning Customers only</p1>
                            <select
                                id="select_churning"
                                value={churning}
                                onChange={handleChangeChurning}
                                >
                                <option value={'all'}>All Customers</option>
                                <option value={'churning'}>Churning Customers</option>
                                </select>
                            <br></br>
                            <br></br>
                            <p1>Gender</p1>
                            <select
                                id="select_gender"
                                value={genderfilter}
                                onChange={handleGenderFilterValue}
                                >
                                <option value={'all'}>All Customers</option>
                                <option value={'male'}>Male only</option>
                                <option value={'female'}>Female Only</option>
                                </select>
                    </div>
                </div>
                <div id="inner_container2">
                    <div id="chart_container">
                        <form id='form_input1'>
                            <label htmlFor="select_type_1"></label>
                            <select
                                id="select_type_1"
                                value={dropdownValue1}
                                onChange={handleChange1}
                            >
                                <option value={'self'}>Self</option>
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

                            </select>

                        </form>
                        
                        <div id="output_chart">
                            <img src={ChurnRiskScoreBarGraph} alt='Images to be updated soon' />
                            {/* <GenderPieChart/> */}
                        </div>

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
                </div>
                <div id="inner_container3">
                    <div id="alternate_chart_container">
                        <div id="alternate_chart1" onClick={handleAlt1Change}>
                            <img src={'/graph_1/self_age_chart1_all_all.png'} alt='Images to be updated soon' />
                        </div>
                        <div id="alternate_chart2" onClick={handleAlt2Change}>
                            <img src={'/graph_1/self_age_chart1_all_all.png'} alt='Images to be updated soon' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Analysispage1;

