
import './Analysispage.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GenderPieChart from '../charts/gender_pie_chart.png';
import PrefferedOfferTypePieChart from '../charts/preferred_offer_types_pie_chart.png';
import MembershipCategoryBarGraph from '../charts/memebership_category_bar_chart.png';
import ChurnRiskScoreBarGraph from '../charts/churn_risk_score_bar_graph.png';
import PointsInWalletHistogram from '../charts/points_in_wallet_histogram.png';
import FeedbackBarGraph from '../charts/feedback_bar_graph.png';
import JoinedThroughReferralBarChart from '../charts/joined_through_referral_bar_graph.png';
import UsedSpecialDiscountBarGraph from '../charts/used_special_discount_bar_chart.png';
import OfferApplicationPreferenceBarGraph from '../charts/offer_appliaction_type_bar_chart.png';
import RegionCategoryBarGraph from '../charts/region_bar_chart.png';
import MediumOfOperationBarGraph from '../charts/medium_of_operation_bar_chart.png';
import InternetOptionsBarGraph from '../charts/internet_option_bar_chart.png';
import ComplaintStatusBarGraph from '../charts/complient_status_bar_count.png';
import AgeHistogram from '../charts/age_histogram.png';
import AvgTimeSpentHistogram from '../charts/avg_time_spent_histogram.png';
import AvgTransactionValueHistogram from '../charts/avg_transaction_histogram.png';
import AveFrequencyLoginDaysHistogram from '../charts/avg_freq_login_histogram.png';
import AgeDensity from '../charts/age_density_plot.png';
import GenderBarGraph from '../charts/gender_bar_chart.png';
import FeedbackPieChart from '../charts/feedback_pie_chart.png';

function Analysispage() {

    
    

    const [dropdownValue1, setDropdownValue1] = useState('');

    const handleChange1 = (event) => {
        setDropdownValue1(event.target.value);
    };

    const [dropdownValue2, setDropdownValue2] = useState('');

    const handleChange2 = (event) => {
        setDropdownValue2(event.target.value);
    };

    const handleAlt2Change = () => {
        document.querySelector('#output_chart img').src = document.querySelector('#alternate_chart2 img').src;
    }
    const handleAlt1Change = () => {
        document.querySelector('#output_chart img').src = document.querySelector('#alternate_chart1 img').src;
    }

    const change_chart_img = (type1, type2) => {
        // Logic to update the image based on type1 and type2
        // For demonstration, let's assume we have a mapping of type1 and type2 to image paths
        const imageMapping = {
            'self': {
                'age': AgeHistogram,
                'gender': GenderPieChart,
                'feedback': FeedbackBarGraph,
                'preferred_offer_types': PrefferedOfferTypePieChart,
                'points_in_wallet':PointsInWalletHistogram,
                'membership_category': MembershipCategoryBarGraph,
                'joined_through_referral': JoinedThroughReferralBarChart,
                'used_special_discount': UsedSpecialDiscountBarGraph,
                'offer_application_preference': OfferApplicationPreferenceBarGraph,
                'region_category': RegionCategoryBarGraph,
                'medium_of_operation': MediumOfOperationBarGraph,
                'internet_option': InternetOptionsBarGraph,
                'complaint_status': ComplaintStatusBarGraph,
                'avg_time_spent': AvgTimeSpentHistogram,
                'avg_transaction_value': AvgTransactionValueHistogram,
                'avg_frequency_login_days': AveFrequencyLoginDaysHistogram,
                'churn_risk_score': ChurnRiskScoreBarGraph,
                // Add other mappings as needed
            },
            // 'age': {
            //     'church_risk_score': ,

            // }
            // Add other type1 mappings as needed
        };
        const imageMappingalt1 = {
            'self': {
                'age': AgeDensity,
                'gender': GenderBarGraph,
                'feedback': FeedbackPieChart,
                'preferred_offer_types': PrefferedOfferTypePieChart,
                'points_in_wallet':PointsInWalletHistogram,
                'membership_category': MembershipCategoryBarGraph,
                'joined_through_referral': JoinedThroughReferralBarChart,
                'used_special_discount': UsedSpecialDiscountBarGraph,
                'offer_application_preference': OfferApplicationPreferenceBarGraph,
                'region_category': RegionCategoryBarGraph,
                'medium_of_operation': MediumOfOperationBarGraph,
                'internet_option': InternetOptionsBarGraph,
                'complaint_status': ComplaintStatusBarGraph,
                'avg_time_spent': AvgTimeSpentHistogram,
                'avg_transaction_value': AvgTransactionValueHistogram,
                'avg_frequency_login_days': AveFrequencyLoginDaysHistogram,
                'churn_risk_score': ChurnRiskScoreBarGraph,
                // Add other mappings as needed
            },
            // 'age': {
            //     'church_risk_score': ,

            // }
            // Add other type1 mappings as needed
        };

        var newImageSrc = imageMapping[type1]?.[type2] || ChurnRiskScoreBarGraph;
        document.querySelector('#output_chart img').src = newImageSrc;
        document.querySelector('#alternate_chart1 img').src = newImageSrc;
        newImageSrc = imageMappingalt1[type1]?.[type2] || ChurnRiskScoreBarGraph;
        document.querySelector('#alternate_chart2 img').src = newImageSrc;
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
                        <div id="alternate_chart1" onClick={handleAlt1Change}>
                            <img src={MembershipCategoryBarGraph} alt='placeholder' />
                        </div>
                        <div id="alternate_chart2" onClick={handleAlt2Change}>
                            <img src={MembershipCategoryBarGraph} alt='placeholder' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Analysispage;

