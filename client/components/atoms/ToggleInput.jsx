// Vendor Import
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Custom Imports


class ToggleInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInput: false,
      value: 'Test Category',
    };
    this.inputRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (this.state.isInput && (this.state.isInput !== prevState.isInput)) {
      this.inputRef.current.select();
      this.inputRef.current.focus();
    }
  }
  
  handleClick() {
    this.setState({
      isInput: true,
    });
  }

  handleOnBlur() {
    this.setState({
      isInput: false,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { isInput, value } = this.state;
    return (
      <ToggleInputContainer>
        {
          isInput ?
            <ToggleInputTextField
              value={ value }
              onBlur={ this.handleOnBlur }
              ref={ this.inputRef }
              onChange={ this.handleChange }
              placeholder='Category Title'
            /> :
            <ToggleInputDisplay onClick={ this.handleClick }>{ value.trim() === '' ? 'Category Title' : value }</ToggleInputDisplay>
        }
      </ToggleInputContainer>
    );
  }
}

ToggleInput.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ToggleInput;



const ToggleInputContainer = styled.div`
  min-width: 20rem;
  display: inline-block;
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
  font-family: ${({theme}) => theme.typeFont};
  color: ${({ theme }) => theme.black};
  font-weight: 700;
  border: 1px solid #333;
  padding: 0.3rem;
  &:focus {
    outline: 0;
  }
`;