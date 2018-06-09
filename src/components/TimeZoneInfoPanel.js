import React, { Component } from 'react';
import moment from 'moment-timezone';
import Autosuggest from 'react-bootstrap-autosuggest';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';
import TimeForUsLabel from './TimeForUsLabel';

import { BackgroundImage } from './BackgroundImage';

const divStyle = {
    margin: '30px'
};

export class TimeZoneInfoPanel extends Component {

    constructor(props) {
        super(props);
        
        const timeZone = localStorage.getItem(this.props.timeZoneId);
        let name = localStorage.getItem(this.props.timeZoneName);

        const myKeyword = this.extractKeyword(timeZone);
    
        this.state = {
            isLoading: false,
            error: null,
            keyword: myKeyword,
            timeZoneList: moment.tz.names(),
            timeZone: timeZone,
            name: name,
            isEditingName: false,
            value: name
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    extractKeyword(timezone) {
        const splitTZ = timezone.split("/");
        let keyword;

        if (splitTZ.length > 1) {
            keyword = splitTZ[1];
        } else {
            keyword = splitTZ[0]
        }

        return keyword.replace("_", " ").toLowerCase();
    };

    handleChange(event) {
        if (this.state.timeZoneList.includes(event)) {
            this.setState({
                timeZone: event,
                keyword: this.extractKeyword(event)
            });
            localStorage.setItem(this.props.timeZoneId, event);
        }
    }

    handleEditClick(event) {
        this.setState({
            isEditingName: true
        });
    }

    handleEditChange(event) {
        this.setState({value: event.target.value});
    }

    handleEditSubmit(event) {
        event.preventDefault();
        this.setState({
            isEditingName: false,
            name: this.state.value
        });
        localStorage.setItem(this.props.timeZoneName, this.state.value);
    }

    /*q
        Performs the following checks and returns the appropriate message:

        is weekday, is asleep - morning
        is weekday, is morning
        is weekday, at work
        is weekday, is after work
        is weekday, asleep - night

        is weekend, is asleep - morning
        is weekend, is during day
        is weekend, is asleep - night
    */
    getTimeStatus(isMe, them, name) {
        const momentObject = them.toObject();
        const isWeekend = them.isoWeekday() === 6 || them.isoWeekday() === 7;

        const FREE_TIME = 0;
        const WAKE_UP_TIME = 7;
        const START_WORK_TIME = 9;
        const FINISH_WORK_TIME = 17;
        const SLEEP_TIME = 22;
        const MIDNIGHT_OFFSET_TIME = 31;

        // if it's the same person, same timezone we don't need the extra message
        if (isMe) {
            return null;
        }

        // Otherwise, find the appropriate message for the time
        if (momentObject.hours < WAKE_UP_TIME) {
            return <TimeForUsLabel name={name} nextTimeToChat={WAKE_UP_TIME - momentObject.hours} status='is asleep' available={false} />;
        }
        else if (momentObject.hours < START_WORK_TIME) {
            return <TimeForUsLabel name={name} nextTimeToChat={FREE_TIME} status='is awake' available={true} />;
        }
        else if (momentObject.hours < FINISH_WORK_TIME && !isWeekend) {
            return <TimeForUsLabel name={name} nextTimeToChat={FINISH_WORK_TIME - momentObject.hours} status='is at work' available={false} />;
        }
        else if (momentObject.hours < SLEEP_TIME && !isWeekend) {
            return <TimeForUsLabel name={name} nextTimeToChat={FREE_TIME} status='has finished work' available={true} />;
        }
        else if (momentObject.hours < SLEEP_TIME) {
            return <TimeForUsLabel name={name} nextTimeToChat={FREE_TIME} status="is free, it's the weekend" available={true} />;
        }
        else {
            return <TimeForUsLabel name={name} nextTimeToChat={MIDNIGHT_OFFSET_TIME - momentObject.hours} status='is asleep' available={false} />;
        }
    }

    // Milliseconds can make different objects for the timezone differ, so need to ignore milliseconds when comparing
    checkSameDateTime(them, me) {
        const themObj = them.toObject();
        const meObj = me.toObject();

        return (
            themObj.hours === meObj.hours &&
            themObj.minutes === meObj.minutes &&
            themObj.seconds === meObj.seconds
        );
    }

    render() {
        let name = this.state.name;
        const them = moment.tz(moment(), this.state.timeZone);
        const me = moment();

        const isMe = this.checkSameDateTime(them, me);

        const alertComponent = this.getTimeStatus(isMe, them, name);

        let modName = name;

        if (name !== 'My' && name !== 'Their') {
            modName = name + "'s";
        }

        return (
            <div style={divStyle}>
                <FormGroup controlId="timezone">
                        {/* Only visible when field is entered */}
                        {/* <Button bsStyle="link">Edit</Button> */}
                        {!this.state.isEditingName &&
                        <ControlLabel id='controlLabel'>
                            {modName + ' Time Zone'}
                            <Button 
                                bsStyle="link"
                                onClick={this.handleEditClick}>
                                <Glyphicon glyph="edit"/></Button>
                        </ControlLabel>
                        }

                        {/* Only visible when entering field */}
                        {this.state.isEditingName &&
                            <div>
                            <Form inline onSubmit={this.handleEditSubmit}>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleEditChange}
                                />
                            </Form>
                            </div>
                        }

                        <Autosuggest
                            datalist={this.state.timeZoneList}
                            placeholder={this.state.timeZone}
                            onChange={this.handleChange}
                        />
                </FormGroup>
                <BackgroundImage keyword={this.state.keyword} timeZone={this.state.timeZone}/>
                {!isMe && alertComponent}
            </div>
        );
    }
}

export default TimeZoneInfoPanel;
