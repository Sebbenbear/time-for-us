import React from 'react';
import { Alert } from 'react-bootstrap';

const TimeForUsLabel = (props) => {

  const name = props.name;
  const nextTimeToChat = props.nextTimeToChat;
  const status = props.status;
  const available = props.available;
  const alertStyle = available ? 'success' : 'warning';

  return (
    <Alert bsStyle={alertStyle}>
      <strong>{name} {status}!</strong> {!available && <p>Free in {nextTimeToChat} hour{nextTimeToChat !== 1 && 's'}.</p>}
    </Alert>
  );
};

export default TimeForUsLabel;
