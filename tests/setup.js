import { config } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRx from 'vue-rx';
import i18n from '@/i18n';

Vue.use(ElementUI);
Vue.use(VueRx);

config.mocks.$t = i18n.t.bind(i18n);
