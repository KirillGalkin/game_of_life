import React from "react";
import "./style.css";
import Box from "../Box";
import ButtonsList from "../ButtonsList";

class Grid extends React.Component {
  prevState = JSON.parse(localStorage.getItem("curState"));
  state = {
    gridFull: this.props.savedData
      ? this.prevState.gridFull
      : Array(this.props.rows)
          .fill()
          .map(() => Array(this.props.cols).fill(false)),
    generation: this.props.savedData ? this.prevState.generation : 0
  };

  play = () => {
    const g = this.state.gridFull;
    const g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.props.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.props.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.props.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.props.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.props.rows - 1 && j < this.props.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    const curGen = {
      gridFull: g2,
      generation: this.state.generation + 1
    };
    this.setState({ ...curGen });

    const forStorage = {
      ...curGen,
      rows: this.props.rows,
      cols: this.props.cols
    };
    localStorage.setItem("curState", JSON.stringify(forStorage));
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.props.speed);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  clear = () => {
    const grid = Array(this.props.rows)
      .fill()
      .map(() => Array(this.props.cols).fill(false));
    this.setState({ gridFull: grid, generation: 0 });
    clearInterval(this.intervalId);
  };

  selectBox = (row, col) => {
    const gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  };

  render() {
    const width = this.props.cols * 16;
    const rowsArr = [];
    let boxClass = "";

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.state.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.selectBox}
          />
        );
      }
    }

    return (
      <div>
        <ButtonsList
          playButton={this.playButton}
          pause={this.pause}
          clear={this.clear}
        />
        <div className="grid" style={{ width: width }}>
          {rowsArr}
        </div>
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return [...arr];
}

export default Grid;
