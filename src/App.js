import React, { Component } from 'react';
import './App.css';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { TimeZoneInfoPanel } from './components/TimeZoneInfoPanel';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className=".App-title">Time For Us</h1>
        </header>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <TimeZoneInfoPanel title="Melby's Time Zone" timeZone='Australia/Sydney'/>
            </Col>
            <Col md={6}>
              <TimeZoneInfoPanel title="My Time Zone" timeZone='America/New_York'/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
