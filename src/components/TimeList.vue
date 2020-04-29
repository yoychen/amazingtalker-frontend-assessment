<template>
  <div class="day" :class="{ active }">
    <div class="title">
      <span>{{ date.format('ddd') }}</span>
      <span>{{ date.format('DD') }}</span>
    </div>

    <div class="time-list">
      <div
        class="time"
        :class="{ available: timeSlot.status === 'available' }"
        v-for="timeSlot in timeSlots"
        :key="timeSlot.time.valueOf()"
      >
        {{ timeSlot.time.format('HH:mm') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      required: true,
    },
    timeSlots: {
      type: Array,
      required: true,
    },
  },
  computed: {
    active() {
      return this.timeSlots.length > 0;
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
