<template>
  <div class="schedule-control">
    <el-button-group>
      <el-button size="mini" icon="el-icon-arrow-left"></el-button>
      <el-button size="mini" icon="el-icon-arrow-right"></el-button>
    </el-button-group>
    <span class="range">2020/04/26 - 03</span>
    <span class="time-zone">* 時間以 台北 (GMT+08:00) 顯示</span>
  </div>
</template>

<script>
export default {

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
