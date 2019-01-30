// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Custom Imports
import LineDayPicker from '@/components/atoms/LineDayPicker';
import LineInput from '@/components/atoms/LineInput';


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
                tabIndex={0}
                onFocus={ this.setKeyTrue('trashHasFocus') }
                onBlur={ this.handleInputBlur('trashHasFocus') }
              />
              <LineInput
                minWidth='25rem'
                placeholder='Budget Item Label'
                forwardRef={ this.labelRef }
                onFocus={ this.setKeyTrue('labelHasFocus') }
                onBlur={ this.handleInputBlur('labelHasFocus') }
                value={ this.props.labelValue }
              />
              <LineDayPicker
                onFocus={ this.setKeyTrue('dayPickerHasFocus') }
                onBlur={ this.handleInputBlur('dayPickerHasFocus') }
                value={ moment(this.props.dayPickerValue, 'YYYYMMDD').format('MM/DD/YYYY') }
              />
              <LineInput
                maxWidth='25rem'
                alignRight
                placeholder='$0.00'
                onFocus={ this.setKeyTrue('plannedHasFocus') }
                onBlur={ this.handleInputBlur('plannedHasFocus') }
                value={ this.props.plannedValue }
              />
            </LineItemFlexContainer> :
            <ClickableLineItemFlexContainer onClick={ this.editLineItem } tabIndex={0} onFocus={ this.editLineItem }>
              <LabelDisplayField>
                { this.props.labelValue }
              </LabelDisplayField>
              <AttributeDisplayField margin='0 1rem'>
                { `${moment(this.props.dayPickerValue, 'YYYYMMDD').format('MM/DD/YYYY')}` }
              </AttributeDisplayField>
              <AttributeDisplayField>
                { this.props.plannedValue }
              </AttributeDisplayField>
            </ClickableLineItemFlexContainer>
        }
      </LineItemContainer>
    );
  }
}

LineItem.propTypes = {
  labelValue: PropTypes.string.isRequired,
  dayPickerValue: PropTypes.string.isRequired,
  plannedValue: PropTypes.string.isRequired,
};

export default LineItem;

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
