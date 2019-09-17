import React, { useState } from 'react';
import { shape, string, node } from 'prop-types';
import {
  AppBar, Toolbar, Typography, MenuItem, Menu,
  IconButton, useTheme, CssBaseline, Divider, Drawer, Icon,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withRouter } from 'react-router';
import routes from '../../constants/routes';
import NavList from './NavList';
import useStyles from './styles';


export const NavBarWrapper = ({
  history, user, children, location,
}) => {
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
    history.push(routes.ACCOUNT_PROFILE);
  };
  const goToHome = () => history.push('/');
  const logOut = () => {
    localStorage.removeItem('user');
    handleMenuClose();
    history.push(routes.LOGIN);
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
        <NavList history={history} location={location} />
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
  location: shape({}).isRequired,
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

export default withRouter(NavBarWrapper);
