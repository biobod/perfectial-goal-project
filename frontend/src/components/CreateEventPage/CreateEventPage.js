import React, { Component } from 'react';
import {
  Button, TextField, Grid, InputAdornment,
} from '@material-ui/core';
import FormData from 'form-data';
import { shape, string } from 'prop-types';
import moment from 'moment';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { uri } from '../../../../config/config';
import Notification from '../../common/Notification/Notification';
import routes from '../../constants/routes';

const createEventQuery = `
  mutation createEvent(
      $name: String!,
      $description: String!,
      $start: String!,
      $end: String!,
      $creatorId: ID!
      $contribution: Int!,
      $image: Upload!
  ) {
      createEvent(
          name: $name,
          description: $description,
          start: $start,
          end: $end,
          creatorId: $creatorId,
          contribution: $contribution,
          image: $image
      )
      {
        _id
      }
  }`;

const requiredFields = ['startDate', 'endDate', 'startTime', 'endTime', 'name', 'description'];
class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      startTime: '',
      contribution: 0,
      endTime: '',
      files: [],
      emptyErrors: [],
    };
  }

  onChangeField = (e) => {
    const { name, value } = e.target;
    this.setState(state => ({ [name]: value, emptyErrors: state.emptyErrors.filter(v => v !== name) }));
  }

  uploadFile = files => this.setState({ files })

  checkRequiredFields = () => {
    const { state } = this;
    const emptyErrors = requiredFields.map((key) => {
      if (!state[key].trim().length) {
        return key;
      }
      return null;
    }).filter(v => v);
    this.setState({ emptyErrors });
    return emptyErrors;
  }

  onSubmit = () => {
    const { user, history } = this.props;
    const {
      startDate, endDate, startTime, endTime, name, description, contribution, files,
    } = this.state;

    const emptyRequiredFields = this.checkRequiredFields();
    if (emptyRequiredFields.length) {
      const manyFields = emptyRequiredFields.length > 1;
      Notification.show({ message: `Required field${manyFields ? 's' : ''} ${emptyRequiredFields} ${manyFields ? 'are' : 'is'} empty` });
      return;
    }
    const validStartDate = `${startDate}T${startTime}`;
    const validEndDate = `${endDate}T${endTime}`;
    const createEvent = {
      query: createEventQuery,
      variables: {
        name,
        description,
        contribution: +contribution,
        creatorId: user._id,
        start: validStartDate,
        end: validEndDate,
        image: null,
      },
    };
    const map = {
      6: ['variables.image'],
    };
    const fd = new FormData();
    fd.append('operations', JSON.stringify(createEvent));
    fd.append('map', JSON.stringify(map));
    fd.append('6', files[0]);

    axios.post(uri, fd).then((res) => {
      const { data } = res;
      if (data.errors) {
        data.errors.map(({ message }) => Notification.show({ message }));
      } else if (data.data) {
        const eventId = data.data.createEvent._id;
        Notification.show({ message: 'Event was successfully created! You will be redirected to detail page', type: 'success' });
        setTimeout(() => {
          history.push(`${routes.EVENT_DETAIL}/${eventId}`);
        }, 1500);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const {
      startDate, endDate, startTime, endTime, contribution, name, description, emptyErrors,
    } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          item
          sm={8}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <h2>Create event</h2>
          <TextField
            label="Title"
            fullWidth
            name="name"
            required
            error={emptyErrors.includes('name')}
            value={name}
            onChange={this.onChangeField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="Description"
            name="description"
            value={description}
            onChange={this.onChangeField}
            multiline
            error={emptyErrors.includes('description')}
            required
            rowsMax="4"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <div className={classes.fieldWrapper}>
            <div className={classes.dateSection}>
              <TextField
                label="Start date"
                type="date"
                name="startDate"
                required
                error={emptyErrors.includes('startDate')}
                value={startDate}
                onChange={this.onChangeField}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Start time"
                required
                type="time"
                name="startTime"
                error={emptyErrors.includes('startTime')}
                onChange={this.onChangeField}
                className={classes.time}
                value={startTime}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
            <div className={classes.dateSection}>
              <TextField
                label="End date"
                type="date"
                name="endDate"
                value={endDate}
                error={emptyErrors.includes('endDate')}
                required
                onChange={this.onChangeField}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End time"
                type="time"
                margin="normal"
                variant="outlined"
                required
                name="endTime"
                error={emptyErrors.includes('endTime')}
                className={classes.time}
                value={endTime}
                onChange={this.onChangeField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
          </div>
          <div className={classes.fieldWrapper}>
            <TextField
              label="contribution"
              type="number"
              defaultValue={0}
              name="contribution"
              value={contribution}
              onChange={this.onChangeField}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">UAH</InputAdornment>,
              }}
            />
          </div>
          <div className={classes.fieldWrapper}>
            <DropzoneArea
              acceptedFiles={['image/*']}
              onChange={this.uploadFile}
              showAlerts={false}
              dropzoneClass={classes.dropZone}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonCls}
            onClick={this.onSubmit}
          >
            Create event
          </Button>
        </Grid>
      </div>
    );
  }
}


CreateEventPage.propTypes = {
  classes: shape({}).isRequired,
  history: shape({}).isRequired,
  user: shape({
    id: string,
  }),
};
CreateEventPage.defaultProps = {
  user: {},
};

export default CreateEventPage;
