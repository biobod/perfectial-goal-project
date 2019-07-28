import { makeStyles } from '@material-ui/core';

const drawerWidth = 220;

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  wrapper: {
    // display: 'flex',
  },
  topBar: {
    justifyContent: 'flex-end',
    paddingLeft: '16px !important',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginRight: '10px',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    marginTop: 64,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: props => ({
    marginLeft: props.open ? drawerWidth : (theme.spacing(7) + 1),
  }),
}));
