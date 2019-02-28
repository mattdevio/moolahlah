// Vendor Imports
import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPickerClassNames from 'react-day-picker/lib/src/classNames';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Day picker utility extensions for moment.js
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

/**
 * BoxDayPicker
 * A styled day picker for a line item.
 */
class BoxDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnBlur(event) {
    this.setState({
      hasFocus: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleOnFocus(event) {
    this.setState({
      hasFocus: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  render() {
    return (
      <LineDayPickerContainer>
        <DayPickerInput
          formatDate={formatDate} // format date selected from picker
          parseDate={parseDate} // parse input from the text field
          placeholder={`${formatDate(new Date())}`}
          classNames={{
            container: 'boxpickerinput__container',
            overlayWrapper: 'boxpickerinput__overlay__wrapper',
            overlay: 'boxpickerinput__overlay',
          }}
          inputProps={{
            onFocus: this.handleOnFocus,
            onBlur: this.handleOnBlur,
          }}
          dayPickerProps={{
            classNames: {
              ...DayPickerClassNames,
              container: 'linedaypicker__picker__container',
              selected: 'linedaypicker__picker__selected',
              month: 'linedaypicker__picker__month',
              wrapper: 'linedaypicker__picker__wrapper',
            },
            canChangeMonth: false,
          }}
          value={ this.props.value }
          onDayChange={ this.props.onChange }
        />
      </LineDayPickerContainer>
    );
  }
}

BoxDayPicker.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default BoxDayPicker;


const LineDayPickerContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0.5rem 0 0;
  max-width: calc(50% - 0.5rem);
`;


/**
 * BoxDayPickerStyles
 * Global styles that should be imported into the app only once.
 * Import is currently located on '@/components/pages/App'
 */
export const BoxDayPickerStyles = createGlobalStyle`
  .boxpickerinput__overlay__wrapper {
    position: relative;
  }
  .boxpickerinput__overlay {
    position: absolute;
    left: 0;
    top: 4.6rem;
    z-index: 1;
    background: ${({theme}) => theme.white};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  .boxpickerinput__container {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 4.6rem;
    position: relative;
  }
  .boxpickerinput__container input {
    font-size: 3rem;
    font-family: ${({theme}) => theme.typeFont};
    color: ${({theme}) => theme.black};
    font-weight: 700;
    width: 100%;
    border: 0.3rem solid #000;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    padding: 0.3rem 0.5rem;
    &:focus {
      outline: 0;
      border-color: ${({ theme }) => theme.skyBlue};
    }
  }

  .linedaypicker__picker__container {
    font-size: 1.5rem;
    font-family: ${({theme}) => theme.typeFont};
  }
  
  .linedaypicker__picker__selected {
    background-color: ${({theme}) => theme.mediumBlue};
    font-weight: 700;
    color: ${({theme}) => theme.skyBlue};
  }
  .linedaypicker__picker__month {
    display: table;
    margin: 0 1em;
    margin-top: 1em;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .linedaypicker__picker__wrapper {
    &:focus {
      outline: 0;
    }
  }
`;