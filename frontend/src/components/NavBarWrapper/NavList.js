import React from 'react';
import { shape } from 'prop-types';
import {
  Icon, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import routes from '../../constants/routes';

const navList = [
  {
    path: routes.CREATE,
    icon: 'add_circle',
    text: 'Create event',
  },
  {
    path: routes.MY,
    icon: 'star_alt',
    text: 'My events',
  },
  {
    path: routes.FAVORITE,
    icon: 'favorite',
    text: 'Favorite events',
  },
  {
    path: routes.MAYBE,
    icon: 'thumbs_up_down',
    text: 'Maybe events',
  },
  {
    path: routes.REJECTED,
    icon: 'cancel',
    text: 'Rejected events',
  },
  {
    path: routes.ACCOUNT_PROFILE,
    icon: 'account_circle',
    text: 'My account',
  },
];
const NavList = ({ history, location }) => (
  <List>
    {navList.map((item) => {
      const color = location.pathname === item.path ? 'secondary' : '';
      return (
        <ListItem button key={item.text} onClick={() => history.push(item.path)}>
          <ListItemIcon><Icon color={color}>{item.icon}</Icon></ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      );
    })}
  </List>
);

NavList.propTypes = {
  history: shape({}).isRequired,
  location: shape({}).isRequired,
};

export default NavList;
