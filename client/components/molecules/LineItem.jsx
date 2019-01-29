// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
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
          const { labelHasFocus, dayPickerHasFocus, plannedHasFocus  } = this.state;
          if (!(labelHasFocus || dayPickerHasFocus || plannedHasFocus)) {
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
    const {
      hasFocus,
    } = this.state;
    return (
      <LineItemContainer>
        {
          hasFocus ?
            <LineItemFlexContainer hasFocus={ hasFocus }>
              <LineInput
                minWidth='25rem'
                placeholder='Budget Item Label'
                forwardRef={ this.labelRef }
                onFocus={ this.setKeyTrue('labelHasFocus') }
                onBlur={ this.handleInputBlur('labelHasFocus') }
              />
              <LineDayPicker
                onFocus={ this.setKeyTrue('dayPickerHasFocus') }
                onBlur={ this.handleInputBlur('dayPickerHasFocus') }
              />
              <LineInput
                maxWidth='25rem'
                alignRight
                placeholder='$0.00'
                onFocus={ this.setKeyTrue('plannedHasFocus') }
                onBlur={ this.handleInputBlur('plannedHasFocus') }
              />
            </LineItemFlexContainer> :
            <ClickableLineItemFlexContainer onClick={ this.editLineItem } tabIndex={0} onFocus={ this.editLineItem }>
              <LabelDisplayField>
                Budget Item Label 
              </LabelDisplayField>
              <AttributeDisplayField margin='0 1rem'>
                {moment(new Date()).format('MM/DD/YYYY')}
              </AttributeDisplayField>
              <AttributeDisplayField>
                $0.00
              </AttributeDisplayField>
            </ClickableLineItemFlexContainer>
        }
      </LineItemContainer>
    );
  }
}

// LineItem.propTypes = {
//   hasFocus: PropTypes.bool.isRequired,
// };

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
