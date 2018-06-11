import React, { Component } from 'react';
import moment from 'moment-timezone';

export class TimeZoneText extends Component {

  constructor(props) {
    super(props);

    const updatedTime = moment.tz(moment(), this.props.timeZone);
    this.state = {
      currentTime: updatedTime
    };
  };

  componentDidMount() {
    setInterval( () => {
      const updatedTime = moment.tz(moment(), this.props.timeZone);
      this.setState({
        currentTime: updatedTime
      });
    }, 1000);
  };

  render() {
    const city = this.props.city.toUpperCase();
    const currentTime = this.state.currentTime;
    const time = currentTime.format('h:mm:ss a');
    const date = currentTime.format('MMMM Do YYYY');

    const divStyle = {
      padding: '10px'
    };

    return (
      <div style={divStyle}>
        <h1>{time}</h1>
        <h5>{date}</h5>
        <h3>{city}</h3>
      </div>
    );
  };
};

export default TimeZoneText;
