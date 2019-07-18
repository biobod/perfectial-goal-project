import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import { withStyles } from '@material-ui/styles';
import { getUser } from '../APIUtilites/clientQuery';

const styles = {
  grow: {
    flexGrow: 1,
  },
  wrapper: {
    marginBottom: 20,
  },
  topBar: {
    justifyContent: 'flex-end',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginRight: '10px',
  },
};

const NavBar = ({ classes, history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);
  const goToAccountProfile = () => {
    handleMenuClose();
    history.push('/account_profile');
  };
  const goToHome = () => history.push('/');

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
      <MenuItem onClick={goToAccountProfile}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>

    </Menu>
  );

  return (
    <div className={classes.wrapper}>
      <Query query={getUser}>
        {({ data: { user }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error || !user) return <div> no user found</div>;
          return (
            <div>
              <AppBar position="static">
                <Toolbar className={classes.topBar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Menu"
                    onClick={goToHome}
                  >
                    <HomeIcon />
                  </IconButton>
                  <div className={classes.grow} />
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
                      <AccountCircle />
                    </IconButton>

                  </div>
                </Toolbar>
              </AppBar>
              {renderMenu}
            </div>
          );
        }}
      </Query>
    </div>
  );
};


export default withRouter(withStyles(styles)(NavBar));
