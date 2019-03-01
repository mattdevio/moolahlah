// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom imports
import { updatePassword } from '@/state/ducks/auth';

class UpdatePassword extends Component {

  constructor(props) {
    super(props);
    this.state={
      password: '',
      error: '',
    };
    this.updateKey = this.updateKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const password = this.state.password.trim();
    if (password.length < 6) {
      return this.setState({
        error: 'Password must be atleast 6 characters',
      });
    }
    if (!password.match(/\d/)) {
      return this.setState({
        error: 'Password must contain a number',
      });
    }
    this.setState({
      error: '',
      password: '',
    });
    this.props.dispatchUpdatePassword(password);
  }

  updateKey(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
        error: '',
      });
    };
  }

  render() {
    return (
      <UPContainer>
        <ChangePasswordTitle>
          Update Password
        </ChangePasswordTitle>
        <PasswordField
          placeholder='Password...'
          type='password'
          value={ this.state.password }
          onChange={ this.updateKey('password') }
        />
        { !!this.state.error && <ErrorBox>
          Error: { this.state.error }
        </ErrorBox> }
        <SubmitPassword onClick={ this.handleSubmit }>
          Submit New Password
        </SubmitPassword>
      </UPContainer>
    );
  }

}

UpdatePassword.propTypes = {
  dispatchUpdatePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchUpdatePassword: password => dispatch(updatePassword({ password })),
});

export default connect(null, mapDispatchToProps)(UpdatePassword);

const UPContainer = styled.div`
  width: 100%;
  padding: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
`;

const ChangePasswordTitle = styled.p`
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  letter-spacing: 0.3rem;
  margin: 0;
  padding: 1rem 0;
  text-align: center;
`;

const PasswordField = styled.input`
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

const SubmitPassword = styled.button`
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