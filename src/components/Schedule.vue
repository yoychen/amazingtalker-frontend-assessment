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
import { from } from 'rxjs';
import { switchMap, pluck, tap } from 'rxjs/operators';
import { add, subtract, startOf } from '@/utils/date';
import ScheduleControl from './ScheduleControl.vue';
import ScheduleContent from './ScheduleContent.vue';
import Loading from './Loading.vue';
import querySchedule from '../models/querySchedule';
import withToastingError from '../utils/withToastingError';

export default {
  components: {
    ScheduleControl, ScheduleContent, Loading,
  },
  data() {
    return {
      date: startOf(new Date(), 'week'),
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
          withToastingError(querySchedule)(date.toISOString()),
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
      this.date = add(this.date, 1, 'week');
    },
    checkoutLastWeek() {
      this.date = subtract(this.date, 1, 'week');
    },
  },
};
</script>
