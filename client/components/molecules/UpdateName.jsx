// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import { requestUpdateName } from '@/state/ducks/auth';

class UpdateName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      error: '',
    };
    this.updateKey = this.updateKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const name = this.state.name.trim();
    if (!name) {
      return this.setState({
        error: 'Please provide a name.',
      });
    }
    this.props.dispatchRequestUpdateName(name);
  }

  updateKey(key) {
    return event => this.setState({
      [key]: event.target.value,
      error: '', 
    });
  }

  render() {
    const { error, name } = this.state;
    return (
      <UNContainer onSubmit={ this.handleSubmit }>
        <UNTitle>
          Update Name
        </UNTitle>
        <UNField
          placeholder='Name...'
          onChange={ this.updateKey('name') }
          value={ name }
        />
        { !!error && <ErrorBox>
          Error: { error }
        </ErrorBox> }
        <UNSubmit>
          Submit New Password
        </UNSubmit>
      </UNContainer>
    );
  }

}

UpdateName.propTypes = {
  dispatchRequestUpdateName: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchRequestUpdateName: name => dispatch(requestUpdateName({ name })),
});

export default connect(null, mapDispatchToProps)(UpdateName);

const UNContainer = styled.form`
  width: 100%;
  padding: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
`;

const UNTitle = styled.p`
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  letter-spacing: 0.2rem;
  margin: 0;
  padding: 0.5rem 0;
  text-align: center;
`;

const UNField = styled.input`
  width: 100%;
  margin: 0;
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

const UNSubmit = styled.button`
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