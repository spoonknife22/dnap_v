import React from "react";
import { Slider } from "shards-react";

export default class FundSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.state = { value: 0 };
  }

  handleSlide(e) {
    this.setState({
      value: parseFloat(e[0])
    });
  }

  render() {
    return (
      <div>
        <p>Value: {this.state.value}</p>
        <Slider
          onSlide={this.handleSlide}
          connect={[true, false]}
          start={[this.state.value]}
          range={{ min: 0, max: 2500 }}
        />
      </div>
    );
  }
}