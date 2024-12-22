// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Googale_Login from '../views/Googale_Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Googale_Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ナビゲーションガード
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // 認証されていない場合はログインページへ
  } else {
    next(); // 認証済みならそのまま進む
  }
});

export default router;
