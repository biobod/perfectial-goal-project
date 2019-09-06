import { convertEventDatesToNumber } from '../helpers';

const event = {
  start: '10',
  end: '12',
};

describe('helpers', () => {
  it('convertEventDatesToNumber', () => {
    const modifiedEvent = {
      start: 10,
      end: 12,
    };
    expect(convertEventDatesToNumber(null)).toEqual(null);
    expect(convertEventDatesToNumber(event)).toEqual(modifiedEvent);
  });
});
