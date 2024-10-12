import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

function odometer() {
    return (
        <div>
            <ReactSpeedometer
                width={500}
                needleHeightRatio={0.7}
                value={777}
                currentValueText="Happiness Level"
                customSegmentLabels={[
                    {
                        text: 'Very Bad',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Bad',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Ok',
                        position: 'INSIDE',
                        color: '#555',
                        fontSize: '19px',
                    },
                    {
                        text: 'Good',
                        position: 'INSIDE',
                        color: '#555',
                    },
                    {
                        text: 'Very Good',
                        position: 'INSIDE',
                        color: '#555',
                    },
                ]}
                ringWidth={47}
                needleTransitionDuration={3333}
                needleTransition="easeElastic"
                needleColor={'#90f2ff'}
                textColor={'#d8dee9'}
            />
        </div>


    );
}
export default odometer;

