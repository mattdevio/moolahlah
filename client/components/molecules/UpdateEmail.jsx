// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail'; 
import PropTypes from 'prop-types';

// Custom Imports
import { requestUpdateEmail } from '@/state/ducks/auth';


class UpdateEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
    };
    this.updateByKey = this.updateByKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateByKey(key) {
    return e => this.setState({
      [key]: e.target.value,
      error: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email.trim();
    if (!isEmail(email)) {
      return this.setState({
        error: 'Not a valid email address',
      });
    }

    this.props.dispatchRequestUpdateEmail(email);
  }

  render() {
    return (
      <UEContainer onSubmit={ this.handleSubmit }>
        <ChangeEmailTitle>
          Update Email
        </ChangeEmailTitle>
        <EmailField
          placeholder='Email...'
          onChange={ this.updateByKey('email') }
        />
        { !!this.state.error && <ErrorBox>
          Error: { this.state.error }
        </ErrorBox> }
        <SubmitEmail>
          Submit New Email
        </SubmitEmail>
      </UEContainer>
    );
  }

}

UpdateEmail.propTypes = {
  dispatchRequestUpdateEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchRequestUpdateEmail: email => dispatch(requestUpdateEmail({ email })),
});

export default connect(null, mapDispatchToProps)(UpdateEmail);

const UEContainer = styled.form`
  width: 100%;
  padding: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
  margin: 0 0 1rem 0;
`;

const ChangeEmailTitle = styled.p`
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

const EmailField = styled.input`
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

const SubmitEmail = styled.button`
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
