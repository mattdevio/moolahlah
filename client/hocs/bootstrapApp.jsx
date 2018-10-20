/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

/*----------  Custom Imports  ----------*/
import { checkSession } from '@/state/ducks/auth';

/**
 * bootstrapApp
 * Initialize the app
 */
const bootstrapApp = (Component) => {
  class BootstrapApp extends React.Component {

    componentDidMount() {
      this.props.checkSession();
    }

    render() {
      const { readyToDisplay } = this.props;
      return readyToDisplay ? <Component /> : null;
    }

  } // end class BootstrapApp

  BootstrapApp.propTypes = {
    checkSession: func.isRequired,
    readyToDisplay: bool.isRequired,
  };

  const mapStateToProps = state => ({
    readyToDisplay: state.ui.readyToDisplay,
  });

  const mapDispatchToProps = (dispatch) => ({
    checkSession: () => dispatch(checkSession()),
  });

  return connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(BootstrapApp);
};

export default bootstrapApp;
