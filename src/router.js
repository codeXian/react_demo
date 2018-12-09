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
      loader: () => import(/* webpackChunkName: "users" */ './routes/Users'),
      loading: Loading,
    }),
    exact: false,
    icon: 'user',
    name: '用户',
    path: '/users/',
  },
];

export default routers;
