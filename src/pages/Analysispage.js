
import './Analysispage.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GenderPieChart from '../charts/gender_pie_chart.png';
import PrefferedOfferTypePieChart from '../charts/preffered_offer_type_pie_chart.png';
import MembershipCategoryBarGraph from '../charts/membership_category_bar_graph.png';
import ChurnRiskScoreBarGraph from '../charts/churn_risk_score_bar_graph.png';
import PointsInWalletHistogram from '../charts/points_in_wallet_histogram.png';
import FeedbackBarGraph from '../charts/feedback_bar_graph.png';

function Analysispage() {
    

    const [dropdownValue1, setDropdownValue1] = useState('');

    const handleChange1 = (event) => {
        setDropdownValue1(event.target.value);
    };

    const [dropdownValue2, setDropdownValue2] = useState('');

    const handleChange2 = (event) => {
        setDropdownValue2(event.target.value);
    };
    const change_chart_img = (type1, type2) => {
        // Logic to update the image based on type1 and type2
        // For demonstration, let's assume we have a mapping of type1 and type2 to image paths
        const imageMapping = {
            'self': {
                // 'age': age,
                'gender': GenderPieChart,
                'feedback': FeedbackBarGraph,
                'preferred_offer_types': PrefferedOfferTypePieChart,
                'points_in_wallet':PointsInWalletHistogram,
                'membership_category': MembershipCategoryBarGraph

                // Add other mappings as needed
            },
            // Add other type1 mappings as needed
        };

        const newImageSrc = imageMapping[type1]?.[type2] || ChurnRiskScoreBarGraph;
        document.querySelector('#output_chart img').src = newImageSrc;
    };

    useEffect(() => {
        change_chart_img(dropdownValue1, dropdownValue2);
    }, [dropdownValue1, dropdownValue2]);


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
                        
                        <div id="output_chart">
                            <img src={ChurnRiskScoreBarGraph} alt='placeholder' />
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

