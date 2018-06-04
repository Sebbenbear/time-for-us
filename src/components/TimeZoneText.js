import React, { Component } from 'react';
import moment from 'moment-timezone';

export class TimeZoneText extends Component {

    render() {
        const timeZone = this.props.timeZone;
        const momentTimeZone = moment.tz(moment().format(), timeZone);

        const divStyle = {
            padding: '10px'
        };

        return (
            <div style={divStyle}>
                <h1>{momentTimeZone.format('h:mm:ss a')}</h1>
                <div>
                    <h3>{timeZone}</h3>
                    <h5>{momentTimeZone.format('MMMM Do YYYY')}</h5>
                </div>
            </div>
        );
    }
}

export default TimeZoneText;