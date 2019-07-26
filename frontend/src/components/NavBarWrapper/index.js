import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { shape, string, node } from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { gql } from 'apollo-boost';
import { useTheme } from '@material-ui/core';
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
                <AccountCircle />
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

          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
  props: ({ data }) => ({ user: data.user }),
})(NavBarWrapper);
export default withRouter(NavBarContainer);
