import React from 'react';
// import Die from './Die';
import DieContainer from './DieContainer';
import './DiceButtons.css';

const DiceButtons = (props) => {
    return (
        <div className="DiceButtons">
            {
                props.types.map((t, i) => {
                    return (
                        <DieContainer
                            key={i}
                            dieColor={props.dieColor}
                            dieClick={props.dieClick}
                            count={props.counts[i]}
                            sideIndex={i}
                            {...t} />
                    );
                })
            }
        </div>
    );
};

export default DiceButtons;
