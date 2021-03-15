import PassThrough from "./PassThrough.vue"

const routes = [
  {
    path: "/",
    component: () => import("../layouts/OutsideLayout.vue"),
    children: [{
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }]
  },
  {
    path: '/dashboard',
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [{
        path: '/',
        component: () => import('../views/dashboard/Home.vue'),
        name: 'dashboard'
      },
      {
        path: 'imports',
        component: PassThrough,
        children: [
          {
            path: "",
            component: () => import("../views/dashboard/imports/Index.vue"),
            name: "imports_index"
          }
        ]
      },
    ]
  }
]

export default routes
