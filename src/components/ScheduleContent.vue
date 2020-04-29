<template>
  <div class="schedule-content">
    <TimeList
      v-for="date in week"
      :key="date.valueOf()"
      :date="date"
      :timeSlots="getTimeSlots(date)"
    />
  </div>
</template>

<script>
import filter from 'lodash/fp/filter';
import range from 'lodash/range';
import { add, isAfter } from '@/utils/date';
import TimeList from './TimeList.vue';

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
    schedule: {
      type: Object,
    },
  },
  components: {
    TimeList,
  },
  computed: {
    week() {
      return range(7)
        .map((amount) => add(this.date, amount, 'day'));
    },
  },
  methods: {
    getTimeSlots(date) {
      if (!this.schedule) {
        return [];
      }

      const timeSlots = this.schedule[date.getDate()] || [];
      // 因為所用的測試資料是靜態的，會有過去時間點的資料，故額外做 filter
      const excludePast = filter((timeSlot) => isAfter(timeSlot.time, new Date()));
      return excludePast(timeSlots);
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule-content {
  display: flex;
  padding: 15px 0;
}
</style>
