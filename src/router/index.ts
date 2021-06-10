import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CheckInList from '@/components/CheckInList.vue';
import Statistics from '@/components/Statistics.vue';
import Hello from '@/components/Hello.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/list',
    name: 'CheckInList',
    component: CheckInList
  },
  {
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
