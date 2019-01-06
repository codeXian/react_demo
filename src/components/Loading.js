import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  static propTypes = {
    delay: PropTypes.number,
  };
  static defaultProps = {
    delay: 200,
  };
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };
  }
  componentDidMount = () => {
    this.timer = setTimeout(() => {
      this.setState({ showLoading: true });
    }, this.props.delay);
  };
  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };
  render() {
    return this.state.showLoading && <div>loading...</div>;
  }
}
