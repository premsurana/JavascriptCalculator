handleClick = (event) => {
    let name = event.target.getAttribute("name");
    if (!this.state.firstFlag) {
        this.setState({
            input: "",
            firstFlag: true,
        });
    }

    if (name === "-" && this.state.tempDisplay === "-") {
        this.setState({
            input: this.state.input.substring(0, this.state.input.length - 1),
        });
    } else if (
        operators.includes(name) &&
        operators.includes(this.state.tempDisplay) &&
        name !== "-"
    ) {
        let temp = this.state.display;
        temp = temp.replace(/[+-\/*]+$/g, "");
        this.setState({
            input: temp,
        });
    } else {
        this.setState((state) => ({
            input: state.input,
        }));
    }
    this.setState((state) => {
        return {
            display: name,
            input: state.input + name,
            tempDisplay: name,
        };
    });
};

handleClear = (event) => {
    this.setState(() => {
        return initialState;
    });
};

handleEnter = () => {
    let answer = this.state.input;
    let evaluated;
    answer = answer.replace(/[+-\/*]+$/g, "");
    answer = answer.replace(/\s+/g, "");

    if (
        this.state.prevDisplay === this.state.input &&
        this.state.input !== "0"
    ) {
        return;
    }

    evaluated = Math.round(1000000000000 * eval(answer)) / 1000000000000;
    this.setState({
        input: answer + "=" + evaluated,
        display: evaluated,
        prevDisplay: this.state.input,
    });
};
