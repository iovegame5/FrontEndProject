import React from 'react';
import '../App.css';
import { Container } from 'react-bootstrap';
const StatGuage = ({ statName, stat, children }) => {

    const percentage = (stat / 255) * 100;
    const fill = `rgb(${255 - (percentage * 2.55)}, ${percentage * 2.55}, 0)`;
   
    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    const dashOffset = (100 - percentage) / 100 * circumference;

    return (
        <div style={{width:"100%", textAlign:"center", justifyContent:"center", alignItems:"center" }}>
            <div className="semi-donut" style={{ '--percentage': percentage, '--fill': fill,margin: "0 auto" }}>
                {children}
            </div>
            <p style={{color:"white", textTransform: 'capitalize',}}>{statName.replace(/-/g, ' ')}</p>

        </div>
    );
};

export default StatGuage;
