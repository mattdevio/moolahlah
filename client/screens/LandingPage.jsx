/*----------  Custom Imports  ----------*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import AuthenticationBox from '@/components/AuthenticationBox';

/*===================================
=            LandingPage            =
===================================*/

class LandingPage extends PureComponent {
  render() {
    const {
      windowWidth,
      windowHeight,
    } = this.props;
    return (
      <LandingPageContainer width={ windowWidth } height={ windowHeight }>
        <MoolahlahLogo />
        <SubLogo />
        <TagLine>
          The first step to saving money<br />
          is to make a plan!
        </TagLine>
        <AuthenticationBox />
      </LandingPageContainer>
    );
  }
}

LandingPage.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  windowWidth: state.ui.windowWidth,
  windowHeight: state.ui.windowHeight,
});

export default connect(mapStateToProps)(LandingPage);

/*=====  End of LandingPage  ======*/



const LandingPageContainer = styled.div.attrs({
  style: ({ width, height}) => ({
    width: `${width}px`,
    minHeight: `${height}px`,
  }),
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.white};
  padding: 1.5rem;
`;

const MoolahlahLogo = styled.img.attrs({
  src: '/assets/image/moolahlah_logo.png',
  alt: 'Moolahlah',
})`
  width: 300px;
  margin-bottom: 2rem;
`;

const SubLogo = styled.p.attrs({
  children: 'Personal Finance Manager',
})`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  margin: 0 0 2rem 0;
  color: ${({ theme }) => theme.skyBlue};
`;

const TagLine = styled.span`
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 400;
  color: ${({ theme }) => theme.skyBlue};
`;
