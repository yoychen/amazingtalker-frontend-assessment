import { mount } from '@vue/test-utils';
import ScheduleControl from '@/components/ScheduleControl.vue';
import { add } from '@/utils/date';
import { getByTestId } from '../helpers';

function setup(props) {
  const defaultProps = {
    date: new Date(),
  };
  const propsData = { ...defaultProps, ...props };

  return {
    wrapper: mount(ScheduleControl, {
      propsData,
    }),
  };
}

describe('ScheduleControl', () => {
  it('should render self', () => {
    const props = {
      date: new Date('2020/5/3'),
    };

    const { wrapper } = setup(props);

    const range = getByTestId(wrapper, 'range');
    expect(range.text()).toBe('2020/05/03 - 10');
  });

  test('last-week-btn will be disabled when the date of props is in current week', () => {
    const props = {
      date: new Date(),
    };

    const { wrapper } = setup(props);

    const lastWeekBtn = getByTestId(wrapper, 'last-week-btn');
    expect(lastWeekBtn.element.disabled).toBe(true);
  });

  it('should emit lastWeek event', () => {
    const nextWeekDate = add(new Date(), 7, 'day');
    const props = {
      date: nextWeekDate,
    };

    const { wrapper } = setup(props);
    getByTestId(wrapper, 'last-week-btn').trigger('click');

    expect(wrapper.emitted().lastWeek.length).toBe(1);
  });

  it('should emit nextWeek event', () => {
    const { wrapper } = setup();
    getByTestId(wrapper, 'next-week-btn').trigger('click');

    expect(wrapper.emitted().nextWeek.length).toBe(1);
  });
});
