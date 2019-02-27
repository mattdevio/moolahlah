// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';


// Custom Imports
import BoxDayPicker from '@/components/atoms/BoxDayPicker';

class AddTransactionForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AddTransactionFormContainer>
        <AddTransactionTitle>
          Add Transaction
          <FlexRow>
            <NameInput
              placeholder='Name'
            />
            <BelongsToSelector>
              <option>Unassigned</option>
            </BelongsToSelector>
          </FlexRow>
          <FlexRow>
            <BoxDayPicker

            />
            <CostInput
              placeholder='$0.00'
            />
          </FlexRow>
          <NotesContainer
            placeholder='Notes...'
            rows='2'
          />
        </AddTransactionTitle>
      </AddTransactionFormContainer>
    );
  }

}

export default AddTransactionForm;

const AddTransactionFormContainer = styled.div`
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
`;

const AddTransactionTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 4rem;
  display: block;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  ${({ theme }) => `
    font-family: ${theme.typeFont};
    color: ${theme.mediumBlue};
  `}
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const NameInput = styled.input`
  width: 100%;
  max-width: calc(50% - 0.5rem);
  margin: 0 0.5rem 0 0;
  border: 3px solid #000;
  width: 100%;
  font-size: 3rem;
  padding: 0.3rem 0.5rem;
  border-radius: 0;
  font-weight: 700;
  ${({ theme }) => `
    font-family: ${theme.typeFont};
    &:focus {
      outline: 0;
      border-color: ${theme.skyBlue};
    }
  `}
`;

const BelongsToSelector = styled.select`
  width: 100%;
  max-width: calc(50% - 0.5rem);
  margin: 0 0 0 0.5rem;
  border: 3px solid #000;
  width: 100%;
  font-size: 3rem;
  padding: 0.3rem 0.5rem;
  border-radius: 0;
  font-weight: 700;
  appearance: none;
  ${({ theme }) => `
    font-family: ${theme.typeFont};
    &:focus {
      outline: 0;
      border-color: ${theme.skyBlue};
    }
  `}
`;

const CostInput = styled.input`
  width: 100%;
  max-width: calc(50% - 0.5rem);
  margin: 0 0 0 0.5rem;
  border: 3px solid #000;
  width: 100%;
  font-size: 3rem;
  padding: 0.3rem 0.5rem;
  border-radius: 0;
  font-weight: 700;
  ${({ theme }) => `
    font-family: ${theme.typeFont};
    &:focus {
      outline: 0;
      border-color: ${theme.skyBlue};
    }
  `}
`;

const NotesContainer = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  margin: 0;
  border: 3px solid #000;
  width: 100%;
  font-size: 3rem;
  padding: 0.3rem 0.5rem;
  font-weight: 700;
  ${({ theme }) => `
    font-family: ${theme.typeFont};
    &:focus {
      outline: 0;
      border-color: ${theme.skyBlue};
    }
  `}
`;