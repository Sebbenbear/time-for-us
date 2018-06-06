import React, { Component } from 'react';
import moment from 'moment-timezone';

export class TimeZoneText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: moment.tz(moment(), this.props.timeZone)
        };
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                currentTime: moment.tz(moment(), this.props.timeZone)
            })
        }, 1000);
    }

    render() {
        const city = this.props.city.toUpperCase();
        const currentTime = this.state.currentTime;

        const divStyle = {
            padding: '10px'
        };

        return (
            <div style={divStyle}>
                <h1>{currentTime.format('h:mm:ss a')}</h1>
                <h5>{currentTime.format('MMMM Do YYYY')}</h5>
                <h3>{city}</h3>
            </div>
        );
    }
}

export default TimeZoneText;