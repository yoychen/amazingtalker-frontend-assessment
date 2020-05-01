import { mount } from '@vue/test-utils';
import TimeList from '@/components/TimeList.vue';
import { getAllByTestId, createFakeTimeSlot } from '../helpers';

function setup(props) {
  const defaultProps = {
    date: new Date(),
    timeSlots: [],
  };
  const propsData = { ...defaultProps, ...props };

  return {
    wrapper: mount(TimeList, {
      propsData,
    }),
  };
}

describe('TimeList', () => {
  it('should render self', () => {
    const props = {
      date: new Date('2020/5/1'),
      timeSlots: [
        createFakeTimeSlot('2020/5/1 10:00', 'booked'),
        createFakeTimeSlot('2020/5/1 10:30', 'booked'),
        createFakeTimeSlot('2020/5/1 12:00', 'booked'),
        createFakeTimeSlot('2020/5/1 13:00', 'available'),
        createFakeTimeSlot('2020/5/1 13:30', 'available'),
      ],
    };

    const { wrapper } = setup(props);

    const times = getAllByTestId(wrapper, 'time-slot');
    const timeLabels = times.wrappers.map((time) => time.text());
    expect(timeLabels).toStrictEqual([
      '10:00',
      '10:30',
      '12:00',
      '13:00',
      '13:30',
    ]);

    const availableTimes = times.filter((time) => time.classes('available'));
    expect(availableTimes.length).toBe(2);
  });
});
