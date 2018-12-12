import { Layout, Menu, Icon } from 'antd';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';
import globalActions from '@/redux/actions/global';
import routers from './router';

const {
  reducers: { toggleCollapsed },
} = globalActions;

const { Header, Sider, Content } = Layout;

class App extends PureComponent {
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
            <Menu theme="dark" mode="inline">
              {routers.map(router => (
                <Menu.Item key={router.path}>
                  <Icon type={router.icon} />
                  <Link
                    to={router.path}
                    className={classNames(styles.link, {
                      [styles.collapsed]: collapsed,
                    })}
                  >
                    {router.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content className={styles.content}>
              {routers.map(router => (
                <Route
                  key={router.path}
                  path={router.path}
                  exact={router.exact}
                  component={router.component}
                />
              ))}
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { global } = state;
  return {
    global,
  };
};

const mapDispatchToProps = { toggleCollapsed };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
