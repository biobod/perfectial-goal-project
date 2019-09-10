import React from 'react';
import { shallow, mount } from 'enzyme';
import Notification from '../Notification';

const props = {};
const messages = [{ message: 'text 1', key: '1', type: 'error' }, { message: 'text 2', key: '2', type: 'error' }];

describe('Notification', () => {
  it('Notification exist', () => {
    const component = shallow(<Notification {...props} />);
    expect(component.find('.notification').length).toEqual(1);
  });
  it('onClose', () => {
    const component = shallow(<Notification {...props} />);
    component.instance().setState({ messages });
    expect(component.instance().state.messages).toEqual(messages);
    component.instance().onClose('2');
    expect(component.instance().state.messages).toEqual([{ message: 'text 1', key: '1', type: 'error' }]);
  });
  it('show', () => {
    const newMessage = { message: 'test 3' };
    const component = mount(<Notification />);
    component.instance().create({ ...props });
    component.instance().notification.setState({ messages });
    expect(component.instance().notification.state.messages).toEqual(messages);
    expect(component.instance().notification.state.messages.length).toEqual(2);
    const { show } = component.instance();
    show(newMessage);
    expect(component.instance().notification.state.messages.length).toEqual(3);
  });
});
