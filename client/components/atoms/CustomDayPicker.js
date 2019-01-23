// Vendor Imports
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import styled from 'styled-components';

const CustomDayPicker = () => (
  <DayPickerInput
    inputProps={{

    }}
    classNames={{
      overlay: 'rightOverlay',
    }}
    component={ props => <StyledInput {...props} /> }
    dayPickerProps={{
      initialMonth: new Date(),
      canChangeMonth: false,
    }}
  />
);

export default CustomDayPicker;

const StyledInput = styled.input`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({ theme }) => theme.black};
  font-weight: 700;
  border: 1px solid #333;
  padding: 0.3rem;
  text-align: right;
  &:focus {
    outline: 0;
  }
  .rightOverlay {
    position: absolute;
    right: 0;
    z-index: 1;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;