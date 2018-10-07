/*----------  Vendor imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import AuthForm from './AuthForm';


/*==========================================
=            LandingPage Screen            =
==========================================*/

class LandingPage extends Component {
  render() {
    const {
      windowHeight,
    } = this.props;
    return (
      <LandingPageContainer minHeight={ windowHeight }>
        <LandingPageLogo />
        <MainLine>Personal Finance Manager</MainLine>
        <SubLine>
          The first step to saving money<br />
          is to make a plan!
        </SubLine>
        <AuthForm />
      </LandingPageContainer>
    );
  }
}

LandingPage.propTypes = {
  windowHeight: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  windowHeight: state.ui.windowHeight,
});

export default connect(mapStateToProps)(LandingPage);

/*=====  End of LandingPage Screen  ======*/

const LandingPageContainer = styled.div.attrs({
  style: ({ minHeight }) => ({
    minHeight: `${minHeight}px`,
  }),
})`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingPageLogo = styled.span`
  background: url(/assets/image/moolahlah_logo.png) no-repeat;
  background-size: 30rem 8.9rem;
  width: 30rem;
  height: 8.9rem;
  margin-bottom: 2rem;
`;

const MainLine = styled.h2`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  margin: 0 0 2rem 0;
`;

const SubLine = styled.p`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-align: center;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 400;
  margin: 0 0 2rem 0;
`;
