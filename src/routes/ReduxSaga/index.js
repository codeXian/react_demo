import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios, { cancel } from '@/axios';
import globalActions from '@/redux/actions/global';

const {
  reducers: { incrementCounter, decrementCounter },
  effects: { incrementCounterAsync, fetchUserDataAsync },
} = globalActions;

class ReduxSaga extends Component {
  handleClickSend = async () => {
    const res = await axios.get('/api/test');
    console.log(res);
  };

  handleClickStop = () => {
    if (typeof cancel === 'function') {
      cancel('取消请求');
    }
  };

  render() {
    return (
      <div>
        <div>{this.props.counter}</div>
        <div>
          <Button onClick={this.handleClickSend}>发送请求</Button>
        </div>
        <div>
          <Button onClick={this.handleClickStop}>停止请求</Button>
        </div>
        <div>
          <Button onClick={this.props.incrementCounter}>couter增加</Button>
        </div>
        <div>
          <Button onClick={this.props.decrementCounter}>couter减少</Button>
        </div>
        <div>
          <Button onClick={this.props.incrementCounterAsync}>
            click couter 1s 之后 增加
          </Button>
        </div>
        <div>
          <Button onClick={this.props.fetchUserDataAsync}>
            异步请求用户数据
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    global: { counter },
  } = state;
  return { counter };
};

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  incrementCounterAsync,
  fetchUserDataAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxSaga);
