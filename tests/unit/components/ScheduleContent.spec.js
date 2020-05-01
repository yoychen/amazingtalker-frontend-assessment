import { mount } from '@vue/test-utils';
import ScheduleContent from '@/components/ScheduleContent.vue';
import TimeList from '@/components/TimeList.vue';
import { createFakeSchedule } from '../helpers';

function setup(props) {
  const defaultProps = {
    date: new Date(),
    schedule: createFakeSchedule(),
  };
  const propsData = { ...defaultProps, ...props };

  return {
    wrapper: mount(ScheduleContent, {
      propsData,
    }),
  };
}

describe('ScheduleContent', () => {
  it('should render self and subcomponents', () => {
    const props = {
      date: new Date('2020/5/3'),
    };

    const { wrapper } = setup(props);

    const timeLists = wrapper.findAll(TimeList);
    const dates = timeLists.wrappers.map((timeList) => timeList.props().date);
    expect(dates).toStrictEqual([
      new Date('2020/5/3'),
      new Date('2020/5/4'),
      new Date('2020/5/5'),
      new Date('2020/5/6'),
      new Date('2020/5/7'),
      new Date('2020/5/8'),
      new Date('2020/5/9'),
    ]);
  });
});
