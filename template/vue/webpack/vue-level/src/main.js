import Vue from 'vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import App from './App';
import VueParticles from 'vue-particles';
import axios from 'axios';

Vue.use(Element);
Vue.use(VueParticles);
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.prototype.$reqs = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App />'
})

