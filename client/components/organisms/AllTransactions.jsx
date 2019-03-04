// Vendor Imports
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import TransactionLine from '@/components/molecules/TransactionLine';

class AllTransactions extends Component {

  constructor(props) {
    super(props);
    this.renderTransactions = this.renderTransactions.bind(this);
  }

  renderTransactions() {
    const { debit, income } = this.props.categoryGroups;
    const { transactions, unassignedAccessId } = this.props;
    const unassigned = transactions.filter(transaction => transaction.belongsTo === unassignedAccessId);

    const unassignedTransactions = (
      <Fragment key={ unassignedAccessId }>
        <GroupName>+ Unassigned</GroupName>
        { unassigned.map(tli => <TransactionLine
          key={ tli.accessId }
          accessId={ tli.accessId }
          cost={ tli.cost }
          date={ tli.date }
          name={ tli.name }
          notes={ tli.notes }
          isDebit={ true }
        />) }
      </Fragment>
    );

    const incomeTransactions = Object.keys(income).map((key) => {
      const incomeLabel = income[key].categoryLabel;
      const trans = transactions.filter(transactions => transactions.belongsTo === key);
      return (
        <Fragment key={ key }>
          <GroupName>+ { incomeLabel }</GroupName>
          { trans.map(tli => <TransactionLine
            key={ tli.accessId }
            accessId={ tli.accessId }
            cost={ tli.cost }
            date={ tli.date }
            name={ tli.name }
            notes={ tli.notes }
            isDebit={ income[key].isDebit }
          />) }
        </Fragment>
      );
    });
    const debitTransactions = Object.keys(debit).map((key) => {
      const debitLabel = debit[key].categoryLabel;
      const trans = transactions.filter(transactions => transactions.belongsTo === key);
      return (
        <Fragment key={ key }>
          <GroupName>+ { debitLabel }</GroupName>
          { trans.map(tli => <TransactionLine
            key={ tli.accessId }
            accessId={ tli.accessId }
            cost={ tli.cost }
            date={ tli.date }
            name={ tli.name }
            notes={ tli.notes }
            isDebit={ debit[key].isDebit }
          />) }
        </Fragment>
      );
    });
    return [
      unassignedTransactions,
      ...incomeTransactions,
      ...debitTransactions, 
    ];
  }

  render() {
    return (
      <AllTransactionsContainer>
        <AllTransactionsTitle>
          Transaction Ledger
        </AllTransactionsTitle>
        { this.renderTransactions() }
      </AllTransactionsContainer>
    );
  }

}

AllTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  categoryGroups: PropTypes.object.isRequired,
  unassignedAccessId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  transactions: state.budget.transactions,
  categoryGroups: state.budget.categoryGroups,
  unassignedAccessId: state.budget.unassignedAccessId,
});

export default connect(mapStateToProps)(AllTransactions);

const AllTransactionsContainer = styled.div`
  padding: 1rem;
  border: 2px solid #000;
  width: 100%;
`;

const GroupName = styled.p`
  font-size: 2.5rem;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  margin: 1rem 0 0 0;
  color: ${({ theme }) => theme.mediumBlue};
  padding: 0;
  font-weight: 700;
`;

const AllTransactionsTitle = styled.h2`
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