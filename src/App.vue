<template>
  <div id="app">
    <div class="demo-container">
      <h1 class="title">授課時間</h1>
      <Schedule />
    </div>
  </div>
</template>

<script>
import Schedule from './components/Schedule.vue';

export default {
  name: 'App',
  components: {
    Schedule,
  },
};
</script>

<style lang="scss" scoped>
@import url(./app.scss);

.demo-container {
  max-width: 700px;
  margin: auto;

  .title {
    margin-bottom: 20px;
    font-size: 1.25rem;
    font-weight: 500;
  }
}
</style>
