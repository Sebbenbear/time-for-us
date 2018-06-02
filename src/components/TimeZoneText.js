import React, { Component } from 'react';
import moment from 'moment-timezone';

export class TimeZoneText extends Component {

    render() {
        const timeZone = this.props.timeZone;
        const momentTimeZone = moment.tz(moment().format(), timeZone);

        return (
            <div>
                <p>{timeZone}</p>
                <p>{momentTimeZone.format('h:mm:ss a')}</p>
                <p>{momentTimeZone.format('MMMM Do YYYY')}</p>
            </div>
        );
    }
}

export default TimeZoneText;