<template>
  <div class="schedule">
    <ScheduleControl
      :date="date"
      @nextWeek="checkoutNextWeek"
      @lastWeek="checkoutLastWeek"
    />

    <ScheduleContent :date="date" :schedule="schedule" />

    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { from } from 'rxjs';
import { switchMap, pluck, tap } from 'rxjs/operators';
import ScheduleControl from './ScheduleControl.vue';
import ScheduleContent from './ScheduleContent.vue';
import Loading from './Loading.vue';
import querySchedule from '../models/querySchedule';

export default {
  components: {
    ScheduleControl, ScheduleContent, Loading,
  },
  data() {
    return {
      date: dayjs().startOf('week'),
      schedule: null,
    };
  },
  subscriptions() {
    const date$ = this.$watchAsObservable('date', { immediate: true });

    return {
      schedule: date$.pipe(
        tap(this.resetSchedule),
        pluck('newValue'),
        switchMap((date) => from(
          querySchedule(date.toISOString()),
        )),
      ),
    };
  },
  computed: {
    showLoading() {
      return !this.schedule;
    },
  },
  methods: {
    resetSchedule() {
      this.schedule = null;
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
