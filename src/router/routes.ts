import PassThrough from "./PassThrough.vue"

const routes = [
  {
    path: "/",
    component: () => import("../layouts/OutsideLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/login"
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      }
    ]
  },
  {
    path: '/dashboard', 
    meta: { requiresAuthentication: true},
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [{
        path: '/',
        component: () => import('../views/dashboard/Home.vue'),
        name: 'dashboard',
        meta: { requiresAuthentication: true},

      },
      {
        path: "projects",
        component: PassThrough,
        children:[
          {
            path: ":projectId",
            component: PassThrough,
            meta: {selectedProject: true},
            children: [
              {
                path: "",
                component: () => import("../views/dashboard/projects/Show.vue"),
                name: "project_show"
              },
              {
                path: 'imports',
                component: PassThrough,
                children: [
                  {
                    path: "",
                    component: () => import("../views/dashboard/imports/Index.vue"),
                    name: "imports_index"
                  },
                  {
                    path: ":importId",
                    component: () => import("../views/dashboard/imports/Edit.vue"),
                    name: "import_edit"
                  }
                ]
              },
              {
                path: 'curation-sessions',
                component: PassThrough,
                children: [
                  {
                    path: "",
                    component: () => import("../views/dashboard/curationSessions/Index.vue"),
                    name: "curation_sessions_index"
                  },
                  {
                    path: ":curationSessionId",
                    component: () => import("../views/dashboard/curationSessions/Show.vue"),
                    name: "curation_session_show"
                  }
                ]
              },
              {
                path: 'explore',
                component: PassThrough,
                children: [
                  {
                    path: "",
                    component: () => import("../views/dashboard/explore/Index.vue"),
                    name: "explore_index"
                  },
                  {
                    path: ":dataTypeId",
                    component: () => import("../views/dashboard/explore/Show.vue"),
                    name: "explore_show"
                  }
                ]
              },
              {
                path: 'data-objects',
                component: PassThrough,
                children: [
                  {
                    path: ":dataObjectId",
                    component: () => import("../views/dashboard/dataObjects/Show.vue"),
                    name: "data_object_show"
                  }
                ]
              },
            ]
          }
        ]
      }
    ]
  }
]

export default routes
