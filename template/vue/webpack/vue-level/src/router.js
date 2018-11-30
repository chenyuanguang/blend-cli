import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultTmp from '@/components/default'

const Login = (r) => require(['./components/login.vue'], r)
const Home = (r) => require(['./components/home.vue'], r)
const Reference = (r) => require(['./components/Reference'], r)


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/home/reference'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'reference',
      component: Reference,
      meta: {
        title: '让你们参考的'
      }
    },
    {
      path: 'welcome',
      component: {
        template: `<div>欢迎</div>`
      },
      meta: {
        title: '首页'
      }
    },
    {
      path: 'operations',
      component: DefaultTmp,
      meta: {
        title: '运营位列表'
      }
    },
    {
      path: 'editmodule',
      component: DefaultTmp,
      meta: {
        title: '编辑运营位列表'
      }
    },
    {
      path: 'operationscommodity',
      component: DefaultTmp,
      meta: {
        title: '编辑运营内容列表'
      }
    },
    {
      path: 'operationscommoditylist',
      component: DefaultTmp,
      meta: {
        title: '运营内容列表'
      }
    },
    {
      path: 'role',
      component: DefaultTmp,
      meta: {
        title: '角色列表'
      }
    },
    {
      path: 'memberlist',
      component: DefaultTmp,
      meta: {
        title: '成员列表'
      }
    },
    {
      path: 'order',
      component: DefaultTmp,
      meta: {
        title: '订单列表'
      }
    },
    {
      path: 'goodslist',
      component: DefaultTmp,
      meta: {
        title: '商品列表'
      }
    },
    {
      path: 'addgoods',
      component: DefaultTmp,
      meta: {
        title: '添加/编辑商品'
      }
    },
    {
      path: 'TypeList',
      component: DefaultTmp,
      meta: {
        title: '规格列表'
      }
    },
    {
      path: 'AddType',
      component: DefaultTmp,
      meta: {
        title: '添加／编辑规格'
      }
    },
    {
      path: 'account',
      component: DefaultTmp,
      meta: {
        title: '结算订单明细列表'
      }
    },
    {
      path: 'statemen',
      component: DefaultTmp,
      meta: {
        title: '结算对账单'
      }
    },
    {
      path: 'refund',
      component: DefaultTmp,
      meta: {
        title: '用户退款列表'
      }
    }
    ]
  },
  {
    path: '*',
    component: DefaultTmp
  }
  ]
})


router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  setTimeout(() => {
    this.a.app.$store.dispatch('setTitle', title)
  }, 0)
  next()
})
export default router
