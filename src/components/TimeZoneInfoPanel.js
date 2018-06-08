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
    margin: '40px'
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

    render() {
        let name = this.state.name;
        const them = moment.tz(moment(), this.state.timeZone).toObject();
        const me = moment().toObject();

        let alertComponent;
        const isMe = them.hours === me.hours;

        if (!isMe) {
            if (them.hours < 7) {
                alertComponent = <TimeForUsLabel name={name} nextTimeToChat={7 - them.hours} status='is asleep' available={false}/>
            }
            else if (them.hours < 9) {
                alertComponent = <TimeForUsLabel name={name} nextTimeToChat={9 - them.hours} status='is awake' available={true}/>
            }
            else if (them.hours < 17) {
                alertComponent = <TimeForUsLabel name={name} nextTimeToChat={17 - them.hours} status='is at work' available={false}/>
            }
            else if (them.hours < 22) {
                alertComponent = <TimeForUsLabel name={name} nextTimeToChat={22 - them.hours} status='has finished work' available={true}/>
            }
            else {
                if (them.hours >= 22) {
                    alertComponent = <TimeForUsLabel name={name} nextTimeToChat={31 - them.hours} status='is asleep' available={false}/>
                } else {
                    alertComponent = <TimeForUsLabel name={name} nextTimeToChat={8 - them.hours} status='is asleep' available={false}/>
                }
            }
        }

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
