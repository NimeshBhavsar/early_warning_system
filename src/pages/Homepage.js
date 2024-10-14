import React from "react";
import './homepage.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Link } from "react-router-dom";
import GenderPieChart from '../charts/gender_pie_chart.png';
import PrefferedOfferTypePieChart from '../charts/preffered_offer_type_pie_chart.png';
import MembershipCategoryBarGraph from '../charts/membership_category_bar_graph.png';
import ChurnRiskScoreBarGraph from '../charts/churn_risk_score_bar_graph.png';
import PointsInWalletHistogram from '../charts/points_in_wallet_histogram.png';
import FeedbackBarGraph from '../charts/feedback_bar_graph.png';
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

    return (
        <div>

            <div id='title_div'>
                <h2>Dashboard</h2>
                <div id='churn_filter'>
                    <h2>Churning Customers only</h2>
                    <IOSSwitch />
                </div>

            </div>

            <div id='kpi_div'>
                <div id='kpi'>
                    <h3>Customer Churn Risk</h3>
                    <h2>24%</h2>
                </div>
                <div id='kpi'>
                    <h3>Average Transaction</h3>
                    <h2>$3019</h2>
                </div>
                <div id='kpi'>
                    <h3>Average Login Frequency Days</h3>
                    <h2>15</h2>
                </div>
                <div id='kpi'>
                    <h3>Average Time Spent</h3>
                    <h2>32 min</h2>
                </div>
            </div>

            <div id='graph_div'>
                <div id='pigraph'>
                    <p>Gender</p>
                    <img src={GenderPieChart} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
                <div id='graph'>
                    <p>Membership Category</p>
                    <img src={MembershipCategoryBarGraph} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
                <div id='graph'>
                    <p>Feedback</p>
                    <img src={FeedbackBarGraph} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
            </div>
            <div id='graph_div'>
                <div id='pigraph'>
                    <p>Preffered Offer Type</p>
                    <img src={PrefferedOfferTypePieChart} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
                <div id='graph'>
                    <p>Churn Risk Score</p>
                    <img src={ChurnRiskScoreBarGraph} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
                <div id='graph'>
                    <p>Points in wallet</p>
                    <img src={PointsInWalletHistogram} id="GenderPieChart" onClick={() => window.location.href = '/analysis'} />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
