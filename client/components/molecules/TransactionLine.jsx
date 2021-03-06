// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Imports
import { deleteTransaction } from '@/state/ducks/budget';


class TransactionLine extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { dispatchDeleteTransaction, accessId } = this.props;
    dispatchDeleteTransaction(accessId);
  }

  render() {
    const {
      cost,
      date,
      name,
      isDebit,
    } = this.props;
    return (
      <TLContainer>
        <NameField>
          { name }
        </NameField>
        <DataField>
          { moment.utc(date).format('MM/DD/YYYY') }
        </DataField>
        <DataField>
          { isDebit ? '- $' : '$' } { parseFloat(Math.round(cost * 100) / 100).toFixed(2) }
        </DataField>
        <TrashButton onClick={ this.handleDelete } />
      </TLContainer>
    );
  }

} // end TransactionLine Component

TransactionLine.propTypes = {
  accessId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  isDebit: PropTypes.bool.isRequired,
  dispatchDeleteTransaction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchDeleteTransaction: accessId => dispatch(deleteTransaction({ accessId })),
});

export default connect(null, mapDispatchToProps)(TransactionLine);

const TLContainer = styled.div`
  padding: 0.2rem 0;
  margin: 0 0 0 1.5rem;
  width: calc(100% - 1.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #000;
`;

const TrashButton = styled(FontAwesomeIcon).attrs({
  icon: 'trash',
})`
  font-size: 3rem;
  color: ${({ theme }) => theme.black};
  margin: 0 0 0 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.alertRed};
    color: ${({ theme }) => theme.white};
    outline: 0;
    border: 0.1rem solid ${({ theme }) => theme.skyBlue};
  }
`;

const NameField = styled.p`
  width: 100%;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.typeFont};
  padding: 0;
  margin: 0;
`;

const DataField = styled.p`
  width: 100%;
  max-width: 15rem;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.typeFont};
  padding: 0;
  margin: 0 0 0 0.5rem;
  text-align: right;
`;