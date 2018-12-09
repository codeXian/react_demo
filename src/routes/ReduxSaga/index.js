import { Button } from 'antd';
import React, { Component } from 'react';
import axios, { cancel } from '../../axios';

export default class ReduxSaga extends Component {
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
        <Button onClick={this.handleClickSend}>发送请求</Button>
        <Button onClick={this.handleClickStop}>停止请求</Button>
      </div>
    );
  }
}
