/* eslint-disable import/prefer-default-export */
import { unsetUser } from '@app/store/user';

export const HEADER_ITEMS = [
  {
    label: 'Profile',
    url: '/profile',
  },
  {
    label: 'Mock tests',
    url: '/mock-test',
  },
  {
    label: 'Todo',
    url: '/todo',
  },
  {
    label: 'IDE',
    url: '/ide',
  },
];

export const MENU_ITEMS = [
  {
    label: 'Profile',
    onClick: ({ history }) => {
      history.push('/profile');
    },
  },
  {
    label: 'Todo',
    onClick: ({ history }) => {
      history.push('/todo');
    },
  },
  {
    label: 'IDE',
    onClick: ({ history }) => {
      history.push('/ide');
    },
  },
  {
    label: 'Logout',
    onClick: ({ dispatch, history }) => {
      dispatch(unsetUser());
      history.push('/');
    },
  },
];

export const FILTER_STATES = [
  {
    id: 1,
    name: 'bookmarked',
  },
  {
    id: 2,
    name: 'complete',
  },
  {
    id: 3,
    name: 'incomplete',
  },
];

export const FILTER_TYPES = [
  {
    id: 1,
    name: 'problem',
  },
  {
    id: 2,
    name: 'article',
  },
];
