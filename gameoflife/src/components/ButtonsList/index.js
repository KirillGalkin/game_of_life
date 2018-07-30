import React from "react";
import "./style.css";

class ButtonsList extends React.Component {
  render() {
    return (
      <div className="buttons-list">
        <button onClick={this.props.playButton}>Play</button>
        <button onClick={this.props.pause}>Pause</button>
        <button onClick={this.props.clear}>Clear</button>
      </div>
    );
  }
}

export default ButtonsList;
