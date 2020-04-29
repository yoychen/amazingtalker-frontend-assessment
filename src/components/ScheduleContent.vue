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
import TimeList from './TimeList.vue';

export default {
  props: {
    date: {
      type: Object,
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
      const week = [];

      for (let i = 0; i < 7; i += 1) {
        week.push(this.date.add(i, 'day'));
      }

      return week;
    },
  },
  methods: {
    getTimeSlots(date) {
      if (!this.schedule) {
        return [];
      }

      const timeSlots = this.schedule[date.format('YYYY_MM_DD')] || [];
      // 因為所用的測試資料是靜態的，會有過去時間點的資料，故額外做 filter
      return timeSlots.filter((timeSlot) => timeSlot.time.isAfter(new Date()));
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
