import React from "react";
import './homepage.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';


function Homepage() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
                <div id='kpi'>a</div>
                <div id='kpi'>a</div>
                <div id='kpi'>a</div>
                <div id='kpi'>a</div>
            </div>

            <div id='graph_div'>
                <div id='pigraph'>a</div>
                <div id='graph'>a</div>
                <div id='graph'>a</div>
            </div>
            <div id='graph_div'>
                <div id='pigraph'>a</div>
                <div id='graph'>a</div>
                <div id='graph'>a</div>
            </div>
        </div>
    );
}

export default Homepage;
