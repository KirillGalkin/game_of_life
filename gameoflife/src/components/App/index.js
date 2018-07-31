import React from "react";
import "./style.css";
import Grid from "../Grid";

class App extends React.Component {
  state = {
    inputShown: true,
    loadBtnDisabled: JSON.parse(localStorage.getItem("curState")) ? false : true
  };

  speed = 500;

  handleSubmit = e => {
    e.preventDefault();

    this.value = this.state.value.split("*");
    this.rows = +this.value[0];
    this.cols = +this.value[1];
    if (isNaN(this.rows) || isNaN(this.cols)) {
      this.setState({ className: "invalid" });
    } else {
      this.setState({
        inputShown: false
      });
    }
  };

  onChange = e => {
    e.target.value === "" && this.setState({ className: "" });
    this.setState({
      value: e.target.value
    });
  };

  restoreGame = () => {
    const prevState = JSON.parse(localStorage.getItem("curState"));
    if (prevState) {
      this.setState({
        inputShown: !this.state.inputShown,
        loadBtnDisabled: false,
        savedData: true
      });
      this.rows = prevState.rows;
      this.cols = prevState.cols;
    }
  };

  render() {
    if (this.state.inputShown) {
      return (
        <div>
          <h1>Game Of Life</h1>
          <h3>Please enter size of game field</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="rows*cols"
              className={this.state.className}
              onChange={this.onChange}
            />
            <input type="submit" />
            <button
              type="button"
              onClick={this.restoreGame}
              disabled={this.state.loadBtnDisabled}
            >
              Load
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Game Of Life</h1>
          <Grid
            savedData={this.state.savedData}
            rows={this.rows}
            cols={this.cols}
            speed={this.speed}
            selectBox={this.selectBox}
          />
        </div>
      );
    }
  }
}

export default App;
