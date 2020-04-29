<template>
  <div class="day" :class="{ active }">
    <div class="title">
      <span>{{ format(date, 'ddd') }}</span>
      <span>{{ format(date, 'DD') }}</span>
    </div>

    <div class="time-list">
      <div
        class="time"
        :class="{ available: isAvailable(timeSlot) }"
        v-for="timeSlot in timeSlots"
        :key="timeSlot.time.valueOf()"
      >
        {{ format(timeSlot.time, 'HH:mm') }}
      </div>
    </div>
  </div>
</template>

<script>
import { format, isSame } from '@/utils/date';

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
    timeSlots: {
      type: Array,
      required: true,
    },
  },
  computed: {
    active() {
      return this.timeSlots.length > 0
        || isSame(this.date, new Date(), 'date');
    },
  },
  methods: {
    format,
    isAvailable(timeSlot) {
      return timeSlot.status === 'available';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.day {
  flex: 1;
  margin: 0 5px;
  border-top: 4px solid $color-light-gray;
  text-align: center;
  &.active {
    border-top-color: $color-green;
    .title {
      color: $color-black;
    }
  }

  .title {
    padding: 10px 0;
    color: $color-light-gray;
    span {
      display: block;
    }
  }

  .time {
    padding: 4px 0;
    color: $color-gray;
    font-size: 12px;
    &.available {
      color: $color-green;
      font-weight: 700;
    }
  }
}
</style>
