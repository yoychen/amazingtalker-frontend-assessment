import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRx from 'vue-rx';
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VueRx);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
