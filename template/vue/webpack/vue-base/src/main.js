import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import app from '@/app';

var vm = new Vue({
    el: '#root',
    template: '<app />',
    components: {
        app
    }
});