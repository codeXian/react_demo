import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';
import Loading from './components/Loading';
import { toggleCollapsed } from './redux/actions/global';

const HomeLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './routes/Home'),
  loading: Loading,
});

const AboutLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "about" */'./routes/About'),
  loading: Loading,
});

const UsersLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "users" */'./routes/Users'),
  loading: Loading,
});

const { Header, Sider, Content } = Layout;

class App extends Component {
  toggle = () => {
    this.props.toggleCollapsed(!this.props.global.collapsed);
  };

  render() {
    const { collapsed } = this.props.global;
    return (
      <BrowserRouter>
        <Layout className={styles.layout}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo}>
              {!collapsed ? 'react_demo' : 'react'}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <Link to="/" className={styles.link}>
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <Link to="/about/" className={styles.link}>
                  关于
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <Link to="/users/" className={styles.link}>
                  用户
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: '#fff',
                padding: 0,
              }}
            >
              <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route path="/" exact component={HomeLoadable} />
              <Route path="/about/" component={AboutLoadable} />
              <Route path="/users/" component={UsersLoadable} />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { global } = state;
  return {
    global,
  };
};

const mapDispatchToProps = {
  toggleCollapsed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
