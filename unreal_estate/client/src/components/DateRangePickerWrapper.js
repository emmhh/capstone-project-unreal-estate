import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    }; 
  }

  render() {
    return (
      <span className="App">
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onDatesChange={this.props.function}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
          displayFormat={() => "DD/MM/YYYY"}
        />
      </span>
    );
  }
}

export default DateRangePickerWrapper;