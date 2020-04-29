import Vue from 'vue';
import { Button, ButtonGroup, Icon } from 'element-ui';
import VueRx from 'vue-rx';
import App from './App.vue';

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Icon);
Vue.use(VueRx);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
