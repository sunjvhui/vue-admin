import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'md-menu',
      title: '订单管理'
    },
    component: Main,
    children: [
      {
        path: 'order_list',
        name: 'order_list',
        meta: {
          icon: 'md-grid',
          title: '订单列表'
        },
        component: () => import('@/view/order/list.vue')
      },
      {
        path: '/order_edit',
        name: 'order_edit',
        meta: {
          icon: 'ios-create-outline',
          title: '订单编辑',
          hideInMenu: true
        },
        component: () => import('@/view/order/edit.vue')
      }
    ]
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      icon: 'md-menu',
      title: '地址管理'
    },
    component: Main,
    children: [
      {
        path: 'address_list',
        name: 'address_list',
        meta: {
          icon: 'md-grid',
          title: '地址列表'
        },
        component: () => import('@/view/address/list.vue')
      },
      {
        path: '/address_edit',
        name: 'address_edit',
        meta: {
          icon: 'ios-create-outline',
          title: '地址编辑',
          hideInMenu: true
        },
        component: () => import('@/view/address/edit.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: Main,
    meta: {
      icon: 'logo-yen',
      title: '支付管理'
    },
    children: [
      {
        path: 'pay_list',
        name: 'pay_list',
        meta: {
          icon: 'ios-basket',
          title: '支付列表'
        },
        component: () => import('@/view/pay/list.vue')
      },
      {
        path: '/pay_edit',
        name: 'pay_info',
        meta: {
          icon: 'ios-create-outline',
          title: '查看支付详情',
          hideInMenu: true
        },
        component: () => import('@/view/pay/edit.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      icon: 'ios-body',
      title: '用户管理'
    },
    children: [
      {
        path: 'user_list',
        name: 'user_list',
        meta: {
          icon: 'md-body',
          title: '用户列表'
        },
        component: () => import('@/view/user/list.vue')
      },
      {
        path: '/user_edit',
        name: 'user_edit',
        meta: {
          icon: 'ios-create-outline',
          title: '查看支付详情',
          hideInMenu: true
        },
        component: () => import('@/view/user/edit.vue')
      }
    ]
  },
  {
    path: '/type',
    name: 'type',
    meta: {
      icon: 'md-menu',
      title: '类型管理'
    },
    component: Main,
    children: [
      {
        path: 'type_list',
        name: 'type_list',
        meta: {
          icon: 'md-grid',
          title: '家具类型列表'
        },
        component: () => import('@/view/type/list.vue')
      },
      {
        path: '/type_edit',
        name: 'type_edit',
        meta: {
          icon: 'ios-create-outline',
          title: '家具类型编辑',
          hideInMenu: true
        },
        component: () => import('@/view/type/edit.vue')
      },
      {
        path: '/type_add',
        name: 'type_add',
        meta: {
          icon: 'ios-create-outline',
          title: '家具类型'
        },
        component: () => import('@/view/type/add.vue')
      }

    ]
  },
  {
    path: '/shipping',
    name: 'shipping',
    meta: {
      icon: 'md-menu',
      title: '配送方式管理'
    },
    component: Main,
    children: [
      {
        path: 'shipping_list',
        name: 'shipping_list',
        meta: {
          icon: 'md-grid',
          title: '配送方式列表'
        },
        component: () => import('@/view/shipping/list.vue')
      },
      {
        path: '/shipping_edit',
        name: 'shipping_edit',
        meta: {
          icon: 'ios-create-outline',
          title: '配送方式编辑',
          hideInMenu: true
        },
        component: () => import('@/view/shipping/edit.vue')
      },
      {
        path: '/shipping_add',
        name: 'shipping_add',
        meta: {
          icon: 'ios-create-outline',
          title: '添加配送方式'
        },
        component: () => import('@/view/shipping/add.vue')
      }
    ]
  }
]
