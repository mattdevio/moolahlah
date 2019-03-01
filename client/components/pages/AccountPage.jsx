// Vendor Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import LogOutButton from '@/components/atoms/LogoutButton';
import UpdatePassword from '@/components/molecules/UpdatePassword';


class AccountPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 1rem auto' />
            <TitleBar>
              Account Management
            </TitleBar>
            <UpdatePassword />
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='darkBlue'>
          <TabSelector />
          <LogOutButton />
        </TabContentContainer>
      </Fragment>
    );
  }

}

export default AccountPage;

const TitleBar = styled.h2`
  font-size: 4rem;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.darkBlue};
  margin: 1.5rem 0;
  padding: 0;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  font-family: ${({ theme }) => theme.typeFont};
`;
