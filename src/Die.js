import React from 'react';

import './Die.css';

const Die = (props) => {
    const {
        symbol,
        value,
        cost,
        modified,
        sideIndex,
        dieClick,
        dieColor,
    } = props;

    return (
        <button className={`Die ${dieColor}`} onClick={dieClick(sideIndex)}>
            <div className="hot-key">{sideIndex + 1}</div>
            <div className="circle">
                <div className={`symbol ${symbol === 'blank' ? 'red' : ''} ${modified ? 'modified' : ''}`}>
                    { typeof value === 'number' &&
                        <span className={`value ${modified ? 'modified-value' : ''} ${symbol === 'none' ? 'no-symbol' : ''}`}>
                            <span className="modifier">{modified && '+'}</span> {value === 0 ? 'X' : value}
                        </span>
                    }
                    <i className={`icon icon-${symbol} ${value === null ? 'zero' : ''}`} />
                </div>
                { cost > 0 && <div className="cost">
                    <span className="amount">{cost}</span>
                    <i className="icon icon-resource" />
                </div> }
            </div>
        </button>
    );
};

export default Die;
