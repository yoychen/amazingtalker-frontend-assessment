import { add, isAfter, format } from '@/utils/date';
import fakeAxios from '../utils/fakeAxios';

function getSortedTimeBlocks(schedule) {
  const withStatus = (status) => (time) => ({ ...time, status });
  const sortByDate = (a, b) => new Date(a.start) - new Date(b.start);

  const timeBlocks = [
    ...schedule.available.map(withStatus('available')),
    ...schedule.booked.map(withStatus('booked')),
  ];
  timeBlocks.sort(sortByDate);

  return timeBlocks;
}

function getTimeSlots(timeBlock, interval = 30) {
  let { start } = timeBlock;
  const { end } = timeBlock;
  const timeSlots = [];

  while (isAfter(end, start)) {
    timeSlots.push({
      status: timeBlock.status,
      time: start,
    });
    start = add(start, interval, 'minute');
  }

  return timeSlots;
}

function groupByDate(schedule, timeSlot) {
  const date = format(timeSlot.time, 'YYYY_MM_DD');

  if (schedule[date]) {
    schedule[date].push(timeSlot);
  } else {
    // eslint-disable-next-line no-param-reassign
    schedule[date] = [timeSlot];
  }

  return schedule;
}

export default async function querySchedule(startedAt) {
  const rawSchedule = await fakeAxios('schedule', {
    params: { started_at: startedAt },
  });

  const timeBlocks = getSortedTimeBlocks(rawSchedule);
  const timeSlots = timeBlocks.map((timeBlock) => getTimeSlots(timeBlock)).flat();

  return timeSlots.reduce(groupByDate, {});
}
