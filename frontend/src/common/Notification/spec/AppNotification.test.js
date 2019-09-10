import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../Notification';
import AppNotifications from '../AppNotifications';

describe('AppNotifications', () => {
  it('render', () => {
    const AppNotificationsComponent = () => AppNotifications;
    const NotificationMock = () => Notification.create({ className: 'app-toaster' });

    const component = shallow(<AppNotificationsComponent />);
    const mockToaster = shallow(<NotificationMock />);
    expect(component).toEqual(mockToaster);
  });
});
