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
        <MainLine></MainLine>
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
`;

const MainLine = styled.h2`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
`;