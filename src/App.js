import React, { Component } from 'react';
import './App.css';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { TimeZoneInfoPanel } from './components/TimeZoneInfoPanel';

class App extends Component {

  constructor(props) {
    super(props);
    
    // initialise local storage if it isn't set yet
    if (!localStorage.getItem('timeZone1')) {
      localStorage.setItem('timeZone1', 'Australia/Sydney');
    }

    if (!localStorage.getItem('timeZone2')) {
      localStorage.setItem('timeZone2', 'America/New_York');
    }

    if (!localStorage.getItem('timeZoneName1')) {
      localStorage.setItem('timeZoneName1', 'Their');
    }

    if (!localStorage.getItem('timeZoneName2')) {
      localStorage.setItem('timeZoneName2', 'My');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className=".App-title">Time For Us</h1>
          <br/>
          <h4 className=".App-intro">Time For Us lets you find the best time to chat to your loved one across countries!</h4>
        </header>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <TimeZoneInfoPanel timeZoneId='timeZone1' timeZoneName='timeZoneName1'/>
            </Col>
            <Col md={6}>
              <TimeZoneInfoPanel timeZoneId='timeZone2' timeZoneName='timeZoneName2'/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
