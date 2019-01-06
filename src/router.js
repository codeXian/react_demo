import { lazy } from 'react';

const routers = [
  {
    component: lazy(() =>
      import(/* webpackChunkName: "home" */ './routes/Home'),
    ),
    exact: true,
    icon: 'home',
    name: '首页',
    path: '/',
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName: "about" */ './routes/Context'),
    ),
    exact: false,
    icon: 'book',
    name: 'react_context',
    path: '/context/',
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName: "users" */ './routes/ReduxSaga'),
    ),
    exact: false,
    icon: 'user',
    name: 'redux_sagia',
    path: '/redux-saga/',
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName: "login" */ './routes/Login'),
    ),
    exact: false,
    icon: 'contacts',
    name: '登陆',
    path: '/login/',
  },
  {
    component: lazy(() =>
      import(/* webbapckChunkName "memo" */ './routes/Memo'),
    ),
    exact: false,
    icon: 'read',
    name: 'memo',
    path: '/path/',
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName "lazy" */ './routes/Lazy'),
    ),
    exact: false,
    icon: 'arrow-down',
    name: 'lazy',
    path: '/lazy/',
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName "react-component" */ './routes/ReactComponent'),
    ),
    exact: false,
    icon: 'arrow-up',
    name: 'react-component',
    path: '/eact-component/',
  },
];

export default routers;
