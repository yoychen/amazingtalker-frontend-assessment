<template>
  <div class="schedule">
    <ScheduleControl
      :date="date"
      @nextWeek="checkoutNextWeek"
      @lastWeek="checkoutLastWeek"
    />
    <ScheduleContent :date="date" :schedule="schedule" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import ScheduleControl from './ScheduleControl.vue';
import ScheduleContent from './ScheduleContent.vue';
import querySchedule from '../models/querySchedule';

export default {
  components: {
    ScheduleControl, ScheduleContent,
  },
  data() {
    return {
      date: dayjs().startOf('week'),
      schedule: null,
    };
  },
  watch: {
    date: {
      immediate: true,
      handler() {
        this.loadSchedule();
      },
    },
  },
  methods: {
    async loadSchedule() {
      this.schedule = await querySchedule(this.date.toISOString());
    },
    checkoutNextWeek() {
      this.date = this.date.add(1, 'week');
    },
    checkoutLastWeek() {
      this.date = this.date.subtract(1, 'week');
    },
  },
};
</script>
