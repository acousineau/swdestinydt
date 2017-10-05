import React from 'react';
import Count from './Count';
import Die from './Die';

import './DieContainer.css';

const DieContainer = (props) => {
    return (
        <div className="DieContainer">
            <Count count={props.count} />
            <Die {...props} />
        </div>
    );
};

export default DieContainer;
