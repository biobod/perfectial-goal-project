import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { shape, string } from 'prop-types';
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
import { gql } from 'apollo-boost';

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

const NavBar = ({ classes, history, user }) => {
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
      <MenuItem onClick={goToAccountProfile}>My account</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>

    </Menu>
  );

  return (
    <div className={classes.wrapper}>
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
                <AccountCircle />
              </IconButton>

            </div>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    </div>
  );
};
NavBar.propTypes = {
  classes: shape({}).isRequired,
  history: shape({}).isRequired,
  user: shape({
    name: string,
  }).isRequired,
};

export const getUser = gql`
    query user {
        user @client {
            name
            _id
            email
        }
    }
`;

const NavBarContainer = graphql(getUser, {
  props: ({ data: { user } }) => ({ user }),
})(NavBar);
export default withRouter(withStyles(styles)(NavBarContainer));
