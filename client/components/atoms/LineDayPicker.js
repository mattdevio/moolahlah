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
 * LineDayPicker
 * A styled day picker for a line item.
 */
class LineDayPicker extends Component {
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
            container: 'daypickerinput__container',
            overlayWrapper: 'daypickerinput__overlaywrapper',
            overlay: 'daypickerinput__overlay',
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
        />
        <SpanHighlight hasFocus={this.state.hasFocus} />
      </LineDayPickerContainer>
    );
  }
}

LineDayPicker.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
};

export default LineDayPicker;


const LineDayPickerContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 25rem;
  margin: 0 1rem;
`;

const SpanHighlight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.4rem;
  transition:0.2s ease all;
  max-width: ${({ hasFocus }) => hasFocus ? '100%' : '0' };
  background: ${({ theme }) => theme.skyBlue};
`;


/**
 * LineDayPickerStyles
 * Global styles that should be imported into the app only once.
 * Import is currently located on '@/components/pages/App'
 */
export const LineDayPickerStyles = createGlobalStyle`
  .daypickerinput__overlaywrapper {
    position: relative;
  }
  .daypickerinput__overlay {
    position: absolute;
    right: 0;
    z-index: 1;
    background: ${({theme}) => theme.white};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  .daypickerinput__container {
    width: 100%;
    margin: 0;
  }
  .daypickerinput__container input {
    font-size: 2.5rem;
    font-family: ${({theme}) => theme.typeFont};
    color: ${({theme}) => theme.black};
    border: 0.1rem solid ${({ theme }) => theme.black};
    font-weight: 700;
    width: 100%;
    margin: 0;
    border: 0;
    border-bottom: 0.4rem solid ${({ theme }) => theme.black };
    padding: 0.3rem 0;
    text-align: right;
    &:focus {
      outline: 0;
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
