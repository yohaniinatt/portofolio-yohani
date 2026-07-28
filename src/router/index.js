import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import { supabase } from '../lib/supabaseClient'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artikel',
    name: 'artikel',
    component: ArticlesView
  },
  {
    path: '/kontak',
    name: 'kontak',
    component: ContactView
  },
  {
    path: '/secret-login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard: Mencegah masuk ke /admin tanpa login
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      next('/secret-login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router