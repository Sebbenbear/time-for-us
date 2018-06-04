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
        
        const divStyle = {
            padding: '1px'
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