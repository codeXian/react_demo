import Loadable from 'react-loadable';
import Loading from './components/Loading';

const routers = [
  {
    component: Loadable({
      loader: () => import(/* webpackChunkName: "home" */ './routes/Home'),
      loading: Loading,
    }),
    exact: true,
    icon: 'home',
    name: '首页',
    path: '/',
  },
  {
    component: Loadable({
      loader: () => import(/* webpackChunkName: "about" */ './routes/Context'),
      loading: Loading,
    }),
    exact: false,
    icon: 'book',
    name: 'react_context',
    path: '/context/',
  },
  {
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "users" */ './routes/ReduxSaga'),
      loading: Loading,
    }),
    exact: false,
    icon: 'user',
    name: 'redux_sagia',
    path: '/redux-saga/',
  },
  {
    component: Loadable({
      loader: () => import(/* webpackChunkName: "login" */ './routes/Login'),
      loading: Loading,
    }),
    exact: false,
    icon: 'contacts',
    name: '登陆',
    path: '/login/',
  },
  {
    component: Loadable({
      loader: () => import(/* webbapckChunkName "memo" */ './routes/Memo'),
      loading: Loading,
    }),
    exact: false,
    icon: 'read',
    name: 'memo',
    path: '/path/',
  },
];

export default routers;
