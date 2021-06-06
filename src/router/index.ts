import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CheckInList from '@/components/CheckInList.vue';
import Statistics from '@/components/Statistics.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'CheckInList',
    component: CheckInList,
  },
  {
    // path: '/statistics/:uuid',
    path: '/statistics/',
    name: 'Statistics',
    component: Statistics,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
