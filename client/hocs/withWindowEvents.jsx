/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import { setWindowDimensions } from '@/state/ducks/ui';

/**
 * withWindowEvents = HOC that updates window width and height in redux
 * @param  {Node} Component [A React Node]
 * @return {Node}           [The input React Node]
 */
const withWindowEvents = (Component) => {
  class WithWindowEvents extends React.Component {

    constructor(props) {
      super(props);
      this.resizeWindow = this.resizeWindow.bind(this);
    }

    resizeWindow() {
      this.props.updateDimensions(window.innerWidth, window.innerHeight);
    }

    componentDidMount() {
      window.addEventListener('resize', this.resizeWindow);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeWindow);
    }

    render() {
      return <Component />;
    }

  } // end class WithWindowEvents

  WithWindowEvents.propTypes = {
    updateDimensions: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    updateDimensions: (width, height) => dispatch(setWindowDimensions(width, height)),
  });

  return connect(null, mapDispatchToProps, null, { pure: false })(WithWindowEvents);
};

export default withWindowEvents;
