import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Welcome(props) {
  return (
    <div>
      <Calendar
        next2Label={null}
        prev2Label={null}
        onChange={props.getDate}
        value={props.value}
      />
    </div>
  );
}

export default Welcome;