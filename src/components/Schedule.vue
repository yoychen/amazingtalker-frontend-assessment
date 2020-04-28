<template>
  <div class="schedule">
    <ScheduleControl />
    <ScheduleContent />
  </div>
</template>

<script>
import ScheduleControl from './ScheduleControl.vue';
import ScheduleContent from './ScheduleContent.vue';

export default {
  components: {
    ScheduleControl, ScheduleContent,
  },
};
</script>

<style lang="sass" scoped>

</style>
