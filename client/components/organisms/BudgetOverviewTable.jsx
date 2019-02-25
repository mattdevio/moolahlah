// Vendor Imports
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports

/**
 * TODO:
 * 
 * BudgetOverviewTable
 * Is doing some difficult calculation that could use some memo-ization.
 * For now, it will work.
 */
class BudgetOverviewTable extends Component {

  constructor(props) {
    super(props);
    this.renderIncomeRow = this.renderIncomeRow.bind(this);
    this.renderDebitRows = this.renderDebitRows.bind(this);
    this.renderTotalIncome = this.renderTotalIncome.bind(this);
    this.renderTotalDebits = this.renderTotalDebits.bind(this);
  }

  getUSD(val) {
    return parseFloat(Math.round(val * 100) / 100).toFixed(2);
  }

  renderIncomeRow() {
    const { income } = this.props.categoryGroups;
    return Object.keys(income).map(key => {
      let incomeRow = income[key]; // Make sure the item exists
      if (incomeRow) {
        let totalValue = Object.keys(incomeRow.lineItems).reduce((acc, val) => {
          acc += +incomeRow.lineItems[val].estimate;
          return acc;
        }, 0);
        return (
          <TableRow key={ key }>
            <IncomeTableData>
              { incomeRow.categoryLabel }
            </IncomeTableData>
            <IncomeTableData>
              { `$ ${this.getUSD(totalValue)}` }
            </IncomeTableData>
          </TableRow>
        );
      }
    });
  }

  renderDebitRows() {
    const { debit } = this.props.categoryGroups;
    return Object.keys(debit).map(key => {
      let debitRow = debit[key]; // Make sure the item exists
      if (debitRow) {
        let totalValue = Object.keys(debitRow.lineItems).reduce((acc, val) => {
          acc += +debitRow.lineItems[val].estimate;
          return acc;
        }, 0);
        return (
          <TableRow key={ key }>
            <DebitTableData>
              { debitRow.categoryLabel }
            </DebitTableData>
            <DebitTableData>
              { `- $ ${this.getUSD(totalValue)}` }
            </DebitTableData>
          </TableRow>
        );
      }
    });
  }

  renderTotalIncome() {
    const { income } = this.props.categoryGroups;
    const incomeTotal = Object.keys(income).reduce((acc, val) => {
      let incomeGroup = income[val];
      if (!incomeGroup) return acc; // Make sure the item exists
      let catTotal = Object.keys(incomeGroup.lineItems).reduce((accum, value) => {
        accum += +incomeGroup.lineItems[value].estimate;
        return accum;
      }, 0);
      acc += +catTotal;
      return acc;
    }, 0);
    return (
      <TableRow>
        <BlockTotalTableData>
          Income
        </BlockTotalTableData>
        <BlockTotalTableData>
          { `$ ${this.getUSD(incomeTotal)}` }
        </BlockTotalTableData>
      </TableRow>
    );
  }

  renderTotalDebits() {
    const { debit } = this.props.categoryGroups;
    const debitTotal = Object.keys(debit).reduce((acc, val) => {
      let debitGroup = debit[val];
      if (!debitGroup) return acc; // Make sure the item exists
      let catTotal = Object.keys(debitGroup.lineItems).reduce((accum, value) => {
        accum += +debitGroup.lineItems[value].estimate;
        return accum;
      }, 0);
      acc += +catTotal;
      return acc;
    }, 0);
    return (
      <TableRow>
        <BlockTotalTableData>
          Budget Total
        </BlockTotalTableData>
        <BlockTotalTableData>
          { `- $ ${this.getUSD(debitTotal)}` }
        </BlockTotalTableData>
      </TableRow>
    );
  }

  render() {
    return (
      <Fragment>
        <BudgetOverviewTableContainer>
          <TableHeading>
            Budget Designer
          </TableHeading>
          { this.renderIncomeRow() }
          { this.renderDebitRows() }
        </BudgetOverviewTableContainer>
        <BlockTotalContainer>
          { this.renderTotalIncome() }
          { this.renderTotalDebits() }
        </BlockTotalContainer>
      </Fragment>
    );
  }

}

BudgetOverviewTable.propTypes = {
  categoryGroups: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  categoryGroups: state.budget.categoryGroups,
});

export default connect(mapStateToProps)(BudgetOverviewTable);


const BudgetOverviewTableContainer = styled.div`
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  padding: 1rem 0;
`;

const TableHeading = styled.h2`
  font-size: 4rem;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.darkBlue};
  margin: 1.5rem 0;
  padding: 0;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const IncomeTableData = styled.p`
  margin: 0;
  padding: 0 0 1rem 0;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 3rem;
  display: inline-block;
  text-transform: uppercase;
`;

const DebitTableData = styled.p`
  margin: 0;
  padding: 0.3rem 0;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 2.5rem;
  display: inline-block;
  text-transform: uppercase;
  color: ${({ theme }) => theme.darkBlue};
`;

const BlockTotalContainer = styled.div`
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.darkBlue}
`;

const BlockTotalTableData = styled.p`
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 2.5rem;
  display: inline-block;
  text-transform: uppercase;
  margin: 0;
  padding: 0.25rem 0;
  color: ${({ theme }) => theme.white};
`;
