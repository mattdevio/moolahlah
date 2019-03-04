// Vendor Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import LogOutButton from '@/components/atoms/LogoutButton';
import UpdatePassword from '@/components/molecules/UpdatePassword';
import UpdateEmail from '@/components/molecules/UpdateEmail';
import UpdateName from '@/components/molecules/UpdateName';
import AccountDisplayBox from '@/components/atoms/AccountDisplayBox';

class AccountPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { name, email, password } = this.props.authenticatedUser;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 1rem auto' />
            <TitleBar>
              Account Management
            </TitleBar>
            <AccountDisplayBox>
              Name: { name }
            </AccountDisplayBox>
            <AccountDisplayBox>
              Email: { email }
            </AccountDisplayBox>
            <AccountDisplayBox>
              Password: { password }
            </AccountDisplayBox>
            <UpdateName />
            <UpdateEmail />
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

AccountPage.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authenticatedUser: state.auth.authenticatedUser,
});

export default connect(mapStateToProps)(AccountPage);

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
