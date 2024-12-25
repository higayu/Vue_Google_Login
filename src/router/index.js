// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Googale_Login from '../views/Googale_Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
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
  const isAuthenticated = !!localStorage.getItem('authToken'); // 認証トークンがあるかチェック

  if (to.meta.requiresAuth && !isAuthenticated) {
    if (to.path !== '/') {
      next('/'); // 認証されていない場合はルートにリダイレクト
    } else {
      next(); // すでにログインページの場合はそのまま進む
    }
  } else {
    next(); // 認証済みの場合または認証不要のルートならそのまま進む
  }
});

export default router;
