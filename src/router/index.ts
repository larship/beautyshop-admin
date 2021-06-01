import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CheckInList from '@/components/CheckInList.vue';
import Statistics from '@/components/Statistics.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/check-in-list/:uuid',
    name: 'CheckInList',
    component: CheckInList,
    props: true
  },
  {
    path: '/statistics/:uuid',
    name: 'Statistics',
    component: Statistics,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
