import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import './App.css';

import DiceButtons from './DiceButtons';
import fetchCard from './providers/db.js';

const defaultCounts = [0, 0, 0, 0, 0, 0];

const keyMap = {
    'increaseDieFace1': '1',
    'increaseDieFace2': '2',
    'increaseDieFace3': '3',
    'increaseDieFace4': '4',
    'increaseDieFace5': '5',
    'increaseDieFace6': '6',
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counts: defaultCounts,
            color: '',
            sides: [],
            cardName: '',
            cardCode: '',
            error: '',
        };

        this.dieClick = this.dieClick.bind(this);
        this.submitNewCode = this.submitNewCode.bind(this);
    }

    componentDidMount() {
        fetchCard('01001')
            .then(card => {
                this.setState({
                    cardName: card.cardName,
                    color: card.color,
                    sides: card.sides,
                    error: '',
                });
            })
            .catch(err => this.setState({ error: err }))
    }

    dieClick(sideIndex) {
        return (e) => {
            this.setState({
                counts: this.state.counts.map((c, i) => i === sideIndex ? c + 1 : c)
            });
        }
    }

    submitNewCode(e) {
        e.preventDefault();
        fetchCard(this.state.cardCode)
            .then(card => {
                this.setState({
                    cardName: card.cardName,
                    color: card.color,
                    sides: card.sides,
                    error: '',
                });
            })
            .catch(err => this.setState({ error: err }))
    }

    render() {
        return (
            <HotKeys
                focused={true}
                attach={window}
                keyMap={keyMap}
                handlers={{
                    'increaseDieFace1': this.dieClick(0),
                    'increaseDieFace2': this.dieClick(1),
                    'increaseDieFace3': this.dieClick(2),
                    'increaseDieFace4': this.dieClick(3),
                    'increaseDieFace5': this.dieClick(4),
                    'increaseDieFace6': this.dieClick(5),
                }}>
                <div className="App container">
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <h1>Die Tester</h1>
                        </div>
                        <div className="col-12 col-md-7">
                            <form onSubmit={this.submitNewCode}>
                                {this.state.error && <p style={{ color: 'red' }}>{ this.state.error }</p>}
                                <div className="input-group">
                                    <input
                                        value={this.state.cardCode}
                                        onChange={(e) => { this.setState({cardCode: e.target.value}) }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Card Code ex: 01030 (Set# + Card#) - 01: AWK, 02: SoR, 03: EAW, 04: Two Player"
                                        aria-label="Card Code ex: 01030" />
                                    <span className="input-group-btn">
                                        <button
                                        onClick={this.submitNewCode}
                                        className="btn btn-secondary"
                                        type="submit">
                                        Go!
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3 style={{ display: 'inline-block', marginRight: '15px'}}>Total Rolls: {this.state.counts.reduce((a, b) => a + b, 0)}</h3>
                            <button style={{ verticalAlign: 'top'}} className="btn btn-secondary" onClick={() => this.setState({ counts: defaultCounts })}>Reset</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2 style={{ fontWeight: 'bold'}}>{this.state.cardName}</h2>
                            <DiceButtons dieColor={this.state.color} types={this.state.sides} counts={this.state.counts} dieClick={this.dieClick} />
                        </div>
                    </div>
                </div>
            </HotKeys>
        );
    }
}

export default App;
