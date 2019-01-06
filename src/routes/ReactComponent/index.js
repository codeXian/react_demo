import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

class Welcome extends React.Component {
  constructor(props) {
    console.log('Welcome', 'constructor');
    super(props);
    let numberArray = [];
    for (let index = 1; index <= 100; index++) {
      const element = index;
      numberArray.push(element);
    }
    this.state = {
      getNameIndex: null,
      numberArray,
    };
    this.divRef = React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    // 用于transition动画组件居多
    console.log('Welcome', 'getDerivedStateFromProps', props);
    if (props.nameIndex !== state.nameIndex) {
      return null;
    } else {
      return {
        getNameIndex: props.nameIndex,
      };
    }
  }
  componentDidMount = () => {
    console.log('Welcome', 'componentDidMount', this.divRef);
  };
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Welcome', 'shouldComponentUpdate');
    if (nextProps.nameIndex === this.props.nameIndex) {
      return false;
    }
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Welcome', 'getSnapshotBeforeUpdate', this.divRef.current);
    return null;
  }
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log('Welcome', 'componentDidUpdate', prevProps);
  };
  componentWillUnmount = () => {
    console.log('Welcome', 'componentWillUnmount');
  };
  render() {
    console.log('Welcome', 'render');
    return (
      <React.Fragment>
        <div
          ref={this.divRef}
          id="welcome-parent"
          data-nameindex={this.props.nameIndex}
        >
          Hello, {this.props.name}{' '}
          <span style={{ color: 'red' }}>{this.props.nameIndex}</span>
        </div>
        <div className={styles.wrapper}>
          {this.state.numberArray.map(item => (
            <div key={item} >{item}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default class ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameIndex: 0,
      nameArray: ['Kobe', 'codexian'],
    };
  }
  handleClickBtn = () => {
    this.setState({
      nameIndex: Math.floor(Math.random() * 2),
    });
  };
  render() {
    return (
      <div>
        <div>
          按钮: <Button onClick={this.handleClickBtn}>改变名字</Button>
        </div>
        <Welcome
          name={this.state.nameArray[this.state.nameIndex]}
          nameIndex={this.state.nameIndex}
        />
      </div>
    );
  }
}
