import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClocksView from "@/views/ClocksView.vue"
import UserView from '../views/UserView.vue'
import WorkingTimeView from '../views/WorkingTimeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clocks',
      name: 'clocks',
      component: ClocksView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/workingtime',
      name: 'workingtime',
      component: WorkingTimeView
    }
  ]
})

export default router
