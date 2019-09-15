import React from 'react';
import mockAxios from 'axios';

import moment from 'moment';
import { shallow } from 'enzyme';
import CreateEventPage from '../CreateEventPage';

const props = {
  classes: {},
  history: {
    push: () => {},
  },
};
describe('CreateEventPage', () => {
  it('CreateEventPage exist', () => {
    const component = shallow(<CreateEventPage {...props} />);
    expect(component.find('.createEvent').length).toEqual(1);
  });
  it('onChangeField', () => {
    const target = { name: 'name', value: 'new name' };
    const component = shallow(<CreateEventPage {...props} />);
    expect(component.instance().state.name).toEqual('');
    component.instance().onChangeField({ target });
    expect(component.instance().state.name).toEqual(target.value);
  });
  it('uploadFile', () => {
    const files = [{ name: 'file' }];
    const component = shallow(<CreateEventPage {...props} />);
    expect(component.instance().state.files).toEqual([]);
    component.instance().uploadFile(files);
    expect(component.instance().state.files).toEqual(files);
  });

  it('checkRequiredFields', () => {
    const component = shallow(<CreateEventPage {...props} />);
    expect(component.instance().state.emptyErrors).toEqual([]);
    component.instance().checkRequiredFields();
    expect(component.instance().state.emptyErrors).toEqual(['startTime', 'endTime', 'name', 'description']);
  });
  it('onSubmit with not valid date', () => {
    const state = {
      name: 'Event name',
      description: 'some description',
      startDate: moment().subtract(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      startTime: '01:00',
      endTime: '04:00',
      files: [{ name: 'file' }],
    };
    const component = shallow(<CreateEventPage {...props} />);

    component.setState({ ...state });
    expect(component.instance().state.emptyErrors).toEqual([]);
    component.instance().onSubmit();
    expect(component.instance().state.emptyErrors).toEqual(['startDate', 'endDate', 'startTime', 'endTime']);
  });
  it('onSubmit with an empty required fields', () => {
    const state = {
      name: '',
      description: '',
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(2, 'days').format('YYYY-MM-DD'),
      startTime: '01:00',
      endTime: '04:00',
      files: [{ name: 'file' }],
    };
    const component = shallow(<CreateEventPage {...props} />);

    component.setState({ ...state });
    expect(component.instance().state.emptyErrors).toEqual([]);
    component.instance().onSubmit();
    expect(component.instance().state.emptyErrors).toEqual(['name', 'description']);
  });
  it('onSubmit success', () => {
    const state = {
      name: 'Event name',
      description: 'some description',
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(2, 'days').format('YYYY-MM-DD'),
      startTime: '01:00',
      endTime: '04:00',
      files: [{ name: 'file' }],
    };
    const component = shallow(<CreateEventPage {...props} />);
    const postSpy = spyOn(mockAxios, 'post').and.returnValue(Promise.resolve({ data: { data: 'some' } }));

    expect(postSpy).toHaveBeenCalledTimes(0);

    component.setState({ ...state });
    component.instance().onSubmit();

    expect(postSpy).toHaveBeenCalledTimes(1);
  });
});
