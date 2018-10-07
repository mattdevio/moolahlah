/*----------  Vendor imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/


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
        <h1>Hello World</h1>
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
  background: blue;
`;