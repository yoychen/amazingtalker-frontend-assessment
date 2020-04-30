<template>
  <div id="app">
    <div class="demo-container">
      <h1 class="section-title">
        {{ $t('availableTimes') }}
        <LocaleChanger />
      </h1>
      <Schedule />
    </div>
  </div>
</template>

<script>
import Schedule from './components/Schedule.vue';
import LocaleChanger from './components/LocaleChanger.vue';

export default {
  name: 'App',
  components: {
    Schedule, LocaleChanger,
  },
};
</script>

<style lang="scss">
@import "@/app.scss";

body {
  line-height: 1.5;
  font-family: Helvetica Neue,Helvetica,Arial,PingFang HK,\.PingFang-SC-Regular,
    PingFang,Hiragino Sans GB,STHeiti,Microsoft JhengHei,sans-serif;
  color: $color-black;
}

.demo-container {
  max-width: 700px;
  margin: auto;

  .section-title {
    margin-bottom: 20px;
    font-size: 1.25rem;
    font-weight: 500;

    .locale-changer {
      float: right;
    }
  }
}
</style>
