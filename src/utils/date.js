import dayjs from 'dayjs';

export const format = (date, formatTemplate) => dayjs(date).format(formatTemplate);

export const isAfter = (a, b) => dayjs(a).isAfter(b);

export const isSame = (a, b, unit) => dayjs(a).isSame(b, unit);

export const startOf = (date, unit) => dayjs(date).startOf(unit).toDate();

export const add = (date, amount, unit) => dayjs(date).add(amount, unit).toDate();

export const subtract = (date, amount, unit) => dayjs(date).subtract(amount, unit).toDate();

export const timeZone = () => ({
  city: Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1],
  offsetFromUTC: format(new Date(), 'Z'),
});
