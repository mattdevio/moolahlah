// Vendor Imports
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import styled from 'styled-components';

const CustomDayPicker = () => (
  <DayPickerInput
    inputProps={{

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
  &:focus {
    outline: 0;
  }
`;