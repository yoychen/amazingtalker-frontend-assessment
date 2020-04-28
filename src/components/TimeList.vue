<template>
  <div class="day">
    <div class="title">
      <span>三</span>
      <span>29</span>
    </div>

    <div class="time-list">
      <div class="time">
        00:00
      </div>
      <div class="time available">
        00:00
      </div>
      <div class="time">
        00:00
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.day {
  flex-grow: 1;
  margin: 0 5px;
  border-top: 4px solid #d2d2d2;
  text-align: center;
  &.active {
    border-top-color: #02cab9;
  }

  .title {
    padding: 10px 0;
    span {
      display: block;
    }
  }

  .time {
    padding: 4px 0;
    color: #b6b6b6;
    font-size: 12px;
    &.available {
      color: #02cab9;
      font-weight: 700;
    }
  }
}
</style>
