<template>
  <div class="schedule-control">
    <el-button-group>
      <el-button
        size="mini"
        icon="el-icon-arrow-left"
        @click="$emit('lastWeek')"
        :disabled="isCurrentWeek"
      ></el-button>
      <el-button
        size="mini"
        icon="el-icon-arrow-right"
        @click="$emit('nextWeek')"
      ></el-button>
    </el-button-group>

    <span class="range">{{ rangeOfSchedule }}</span>
    <span class="time-zone">{{ $t('timeZone', timeZone) }}</span>
  </div>
</template>

<script>
import {
  add,
  format,
  isSame,
  timeZone,
} from '@/utils/date';

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      timeZone: timeZone(),
    };
  },
  computed: {
    rangeOfSchedule() {
      const from = format(this.date, 'YYYY/MM/DD');
      const to = format(add(this.date, 7, 'day'), 'DD');

      return `${from} - ${to}`;
    },
    isCurrentWeek() {
      return isSame(this.date, new Date(), 'week');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.schedule-control {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .range {
    padding-left: 15px;
  }

  .time-zone {
    margin-left: auto;
    text-align: right;
    font-size: 12px;
    line-height: 2;
  }

  .el-button {
    &:not(.is-disabled):hover {
      color: $color-green;
      border-color: $color-green;
      background-color: transparent;
    }
    &:not(.is-disabled):active {
      color: $color-dark-green;
      border-color: $color-dark-green;
      background-color: transparent;
    }
    &:focus {
      color: #5a5e66;
      border-color: #d8dce5;
      background: transparent;
    }
  }
}
</style>
