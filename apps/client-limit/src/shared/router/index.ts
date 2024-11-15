import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { router as authRouter } from '@/modules/auth/router'
import { router as userRouter } from '@/modules/users/router'
import { router as limitRouter } from '@/modules/limits/router'
import Layout from '@/layouts/Layout.vue'
import { Component } from 'vue'

// const { currentUser } = useAuthStore()

type _RouteRecord = RouteRecordRaw & {
  componentIcon?: Component
  redirect?: string
}

const routes = [
  ...authRouter,
  {
    path: '/',
    component: Layout,
    children: [...userRouter]
  }
] as _RouteRecord[]

export const sidebarRoutes = routes.flatMap(
  (route: _RouteRecord) => route.children || []
) as _RouteRecord[]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, { path: '/:pathMatch(.*)*', redirect: '/' }]
})
