import React, { Component } from 'react';
import { render } from 'react-dom';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';


const classes = {
  error: {
    backgroundColor: 'grey',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
};


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: null,
    };
    this.notification = null;
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
  }

  onClose = () => this.setState({ open: false })

  show({ message }) {
    const { notification } = this;
    notification.setState({ message, open: true });
  }

  create(props) {
    const container = document.body;
    const containerElement = document.createElement('div');
    container.appendChild(containerElement);
    const notification = render(
      <Notification
        {...props}
        ref={(node) => { this.notification = node; }}
      />,
      containerElement,
    );
    return notification;
  }

  render() {
    const { open, message } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={2000}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" styles={classes.message}>
                <ErrorIcon styles={classes.icon} />
                {message}
              </span>
            )}
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.onClose}>
                <CloseIcon styles={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

Notification.propTypes = {
};

Notification.create = Notification.prototype.create;
Notification.show = Notification.prototype.show;


export default Notification;
