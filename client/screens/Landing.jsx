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
        <ProductDescription>
          Writing out your monthly budget by hand can be a difficult task.<br />Moolahlah makes it better!
        </ProductDescription>
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
  padding: 0.6rem 1.3rem;
  text-decoration: none;
  font-size: 2rem;
  border-radius: 0.4rem;
  background-color: ${({theme}) => theme.green};
  color: ${({theme}) => theme.darkGreen};
  font-family: ${({theme}) => theme.typeFont};
  cursor: pointer;
`;

const ProductDescription = styled.span`
  font-family: ${({theme}) => theme.accentFont};
  font-size: 2.6rem;
  color: #000;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

