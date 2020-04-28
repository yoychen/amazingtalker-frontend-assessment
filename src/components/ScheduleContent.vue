<template>
  <div class="schedule-content">
    <TimeList v-for="i in 7" :key="i" />
  </div>
</template>

<script>
import TimeList from './TimeList.vue';

export default {
  components: {
    TimeList,
  },
};
</script>

<style lang="scss" scoped>
.schedule-content {
  display: flex;
  align-items: center;
  padding: 15px 0;
}
</style>
