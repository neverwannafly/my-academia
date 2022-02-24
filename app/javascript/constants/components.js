import { unsetUser } from '@app/store/user';

// eslint-disable-next-line import/prefer-default-export
export const MENU_ITEMS = [{
  label: 'Profile',
  onClick: ({ history }) => {
    history.push('/profile');
  },
},
{
  label: 'Logout',
  onClick: ({ dispatch, history }) => {
    dispatch(unsetUser());
    history.push('/');
  },
}];
