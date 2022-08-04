import { createRouter, createWebHistory } from 'vue-router'
import DpartmentView from '@/modules/dpartment/views/DpartmentView.vue'
import EmployeeView from '@/modules/employee/views/EmployeeView.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DpartmentView
    },    
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { layout: "empty" },
    },
    {
      path: "/employee",
      name: "EmployeeView",
      component: EmployeeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router