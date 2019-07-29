import React, { Component } from 'react';
import {
  Button, TextField, Grid,
} from '@material-ui/core';
import { shape, string } from 'prop-types';
import moment from 'moment';


class CreateEventPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      startTime: '',
      endTime: '',
    };
  }

  onChangeField = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = () => {
    const { user } = this.props;
    const {
      startDate, endDate, startTime, endTime,
    } = this.state;
    const validStartDate = `${startDate}T${startTime}`;
    const validEndDate = `${endDate}T${endTime}`;

    console.log(this.state, { user });
  }

  render() {
    const { classes } = this.props;
    const {
      startDate, endDate, startTime, endTime, contribution, name, description,
    } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          item
          sm={9}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TextField
            label="Title"
            fullWidth
            name="name"
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
            rowsMax="4"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <div className={classes.dateSection}>
            <TextField
              label="Start date"
              type="date"
              name="startDate"
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
              type="time"
              name="startTime"
              onChange={this.onChangeField}
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
              name="endTime"
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
          <div className={classes.dateSection}>
            <TextField
              label="contribution"
              type="number"
              defaultValue={0}
              name="contribution"
              value={contribution}
              onChange={this.onChangeField}
              margin="normal"
              variant="outlined"
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
  user: shape({
    id: string,
  }),
};
CreateEventPage.defaultProps = {
  user: {},
};

export default CreateEventPage;
