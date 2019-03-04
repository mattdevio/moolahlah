// Vendor Import
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

// Custom Imports
import { requestDeleteCategory } from '@/state/ducks/budget';


class ToggleInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      inputHasFocus: false,
      trashHasFocus: false,
    };
    this.inputRef = React.createRef();
    this.gainFocus = this.gainFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.setKeyTrue = this.setKeyTrue.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  deleteCategory() {
    this.setState({
      hasFocus: false,
    });
    const { dispatchRequestDeleteCategory, accessId, isDebit } = this.props;
    dispatchRequestDeleteCategory({
      accessId,
      isDebit,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasFocus && this.state.hasFocus) {
      this.inputRef.current.select();
      this.inputRef.current.focus();
    }
  }
  
  gainFocus() {
    this.setState({
      hasFocus: true,
    });
  }

  setKeyTrue(key) {
    return () => {
      this.setState({
        [key]: true,
      });
    };
  }

  handleOnBlur(key) {
    return () => {
      this.setState({
        [key]: false,
      }, () => {
        setTimeout(() => {
          const { inputHasFocus, trashHasFocus } = this.state;
          if (!(inputHasFocus || trashHasFocus)) {
            this.setState({
              hasFocus: false,
            });
          }
        }, 50);
      }); 
    };
  }

  render() {
    const { hasFocus } = this.state;
    const { value, onValueChange, placeholder, canEdit, categoryIsBeingDeleted } = this.props;
    if (canEdit && !categoryIsBeingDeleted) {
      return (
        <ToggleInputContainer>
          {
            hasFocus ?
              <Fragment>
                <TrashButton
                  tabIndex={ 0 }
                  onBlur={ this.handleOnBlur('trashHasFocus') }
                  onFocus={ this.setKeyTrue('trashHasFocus') }
                  onClick={ this.deleteCategory }
                />
                <ToggleInputTextField
                  value={ value }
                  onBlur={ this.handleOnBlur('inputHasFocus') }
                  onFocus={ this.setKeyTrue('inputHasFocus') }
                  ref={ this.inputRef }
                  onChange={ e => onValueChange(e.target.value)}
                  placeholder={ placeholder }
                />
              </Fragment> :
              <ToggleInputDisplay
                onClick={ this.gainFocus }
                tabIndex={ 0 }
                onFocus={ this.gainFocus }
              >
                { value.trim() === '' ? placeholder : value }
                <EditIcon />
              </ToggleInputDisplay>
          }
        </ToggleInputContainer>
      );
    }
    return (
      <ToggleInputContainer>
        <NoEditDisplay>
          { value.trim() === '' ? placeholder : value }
        </NoEditDisplay>
      </ToggleInputContainer>
    );
  }
}

ToggleInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isDebit: PropTypes.bool.isRequired,
  accessId: PropTypes.string.isRequired,
  dispatchRequestDeleteCategory: PropTypes.func.isRequired,
  categoryIsBeingDeleted: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchRequestDeleteCategory: ({ accessId, isDebit }) => dispatch(requestDeleteCategory({ accessId, isDebit })),
});

export default connect(null, mapDispatchToProps)(ToggleInput);



const ToggleInputContainer = styled.div`
  min-width: 25rem;
  display: inline-block;
  margin: 0 1rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToggleInputDisplay = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({ theme }) => theme.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 700;
  width: 100%;
  margin: 0;
  cursor: pointer;
  padding: 0.3rem 0;
  border: 1px solid transparent;
  text-transform: uppercase;
  &:hover {
    background-color: ${({theme}) => theme.skyBlue};
  }
`;

const ToggleInputTextField = styled.input.attrs({
  type: 'text',
})`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont };
  color: ${({ theme }) => theme.black };
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.black };
  padding: 0.3rem;
  width: 100%;
  text-transform: uppercase;
  &:focus {
    outline: 0;
  }
`;

const NoEditDisplay = styled(ToggleInputDisplay)`
  cursor: inherit;
  &:hover {
    background-color: transparent;
  }
`;

const EditIcon = styled(FontAwesomeIcon).attrs({
  icon: 'pen-square',
})`
font-size: 2.5rem;
color: ${({ theme }) => theme.black};
margin: 0;
padding-bottom: 0.2rem;
padding-left: 0.6rem;
`;

const TrashButton = styled(FontAwesomeIcon).attrs({
  icon: 'trash',
})`
  font-size: 3rem;
  color: ${({ theme }) => theme.black};
  margin: 0 1rem 0 0;
  padding: 0.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.alertRed};
    color: ${({ theme }) => theme.white};
    outline: 0;
    border: 0.1rem solid ${({ theme }) => theme.skyBlue};
  }
`;