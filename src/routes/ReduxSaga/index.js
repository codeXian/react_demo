import { Button, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios, { cancel } from '@/axios';
import globalActions from '@/redux/actions/global';
import styles from './index.module.scss';

const {
  reducers: { incrementCounter, decrementCounter },
  effects: {
    incrementCounterAsync,
    fetchUserDataAsync,
    fetchUserDataTimeoutAsync,
    fetchProductsAsync,
    queneAsync,
    handleChangeInputThrottle,
  },
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
        <div>我是counter: {this.props.counter}</div>
        <div className={styles.item}>
          <Button onClick={this.props.incrementCounter}>couter增加</Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.props.decrementCounter}>couter减少</Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.handleClickSend}>发送请求</Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.handleClickStop}>停止请求</Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.props.incrementCounterAsync}>
            click couter 1s 之后 增加
          </Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.props.fetchUserDataAsync}>
            异步请求用户数据
          </Button>
        </div>
        <div className={styles.item}>
          <Button onClick={this.props.fetchUserDataTimeoutAsync}>
            异步超时1s请求用户数据
          </Button>
        </div>
        <div className={styles.item} onClick={this.props.fetchProductsAsync}>
          <Button>请求商品列表接口</Button>
        </div>
        <div
          className={styles.item}
          onClick={() => this.props.queneAsync(Math.ceil(Math.random() * 100))}
        >
          <Button>队列调用</Button>
        </div>
        <div className={styles.item}>
          节流实现
          <Input
            onChange={e => {
              e.persist();
              this.props.handleChangeInputThrottle(e.target.value);
            }}
          />
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
  fetchUserDataTimeoutAsync,
  fetchProductsAsync,
  queneAsync,
  handleChangeInputThrottle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxSaga);
