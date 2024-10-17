import React from "react";
import './homepage.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Link } from "react-router-dom";
import GenderPieChart from '../charts/gender_pie_chart.png';
import PrefferedOfferTypePieChart from '../charts/preferred_offer_types_pie_chart.png';
import MembershipCategoryBarGraph from '../charts/memebership_category_bar_chart.png';
import ChurnRiskScoreBarGraph from '../charts/churn_risk_score_bar_graph.png';
import PointsInWalletHistogram from '../charts/points_in_wallet_histogram.png';
import FeedbackBarGraph from '../charts/feedback_bar_chart.png';
import kpi2_logo from '../resources/kpi2_logo.png';
import kpi3_logo from '../resources/kpi3_logo.png';
import kpi4_logo from '../resources/kpi4_logo.png';
import speed1 from '../resources/speed1.png';
import speed2 from '../resources/speed2.png';
import speed3 from '../resources/speed3.png';
import speed4 from '../resources/speed4.png';


import GenderPieChartChurn from '../charts/gender_churning_pie_chart.png';
import PrefferedOfferTypePieChartChurn from '../charts/preferred_offer_types_churning_pie_chart.png';
import MembershipCategoryBarGraphChurn from '../charts/memebership_category_churning_bar_chart.png';
import FeedbackBarGraphChurn from '../charts/feedback_churning_bar_chart.png';
import PointsInWalletHistogramChurn from '../charts/points_in_wallet_churning_histogram.png';
import ChurnRiskScoreBarGraphChurn from '../charts/churn_risk_score_churning_bar_graph.png';



function Homepage() {

    

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        transform: 'scaleX(1.3)',
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: '#800000',
                    opacity: 1,
                    border: 0,
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#2ECA45',
                    }),
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[100],
                ...theme.applyStyles('dark', {
                    color: theme.palette.grey[600],
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
                ...theme.applyStyles('dark', {
                    opacity: 0.3,
                }),
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            ...theme.applyStyles('dark', {
                backgroundColor: '#39393D',
            }),
        },
    }));

    const handle_churn_risk_button = (event) => {
        console.log(event.target.checked);
        console.log(document.querySelector('#kpi_info h2'));
        if (event.target.checked) {
            document.querySelector('#kpi_info h2').innerText = '100%';
            document.querySelectorAll('#kpi_info h2')[1].innerText = '$2019';
            document.querySelectorAll('#kpi_info h2')[2].innerText = '20';
            document.querySelectorAll('#kpi_info h2')[3].innerText = '20 min';
            document.querySelector('#kpi #kpi_logo').src = speed4;
            document.querySelector('#kpi #kpi_logo').alt = 'speed4';
            document.querySelector('#GenderPieChart').src = GenderPieChartChurn;
            document.querySelector('#MembershipCategoryBarGraph').src = MembershipCategoryBarGraphChurn;
            document.querySelector('#FeedbackBarGraph').src = FeedbackBarGraphChurn;
            document.querySelector('#PrefferedOfferTypePieChart').src = PrefferedOfferTypePieChartChurn;
            document.querySelector('#ChurnRiskScoreBarGraph').src = ChurnRiskScoreBarGraphChurn;
            document.querySelector('#PointsInWalletHistogram').src=PointsInWalletHistogramChurn;
        }
        else {
            document.querySelector('#kpi_info h2').innerText = '24%';
            document.querySelectorAll('#kpi_info h2')[1].innerText = '$3019';
            document.querySelectorAll('#kpi_info h2')[2].innerText = '15';
            document.querySelectorAll('#kpi_info h2')[3].innerText = '32 min';
            document.querySelector('#kpi #kpi_logo').src = speed2;
            document.querySelector('#kpi #kpi_logo').alt = 'speed2';
            document.querySelector('#GenderPieChart').src = GenderPieChart;
            document.querySelector('#MembershipCategoryBarGraph').src = MembershipCategoryBarGraph;
            document.querySelector('#FeedbackBarGraph').src = FeedbackBarGraph;
            document.querySelector('#PrefferedOfferTypePieChart').src = PrefferedOfferTypePieChart;
            document.querySelector('#ChurnRiskScoreBarGraph').src = ChurnRiskScoreBarGraph;
            document.querySelector('#PointsInWalletHistogram').src=PointsInWalletHistogram;
        }
    };

    const navigateToAnalysis = (chartType) => {
        window.history.pushState({}, '', `/analysis?chart=${chartType}`);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <div>
            <div id='title_div'>
                <h2>Dashboard</h2>
                <div id='churn_filter'>
                    <h2>Churning Customers only</h2>
                    <IOSSwitch onChange={handle_churn_risk_button}/>
                </div>
            </div>

            <div id='kpi_div'>
                <div id='kpi'>
                    <div id='kpi_info'>
                    <h3>Customer Churn Risk</h3>
                    <h2>24%</h2>
                    </div>
                    <img src={speed2} id="kpi_logo" alt="speed2"/>
                </div>
                <div id='kpi'>
                    <div id='kpi_info'>
                    <h3>Average Transaction</h3>
                    <h2>$3019</h2>
                    </div>
                    <img src={kpi2_logo} id="kpi_logo" />
                </div>
                <div id='kpi'>
                    <div id='kpi_info'>
                    <h3 >Average Login Frequency Days</h3>
                    <h2>15</h2>
                    </div>
                    <img src={kpi3_logo} id="kpi_logo" />
                </div>
                <div id='kpi'>
                    <div id='kpi_info'>
                    <h3>Average Time Spent</h3>
                    <h2>32 min</h2>
                    </div>
                    <img src={kpi4_logo} id="kpi_logo" />
                </div>
            </div>

            <div id='graph_div'>
                <div id='pigraph'>
                    <p>Gender</p>
                    <img src={GenderPieChart} id="GenderPieChart" onClick={() => navigateToAnalysis('gender')} />
                </div>
                <div id='graph'>
                    <p>Membership Category</p>
                    <img src={MembershipCategoryBarGraph} id="MembershipCategoryBarGraph" onClick={() => navigateToAnalysis('membership_category')} />
                </div>
                <div id='graph'>
                    <p>Feedback</p>
                    <img src={FeedbackBarGraph} id="FeedbackBarGraph"  onClick={() => navigateToAnalysis('feedback')} />
                </div>
            </div>
            <div id='graph_div'>
                <div id='pigraph'>
                    <p>Preffered Offer Type</p>
                    <img src={PrefferedOfferTypePieChart} id="PrefferedOfferTypePieChart" onClick={() => navigateToAnalysis('preferred_offer_types')} />
                </div>
                <div id='graph'>
                    <p>Churn Risk Score</p>
                    <img src={ChurnRiskScoreBarGraph} id="ChurnRiskScoreBarGraph" onClick={() => navigateToAnalysis('churn_risk_score')} />
                </div>
                <div id='graph'>
                    <p>Points in wallet</p>
                    <img src={PointsInWalletHistogram} id="PointsInWalletHistogram" onClick={() => navigateToAnalysis('points_in_wallet')} />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
