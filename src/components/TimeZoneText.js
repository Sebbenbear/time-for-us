import React, { Component } from 'react';
import moment from 'moment-timezone';

export class TimeZoneText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: moment.tz(moment().format()),
        };
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                currentTime: moment.tz(moment().format()),
            })
        }, 1000);
    }

    render() {
        const timeZone = this.props.timeZone;
        const momentTimeZone = moment.tz(this.state.currentTime, timeZone);
        const city = this.props.city.toUpperCase();

        const divStyle = {
            padding: '10px'
        };

        return (
            <div style={divStyle}>
                <h1>{momentTimeZone.format('h:mm:ss a')}</h1>
                <h5>{momentTimeZone.format('MMMM Do YYYY')}</h5>
                <h3>{city}</h3>
            </div>
        );
    }
}

export default TimeZoneText;