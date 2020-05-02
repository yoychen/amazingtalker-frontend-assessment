import { mount } from '@vue/test-utils';
import { Message } from 'element-ui';
import Schedule from '@/components/Schedule.vue';
import ScheduleControl from '@/components/ScheduleControl.vue';
import ScheduleContent from '@/components/ScheduleContent.vue';
import querySchedule from '@/models/querySchedule';
import { createFakeSchedule } from '../helpers';

jest.mock('@/models/querySchedule');
jest.mock('element-ui');

function setup(data = {}) {
  return {
    wrapper: mount(Schedule, {
      data() {
        return data;
      },
    }),
  };
}

describe('Schedule', () => {
  it('should render self and subcomponents', () => {
    const data = {
      date: new Date('2020/5/1'),
      schedule: createFakeSchedule(),
    };

    const { wrapper } = setup(data);

    const scheduleControl = wrapper.find(ScheduleControl);
    expect(scheduleControl.props().date).toBe(data.date);

    const scheduleContent = wrapper.find(ScheduleContent);
    expect(scheduleContent.props().date).toBe(data.date);
    expect(scheduleContent.props().schedule).toBe(data.schedule);
  });

  it('should fetch schedule data on created', async () => {
    const schedule = createFakeSchedule();
    querySchedule.mockReturnValue(Promise.resolve(schedule));

    const { wrapper } = setup();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.schedule).toBe(schedule);
  });

  it('should toast error message on fetch failure', async () => {
    querySchedule.mockReturnValue(Promise.reject());

    const { wrapper } = setup();
    await wrapper.vm.$nextTick();

    expect(Message.error.mock.calls.length).toBe(1);
    Message.error.mockClear();
  });

  it('should fetch schedule data after changed date', async () => {
    const newSchedule = createFakeSchedule();
    querySchedule
      .mockReturnValueOnce(Promise.resolve({}))
      .mockReturnValueOnce(Promise.resolve(newSchedule));

    const { wrapper } = setup();
    wrapper.setData({ date: new Date() });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.schedule).toBe(newSchedule);
  });

  it('should change date to next week after nextWeek event', async () => {
    const data = {
      date: new Date('2020/5/1'),
    };

    const { wrapper } = setup(data);
    const scheduleControl = wrapper.find(ScheduleControl);
    scheduleControl.vm.$emit('nextWeek');

    expect(wrapper.vm.date).toStrictEqual(new Date('2020/5/8'));
  });

  it('should change date to last week after lastWeek event', async () => {
    const data = {
      date: new Date('2020/5/1'),
    };

    const { wrapper } = setup(data);
    const scheduleControl = wrapper.find(ScheduleControl);
    scheduleControl.vm.$emit('lastWeek');

    expect(wrapper.vm.date).toStrictEqual(new Date('2020/4/24'));
  });
});
