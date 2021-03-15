import PassThrough from "./PassThrough.vue"

const routes = [{
    path: '/',
    name: 'Home',
    component: import('../views/Home.vue')
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
