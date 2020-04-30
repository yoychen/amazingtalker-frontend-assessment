<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="lang in langs" :key="lang" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return { langs: ['en', 'zh'] };
  },
};
</script>
