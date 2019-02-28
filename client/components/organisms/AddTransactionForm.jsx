// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import isCurrency from 'validator/lib/isCurrency';


// Custom Imports
import BoxDayPicker from '@/components/atoms/BoxDayPicker';

class AddTransactionForm extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: '',
      belongsTo: '',
      date: '',
      cost: '',
      notes: '',
      error: '',
      culprit: '',
    };
    this.renderBelongsToSelectors = this.renderBelongsToSelectors.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.validateTransaction = this.validateTransaction.bind(this);
  }

  updateKey(key) {
    return (e) => {
      if (key === this.state.culprit) {
        this.setState({
          [key]: e.target.value,
          error: '',
          culprit: '',
        });
      } else {
        this.setState({
          [key]: e.target.value,
        });
      }
    };
  }

  handleDateChange(date) {
    if (date) {
      const parsedDate = moment(date.toISOString()).format('YYYY-MM-DD');
      if (this.state.culprit === 'date') {
        this.setState({
          date: parsedDate,
          error: '',
          culprit: '',
        });
      } else {
        this.setState({
          date: parsedDate,
        });
      }
    }
  }

  handleCostChange(event) {
    const { value } = event.target;
    if (isCurrency(value, {
      digits_after_decimal: [0, 1, 2],
    }) || value === '') {
      if (this.state.culprit === 'date') {
        this.setState({
          cost: value,
          error: '',
          culprit: '',
        });
      } else {
        this.setState({
          cost: value,
        });
      }
    }
  }

  validateTransaction() {
    const { name, belongsTo, date, cost, notes } = this.state;

    // Validate Name
    if (name.trim() === '') {
      return this.setState({
        error: 'Please provide a name for your transaction.',
        culprit: 'name',
      });
    }

    // Validate belongsTo
    if (belongsTo === '') {
      return this.setState({
        error: 'Please select a category group.',
        culprit: 'belongsTo',
      });
    }
    
    // Validate Date
    if (date === '') {
      return this.setState({
        error: 'Please set a date of occurance for the transaction',
        culprit: 'date',
      });
    }

    // Validate Cost
    if (cost === '') {
      return this.setState({
        error: 'Please set the cost value of the transaction.',
        culprit: 'cost',
      });
    }

  }

  renderBelongsToSelectors() {
    const { categoryGroups, unassignedAccessId } = this.props;
    const { income, debit } = categoryGroups;
    const incomeOptions = Object.keys(income).map(key => {
      const incomeItem = income[key];
      if (!incomeItem) return;
      return (
        <option key={ key } value={ key }>
          { incomeItem.categoryLabel }
        </option>
      );
    });
    const debitOptions = Object.keys(debit).map(key => {
      const debitItem = debit[key];
      if (!debitItem) return;
      return (
        <option key={ key } value={ key }>
          { debitItem.categoryLabel }
        </option>
      );
    });
    return [
      <option value='' disabled key='blank413'>Select a category group...</option>,
      <option key={ unassignedAccessId } value={ unassignedAccessId }>Unassigned</option>,
      ...incomeOptions,
      ...debitOptions,
    ];
  }

  render() {
    const {
      name,
      belongsTo,
      date,
      cost,
      notes,
      error,
    } = this.state;
    return (
      <AddTransactionFormContainer>
        <AddTransactionTitle>
          Create A New Transaction
        </AddTransactionTitle>
        <FlexRow>
          <NameInput
            placeholder='Name'
            onChange={ this.updateKey('name') }
            value={ name }
          />
          <BelongsToSelector defaultValue={ belongsTo } onChange={ this.updateKey('belongsTo') } colorWatch={ belongsTo }>
            { this.renderBelongsToSelectors() }
          </BelongsToSelector>
        </FlexRow>
        <FlexRow>
          <BoxDayPicker
            onChange={ this.handleDateChange }
            value={ date }
          />
          <CostInput
            placeholder='$0.00'
            value={ cost }
            onChange={ this.handleCostChange }
          />
        </FlexRow>
        <NotesContainer
          placeholder='Notes...'
          rows='2'
          value={ notes }
          onChange={ this.updateKey('notes') }
        />
        { error !== '' && <ErrorBox>
          Error: {error}
        </ErrorBox> }
        <AddTransaction onClick={ this.validateTransaction }>
          Add Transaction
        </AddTransaction>
      </AddTransactionFormContainer>
    );
  }

}

AddTransactionForm.propTypes = {
  unassignedAccessId: PropTypes.string.isRequired,
  categoryGroups: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  unassignedAccessId: state.budget.unassignedAccessId,
  categoryGroups: state.budget.categoryGroups,
});

export default connect(mapStateToProps)(AddTransactionForm);

const AddTransactionFormContainer = styled.div`
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
`;

const AddTransactionTitle = styled.h2`
  margin: 0 0 1rem 0;
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
  color: ${({ colorWatch }) => colorWatch === '' ? 'gray' : '#000' };
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
  min-height: 4.6rem;
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

const AddTransaction = styled.button`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.mediumBlue};
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.skyBlue};
    outline: 0;
  }
`;

const ErrorBox = styled.p`
  font-size: 2rem;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.alertRed};
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
  letter-spacing: 0.1rem;
  padding: 0.2rem 0.3rem;
`;