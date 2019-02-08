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
  deleteLineItem,
  lineItemLabel,
  lineItemDate,
  lineItemPlanned,
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
    this.editLineItem = this.editLineItem.bind(this);
    this.setKeyTrue = this.setKeyTrue.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.getDateString = this.getDateString.bind(this);
    this.destoryLineItem = this.destoryLineItem.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.validateCurrencyAndUpdate = this.validateCurrencyAndUpdate.bind(this);
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
    return `${moment(this.props.dayPickerValue, 'YYYYMMDD').format('MM/DD/YYYY')}`;
  }

  destoryLineItem() {
    this.props.dispatchDeleteLineItem(this.props.identity);
  }

  updateLabel(event) {
    this.props.dispatchLineItemLabel(this.props.identity, event.target.value);
  }

  updateDate(date) {
    // date will be undefined if not valid  =>  http://react-day-picker.js.org/api/DayPickerInput/#onDayChange
    if (date) {
      this.props.dispatchLineItemDate(this.props.identity, date);
    }
  }

  validateCurrencyAndUpdate(event) {
    const { value } = event.target;
    if (isCurrency(value)) {
      const { dispatchLineItemPlanned, identity } = this.props;
      dispatchLineItemPlanned(identity, value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasFocus && this.state.hasFocus) {
      this.labelRef.current.select();
      this.labelRef.current.focus();
    }
  }


  render() {
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
                onFocus={ this.setKeyTrue('plannedHasFocus') }
                onBlur={ this.handleInputBlur('plannedHasFocus') }
                defaultValue={ this.props.plannedValue }
                onChange={ this.validateCurrencyAndUpdate }
              />
            </LineItemFlexContainer> :
            <ClickableLineItemFlexContainer onClick={ this.editLineItem } tabIndex={0} onFocus={ this.editLineItem }>
              <LabelDisplayField>
                { this.props.labelValue }
              </LabelDisplayField>
              <AttributeDisplayField margin='0 1rem'>
                { this.getDateString() }
              </AttributeDisplayField>
              <AttributeDisplayField>
                ${ this.props.plannedValue }
              </AttributeDisplayField>
            </ClickableLineItemFlexContainer>
        }
      </LineItemContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchDeleteLineItem: identity => dispatch(deleteLineItem({ identity })),
  dispatchLineItemLabel: (identity, label) => dispatch(lineItemLabel({ identity, label })),
  dispatchLineItemDate: (identity, date) => dispatch(lineItemDate({ identity, date })),
  dispatchLineItemPlanned: (identity, planned) => dispatch(lineItemPlanned({ identity, planned })),
});

export default connect(null, mapDispatchToProps)(LineItem);

LineItem.propTypes = {
  labelValue: PropTypes.string.isRequired,
  dayPickerValue: PropTypes.string.isRequired,
  plannedValue: PropTypes.string.isRequired,
  identity: PropTypes.string.isRequired,
  dispatchDeleteLineItem: PropTypes.func.isRequired,
  dispatchLineItemLabel: PropTypes.func.isRequired,
  dispatchLineItemDate: PropTypes.func.isRequired,
  dispatchLineItemPlanned: PropTypes.func.isRequired,
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
