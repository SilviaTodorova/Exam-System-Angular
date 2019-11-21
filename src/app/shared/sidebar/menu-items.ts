import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Начало',
    icon: 'mdi mdi-file',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/rating',
    title: 'Резултати',
    icon: 'mdi mdi-bandcamp',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/progressbar',
    title: 'Налични тестове',
    icon: 'mdi mdi-poll',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/',
    title: 'Изход',
    icon: 'mdi mdi-power',
    class: '',
    extralink: false,
    submenu: []
  }
];
