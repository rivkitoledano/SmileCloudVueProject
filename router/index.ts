// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import InputPage from '../components/InputPage.vue'
import DisplayPage from '../components/DisplayPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'input',
    component: InputPage,
  },
  {
    path: '/display',
    name: 'display',
    component: DisplayPage,
  },
]



const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
