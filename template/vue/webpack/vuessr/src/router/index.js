import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [{
            path: '/',
            component: () =>
                import ('../components/main')
        }, {
            path: '/preData',
            component: () =>
                import ('../components/preData')
        }]
    });

}