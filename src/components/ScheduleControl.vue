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
    <span class="time-zone">* 時間以 {{ timeZone }} (GMT{{ date.format('Z') }}) 顯示</span>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      required: true,
    },
  },
  computed: {
    rangeOfSchedule() {
      return `${this.date.format('YYYY/MM/DD')} - ${this.date.add(7, 'day').format('DD')}`;
    },
    isCurrentWeek() {
      return this.date.isSame(new Date(), 'week');
    },
    timeZone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1];
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule-control {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .range {
    padding-left: 15px;
  }

  .time-zone {
    margin-left: auto;
    font-size: 12px;
  }
}
</style>
