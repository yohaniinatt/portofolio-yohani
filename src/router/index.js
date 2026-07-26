import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/artikel', name: 'Articles', component: ArticlesView },
  { path: '/kontak', name: 'Contact', component: ContactView },
  { path: '/secret-login', name: 'SecretLogin', component: LoginView },
  { path: '/admin', name: 'Admin', component: AdminDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router