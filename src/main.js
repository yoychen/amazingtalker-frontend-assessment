import Vue from 'vue';
import { Button, ButtonGroup, Icon } from 'element-ui';
import VueRx from 'vue-rx';
import App from './App.vue';
import i18n from './i18n';

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Icon);
Vue.use(VueRx);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount('#app');
