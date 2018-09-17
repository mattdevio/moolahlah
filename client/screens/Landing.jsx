/*----------  Vendor Import  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/

/*======================================
=            Landing Screen            =
======================================*/

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
    };
    this.resizeWindow = this.resizeWindow.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow);
  }

  resizeWindow() {
    this.setState({
      height: window.innerHeight,
    });
  }

  render() {
    return (
      <LandingContainer height={this.state.height}>
        <Cow/>
        <CallToAction />
      </LandingContainer>
    );
  }
}

export default Landing;

/*=====  End of Landing Screen  ======*/

const LandingContainer = styled.div.attrs({
  style: ({ height }) => ({
    minHeight: `${(height - 150) / 10}em`,
  }),
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${({theme}) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Cow = styled.img.attrs({
  src: '/assets/image/maincow.png',
  alt: 'Cow'
})`
  width: 20em;
`;

const CallToAction = styled.button.attrs({
  children: 'Sign Up'
})`
  padding: 0.5rem 1rem;
  font-size: 2em;
  background-color: transparent;
  border: 2px solid ${({theme}) => theme.blue};
  border-radius: 0.3rem;
  font-family: ${({theme}) => theme.typeFont};
  cursor: pointer;
  transition: 0.3s all;
  margin-top: 1rem;
  &:hover {
    background-color: ${({theme}) => theme.blue};
  }
`;