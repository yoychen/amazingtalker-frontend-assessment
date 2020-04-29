import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import flatMap from 'lodash/fp/flatMap';
import groupBy from 'lodash/fp/groupBy';
import { add, isAfter } from '@/utils/date';
import fakeAxios from '../utils/fakeAxios';

function getSortedTimeBlocks(schedule) {
  const withStatus = (status) => (time) => ({ ...time, status });
  const sortByDate = (a, b) => new Date(a.start) - new Date(b.start);

  return [
    ...map(withStatus('available'))(schedule.available),
    ...map(withStatus('booked'))(schedule.booked),
  ].sort(sortByDate);
}

function getTimeSlots(timeBlock, interval = 30) {
  let { start } = timeBlock;
  const { end } = timeBlock;
  const timeSlots = [];

  while (isAfter(end, start)) {
    timeSlots.push({
      status: timeBlock.status,
      time: new Date(start),
    });
    start = add(start, interval, 'minute');
  }

  return timeSlots;
}

export default async function querySchedule(startedAt) {
  const rawSchedule = await fakeAxios('schedule', {
    params: { started_at: startedAt },
  });

  const splitTimeBlocks = flatMap((timeBlock) => getTimeSlots(timeBlock));
  const groupByDate = groupBy((timeSlot) => timeSlot.time.getDate());

  return pipe(
    getSortedTimeBlocks,
    splitTimeBlocks,
    groupByDate,
  )(rawSchedule);
}
