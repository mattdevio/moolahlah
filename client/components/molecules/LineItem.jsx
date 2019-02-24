// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isCurrency from 'validator/lib/isCurrency';

// Custom Imports
import LineDayPicker from '@/components/atoms/LineDayPicker';
import LineInput from '@/components/atoms/LineInput';
import {
  updateLineitem,
  requestDeleteLineitem,
} from '@/state/ducks/budget';


class LineItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      labelHasFocus: false,
      dayPickerHasFocus: false,
      plannedHasFocus: false,
      trashHasFocus: false,
    };
    this.labelRef = React.createRef();
    this.plannedRef = React.createRef();
    this.editLineItem = this.editLineItem.bind(this);
    this.setKeyTrue = this.setKeyTrue.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.getDateString = this.getDateString.bind(this);
    this.getDecimalValue = this.getDecimalValue.bind(this);
    this.destoryLineItem = this.destoryLineItem.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.validateCurrencyAndUpdate = this.validateCurrencyAndUpdate.bind(this);
    this.setPlannedHasFocusAndSelectAllText = this.setPlannedHasFocusAndSelectAllText.bind(this);
    this.normalizePlannedValueAndUnfocus = this.normalizePlannedValueAndUnfocus.bind(this);
  }

  editLineItem() {
    this.setState({
      hasFocus: true,
    });
  }

  setKeyTrue(key) {
    return () => {
      this.setState({
        [key]: true,
      });
    };
  }

  handleInputBlur(blurredField) {
    return () => {
      this.setState({
        [blurredField]: false,
      }, () => {
        setTimeout(() => {
          const { labelHasFocus, dayPickerHasFocus, plannedHasFocus, trashHasFocus  } = this.state;
          if (!(labelHasFocus || dayPickerHasFocus || plannedHasFocus || trashHasFocus)) {
            this.setState({
              hasFocus: false,
            });
          }
        }, 10);
      });
    };
  }

  getDateString() {
    return `${moment.utc(this.props.dayPickerValue).format('MM/DD/YYYY')}`;
  }

  getDecimalValue() {
    const { plannedValue } = this.props;
    return parseFloat(Math.round(plannedValue * 100) / 100).toFixed(2);
  }

  destoryLineItem() {
    const { isDebit, parent, accessId, dispatchRequestDeleteLineitem } = this.props;
    dispatchRequestDeleteLineitem({
      isDebit,
      parent,
      accessId
    });
  }

  updateLabel(event) {
    const { dispatchUpdateLineitem, accessId, parent, isDebit } = this.props;
    dispatchUpdateLineitem({
      label: event.target.value,
      parent,
      accessId,
      isDebit,
    });
  }

  updateDate(date) {
    // date will be undefined if not valid  =>  http://react-day-picker.js.org/api/DayPickerInput/#onDayChange
    if (date) {
      const { dispatchUpdateLineitem, accessId, parent, isDebit } = this.props;
      const parsedDate = moment(date.toISOString()).format('YYYY-MM-DD');
      dispatchUpdateLineitem({
        estimateDate: parsedDate,
        parent,
        accessId,
        isDebit,
      });
    }
  }

  validateCurrencyAndUpdate(event) {
    const { value } = event.target;
    if (isCurrency(value, {
      digits_after_decimal: [1, 2],
    })) {
      const { dispatchUpdateLineitem, accessId, parent, isDebit } = this.props;
      dispatchUpdateLineitem({
        estimate: value,
        parent,
        accessId,
        isDebit,
      });
    }
  }

  setPlannedHasFocusAndSelectAllText() {
    const phfTrue = this.setKeyTrue('plannedHasFocus');
    return () => {
      phfTrue();
      this.plannedRef.current.select();
      this.plannedRef.current.focus();
    };
  }

  normalizePlannedValueAndUnfocus() {
    const phb = this.handleInputBlur('plannedHasFocus');
    return () => {
      phb();
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasFocus && this.state.hasFocus) {
      this.labelRef.current.select();
      this.labelRef.current.focus();
    }
  }


  render() {
    if (this.props.isBeingDeleted) {
      return (
        <LineItemContainer>
          <LineItemFlexContainer isBeingDeleted>
            <LabelDisplayField>
              { this.props.labelValue.trim() === '' ? 'Budget Item Label' : this.props.labelValue }
            </LabelDisplayField>
            <AttributeDisplayField margin='0 1rem'>
              { this.getDateString() }
            </AttributeDisplayField>
            <AttributeDisplayField>
              ${ this.getDecimalValue() }
            </AttributeDisplayField>
          </LineItemFlexContainer>
        </LineItemContainer>
      );
    }
    return (
      <LineItemContainer>
        {
          this.state.hasFocus ?
            <LineItemFlexContainer hasFocus={ this.state.hasFocus }>
              <TrashButton
                tabIndex={ 0 }
                onFocus={ this.setKeyTrue('trashHasFocus') }
                onBlur={ this.handleInputBlur('trashHasFocus') }
                onClick={ this.destoryLineItem }
              />
              <LineInput
                minWidth='25rem'
                placeholder='Budget Item Label'
                forwardRef={ this.labelRef }
                onFocus={ this.setKeyTrue('labelHasFocus') }
                onBlur={ this.handleInputBlur('labelHasFocus') }
                value={ this.props.labelValue }
                onChange={ this.updateLabel }
              />
              <LineDayPicker
                onFocus={ this.setKeyTrue('dayPickerHasFocus') }
                onBlur={ this.handleInputBlur('dayPickerHasFocus') }
                value={ this.getDateString() }
                onChange={ this.updateDate }
              />
              <LineInput
                maxWidth='25rem'
                alignRight
                placeholder='$0.00'
                forwardRef={ this.plannedRef }
                onFocus={ this.setPlannedHasFocusAndSelectAllText() }
                onBlur={ this.normalizePlannedValueAndUnfocus() }
                defaultValue={ this.getDecimalValue() }
                onChange={ this.validateCurrencyAndUpdate }
              />
            </LineItemFlexContainer> :
            <ClickableLineItemFlexContainer onClick={ this.editLineItem } tabIndex={0} onFocus={ this.editLineItem }>
              <LabelDisplayField>
                { this.props.labelValue.trim() === '' ? 'Budget Item Label' : this.props.labelValue }
              </LabelDisplayField>
              <AttributeDisplayField margin='0 1rem'>
                { this.getDateString() }
              </AttributeDisplayField>
              <AttributeDisplayField>
                ${ this.getDecimalValue() }
              </AttributeDisplayField>
            </ClickableLineItemFlexContainer>
        }
      </LineItemContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLineitem: (updateObject) => dispatch(updateLineitem(updateObject)),
  dispatchRequestDeleteLineitem: (updateObject) => dispatch(requestDeleteLineitem(updateObject)),
});

export default connect(null, mapDispatchToProps)(LineItem);

LineItem.propTypes = {
  labelValue: PropTypes.string.isRequired,
  dayPickerValue: PropTypes.string.isRequired,
  plannedValue: PropTypes.string.isRequired,
  accessId: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  isDebit: PropTypes.bool.isRequired,
  isBeingDeleted: PropTypes.bool.isRequired,
  dispatchUpdateLineitem: PropTypes.func.isRequired,
  dispatchRequestDeleteLineitem: PropTypes.func.isRequired,
};


const LineItemContainer = styled.div`
  width: 100%;
  margin: 0;
`;

const LineItemFlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border: 1px dashed transparent;
  ${({ hasFocus }) => !!hasFocus && 'border-color: #000;'}
  ${({ isBeingDeleted }) => {
    if (isBeingDeleted) {
      return `
        background: #333;
        opacity: 0.5;
        > * { color: #FFF !important; }
      `;
    }
  }}
`;

const ClickableLineItemFlexContainer = styled(LineItemFlexContainer)`
  &:hover {
    background-color: ${({ theme }) => theme.skyBlue};
  }
  cursor: pointer;
`;

const LabelDisplayField = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
  width: 100%;
  min-width: 25rem;
  margin: 0;
  padding: 0.3rem 0;
  border-bottom: 0.4rem solid transparent;
`;

const AttributeDisplayField = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
  margin: 0;
  text-align: right;
  width: 100%;
  max-width: 25rem;
  margin: ${({ margin }) => !!margin && margin };
  padding: 0.3rem 0;
  border-bottom: 0.4rem solid transparent;
`;

const TrashButton = styled(FontAwesomeIcon).attrs({
  icon: 'trash',
})`
  font-size: 3rem;
  color: ${({ theme }) => theme.black};
  margin: 0 1rem 0 0;
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
