export const getByTestId = (wrapper, id) => wrapper.find(`[data-testid=${id}]`);

export const getAllByTestId = (wrapper, id) => wrapper.findAll(`[data-testid=${id}]`);

export const createFakeTimeSlot = (date, status) => ({
  time: new Date(date),
  status,
});

export const createFakeSchedule = () => ({
  1: [
    createFakeTimeSlot('2020/5/1 10:00', 'booked'),
    createFakeTimeSlot('2020/5/1 10:30', 'booked'),
    createFakeTimeSlot('2020/5/1 12:00', 'booked'),
    createFakeTimeSlot('2020/5/1 13:00', 'available'),
  ],
});
