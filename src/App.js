import React, { Component } from "react";
import "./App.css";

const initialState = {
    calculation: "0",
    displayAns: "0",
    tempChar: "",
    prevCalculation: "0",
    firstFlag: false,
};

const operators = ["+", "-", "/", "*"];

export default class App extends Component {
    state = initialState;

    handleClick = (event) => {
        let userClick = event.target.getAttribute("name");

        if (userClick === "." && /\./g.test(this.state.displayAns)) {
            return;
        }

        if (this.state.calculation === "0") {
            this.setState({
                calculation: userClick,
                displayAns: userClick,
                tempChar: userClick,
            });
            return;
        }

        if (
            operators.includes(userClick) &&
            this.state.tempChar >= "0" &&
            this.state.tempChar <= "9"
        ) {
            this.setState({
                displayAns: "" + userClick,
            });
        } else if (
            operators.includes(this.state.tempChar) &&
            userClick >= "0" &&
            userClick <= "9"
        ) {
            this.setState({
                displayAns: "" + userClick,
            });
        } else {
            this.setState({
                displayAns: this.state.displayAns + userClick,
            });
        }

        if (userClick === "-" && this.state.tempChar === "-") {
            this.setState({
                calculation: this.state.input.substring(
                    0,
                    this.state.input.length - 1
                ),
            });
        } else if (
            operators.includes(userClick) &&
            operators.includes(this.state.tempChar) &&
            userClick !== "-"
        ) {
            let temp = this.state.calculation;
            temp = temp.replace(/[+-\/*]+$/g, "");
            this.setState({
                calculation: temp,
            });
        } else {
            this.setState((state) => ({
                calculation: state.calculation,
            }));
        }

        this.setState((state) => {
            return {
                calculation: state.calculation + userClick,
                tempChar: userClick,
            };
        });
    };

    handleClear = () => {
        this.setState(() => {
            return initialState;
        });
    };

    handleEnter = () => {
        if (
            this.state.prevCalculation === this.state.calculation &&
            this.state.calculation !== "0"
        ) {
            return;
        }

        let answer = this.state.calculation;
        answer = answer.replace(/[+-\/*]+$/g, "");
        let evaluated = eval(answer);

        this.setState({
            displayAns: evaluated,
            calculation: evaluated,
        });
    };

    render() {
        return (
            <div className="wrapper">
                <div className="calculator">
                    <div className="result-part">
                        <div id="input">
                            <p className="input-value">
                                {this.state.calculation}
                            </p>
                        </div>
                        <div id="display" name="inputAndAnswer">
                            <p className="display-value">
                                {this.state.displayAns}
                            </p>
                        </div>
                    </div>
                    <div className="calculation-part">
                        <button id="empty" className="empty"></button>
                        <button
                            id="clear"
                            className="operator"
                            onClick={this.handleClear}
                        >
                            AC
                        </button>
                        <button
                            id="mod"
                            className="operator"
                            name="%"
                            onClick={this.handleClick}
                        >
                            %
                        </button>
                        <button
                            id="divide"
                            className="operator"
                            name="/"
                            onClick={this.handleClick}
                        >
                            /
                        </button>
                        <button
                            id="seven"
                            className="number"
                            name="7"
                            onClick={this.handleClick}
                        >
                            7
                        </button>
                        <button
                            id="eight"
                            className="number"
                            name="8"
                            onClick={this.handleClick}
                        >
                            8
                        </button>
                        <button
                            id="nine"
                            className="number"
                            name="9"
                            onClick={this.handleClick}
                        >
                            9
                        </button>
                        <button
                            id="multiply"
                            className="operator"
                            name="*"
                            onClick={this.handleClick}
                        >
                            *
                        </button>
                        <button
                            id="four"
                            className="number"
                            name="4"
                            onClick={this.handleClick}
                        >
                            4
                        </button>
                        <button
                            id="five"
                            className="number"
                            name="5"
                            onClick={this.handleClick}
                        >
                            5
                        </button>
                        <button
                            id="six"
                            className="number"
                            name="6"
                            onClick={this.handleClick}
                        >
                            6
                        </button>
                        <button
                            id="subtract"
                            className="operator"
                            name="-"
                            onClick={this.handleClick}
                        >
                            -
                        </button>
                        <button
                            id="one"
                            className="number"
                            name="1"
                            onClick={this.handleClick}
                        >
                            1
                        </button>
                        <button
                            id="two"
                            className="number"
                            name="2"
                            onClick={this.handleClick}
                        >
                            2
                        </button>
                        <button
                            id="three"
                            className="number"
                            name="3"
                            onClick={this.handleClick}
                        >
                            3
                        </button>
                        <button
                            id="add"
                            className="operator"
                            name="+"
                            onClick={this.handleClick}
                        >
                            +
                        </button>
                        <button id="empty" className="empty"></button>
                        <button
                            id="zero"
                            className="number"
                            name="0"
                            onClick={this.handleClick}
                        >
                            0
                        </button>
                        <button
                            id="decimal"
                            className="operator"
                            name="."
                            onClick={this.handleClick}
                        >
                            .
                        </button>
                        <button
                            id="equals"
                            className="operator"
                            name="="
                            onClick={this.handleEnter}
                        >
                            =
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
