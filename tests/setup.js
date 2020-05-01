import { config } from '@vue/test-utils';
import Vue from 'vue';
import VueRx from 'vue-rx';
import i18n from '@/i18n';

// Use require() to import element-ui to prevent auto importing css by babel-plugin-component
const elementUI = require('element-ui');

Vue.use(elementUI);
Vue.use(VueRx);

config.mocks.$t = i18n.t.bind(i18n);
