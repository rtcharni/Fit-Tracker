import React from "react";
import CreateReactClass from "create-react-class";
import Gauge from "svg-gauge";
 
const defaultOptions = {
  animDuration: 1,
  showValue: true,
  max: 100
  // Put any other defaults you want. e.g. dialStartAngle, dialEndAngle, radius, etc.
};
 
export default Component = CreateReactClass({
  displayName: "Gauge",
  componentDidMount() {
    this.renderGauge(this.props);
  },
 
  shouldComponentUpdate(nextProps, nextState) {
    const {props} = this;
    if(props.value !== nextProps.value) {
      this.renderGauge(nextProps);
    }
    return false;
  },
 
  render() {
    return (
      <div className="gauge-container" ref={el => this.gaugeEl = el}></div>
    );
  },
 
  renderGauge(props) {
    const gaugeOptions = Object.assign({}, defaultOptions, props);
    if(!this.gauge) {
      this.gauge = Gauge(this.gaugeEl, gaugeOptions);
    }
    this.gauge.setValueAnimated(props.value, gaugeOptions.animDuration);
  }
});