import React, { useState } from 'react';
import { shape, string, node } from 'prop-types';
import {
  AppBar, Toolbar, Typography, MenuItem, Menu,
  IconButton, ListItem, ListItemIcon, ListItemText, List,
  useTheme, CssBaseline, Divider, Drawer, Icon,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import useStyles from './styles';


const NavBarWrapper = ({ history, user, children }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);


  const classes = useStyles({ open });

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);
  const closeAndRedirectToProfile = () => {
    handleMenuClose();
    history.push('/account_profile');
  };

  const goToHome = () => history.push('/');
  const logOut = () => {
    localStorage.removeItem('user');
    handleMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={closeAndRedirectToProfile}>My account</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>

    </Menu>
  );

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="static" className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}>
        <Toolbar className={classes.topBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={`${classes.menuButton} ${open ? classes.hide : ''}`}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={goToHome}
          >
            <HomeIcon />
          </IconButton>
          <div className={classes.grow} />
          {user && (
            <div className={classes.userSection}>
              <Typography variant="subtitle1" className={classes.name}>
                {user.name}
              </Typography>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Icon>account_circle</Icon>
              </IconButton>

            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={`${classes.drawer}`}
        classes={{
          paper: `${open ? classes.drawerOpen : classes.drawerClose}`,
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="create_event" onClick={() => history.push('/create_event')}>
            <ListItemIcon><Icon color="secondary">add_circle</Icon></ListItemIcon>
            <ListItemText primary="Create event" />
          </ListItem>
          <ListItem button key="favorite">
            <ListItemIcon><Icon color="secondary">favorite</Icon></ListItemIcon>
            <ListItemText primary="Favorite events" />
          </ListItem>
          <ListItem button key="my_events">
            <ListItemIcon><Icon color="secondary">star_alt</Icon></ListItemIcon>
            <ListItemText primary="My events" />
          </ListItem>
          <ListItem button key="maybe_events">
            <ListItemIcon><Icon>thumbs_up_down</Icon></ListItemIcon>
            <ListItemText primary="May be events" />
          </ListItem>
          <ListItem button key="rejected_events">
            <ListItemIcon><Icon>cancel</Icon></ListItemIcon>
            <ListItemText primary="Rejected events" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Account" onClick={() => history.push('/account_profile')}>
            <ListItemIcon><Icon>account_circle</Icon></ListItemIcon>
            <ListItemText primary="My account" />
          </ListItem>
        </List>
      </Drawer>
      {renderMenu}
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};
NavBarWrapper.propTypes = {
  history: shape({}).isRequired,
  children: node.isRequired,
  user: shape({
    name: string,
  }),
};
NavBarWrapper.defaultProps = {
  user: {
    name: '',
  },
};

export default NavBarWrapper;
