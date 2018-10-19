/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

/*----------  Custom Imports  ----------*/
import { setWindowDimensions } from '@/state/ducks/ui';
import { checkSession } from '@/state/ducks/auth';

/**
 * bootstrapApp
 * Initialize the app
 */
const bootstrapApp = (Component) => {
  class BootstrapApp extends React.Component {

    constructor(props) {
      super(props);
      this.resizeWindow = this.resizeWindow.bind(this);
    }

    resizeWindow() {
      this.props.updateDimensions(window.innerWidth, window.innerHeight);
    }

    componentDidMount() {
      this.props.checkSession();
      window.addEventListener('resize', this.resizeWindow);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeWindow);
    }

    render() {
      const { readyToDisplay } = this.props;
      return readyToDisplay ? <Component /> : null;
    }

  } // end class BootstrapApp

  BootstrapApp.propTypes = {
    updateDimensions: func.isRequired,
    checkSession: func.isRequired,
    readyToDisplay: bool.isRequired,
  };

  const mapStateToProps = state => ({
    readyToDisplay: state.ui.readyToDisplay,
  });

  const mapDispatchToProps = (dispatch) => ({
    updateDimensions: (width, height) => dispatch(setWindowDimensions(width, height)),
    checkSession: () => dispatch(checkSession()),
  });

  return connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(BootstrapApp);
};

export default bootstrapApp;
