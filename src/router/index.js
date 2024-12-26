// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Googale_Login from '../views/Googale_Login.vue';
import Dashboard from '../views/Dashboard.vue';
import { useUserStore } from '../stores/userStore'; // Pinia ストアをインポート

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
    meta: { requiresAuth: true }, // 認証が必要なルート
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// グローバルナビゲーションガード
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Piniaストアを取得
  const isAuthenticated = userStore.isLoggedIn; // 認証状態を取得

  if (to.path === '/' && isAuthenticated) {
    next('/dashboard'); // ルートが'/'で認証済みの場合はダッシュボードへリダイレクト
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // 未認証の場合はログインページへリダイレクト
  } else {
    next(); // 認証済みまたは認証不要のルートならそのまま進む
  }
});

export default router;
