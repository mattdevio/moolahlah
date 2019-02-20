// Vendor Import
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


class ToggleInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInput: false,
    };
    this.inputRef = React.createRef();
    this.turnOnInput = this.turnOnInput.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isInput && (this.state.isInput !== prevState.isInput)) {
      this.inputRef.current.select();
      this.inputRef.current.focus();
    }
  }
  
  turnOnInput() {
    this.setState({
      isInput: true,
    });
  }

  handleOnBlur() {
    this.setState({
      isInput: false,
    });
  }

  render() {
    const { isInput } = this.state;
    const { value, onValueChange, placeholder, canEdit } = this.props;
    if (canEdit) {
      return (
        <ToggleInputContainer>
          {
            isInput ?
              <ToggleInputTextField
                value={ value }
                onBlur={ this.handleOnBlur }
                ref={ this.inputRef }
                onChange={ e => onValueChange(e.target.value)}
                placeholder={ placeholder }
              /> :
              <ToggleInputDisplay
                onClick={ this.turnOnInput }
                tabIndex={ 0 }
                onFocus={ this.turnOnInput }
              >
                { value.trim() === '' ? placeholder : value }
              </ToggleInputDisplay>
          }
        </ToggleInputContainer>
      );
    }
    return (
      <ToggleInputContainer>
        <NoEditDisplay>
          { value.trim() === '' ? placeholder : value }
        </NoEditDisplay>
      </ToggleInputContainer>
    );
  }
}

ToggleInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default ToggleInput;



const ToggleInputContainer = styled.div`
  min-width: 25rem;
  display: inline-block;
  margin: 0 1rem 0 0;
`;

const ToggleInputDisplay = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({ theme }) => theme.black};
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  padding: 0.3rem 0;
  border: 1px solid transparent;
  &:hover {
    background-color: ${({theme}) => theme.skyBlue};
  }
`;

const ToggleInputTextField = styled.input.attrs({
  type: 'text',
})`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont };
  color: ${({ theme }) => theme.black };
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.black };
  padding: 0.3rem;
  width: 100%;
  &:focus {
    outline: 0;
  }
`;

const NoEditDisplay = styled(ToggleInputDisplay)`
  cursor: inherit;
  &:hover {
    background-color: transparent;
  }
`;