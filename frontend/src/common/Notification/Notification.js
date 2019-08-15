import React, { Component } from 'react';
import { render } from 'react-dom';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

const classes = {
  content: {
    backgroundColor: '#d32f2f',
    margin: '5px 0',
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
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 5,
  },
};


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.notification = null;
    this.notificationId = 0;
    this.timerId = null;
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.createMessageKey = this.createMessageKey.bind(this);
  }

  componentWillUnmount() {
    if (this.timerId) clearTimeout(this.timerId);
  }

  onClose = (key) => {
    const { messages } = this.state;
    const filteredMessages = messages.filter(m => m.key !== key);
    this.setState({ messages: filteredMessages });
  }

  createMessageKey(props, key = `message-${this.notificationId++}`) {
    this.timerId = setTimeout(() => {
      this.onClose(key);
    }, 5500);
    return { ...props, key };
  }

  show({ message }) {
    const { notification } = this;
    const { messages } = notification.state;
    const newMessage = notification.createMessageKey({ message });
    notification.setState({ message, open: true, messages: [...messages, newMessage] });
  }

  create(props) {
    const container = document.body;
    const containerElement = document.createElement('div');
    container.appendChild(containerElement);
    const notification = render(
      <Notification
        {...this.props}
        {...props}
        ref={(node) => { this.notification = node; }}
      />,
      containerElement,
    );
    return notification;
  }

  render() {
    const { messages } = this.state;
    const isOpen = !!messages.length;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isOpen}
      >
        <div>
          {messages.map(({ message, key }) => (
            <SnackbarContent
              aria-describedby="client-snackbar"
              style={classes.content}
              message={(
                <span id="client-snackbar" style={classes.message}>
                  <ErrorIcon style={classes.icon} />
                  <div style={classes.text}>{message}</div>
                </span>
            )}
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => this.onClose(key)}>
                  <CloseIcon style={classes.icon} />
                </IconButton>,
              ]}
            />
          ))}
        </div>
      </Snackbar>
    );
  }
}


Notification.propTypes = {};

Notification.create = Notification.prototype.create;
Notification.show = Notification.prototype.show;


export default Notification;
